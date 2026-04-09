export default function UserLayout({ user, onlineUsersId }) {
  return (
    <div className="relative flex items-center w-full">
      <div className="relative shrink-0">
        <img className="w-11 h-11 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700" src={user?.photoURL} alt="" />
        {onlineUsersId?.includes(user?.uid) ? (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></span>
        ) : (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"></span>
        )}
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
          {user?.displayName}
        </span>
      </div>
    </div>
  );
}
