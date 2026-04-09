import { useState, useEffect } from "react";

import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  useEffect(() => {
    const Ids = (chatRooms || []).map((chatRoom) => {
      return chatRoom.members.find((member) => member !== currentUser.uid);
    });
    setContactIds(Ids);
  }, [chatRooms, currentUser.uid]);

  useEffect(() => {
    setNonContacts(
      (users || []).filter(
        (f) => f.uid !== currentUser.uid && !contactIds.includes(f.uid)
      )
    );
  }, [contactIds, users, currentUser.uid]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser.uid,
      receiverId: user.uid,
    };
    const res = await createChatRoom(members);
    if (res) {
      setChatRooms((prev) => [...prev, res]);
      changeChat(res);
    }
  };

  return (
    <>
      <div className="overflow-y-auto h-[35rem] px-2 py-2 scrollbar-thin">
        <h2 className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Recent Chats
        </h2>
        <ul className="mb-6 space-y-1">
          {(chatRooms || []).map((chatRoom, index) => (
            <li
              key={index}
              className={classNames(
                index === selectedChat
                  ? "bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500"
                  : "bg-transparent border-l-4 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50",
                "transition-all duration-200 ease-in-out cursor-pointer rounded-r-lg"
              )}
              onClick={() => changeCurrentChat(index, chatRoom)}
            >
              <div className="flex items-center px-4 py-3">
                <Contact
                  chatRoom={chatRoom}
                  onlineUsersId={onlineUsersId}
                  currentUser={currentUser}
                />
              </div>
            </li>
          ))}
        </ul>

        {nonContacts.length > 0 && (
          <h2 className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Other Users
          </h2>
        )}
        <ul className="space-y-1">
          {nonContacts.map((nonContact, index) => (
            <li
              key={index}
              className="bg-transparent border-l-4 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200 ease-in-out cursor-pointer rounded-r-lg"
              onClick={() => handleNewChatRoom(nonContact)}
            >
              <div className="flex items-center px-4 py-3">
                <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
