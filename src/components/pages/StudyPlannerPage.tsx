import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  CalendarCheck,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  BookOpen,
  X,
  Filter,
  AlertCircle,
  Tag,
} from "lucide-react";

export const StudyPlannerPage: React.FC = () => {
  const {
    subjects,
    addSubject,
    deleteSubject,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    exams,
    addExam,
    deleteExam,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"tasks" | "subjects" | "exams">("tasks");
  const [filterSubject, setFilterSubject] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Completed">("All");

  // Modals
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [showSubjectModal, setShowSubjectModal] = useState<boolean>(false);
  const [showExamModal, setShowExamModal] = useState<boolean>(false);

  // Form states for new task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState(subjects[0]?.name || "General Study");
  const [taskDeadline, setTaskDeadline] = useState(new Date().toISOString().split("T")[0]);
  const [taskPriority, setTaskPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [taskMins, setTaskMins] = useState(45);

  // Form states for new subject
  const [subjectName, setSubjectName] = useState("");
  const [subjectColor, setSubjectColor] = useState("#8b5cf6");

  // Form states for new exam
  const [examTitle, setExamTitle] = useState("");
  const [examSubject, setExamSubject] = useState(subjects[0]?.name || "General Study");
  const [examDate, setExamDate] = useState(new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]);
  const [examLocation, setExamLocation] = useState("Main Examination Hall");

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    addTask(taskTitle, taskSubject, taskDeadline, taskPriority, taskMins);
    setTaskTitle("");
    setShowTaskModal(false);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName) return;
    addSubject(subjectName, subjectColor, "BookOpen");
    setSubjectName("");
    setShowSubjectModal(false);
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle) return;
    addExam(examTitle, examSubject, examDate, examLocation);
    setExamTitle("");
    setShowExamModal(false);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSubject = filterSubject === "All" || t.subjectName === filterSubject;
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Pending" && !t.completed) ||
      (filterStatus === "Completed" && t.completed);
    return matchesSubject && matchesStatus;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-2xl shadow-md shadow-purple-500/20">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Study Planner</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage subjects, study tasks, assignment deadlines, and exam dates
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowTaskModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Study Task
          </button>
          <button
            onClick={() => setShowSubjectModal(true)}
            className="px-3.5 py-2 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 border border-purple-200/60 dark:border-purple-800"
          >
            <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Add Subject
          </button>
        </div>
      </div>

      {/* Daily Progress Tracker Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Overall Task Completion</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {completedCount} of {tasks.length} tasks marked finished
            </p>
          </div>

          <div className="flex items-center gap-4 min-w-[240px]">
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 shrink-0">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "tasks"
              ? "border-purple-600 text-purple-600 dark:text-purple-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <CalendarCheck className="w-4 h-4" /> Study Tasks ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab("subjects")}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "subjects"
              ? "border-purple-600 text-purple-600 dark:text-purple-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" /> Subjects ({subjects.length})
        </button>
        <button
          onClick={() => setActiveTab("exams")}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "exams"
              ? "border-purple-600 text-purple-600 dark:text-purple-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <AlertCircle className="w-4 h-4 text-amber-500" /> Exam Schedule ({exams.length})
        </button>
      </div>

      {/* Tasks Tab View */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-semibold">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>Filter:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="All">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="flex bg-white dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
                {(["All", "Pending", "Completed"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                      filterStatus === st
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No study tasks found</p>
                <p className="text-xs text-slate-400 mt-1">Try changing your filter or add a new study task.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    task.completed
                      ? "bg-slate-50/80 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 opacity-65"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-600 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 mt-0.5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                        task.completed
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-slate-300 dark:border-slate-600 hover:border-purple-500"
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <div className="space-y-1 min-w-0">
                      <h3
                        className={`text-sm font-bold ${
                          task.completed
                            ? "line-through text-slate-400 dark:text-slate-500"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold rounded-md border border-purple-200/50 dark:border-purple-800">
                          {task.subjectName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.estimatedMinutes} mins
                        </span>
                        <span>•</span>
                        <span>Deadline: {task.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        task.priority === "High"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}
                    >
                      {task.priority} Priority
                    </span>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Subjects Tab View */}
      {activeTab === "subjects" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                      style={{ backgroundColor: sub.color }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <button
                      onClick={() => deleteSubject(sub.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{sub.name}</h3>
                  <p className="text-xs text-slate-500">
                    {tasks.filter((t) => t.subjectName === sub.name).length} linked study tasks
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">Subject Mastery</span>
                    <span className="text-blue-600 dark:text-blue-400">{sub.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${sub.progressPercent}%`, backgroundColor: sub.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exams Tab View */}
      {activeTab === "exams" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">Upcoming midterms and final examination schedules</p>
            <button
              onClick={() => setShowExamModal(true)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Exam
            </button>
          </div>

          <div className="space-y-3">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{ex.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {ex.subjectName} • {ex.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-300 font-bold text-xs rounded-xl border border-amber-200 dark:border-amber-900/50">
                    {ex.date}
                  </span>
                  <button
                    onClick={() => deleteExam(ex.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Study Task</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read Chapter 4 & solve exercise questions"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Est. Duration (Mins)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={taskMins}
                    onChange={(e) => setTaskMins(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Subject</h3>
              <button onClick={() => setShowSubjectModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Psychology 101"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Theme Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={subjectColor}
                    onChange={(e) => setSubjectColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0"
                  />
                  <span className="text-xs font-mono text-slate-500">{subjectColor}</span>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Exam Schedule</h3>
              <button onClick={() => setShowExamModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Exam Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Physics Midterm Exam"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={examSubject}
                  onChange={(e) => setExamSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Exam Date
                </label>
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location / Hall
                </label>
                <input
                  type="text"
                  placeholder="e.g. Auditorium 2"
                  value={examLocation}
                  onChange={(e) => setExamLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowExamModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
