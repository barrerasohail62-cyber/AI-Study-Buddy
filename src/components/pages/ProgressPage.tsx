import React from "react";
import { useApp } from "../../context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Flame,
  CheckCircle2,
  BrainCircuit,
  Award,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";

export const ProgressPage: React.FC = () => {
  const { user, tasks, quizResults, weeklyLogs, subjects } = useApp();

  const completedTasks = tasks.filter((t) => t.completed).length;
  const avgScore =
    quizResults.length > 0
      ? Math.round(quizResults.reduce((acc, q) => acc + q.percentage, 0) / quizResults.length)
      : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-2xl shadow-md shadow-purple-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Study Progress & Analytics
            </h1>
            <p className="text-xs text-slate-500">
              Track weekly study time, quiz scores, active study streak, and task completions
            </p>
          </div>
        </div>
      </div>

      {/* Top Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center font-extrabold shrink-0">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {user?.streakDays || 5} Days
            </p>
            <p className="text-xs text-slate-500 font-medium">Active Study Streak 🔥</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-extrabold shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {completedTasks} / {tasks.length}
            </p>
            <p className="text-xs text-slate-500 font-medium">Tasks Completed</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center font-extrabold shrink-0">
            <BrainCircuit className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {avgScore}%
            </p>
            <p className="text-xs text-slate-500 font-medium">Avg Quiz Performance</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-extrabold shrink-0">
            <Clock className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              24.6 hrs
            </p>
            <p className="text-xs text-slate-500 font-medium">Total Focus Hours</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Weekly Study Hours Log</h2>
            <p className="text-xs text-slate-500">Daily focus breakdown across current week</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyLogs}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="hours" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Mastery Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Subject Mastery Progress</h2>
            <p className="text-xs text-slate-500">Completion index by course module</p>
          </div>

          <div className="space-y-4 pt-2">
            {subjects.map((sub) => (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{sub.name}</span>
                  <span className="text-purple-600 dark:text-purple-400">{sub.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sub.progressPercent}%`, backgroundColor: sub.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Scores History Table */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Quiz History Log</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">Topic / Subject</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Score</th>
                <th className="p-3">Percentage</th>
                <th className="p-3 rounded-r-xl">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {quizResults.map((q) => (
                <tr key={q.id}>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{q.topic}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 font-semibold rounded-md text-[10px]">
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{q.score} / {q.totalQuestions}</td>
                  <td className="p-3 font-bold text-purple-600 dark:text-purple-400">{q.percentage}%</td>
                  <td className="p-3 text-slate-400 text-[11px]">{new Date(q.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
