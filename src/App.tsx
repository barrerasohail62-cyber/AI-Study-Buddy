import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

import { LandingPage } from "./components/pages/LandingPage";
import { AuthPage } from "./components/pages/AuthPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { StudyPlannerPage } from "./components/pages/StudyPlannerPage";
import { AiAssistantPage } from "./components/pages/AiAssistantPage";
import { QuizGeneratorPage } from "./components/pages/QuizGeneratorPage";
import { NotesPage } from "./components/pages/NotesPage";
import { ProgressPage } from "./components/pages/ProgressPage";
import { SettingsPage } from "./components/pages/SettingsPage";

import { motion, AnimatePresence } from "motion/react";

const MainContent: React.FC = () => {
  const { currentPage } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Standalone full-width pages
  if (currentPage === "landing") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
        <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <LandingPage />
      </div>
    );
  }

  if (currentPage === "auth") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
        <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <AuthPage />
      </div>
    );
  }

  // Dashboard & App pages layout
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === "dashboard" && <DashboardPage />}
              {currentPage === "planner" && <StudyPlannerPage />}
              {currentPage === "assistant" && <AiAssistantPage />}
              {currentPage === "quiz" && <QuizGeneratorPage />}
              {currentPage === "notes" && <NotesPage />}
              {currentPage === "progress" && <ProgressPage />}
              {currentPage === "settings" && <SettingsPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
