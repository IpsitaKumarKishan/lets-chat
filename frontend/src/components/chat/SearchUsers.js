import { SearchIcon } from "@heroicons/react/solid";

export default function SearchUsers({ handleSearch }) {
  return (
    <div className="mx-4 my-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon
            className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block py-2.5 pl-10 pr-4 w-full bg-slate-100/50 text-slate-900 text-sm rounded-full border border-transparent hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:bg-slate-800/50 dark:hover:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:bg-slate-800 transition-all duration-300 shadow-sm"
          placeholder="Search conversations..."
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
