import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Sparkles,
  CalendarCheck,
  BrainCircuit,
  Clock,
  Plus,
  Flame,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  MessageSquare,
  TrendingUp,
  PlusCircle,
} from "lucide-react";

export const DashboardPage: React.FC = () => {
  const {
    user,
    setCurrentPage,
    subjects,
    tasks,
    exams,
    chats,
    quizResults,
    toggleTask,
    updateUserGoal,
  } = useApp();

  const [studiedTodayHours, setStudiedTodayHours] = useState<number>(3.2);
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [newGoalHours, setNewGoalHours] = useState<number>(user?.dailyGoalHours || 4);

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  const handleSaveGoal = () => {
    updateUserGoal(newGoalHours);
    setShowGoalModal(false);
  };

  const handleAddStudyTime = (mins: number) => {
    setStudiedTodayHours((prev) => parseFloat((prev + mins / 60).toFixed(1)));
  };

  const targetHours = user?.dailyGoalHours || 4;
  const goalPercent = Math.min(Math.round((studiedTodayHours / targetHours) * 100), 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome & Streak Banner - Purple & White Theme */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-600/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-purple-100 mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Study Buddy Companion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "Student"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1.5 max-w-xl leading-relaxed">
              You're making incredible progress! You have <strong className="text-white font-bold">{pendingTasks.length} pending study tasks</strong> and an exam coming up in {exams.length > 0 ? "5 days" : "a week"}.
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold shadow-md">
              <Flame className="w-7 h-7 text-amber-900 fill-amber-900 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-extrabold leading-none">{user?.streakDays || 5} Days</div>
              <div className="text-[11px] text-purple-100 font-semibold mt-1">Active Study Streak 🔥</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Study Goal, Pending Tasks, Subjects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Study Goal Card with Soft Shadows */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-purple-100/80 dark:border-slate-800 shadow-sm shadow-purple-950/5 dark:shadow-none transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-2xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Today's Study Goal</h2>
                  <p className="text-xs text-slate-500">Track focus hours against daily targets</p>
                </div>
              </div>

              <button
                onClick={() => setShowGoalModal(true)}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Set Target Goal
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {studiedTodayHours} <span className="text-sm font-normal text-slate-500">/ {targetHours} hrs</span>
                </span>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-3 py-1 rounded-full border border-purple-200/60 dark:border-purple-800">
                  {goalPercent}% Completed
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${goalPercent}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <p className="text-xs text-slate-500 font-medium">Log focus session:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddStudyTime(15)}
                    className="px-3 py-1 bg-slate-100 hover:bg-purple-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-purple-600 text-xs font-semibold rounded-xl transition-colors"
                  >
                    +15 mins
                  </button>
                  <button
                    onClick={() => handleAddStudyTime(30)}
                    className="px-3 py-1 bg-slate-100 hover:bg-purple-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-purple-600 text-xs font-semibold rounded-xl transition-colors"
                  >
                    +30 mins
                  </button>
                  <button
                    onClick={() => handleAddStudyTime(60)}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                  >
                    +1 hour
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Tasks Quick Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-purple-100/80 dark:border-slate-800 shadow-sm shadow-purple-950/5 dark:shadow-none transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 rounded-2xl">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Today's Priority Tasks</h2>
                  <p className="text-xs text-slate-500">{pendingTasks.length} pending tasks remaining</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage("planner")}
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:gap-1.5 transition-all"
              >
                View Planner <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    task.completed
                      ? "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-purple-300 dark:hover:border-purple-500"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        task.completed
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-slate-300 dark:border-slate-600 hover:border-purple-500"
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold truncate ${
                          task.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                        <span className="font-bold text-purple-600 dark:text-purple-400">{task.subjectName}</span>
                        <span>•</span>
                        <span>{task.estimatedMinutes} mins</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                      task.priority === "High"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-purple-100/80 dark:border-slate-800 shadow-sm shadow-purple-950/5 dark:shadow-none transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 rounded-2xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">My Subjects</h2>
                  <p className="text-xs text-slate-500">{subjects.length} active courses enrolled</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage("planner")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/80 transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Add Subject
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {subjects.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setCurrentPage("notes")}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all cursor-pointer bg-slate-50/60 dark:bg-slate-800/40 group shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {s.name}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{s.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all"
                      style={{ width: `${s.progressPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Quick AI Launch Box */}
        <div className="space-y-6">
          {/* Quick AI Launch Box */}
          <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white rounded-3xl p-6 shadow-xl shadow-purple-600/20 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-purple-100 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Instant AI Helper</span>
            </div>
            <h3 className="text-xl font-extrabold mb-1.5">Need help studying?</h3>
            <p className="text-xs text-purple-100 leading-relaxed mb-5">
              Ask AI Study Buddy to explain difficult concepts, summarize notes, or test your memory with custom quizzes.
            </p>

            <div className="space-y-3">
              {/* Large Rounded Generate AI Quiz Button */}
              <button
                onClick={() => setCurrentPage("quiz")}
                className="w-full py-3.5 px-6 bg-white text-purple-900 hover:bg-purple-50 font-extrabold text-sm sm:text-base rounded-2xl sm:rounded-3xl shadow-lg transition-all flex items-center justify-center gap-2.5 group"
              >
                <BrainCircuit className="w-5 h-5 text-purple-600 group-hover:rotate-12 transition-transform" />
                <span>Generate AI Quiz</span>
              </button>

              <button
                onClick={() => setCurrentPage("assistant")}
                className="w-full py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                <MessageSquare className="w-4 h-4" /> Ask AI Study Assistant
              </button>
            </div>
          </div>

          {/* Upcoming Exams Countdown */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-100/80 dark:border-slate-800 shadow-sm shadow-purple-950/5 dark:shadow-none transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Upcoming Exams
              </h3>
              <button
                onClick={() => setCurrentPage("planner")}
                className="text-[11px] font-bold text-purple-600 hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {exams.map((ex) => {
                const daysDiff = Math.max(
                  0,
                  Math.ceil((new Date(ex.date).getTime() - Date.now()) / (1000 * 3600 * 24))
                );
                return (
                  <div
                    key={ex.id}
                    className="p-3 bg-amber-50/60 dark:bg-slate-800/60 rounded-2xl border border-amber-200/60 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ex.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{ex.location}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-[11px] rounded-xl">
                        {daysDiff === 0 ? "Today!" : `${daysDiff} Days`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-100/80 dark:border-slate-800 shadow-sm shadow-purple-950/5 dark:shadow-none transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" /> Overall Progress
              </h3>
              <button
                onClick={() => setCurrentPage("progress")}
                className="text-[11px] font-bold text-purple-600 hover:underline"
              >
                Analytics
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400">{completedTasksCount}</p>
                <p className="text-[10px] text-slate-500 font-semibold">Tasks Finished</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {quizResults.length > 0 ? `${Math.round(quizResults.reduce((a, b) => a + b.percentage, 0) / quizResults.length)}%` : "N/A"}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold">Avg Quiz Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Set Daily Study Goal
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              How many hours do you aim to study each day?
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Hours: {newGoalHours} hrs/day
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={newGoalHours}
                  onChange={(e) => setNewGoalHours(parseFloat(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGoal}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
