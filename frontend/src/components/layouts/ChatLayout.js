import { useEffect, useState } from "react";

import {
  getAllUsers,
  getChatRooms,
  initiateSocketConnection,
} from "../../services/ChatService";
import { useAuth } from "../../contexts/AuthContext";

import ChatRoom from "../chat/ChatRoom";
import Welcome from "../chat/Welcome";
import AllUsers from "../chat/AllUsers";
import SearchUsers from "../chat/SearchUsers";

export default function ChatLayout() {
  const [users, SetUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [currentChat, setCurrentChat] = useState();
  const [onlineUsersId, setonlineUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isContact, setIsContact] = useState(false);

  const [socket, setSocket] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    let currentSocket;
    let isMounted = true;

    const getSocket = async () => {
      const res = await initiateSocketConnection();
      if (isMounted) {
        currentSocket = res;
        setSocket(res);
        res.emit("addUser", currentUser.uid);
        res.on("getUsers", (users) => {
          const userId = users.map((u) => u[0]);
          setonlineUsersId(userId);
        });
      } else {
        res.disconnect();
      }
    };

    getSocket();

    return () => {
      isMounted = false;
      if (currentSocket) {
        currentSocket.disconnect();
      }
    };
  }, [currentUser.uid]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChatRooms(currentUser.uid);
      
      const uniqueRooms = [];
      const seenMembers = new Set();

      (res || []).forEach((room) => {
        const otherMember = room.members.find(m => m !== currentUser.uid);
        if (!seenMembers.has(otherMember)) {
          seenMembers.add(otherMember);
          uniqueRooms.push(room);
        }
      });

      setChatRooms(uniqueRooms);
    };

    fetchData();
  }, [currentUser.uid]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      SetUsers(res || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setFilteredRooms(chatRooms);
  }, [users, chatRooms]);

  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredRooms([]);
    }
  }, [isContact]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);

    const searchedUsers = (users || []).filter((user) => {
      return user.displayName
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase());
    });

    const searchedUsersId = searchedUsers.map((u) => u.uid);

    // If there are initial contacts
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        // Check if searched user is a contact or not.
        const isUserContact = chatRoom.members.some(
          (e) => e !== currentUser.uid && searchedUsersId.includes(e)
        );
        setIsContact(isUserContact);

        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="min-w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-3 transition-colors duration-300">
        <div className={`bg-slate-50/80 dark:bg-slate-800/40 border-r border-slate-200 dark:border-slate-800 lg:col-span-1 flex flex-col ${currentChat ? 'hidden lg:flex' : 'flex'}`}>
          <SearchUsers handleSearch={handleSearch} />

          <AllUsers
            users={searchQuery !== "" ? filteredUsers : users}
            chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
            setChatRooms={setChatRooms}
            onlineUsersId={onlineUsersId}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>

        {currentChat && socket ? (
          <div className="col-span-2 bg-white dark:bg-slate-900 w-full">
            <ChatRoom
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              changeChat={handleChatChange}
            />
          </div>
        ) : (
          <div className="col-span-2 hidden lg:flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50">
            <Welcome />
          </div>
        )}
      </div>
    </div>
  );
}
