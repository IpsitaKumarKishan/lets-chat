import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  const [modal, setModal] = useState(false);

  const { currentUser } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 px-4 sm:px-6 py-3 bg-white/70 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 text-slate-900 text-sm dark:text-white transition-colors duration-300 shadow-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between max-w-6xl">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="self-center text-2xl font-extrabold tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 transition-transform duration-300 group-hover:scale-105">
              Let's Chat
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 md:order-2">
            <ThemeToggler />

            {currentUser && (
              <>
                <button
                  className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-300 rounded-lg p-2 ease-in-out hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  onClick={() => setModal(true)}
                  title="Logout"
                >
                  <LogoutIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Link
                  to="/profile"
                  className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full transition-transform duration-300 hover:scale-105"
                >
                  <img
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-slate-800 hover:ring-indigo-500 dark:hover:ring-indigo-500 transition-all duration-300"
                    src={currentUser.photoURL}
                    alt="Profile"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
