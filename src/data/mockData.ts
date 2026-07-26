import { UserProfile, Subject, StudyTask, Exam, Note, FlashcardDeck, QuizResult, WeeklyStudyLog } from "../types";

export const initialUser: UserProfile = {
  id: "u101",
  name: "Alex Rivera",
  email: "alex.rivera@student.edu",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  dailyGoalHours: 4,
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split("T")[0],
  targetExam: "Midterm Semester Finals",
  targetExamDate: new Date(Date.now() + 12 * 86400000).toISOString().split("T")[0],
};

export const initialSubjects: Subject[] = [
  { id: "sub-1", name: "Computer Science", color: "#2563eb", icon: "Code", progressPercent: 78 },
  { id: "sub-2", name: "Biology & Genetics", color: "#059669", icon: "Dna", progressPercent: 62 },
  { id: "sub-3", name: "Organic Chemistry", color: "#7c3aed", icon: "FlaskConical", progressPercent: 45 },
  { id: "sub-4", name: "Calculus & Linear Algebra", color: "#ea580c", icon: "Calculator", progressPercent: 88 },
  { id: "sub-5", name: "World History", color: "#0891b2", icon: "Globe", progressPercent: 50 },
];

export const initialTasks: StudyTask[] = [
  {
    id: "task-1",
    title: "Review Data Structures: Binary Search Trees & Heaps",
    subjectId: "sub-1",
    subjectName: "Computer Science",
    deadline: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    estimatedMinutes: 60,
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    title: "Summarize DNA Replication & Cell Division Notes",
    subjectId: "sub-2",
    subjectName: "Biology & Genetics",
    deadline: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
    estimatedMinutes: 45,
    completed: true,
    priority: "Medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-3",
    title: "Complete Quiz on Reaction Mechanisms",
    subjectId: "sub-3",
    subjectName: "Organic Chemistry",
    deadline: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    estimatedMinutes: 30,
    completed: false,
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-4",
    title: "Solve Derivatives & Integration Practice Set #4",
    subjectId: "sub-4",
    subjectName: "Calculus & Linear Algebra",
    deadline: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0],
    estimatedMinutes: 90,
    completed: true,
    priority: "Medium",
    createdAt: new Date().toISOString(),
  },
];

export const initialExams: Exam[] = [
  {
    id: "ex-1",
    title: "CS201 Data Structures Midterm",
    subjectName: "Computer Science",
    date: new Date(Date.now() + 5 * 86400000).toISOString(),
    location: "Hall B, Science Complex",
  },
  {
    id: "ex-2",
    title: "Organic Chemistry Midterm Exam",
    subjectName: "Organic Chemistry",
    date: new Date(Date.now() + 9 * 86400000).toISOString(),
    location: "Chemistry Lab 302",
  },
  {
    id: "ex-3",
    title: "Calculus III Comprehensive Assessment",
    subjectName: "Calculus & Linear Algebra",
    date: new Date(Date.now() + 14 * 86400000).toISOString(),
    location: "Auditorium A",
  },
];

export const initialNotes: Note[] = [
  {
    id: "note-1",
    title: "Binary Trees & Heap Invariants",
    content: `## Binary Search Trees (BST)
A binary tree where for every node:
- Left subtree contains only nodes with keys **less** than the node's key.
- Right subtree contains only nodes with keys **greater** than the node's key.

### Time Complexities
- Search: O(log n) average, O(n) worst case
- Insertion: O(log n) average, O(n) worst case
- Deletion: O(log n) average

### Max-Heap Property
In a Max-Heap, the key at root must be maximum among all keys present in Binary Heap.
Parent node is always >= child nodes.`,
    subjectName: "Computer Science",
    tags: ["Data Structures", "Trees", "Algorithms"],
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "note-2",
    title: "Cellular Respiration & ATP Cycle",
    content: `## Phases of Cellular Respiration
1. **Glycolysis**: Breakdown of glucose into 2 pyruvate molecules in cytoplasm. Yields net 2 ATP + 2 NADH.
2. **Pyruvate Oxidation & Krebs Cycle**: Occurs in mitochondrial matrix. Produces CO2, GTP/ATP, NADH, and FADH2.
3. **Electron Transport Chain (ETC) & Oxidative Phosphorylation**: Occurs in inner mitochondrial membrane. Yields ~28-32 ATP molecules.

### Key Takeaway
Total yield per glucose molecule is approximately **30-32 ATP**.`,
    subjectName: "Biology & Genetics",
    tags: ["Biology", "Metabolism", "ATP"],
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "note-3",
    title: "Nucleophilic Substitution (SN1 vs SN2)",
    content: `## SN1 vs SN2 Reactions
### SN1 Mechanism
- Two-step process forming a carbocation intermediate.
- First order kinetics: Rate = k[Substrate].
- Favors tertiary carbocations, polar protic solvents.
- Racemization of stereochemistry.

### SN2 Mechanism
- One-step concerted mechanism.
- Second order kinetics: Rate = k[Substrate][Nucleophile].
- Favors primary substrates, polar aprotic solvents.
- Inversion of stereochemistry (Walden Inversion).`,
    subjectName: "Organic Chemistry",
    tags: ["Chemistry", "Mechanisms", "Reactions"],
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export const initialDecks: FlashcardDeck[] = [
  {
    id: "deck-1",
    title: "CS Data Structures Core Flashcards",
    createdAt: new Date().toISOString(),
    cards: [
      { id: "fc-1", front: "What is the average time complexity of BST lookup?", back: "O(log n)", tag: "CS", learned: true },
      { id: "fc-2", front: "What is the main difference between Stack and Queue?", back: "Stack is LIFO (Last In First Out); Queue is FIFO (First In First Out).", tag: "CS", learned: true },
      { id: "fc-3", front: "What is a balanced binary tree?", back: "A tree where the height difference between left and right subtrees for any node is at most 1 (e.g. AVL, Red-Black).", tag: "CS", learned: false },
    ],
  },
  {
    id: "deck-2",
    title: "Biology Enzymes & ATP",
    createdAt: new Date().toISOString(),
    cards: [
      { id: "fc-4", front: "Where does glycolysis occur in the cell?", back: "In the cytoplasm.", tag: "Biology", learned: true },
      { id: "fc-5", front: "How many net ATP are produced during glycolysis?", back: "Net 2 ATP molecules.", tag: "Biology", learned: false },
    ],
  },
];

export const initialQuizResults: QuizResult[] = [
  {
    id: "qres-1",
    topic: "Binary Trees & Algorithm Analysis",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    difficulty: "Medium",
  },
  {
    id: "qres-2",
    topic: "Cellular Respiration & Enzymes",
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    difficulty: "Easy",
  },
  {
    id: "qres-3",
    topic: "Organic Chemistry Mechanisms",
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
    score: 3,
    totalQuestions: 5,
    percentage: 60,
    difficulty: "Hard",
  },
];

export const initialWeeklyLogs: WeeklyStudyLog[] = [
  { day: "Mon", hours: 3.2, tasksCompleted: 4 },
  { day: "Tue", hours: 4.5, tasksCompleted: 5 },
  { day: "Wed", hours: 2.8, tasksCompleted: 3 },
  { day: "Thu", hours: 5.0, tasksCompleted: 6 },
  { day: "Fri", hours: 4.1, tasksCompleted: 4 },
  { day: "Sat", hours: 3.5, tasksCompleted: 3 },
  { day: "Sun", hours: 2.0, tasksCompleted: 2 },
];
