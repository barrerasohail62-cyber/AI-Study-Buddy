import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Brain,
  Sparkles,
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
  Search,
  Menu,
} from "lucide-react";

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const { currentPage, setCurrentPage, user, logout, darkMode, setDarkMode } = useApp();

  if (currentPage === "landing") {
    return (
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-purple-100/80 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage("landing")}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-0.5">
                <img src="/src/assets/images/ai_brain_vector_logo_1785055747329.jpg" alt="AI Study Buddy Logo" className="w-full h-full object-contain rounded-xl" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Study Buddy</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-bold px-2.5 py-0.5 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800">v2.0 AI</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-purple-600/20"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCurrentPage("auth")}
                  className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-semibold text-sm px-3 py-2 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentPage("auth")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-purple-600/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-purple-100/80 dark:border-slate-800 transition-colors px-4 lg:px-8 h-16 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => setCurrentPage("dashboard")}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-0.5">
              <img src="/src/assets/images/ai_brain_vector_logo_1785055747329.jpg" alt="AI Study Buddy Logo" className="w-full h-full object-contain rounded-xl" referrerPolicy="no-referrer" />
            </div>
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
            AI Study Buddy
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 max-w-xs w-full">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes, subjects, AI assistant..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCurrentPage("notes");
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setCurrentPage("settings")}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        {user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage("settings")}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium leading-tight">
                  🔥 {user.streakDays} Day Streak
                </p>
              </div>
            </button>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCurrentPage("auth")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs rounded-xl shadow-sm transition-all"
          >
            <User className="w-3.5 h-3.5" />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
