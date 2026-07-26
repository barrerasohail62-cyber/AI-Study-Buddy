import React from "react";
import { useApp } from "../../context/AppContext";
import { motion } from "motion/react";
import {
  Brain,
  BrainCircuit,
  Sparkles,
  Calendar,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  Clock,
  MessageSquare,
  HelpCircle,
  PlayCircle,
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { setCurrentPage, user } = useApp();

  const features = [
    {
      icon: Sparkles,
      title: "AI Study Assistant",
      description: "Ask complex study questions, get ELI5 breakdowns, paste notes for concise summaries, and receive instant explanations.",
      color: "bg-purple-600",
    },
    {
      icon: BrainCircuit,
      title: "Smart Quiz Generator",
      description: "Instantly create practice tests with multiple-choice questions, detailed explanations, and scoring on any subject.",
      color: "bg-indigo-600",
    },
    {
      icon: Calendar,
      title: "Interactive Study Planner",
      description: "Organize subjects, track assignment deadlines, set exam countdowns, and build daily study habits with automated goals.",
      color: "bg-purple-700",
    },
    {
      icon: BookOpen,
      title: "Smart Notes & Flashcards",
      description: "Draft class notes, auto-convert them into active recall flashcards with flip animations, and organize by subject tags.",
      color: "bg-violet-600",
    },
    {
      icon: TrendingUp,
      title: "Streak & Progress Analytics",
      description: "Track study streaks, completed tasks, weekly study time charts, and subject mastery percentages.",
      color: "bg-indigo-700",
    },
    {
      icon: Zap,
      title: "Revision & Memory Tips",
      description: "Receive AI-crafted active recall strategies, spaced repetition advice, and targeted exam prep suggestions.",
      color: "bg-purple-800",
    },
  ];

  const testimonials = [
    {
      quote: "AI Study Buddy transformed how I prep for Organic Chemistry. I generated 50 flashcards and practice quizzes from my notes in seconds!",
      name: "Sophia Chen",
      role: "Pre-Med Student, Stanford",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
      quote: "The AI quiz generator is a game changer. It explains why an answer is right or wrong, helping me score an A in Calculus.",
      name: "Marcus Vance",
      role: "Engineering Undergraduate, MIT",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white py-3.5 px-4 text-center border-b border-purple-500/20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-1.5 font-bold bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> New Release
          </span>
          <span>👋 Welcome to <strong>AI Study Buddy</strong> — Learn 3x Faster with AI Quizzes, Notes & Planners!</span>
          <button
            onClick={() => setCurrentPage(user ? "dashboard" : "auth")}
            className="underline hover:text-purple-100 font-bold ml-1 flex items-center gap-1 shrink-0"
          >
            {user ? "Open Dashboard" : "Get Started Now"} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-white dark:bg-slate-950">
        {/* Soft Purple Ambient Radial Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-purple-400/20 dark:bg-purple-600/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Brain Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/90 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 text-xs font-bold mb-6 border border-purple-200/80 dark:border-purple-800 shadow-xs">
              <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Next-Gen AI Learning Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
              Study Smarter, Ace Exams, and <span className="text-purple-600 dark:text-purple-400">Master Anything</span> with AI
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              AI Study Buddy organizes your learning in one place — generate practice quizzes, summarize notes, build active-recall flashcards, and track your study goal daily.
            </p>

            {/* Featured Hero CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <button
                onClick={() => setCurrentPage("quiz")}
                className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group ring-2 ring-purple-500/20"
              >
                <BrainCircuit className="w-6 h-6 text-purple-200 group-hover:scale-110 transition-transform" />
                <span>Generate AI Quiz</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentPage(user ? "dashboard" : "auth")}
                className="w-full sm:w-auto px-7 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:bg-purple-50/50 dark:hover:bg-slate-700/80 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{user ? "My Dashboard" : "Get Started Free"}</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Free to use
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Instant MCQ Practice
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> 100% Student-focused
              </span>
            </div>
          </motion.div>

          {/* App Preview Card with Soft Shadows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 max-w-5xl mx-auto rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-7 border border-purple-100/80 dark:border-slate-800 shadow-2xl shadow-purple-900/10 dark:shadow-none relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-purple-400" />
                <span className="ml-2 text-xs text-slate-400 font-mono">aistudybuddy.app/dashboard</span>
              </div>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-200/60 dark:border-purple-800">
                Purple Theme Active
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Card 1 */}
              <div className="bg-purple-50/70 dark:bg-slate-800/80 p-5 rounded-2xl border border-purple-100 dark:border-slate-700 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-300">Today's Study Goal</span>
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">3.5 / 4.0 hrs</p>
                <div className="w-full bg-purple-200/80 dark:bg-slate-700 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-purple-600 h-full w-[88%] rounded-full" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-indigo-50/70 dark:bg-slate-800/80 p-5 rounded-2xl border border-indigo-100 dark:border-slate-700 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">Active Streak</span>
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">5 Days 🔥</p>
                <p className="text-[11px] text-slate-500 mt-1">Keep it up! 2 tasks remaining for today.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-violet-50/70 dark:bg-slate-800/80 p-5 rounded-2xl border border-violet-100 dark:border-slate-700 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-violet-900 dark:text-violet-300">Quiz Mastery Score</span>
                  <BrainCircuit className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">92% Average</p>
                <p className="text-[11px] text-slate-500 mt-1">Highest: CS201 Data Structures (100%)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid with Soft Shadow Cards */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-purple-100/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Comprehensive Tools</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Everything You Need to Succeed in One App
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Designed specifically for high school and university students to eliminate study stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-purple-100/90 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500/50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center mb-4 shadow-md shadow-purple-500/10 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Large Featured CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mx-auto mb-6 border border-white/20">
            <BrainCircuit className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Test Your Knowledge with AI?
          </h2>
          <p className="text-purple-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Generate custom multiple-choice quizzes on any topic or subject in under 5 seconds with detailed answer explanations.
          </p>

          <button
            onClick={() => setCurrentPage("quiz")}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-purple-900 hover:bg-purple-50 font-extrabold text-lg rounded-2xl sm:rounded-3xl shadow-2xl hover:scale-105 transition-all group"
          >
            <BrainCircuit className="w-6 h-6 text-purple-600 group-hover:rotate-12 transition-transform" />
            <span>Generate AI Quiz Now</span>
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Student Approved</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
              Loved by 50,000+ Students Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-100/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 p-0.5 shadow-md shadow-purple-500/20 overflow-hidden">
              <div className="w-full h-full bg-white rounded-[10px] overflow-hidden p-0.5 flex items-center justify-center">
                <img src="/src/assets/images/ai_brain_vector_logo_1785055747329.jpg" alt="AI Study Buddy Logo" className="w-full h-full object-contain rounded-md" referrerPolicy="no-referrer" />
              </div>
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base">AI Study Buddy</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AI Study Buddy. Helping students learn smarter with Gemini AI.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <button onClick={() => setCurrentPage("assistant")} className="hover:text-purple-600">AI Assistant</button>
            <button onClick={() => setCurrentPage("quiz")} className="hover:text-purple-600">Quiz Generator</button>
            <button onClick={() => setCurrentPage("planner")} className="hover:text-purple-600">Study Planner</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
