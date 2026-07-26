import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Sparkles,
  Send,
  FileText,
  HelpCircle,
  Zap,
  BookOpen,
  BrainCircuit,
  Bot,
  User,
  Loader2,
  Trash2,
  Copy,
  Check,
  PlusCircle,
  Lightbulb,
} from "lucide-react";

export const AiAssistantPage: React.FC = () => {
  const { chats, addChatMessage, clearChats, subjects, addFlashcardDeck, setCurrentPage } = useApp();

  const [inputMsg, setInputMsg] = useState("");
  const [selectedMode, setSelectedMode] = useState<"question" | "explain" | "summary" | "revision-tips">("question");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || "General");
  const [pastedText, setPastedText] = useState("");
  const [showTextModal, setShowTextModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, loading]);

  const handleSendMessage = async (customPrompt?: string, modeOverride?: any) => {
    const textToSend = customPrompt || inputMsg || pastedText;
    if (!textToSend.trim() || loading) return;

    const modeToUse = modeOverride || selectedMode;

    // Add user message to state
    addChatMessage({
      sender: "user",
      text: textToSend,
      mode: modeToUse,
      subject: selectedSubject,
    });

    setInputMsg("");
    setPastedText("");
    setShowTextModal(false);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chats.slice(-6),
          mode: modeToUse,
          subject: selectedSubject,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.text) {
        addChatMessage({
          sender: "ai",
          text: data.text,
          mode: modeToUse,
          subject: selectedSubject,
        });
      } else {
        addChatMessage({
          sender: "ai",
          text: "I couldn't complete the response. Please check your query or try again!",
        });
      }
    } catch (err: any) {
      setLoading(false);
      addChatMessage({
        sender: "ai",
        text: "Sorry, I ran into an error generating a response. Please check your connection or API configuration.",
      });
    }
  };

  const handleQuickFlashcardGen = async () => {
    const topicText = inputMsg || pastedText || selectedSubject;
    if (!topicText) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicText, count: 5 }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.flashcards && data.flashcards.length > 0) {
        addFlashcardDeck(`AI Flashcards: ${topicText.slice(0, 30)}...`, data.flashcards);
        addChatMessage({
          sender: "ai",
          text: `🎉 I've generated **${data.flashcards.length} Flashcards** on "${topicText.slice(0, 40)}" and saved them directly to your **Notes & Flashcards** section! You can review and test yourself anytime.`,
        });
      }
    } catch (e) {
      setLoading(false);
      addChatMessage({
        sender: "ai",
        text: "Failed to generate flashcard deck automatically. Try typing a specific topic or notes content.",
      });
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 pb-12 min-h-[calc(100vh-6rem)] flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              AI Study Assistant
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 rounded-full text-[10px] font-bold border border-purple-200/50 dark:border-purple-800">
                Gemini 2.5 Flash
              </span>
            </h1>
            <p className="text-xs text-slate-500">Ask questions, explain concepts, generate flashcards & revision tips</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={clearChats}
            className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Mode Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setSelectedMode("question")}
          className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
            selectedMode === "question"
              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <div>
            <div className="text-xs font-bold leading-tight">Ask Question</div>
            <div className={`text-[10px] ${selectedMode === "question" ? "text-purple-100" : "text-slate-400"}`}>
              Detailed study answer
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedMode("explain")}
          className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
            selectedMode === "explain"
              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <Lightbulb className="w-4 h-4 shrink-0" />
          <div>
            <div className="text-xs font-bold leading-tight">Explain Concept</div>
            <div className={`text-[10px] ${selectedMode === "explain" ? "text-purple-100" : "text-slate-400"}`}>
              ELI5 + Real examples
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedMode("summary")}
          className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
            selectedMode === "summary"
              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <div>
            <div className="text-xs font-bold leading-tight">Note Summary</div>
            <div className={`text-[10px] ${selectedMode === "summary" ? "text-purple-100" : "text-slate-400"}`}>
              Core takeaways & Qs
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedMode("revision-tips")}
          className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
            selectedMode === "revision-tips"
              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <div>
            <div className="text-xs font-bold leading-tight">Revision Tips</div>
            <div className={`text-[10px] ${selectedMode === "revision-tips" ? "text-purple-100" : "text-slate-400"}`}>
              Active recall strategies
            </div>
          </div>
        </button>
      </div>

      {/* Chat Conversation Area */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm p-4 sm:p-6 overflow-y-auto max-h-[500px] min-h-[350px] space-y-4">
        {chats.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === "user"
                  ? "bg-slate-800 dark:bg-slate-700 text-white"
                  : "bg-purple-600 text-white shadow-sm"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white font-medium rounded-tr-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/60 dark:border-slate-700/60"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {msg.sender === "ai" && (
                <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-purple-600 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-purple-100 dark:border-slate-700 max-w-md">
            <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
              AI Study Buddy is analyzing & crafting an educational response...
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-purple-100/80 dark:border-slate-800 p-3 shadow-sm space-y-2">
        <div className="flex items-center justify-between gap-2 px-1 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            Mode: <strong className="text-purple-600 uppercase font-bold">{selectedMode}</strong>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTextModal(true)}
              className="hover:text-purple-600 flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300"
            >
              <FileText className="w-3.5 h-3.5" /> Paste Long Notes
            </button>
            <button
              onClick={handleQuickFlashcardGen}
              className="hover:text-purple-600 flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400"
            >
              <BrainCircuit className="w-3.5 h-3.5" /> Auto Flashcards
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <textarea
            rows={2}
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Ask a question or paste text for ${selectedSubject}...`}
            className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500 resize-none"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMsg.trim() || loading}
            className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl shadow-md shadow-purple-500/20 transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Paste Long Notes Modal */}
      {showTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Paste Notes or Text for AI Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Paste your raw lecture notes or textbook excerpts below to summarize or generate revision cards.
            </p>

            <textarea
              rows={8}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste notes here..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTextModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendMessage(pastedText, "summary")}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Summarize Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
