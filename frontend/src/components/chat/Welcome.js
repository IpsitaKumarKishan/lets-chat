import { WelcomeSVG } from "../../utils/WelcomeSVG";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
      <div className="max-w-xs w-full mx-auto drop-shadow-xl transition-transform duration-500 hover:scale-105 mb-6 opacity-90">
        <WelcomeSVG />
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
        Welcome to Let's Chat
      </h2>
      <p className="mt-3 text-base font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        Select a conversation from the sidebar or start a new one to begin messaging.
      </p>
    </div>
  );
}
