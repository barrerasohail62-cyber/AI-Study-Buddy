import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Settings as SettingsIcon,
  User,
  Moon,
  Sun,
  Bell,
  Check,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

export const SettingsPage: React.FC = () => {
  const {
    user,
    updateUserGoal,
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useApp();

  const [name, setName] = useState(user?.name || "Alex Rivera");
  const [email, setEmail] = useState(user?.email || "alex.rivera@student.edu");
  const [dailyGoalHours, setDailyGoalHours] = useState(user?.dailyGoalHours || 4);
  const [targetExam, setTargetExam] = useState(user?.targetExam || "Midterm Semester Finals");
  const [targetExamDate, setTargetExamDate] = useState(user?.targetExamDate || "2026-08-10");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserGoal(dailyGoalHours, targetExam, targetExamDate);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm flex items-center gap-3 transition-colors">
        <div className="p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-2xl shadow-md shadow-purple-500/20">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Account & App Settings
          </h1>
          <p className="text-xs text-slate-500">
            Customize student profile, daily study targets, theme preferences, and notifications
          </p>
        </div>
      </div>

      {/* Profile & Target Goals Settings */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" /> Student Profile & Target Goals
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Study Goal (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                step="0.5"
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(parseFloat(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Major Exam
              </label>
              <input
                type="text"
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                placeholder="e.g. Finals / SAT / MCAT"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Exam Date
              </label>
              <input
                type="date"
                value={targetExamDate}
                onChange={(e) => setTargetExamDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Settings
            </button>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Settings saved successfully! ✓
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Preferences Settings */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" /> Preferences
        </h2>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-xs text-slate-700 dark:text-slate-200">
                {darkMode ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Theme Mode</p>
                <p className="text-[11px] text-slate-500">Easier on the eyes during late night study sessions</p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                darkMode ? "bg-purple-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-xs text-slate-700 dark:text-slate-200">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Daily Study Reminders</p>
                <p className="text-[11px] text-slate-500">Receive streak alerts and upcoming exam countdowns</p>
              </div>
            </div>

            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors p-1 relative ${
                notificationsEnabled ? "bg-purple-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  notificationsEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
