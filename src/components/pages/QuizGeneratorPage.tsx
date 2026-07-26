import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import confetti from "canvas-confetti";
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Loader2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { QuizQuestion } from "../../types";

export const QuizGeneratorPage: React.FC = () => {
  const { subjects, saveQuizResult, setCurrentPage } = useApp();

  const [topic, setTopic] = useState("Binary Trees & Data Structures");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Quiz state
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState<"setup" | "taking" | "results">("setup");

  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, count: questionCount }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentQIndex(0);
        setUserAnswers({});
        setCurrentStep("taking");
      } else {
        alert("Could not generate quiz. Please check topic or try again!");
      }
    } catch (err) {
      setLoading(false);
      alert("Failed to connect to AI quiz server.");
    }
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = Math.round((score / questions.length) * 100);

    saveQuizResult({
      topic,
      score,
      totalQuestions: questions.length,
      percentage,
      difficulty,
    });

    if (percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    setCurrentStep("results");
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-2xl shadow-md shadow-purple-500/20">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Quiz Generator</h1>
            <p className="text-xs text-slate-500">
              Create instant multiple-choice practice tests with explanations on any topic
            </p>
          </div>
        </div>

        {currentStep !== "setup" && (
          <button
            onClick={() => setCurrentStep("setup")}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4 text-purple-600" /> Create New Quiz
          </button>
        )}
      </div>

      {/* SETUP STEP */}
      {currentStep === "setup" && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-purple-100 dark:border-slate-800 shadow-md">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 mx-auto flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Customize Your Practice Test</h2>
            <p className="text-xs text-slate-500 mt-1">
              Specify your subject topic, difficulty, and question count
            </p>
          </div>

          <form onSubmit={handleGenerateQuiz} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                What would you like to practice today?
              </label>
              <input
                type="text"
                required
                placeholder="What would you like to practice today?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Quick Subject Suggestion
              </label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setTopic(s.name)}
                    className="px-3 py-1 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-xl transition-colors border border-purple-200/60 dark:border-purple-800"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Easy", "Medium", "Hard"] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        difficulty === diff
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Number of Questions: {questionCount}
                </label>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full accent-purple-600 mt-2"
                />
              </div>
            </div>

            {/* Large Rounded Generate AI Quiz Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating AI Quiz Questions...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-6 h-6 text-purple-200 group-hover:scale-110 transition-transform" />
                  <span>Generate AI Quiz Now</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAKING QUIZ STEP */}
      {currentStep === "taking" && questions.length > 0 && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Question {currentQIndex + 1} of {questions.length}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-md">{topic}</h3>
            </div>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-extrabold text-xs rounded-full border border-purple-200/60 dark:border-purple-800">
              {difficulty}
            </span>
          </div>

          {/* Current Question Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-purple-100/80 dark:border-slate-800 shadow-md space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {questions[currentQIndex].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQIndex].options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQIndex, optIdx)}
                    className={`w-full p-4 text-left rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-600 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-purple-400"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full font-extrabold text-xs flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-white text-purple-600" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Previous
              </button>

              {currentQIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQIndex((prev) => prev + 1)}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/20"
                >
                  Submit & Score Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS STEP */}
      {currentStep === "results" && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Score Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white p-8 rounded-3xl shadow-xl text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-amber-300 shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold">Quiz Score Summary</h2>
            <p className="text-3xl sm:text-4xl font-extrabold">
              {calculateScore()} / {questions.length} Correct
            </p>
            <p className="text-sm text-purple-100">
              Score: {Math.round((calculateScore() / questions.length) * 100)}% • Saved to Progress History!
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setCurrentStep("setup")}
                className="px-5 py-2.5 bg-white text-purple-900 font-bold text-xs rounded-xl shadow-md hover:bg-purple-50"
              >
                Take Another Quiz
              </button>
              <button
                onClick={() => setCurrentPage("progress")}
                className="px-5 py-2.5 bg-white/10 border border-white/20 text-white font-semibold text-xs rounded-xl hover:bg-white/20"
              >
                View Analytics
              </button>
            </div>
          </div>

          {/* Answer Review Section */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Detailed Answer Review</h3>

            {questions.map((q, qIdx) => {
              const uAns = userAnswers[qIdx];
              const isCorrect = uAns === q.correctAnswer;
              return (
                <div
                  key={qIdx}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isCorrect
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/50"
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {qIdx + 1}. {q.question}
                    </h4>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-600 shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl font-medium ${
                          oIdx === q.correctAnswer
                            ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold"
                            : oIdx === uAns
                            ? "bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                        {oIdx === q.correctAnswer && " ✓ (Correct Answer)"}
                      </div>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
                    <strong className="text-purple-600 dark:text-purple-400">Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
