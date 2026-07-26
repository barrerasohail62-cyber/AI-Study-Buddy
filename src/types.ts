export type PageView = 
  | "landing" 
  | "auth" 
  | "dashboard" 
  | "planner" 
  | "assistant" 
  | "quiz" 
  | "notes" 
  | "progress" 
  | "settings";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dailyGoalHours: number;
  streakDays: number;
  lastActiveDate: string;
  targetExam?: string;
  targetExamDate?: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string; // hex or tailwind color name
  icon: string;
  progressPercent: number;
}

export interface StudyTask {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  deadline: string; // ISO date
  estimatedMinutes: number;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  createdAt: string;
}

export interface Exam {
  id: string;
  title: string;
  subjectName: string;
  date: string; // ISO date string
  location?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subjectName: string;
  tags: string[];
  updatedAt: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subjectName?: string;
  tag?: string;
  learned?: boolean;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  cards: Flashcard[];
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  topic: string;
  date: string;
  score: number; // e.g. 4
  totalQuestions: number; // e.g. 5
  percentage: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  mode?: "question" | "explain" | "summary" | "revision-tips";
  subject?: string;
  followUps?: string[];
}

export interface WeeklyStudyLog {
  day: string;
  hours: number;
  tasksCompleted: number;
}
