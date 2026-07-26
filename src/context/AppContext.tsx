import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PageView,
  UserProfile,
  Subject,
  StudyTask,
  Exam,
  Note,
  FlashcardDeck,
  QuizResult,
  ChatMessage,
  WeeklyStudyLog,
} from "../types";
import {
  initialUser,
  initialSubjects,
  initialTasks,
  initialExams,
  initialNotes,
  initialDecks,
  initialQuizResults,
  initialWeeklyLogs,
} from "../data/mockData";

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUserGoal: (hours: number, exam?: string, examDate?: string) => void;
  
  subjects: Subject[];
  addSubject: (name: string, color: string, icon: string) => void;
  deleteSubject: (id: string) => void;
  
  tasks: StudyTask[];
  addTask: (title: string, subjectName: string, deadline: string, priority: "Low" | "Medium" | "High", estimatedMinutes?: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  
  exams: Exam[];
  addExam: (title: string, subjectName: string, date: string, location?: string) => void;
  deleteExam: (id: string) => void;
  
  notes: Note[];
  addNote: (title: string, content: string, subjectName: string, tags: string[]) => Note;
  updateNote: (id: string, title: string, content: string, subjectName: string, tags: string[]) => void;
  deleteNote: (id: string) => void;
  
  flashcardDecks: FlashcardDeck[];
  addFlashcardDeck: (title: string, cards: { front: string; back: string; tag?: string }[]) => void;
  toggleCardLearned: (deckId: string, cardId: string) => void;
  
  quizResults: QuizResult[];
  saveQuizResult: (result: Omit<QuizResult, "id" | "date">) => void;
  
  chats: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChats: () => void;
  
  weeklyLogs: WeeklyStudyLog[];
  
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "aistudybuddy_app_data_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>("dashboard");
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [tasks, setTasks] = useState<StudyTask[]>(initialTasks);
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [flashcardDecks, setFlashcardDecks] = useState<FlashcardDeck[]>(initialDecks);
  const [quizResults, setQuizResults] = useState<QuizResult[]>(initialQuizResults);
  const [chats, setChats] = useState<ChatMessage[]>([
    {
      id: "c-init",
      sender: "ai",
      text: "Hello! I'm AI Study Buddy. Ask me any study question, paste your class notes for a instant summary, or ask for flashcards and quiz questions!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [weeklyLogs] = useState<WeeklyStudyLog[]>(initialWeeklyLogs);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user) setUser(parsed.user);
        if (parsed.subjects) setSubjects(parsed.subjects);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.exams) setExams(parsed.exams);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.flashcardDecks) setFlashcardDecks(parsed.flashcardDecks);
        if (parsed.quizResults) setQuizResults(parsed.quizResults);
        if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
        if (parsed.notificationsEnabled !== undefined) setNotificationsEnabled(parsed.notificationsEnabled);
      }
    } catch (e) {
      console.error("Failed to load local state:", e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          user,
          subjects,
          tasks,
          exams,
          notes,
          flashcardDecks,
          quizResults,
          darkMode,
          notificationsEnabled,
        })
      );
    } catch (e) {
      console.error("Failed to save local state:", e);
    }
  }, [user, subjects, tasks, exams, notes, flashcardDecks, quizResults, darkMode, notificationsEnabled]);

  // Handle dark mode html class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: "u_" + Date.now(),
      name: name || email.split("@")[0] || "Student",
      email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      dailyGoalHours: 4,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    setCurrentPage("dashboard");
  };

  const logout = () => {
    setUser(null);
    setCurrentPage("landing");
  };

  const updateUserGoal = (hours: number, exam?: string, examDate?: string) => {
    if (!user) return;
    setUser({
      ...user,
      dailyGoalHours: hours,
      targetExam: exam || user.targetExam,
      targetExamDate: examDate || user.targetExamDate,
    });
  };

  const addSubject = (name: string, color: string, icon: string) => {
    const newSubject: Subject = {
      id: "sub-" + Date.now(),
      name,
      color: color || "#2563eb",
      icon: icon || "BookOpen",
      progressPercent: 0,
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const addTask = (
    title: string,
    subjectName: string,
    deadline: string,
    priority: "Low" | "Medium" | "High",
    estimatedMinutes = 45
  ) => {
    const sub = subjects.find((s) => s.name === subjectName);
    const newTask: StudyTask = {
      id: "task-" + Date.now(),
      title,
      subjectId: sub ? sub.id : "sub-general",
      subjectName: subjectName || "General Study",
      deadline: deadline || new Date().toISOString().split("T")[0],
      estimatedMinutes,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addExam = (title: string, subjectName: string, date: string, location?: string) => {
    const newExam: Exam = {
      id: "ex-" + Date.now(),
      title,
      subjectName,
      date,
      location: location || "Campus Hall",
    };
    setExams((prev) => [...prev, newExam].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const addNote = (title: string, content: string, subjectName: string, tags: string[]): Note => {
    const newNote: Note = {
      id: "note-" + Date.now(),
      title,
      content,
      subjectName: subjectName || "General",
      tags: tags.length > 0 ? tags : ["Study Notes"],
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id: string, title: string, content: string, subjectName: string, tags: string[]) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              title,
              content,
              subjectName,
              tags,
              updatedAt: new Date().toISOString(),
            }
          : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const addFlashcardDeck = (title: string, cards: { front: string; back: string; tag?: string }[]) => {
    const newDeck: FlashcardDeck = {
      id: "deck-" + Date.now(),
      title,
      createdAt: new Date().toISOString(),
      cards: cards.map((c, i) => ({
        id: `fc-${Date.now()}-${i}`,
        front: c.front,
        back: c.back,
        tag: c.tag || "AI Generated",
        learned: false,
      })),
    };
    setFlashcardDecks((prev) => [newDeck, ...prev]);
  };

  const toggleCardLearned = (deckId: string, cardId: string) => {
    setFlashcardDecks((prev) =>
      prev.map((d) =>
        d.id === deckId
          ? {
              ...d,
              cards: d.cards.map((c) => (c.id === cardId ? { ...c, learned: !c.learned } : c)),
            }
          : d
      )
    );
  };

  const saveQuizResult = (result: Omit<QuizResult, "id" | "date">) => {
    const newRes: QuizResult = {
      ...result,
      id: "qres-" + Date.now(),
      date: new Date().toISOString(),
    };
    setQuizResults((prev) => [newRes, ...prev]);
  };

  const addChatMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: "chat-" + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChats((prev) => [...prev, newMsg]);
  };

  const clearChats = () => {
    setChats([
      {
        id: "c-init-cleared",
        sender: "ai",
        text: "Chat context cleared! How can I help you study next?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        user,
        login,
        logout,
        updateUserGoal,
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
        notes,
        addNote,
        updateNote,
        deleteNote,
        flashcardDecks,
        addFlashcardDeck,
        toggleCardLearned,
        quizResults,
        saveQuizResult,
        chats,
        addChatMessage,
        clearChats,
        weeklyLogs,
        darkMode,
        setDarkMode,
        notificationsEnabled,
        setNotificationsEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
