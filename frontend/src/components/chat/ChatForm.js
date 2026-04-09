import { useState, useEffect, useRef } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmojiPicker]);

  const handleEmojiClick = (event, emojiObject) => {
    let newMessage = message + emojiObject.emoji;
    setMessage(newMessage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    props.handleFormSubmit(message);
    setMessage("");
  };

  return (
    <div ref={scrollRef} className="relative">
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <Picker className="dark:bg-slate-800" onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="flex items-center gap-3 w-full bg-slate-100/50 dark:bg-slate-800/50 p-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-300">
          <button
            type="button"
            className="flex-shrink-0 p-2 text-slate-400 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 focus:outline-none transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <EmojiHappyIcon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            className="block w-full py-2 bg-transparent text-slate-900 border-none focus:ring-0 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm"
            name="message"
            required
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <button 
            type="submit"
            className="flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
          >
            <PaperAirplaneIcon
              className="h-5 w-5 rotate-90 translate-x-[2px] translate-y-[-1px]"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
