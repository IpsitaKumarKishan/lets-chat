import { format } from "timeago.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Message({ message, self }) {
  return (
    <>
    <li
      className={classNames(
        self !== message.sender ? "justify-start" : "justify-end",
        "flex animate-fade-in-up"
      )}
    >
      <div className="flex flex-col max-w-[75%] md:max-w-[65%]">
        <div
          className={classNames(
            self !== message.sender
              ? "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-sm shadow-sm"
              : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-sm shadow-md",
            "relative px-4 py-2.5"
          )}
        >
          <span className="block font-medium text-[15px] leading-relaxed break-words">
            {message.message}
          </span>
        </div>
        <span
          className={classNames(
            self !== message.sender ? "text-left" : "text-right",
            "block text-xs mt-1 font-semibold text-slate-400 dark:text-slate-500"
          )}
        >
          {format(message.createdAt)}
        </span>
      </div>
    </li>
    </>
  );
}
