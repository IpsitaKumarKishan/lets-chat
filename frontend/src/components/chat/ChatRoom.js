import { useState, useEffect, useRef } from "react";

import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";

export default function ChatRoom({ currentChat, currentUser, socket, changeChat }) {
  const [messages, setMessages] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(currentChat._id);
      setMessages(res);
    };

    fetchData();
  }, [currentChat._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const handleMessage = (data) => {
      const chatContactId = currentChat.members.find((member) => member !== currentUser.uid);
      if (data.senderId === chatContactId) {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.senderId,
            message: data.message,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    };

    socket.on("getMessage", handleMessage);
    return () => socket.off("getMessage", handleMessage);
  }, [socket, currentChat, currentUser.uid]);

  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.uid
    );

    socket.emit("sendMessage", {
      senderId: currentUser.uid,
      receiverId: receiverId,
      message: message,
    });

    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser.uid,
      message: message,
    };
    const res = await sendMessage(messageBody);
    setMessages((prev) => [...prev, res]);
  };

  return (
    <div className="lg:col-span-2 lg:block w-full">
      <div className="w-full h-[calc(100vh-86px)] lg:h-[38rem] flex flex-col bg-slate-50/50 dark:bg-transparent">
        <div className="p-4 bg-white/90 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/90 dark:border-slate-800 flex items-center shrink-0 z-10 shadow-sm">
          <button 
            type="button"
            className="lg:hidden mr-4 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200"
            onClick={() => changeChat(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <Contact chatRoom={currentChat} currentUser={currentUser} />
        </div>

        <div className="relative w-full p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-thin">
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser.uid} />
              </div>
            ))}
          </ul>
        </div>

        <div className="shrink-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 dark:bg-slate-900/90 dark:border-slate-800">
          <ChatForm handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}
