import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit3,
  BrainCircuit,
  Sparkles,
  Layers,
  RotateCw,
  Check,
  Tag,
  X,
  FileText,
  Loader2,
} from "lucide-react";
import { Note, FlashcardDeck } from "../../types";

export const NotesPage: React.FC = () => {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    subjects,
    flashcardDecks,
    addFlashcardDeck,
    toggleCardLearned,
    setCurrentPage,
  } = useApp();

  const [tab, setTab] = useState<"notes" | "flashcards">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  // Note editor modal state
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteSubject, setNoteSubject] = useState(subjects[0]?.name || "General");
  const [noteTags, setNoteTags] = useState("");

  // Flashcards deck active view
  const [activeDeck, setActiveDeck] = useState<FlashcardDeck | null>(flashcardDecks[0] || null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const openNewNoteModal = () => {
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
    setNoteSubject(subjects[0]?.name || "General");
    setNoteTags("");
    setShowEditor(true);
  };

  const openEditNoteModal = (note: Note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteSubject(note.subjectName);
    setNoteTags(note.tags.join(", "));
    setShowEditor(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteContent) return;

    const tagsArr = noteTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingNote) {
      updateNote(editingNote.id, noteTitle, noteContent, noteSubject, tagsArr);
    } else {
      addNote(noteTitle, noteContent, noteSubject, tagsArr);
    }

    setShowEditor(false);
  };

  const handleConvertNoteToFlashcards = async (note: Note) => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: note.title, text: note.content, count: 6 }),
      });
      const data = await res.json();
      setAiLoading(false);

      if (data.flashcards && data.flashcards.length > 0) {
        addFlashcardDeck(`Flashcards: ${note.title}`, data.flashcards);
        setTab("flashcards");
        setActiveDeck(flashcardDecks[0]);
      }
    } catch (e) {
      setAiLoading(false);
      alert("Failed to generate flashcards.");
    }
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSubject = subjectFilter === "All" || n.subjectName === subjectFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-2xl shadow-md shadow-purple-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Study Notes & Active Recall Flashcards
            </h1>
            <p className="text-xs text-slate-500">
              Create, organize, search, and auto-convert notes into flashcards decks
            </p>
          </div>
        </div>

        <button
          onClick={openNewNoteModal}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Note
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setTab("notes")}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            tab === "notes"
              ? "border-purple-600 text-purple-600 dark:text-purple-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" /> Class Notes ({notes.length})
        </button>
        <button
          onClick={() => setTab("flashcards")}
          className={`px-5 py-3 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${
            tab === "flashcards"
              ? "border-purple-600 text-purple-600 dark:text-purple-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" /> Flashcard Decks ({flashcardDecks.length})
        </button>
      </div>

      {/* NOTES TAB */}
      {tab === "notes" && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100/80 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search note titles or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="All">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold text-[10px] rounded-md border border-purple-200/50 dark:border-purple-800">
                      {note.subjectName}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditNoteModal(note)}
                        className="p-1 text-slate-400 hover:text-purple-600 rounded-md"
                        title="Edit Note"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                        title="Delete Note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-4 leading-relaxed font-normal whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleConvertNoteToFlashcards(note)}
                    disabled={aiLoading}
                    className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BrainCircuit className="w-3.5 h-3.5" />}
                    <span>Convert to AI Flashcards</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLASHCARDS TAB */}
      {tab === "flashcards" && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Deck selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {flashcardDecks.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setActiveDeck(d);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  activeDeck?.id === d.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                }`}
              >
                {d.title} ({d.cards.length} cards)
              </button>
            ))}
          </div>

          {activeDeck && activeDeck.cards.length > 0 ? (
            <div className="space-y-4">
              {/* Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-72 bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-slate-800/80 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-xl p-8 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Card {cardIndex + 1} of {activeDeck.cards.length}</span>
                  <span className="px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full font-bold">
                    {isFlipped ? "Answer / Explanation" : "Front Question"}
                  </span>
                </div>

                <div className="text-center py-6">
                  <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    {isFlipped ? activeDeck.cards[cardIndex].back : activeDeck.cards[cardIndex].front}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click card to flip ({isFlipped ? "Show Question" : "Show Answer"})</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button
                  disabled={cardIndex === 0}
                  onClick={() => {
                    setCardIndex((prev) => Math.max(0, prev - 1));
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                >
                  Previous Card
                </button>

                <button
                  onClick={() => toggleCardLearned(activeDeck.id, activeDeck.cards[cardIndex].id)}
                  className={`px-4 py-2 font-bold text-xs rounded-xl flex items-center gap-1.5 ${
                    activeDeck.cards[cardIndex].learned
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {activeDeck.cards[cardIndex].learned ? "Learned ✓" : "Mark as Learned"}
                </button>

                <button
                  disabled={cardIndex === activeDeck.cards.length - 1}
                  onClick={() => {
                    setCardIndex((prev) => Math.min(activeDeck.cards.length - 1, prev + 1));
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Next Card
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
              <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Flashcard Deck Selected</p>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingNote ? "Edit Study Note" : "Create New Study Note"}
              </h3>
              <button onClick={() => setShowEditor(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Binary Search Trees & Invariants"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={noteSubject}
                    onChange={(e) => setNoteSubject(e.target.value)}
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
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CS, Midterm, Trees"
                    value={noteTags}
                    onChange={(e) => setNoteTags(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Content / Notes
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Type or paste your study notes..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
