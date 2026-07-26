import React from "react";
import { useApp } from "../../context/AppContext";
import { PageView } from "../../types";
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  BrainCircuit,
  BookOpen,
  TrendingUp,
  Settings,
  X,
  Zap,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: PageView;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { currentPage, setCurrentPage, user, tasks } = useApp();

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      id: "planner",
      label: "Study Planner",
      icon: CalendarCheck,
      badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : undefined,
      badgeColor: "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300",
    },
    {
      id: "assistant",
      label: "AI Study Assistant",
      icon: Sparkles,
      badge: "AI 3.6",
      badgeColor: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold",
    },
    { id: "quiz", label: "Quiz Generator", icon: BrainCircuit },
    { id: "notes", label: "Notes & Flashcards", icon: BookOpen },
    { id: "progress", label: "Progress & Streak", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavClick = (id: PageView) => {
    setCurrentPage(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="space-y-6">
        {/* User Card inside Sidebar on Mobile */}
        {user && (
          <div className="bg-purple-50/70 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-purple-100/80 dark:border-slate-700/50 flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold truncate">
                Goal: {user.dailyGoalHours}h / day
              </p>
            </div>
          </div>
        )}

        <nav className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-purple-50/80 dark:hover:bg-slate-800/80 hover:text-purple-700 dark:hover:text-purple-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-purple-600"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive ? "bg-white/20 text-white" : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo / Daily Tip Box */}
      <div className="mt-auto pt-4">
        <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white p-4 rounded-2xl shadow-lg shadow-purple-600/15 relative overflow-hidden">
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-white/10 rounded-full blur-xl" />
          <div className="flex items-center gap-2 mb-1.5 text-purple-100 font-semibold text-xs">
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Study Tip of the Day</span>
          </div>
          <p className="text-[11px] text-purple-50 leading-relaxed font-normal">
            "Use the 25/5 Pomodoro method with active recall flashcards to boost memory retention by 80%."
          </p>
          <button
            onClick={() => handleNavClick("assistant")}
            className="mt-3 w-full py-1.5 bg-white text-purple-700 hover:bg-purple-50 rounded-xl font-bold text-xs transition-colors shadow-sm"
          >
            Ask AI Buddy
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 min-h-[calc(100vh-4rem)] shrink-0 transition-colors">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Navigation
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
