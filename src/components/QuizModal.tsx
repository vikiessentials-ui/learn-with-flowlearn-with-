import React, { useState } from 'react';
import { Lesson, QuizQuestion } from '../types';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle,
  Award
} from 'lucide-react';

interface QuizModalProps {
  lesson: Lesson;
  moduleIndex: number;
  lessonIndex: number;
  onClose: () => void;
  onPassQuiz: (moduleIndex: number, lessonIndex: number, score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  lesson,
  moduleIndex,
  lessonIndex,
  onClose,
  onPassQuiz,
}) => {
  const questions: QuizQuestion[] = lesson.quiz && lesson.quiz.length === 5 
    ? lesson.quiz 
    : [
        {
          id: 1,
          question: "What is the primary architectural principle demonstrated in this lesson?",
          options: ["Separation of concerns and modular abstraction", "Tightly coupling data and views", "Ignoring runtime error traces", "Disabling type validation"],
          correctAnswer: 0,
          explanation: "Separation of concerns allows clean isolation of business logic, state management, and view components."
        },
        {
          id: 2,
          question: "How does the system ensure idempotent, high-concurrency state transitions?",
          options: ["Through deterministic state reducers and immutable data structures", "By directly mutating memory pointers", "By terminating the browser thread", "By generating random IDs on every click"],
          correctAnswer: 0,
          explanation: "Deterministic state transitions and immutable updates prevent race conditions and unintended side-effects."
        },
        {
          id: 3,
          question: "What is the computational complexity of looking up a unique hash key?",
          options: ["O(1) average constant time", "O(n) linear scanning time", "O(n^2) quadratic time", "O(log n) logarithmic search"],
          correctAnswer: 0,
          explanation: "Hash lookups provide constant-time O(1) performance on average."
        },
        {
          id: 4,
          question: "Why does LEARN WITH FLOW enforce an 80% passing threshold on assessments?",
          options: ["To ensure deep conceptual mastery before advancing to subsequent complex modules", "To arbitrarily restrict student progress", "To require commercial textbook purchases", "To limit server bandwidth"],
          correctAnswer: 0,
          explanation: "Founder & CEO Muhammad Talha established the 80% gate to ensure learners genuinely understand core mechanics before building upon them."
        },
        {
          id: 5,
          question: "What defense mechanism prevents malicious script injection into client DOM trees?",
          options: ["Context-aware output encoding and strict Content Security Policies (CSP)", "Using inline script tags everywhere", "Disabling HTTPS encryption", "Storing cleartext secrets in client cookies"],
          correctAnswer: 0,
          explanation: "Sanitizing untrusted input and enforcing strict Content Security Policies neutralizes cross-site scripting (XSS) vectors."
        }
      ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scorePercent, setScorePercent] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllAnswered) {
      alert("Please answer all 5 questions before submitting your assessment.");
      return;
    }

    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    setCorrectCount(correct);
    setScorePercent(percent);
    setIsSubmitted(true);

    if (percent >= 80) {
      onPassQuiz(moduleIndex, lessonIndex, percent);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScorePercent(null);
    setCorrectCount(0);
  };

  const isPassed = scorePercent !== null && scorePercent >= 80;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#0056D2] text-white p-5 flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                Lesson Assessment
              </span>
              <span className="text-xs text-blue-100 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 80% Threshold Required
              </span>
            </div>
            <h2 className="text-lg font-bold leading-tight">
              {lesson.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Close quiz modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Result Banner when submitted */}
          {isSubmitted && scorePercent !== null && (
            <div
              className={`p-5 rounded-xl border ${
                isPassed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {isPassed ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base">
                      {isPassed ? '🎉 Assessment Passed — Gate Unlocked!' : '⚠️ Passing Threshold Not Met'}
                    </h3>
                    <span
                      className={`text-sm font-black px-3 py-1 rounded-full ${
                        isPassed
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      Score: {scorePercent}% ({correctCount}/5)
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed mt-1">
                    {isPassed ? (
                      <>
                        Exceptional work! You achieved <strong>{scorePercent}%</strong> (surpassing the mandatory 80% threshold). This lesson is now marked as passed, and subsequent curriculum modules have been unlocked.
                      </>
                    ) : (
                      <>
                        Under CEO Muhammad Talha's mastery standard, students must achieve at least <strong>80% (4 of 5 correct)</strong> to unlock subsequent videos. You scored {scorePercent}%. Review the answer explanations below and retake the test.
                      </>
                    )}
                  </p>

                  <div className="flex items-center gap-3 pt-3">
                    {isPassed ? (
                      <button
                        onClick={onClose}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-xs"
                      >
                        <span>Continue Curriculum</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleRetake}
                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Assessment Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form with Questions */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q, qIdx) => {
              const studentAnswer = selectedAnswers[qIdx];
              const isCorrect = isSubmitted && studentAnswer === q.correctAnswer;
              const isIncorrect = isSubmitted && studentAnswer !== q.correctAnswer;

              return (
                <div
                  key={q.id || qIdx}
                  className={`p-4 rounded-xl border transition ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {/* Status Badge */}
                    {isSubmitted && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Options List */}
                  <div className="space-y-2 pl-8">
                    {q.options.map((option, optIdx) => {
                      const isSelected = studentAnswer === optIdx;
                      const isTheCorrectOption = q.correctAnswer === optIdx;

                      let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                      if (isSubmitted) {
                        if (isTheCorrectOption) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                        } else if (isSelected && !isTheCorrectOption) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                        } else {
                          optionStyle = 'border-slate-200 bg-white text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-[#0056D2] bg-blue-50/70 text-[#0056D2] font-semibold ring-1 ring-[#0056D2]';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full p-3 rounded-lg border text-left text-xs transition flex items-center justify-between ${optionStyle} ${
                            !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-bold">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{option}</span>
                          </div>
                          {isSubmitted && isTheCorrectOption && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Conceptual Explanation */}
                  {isSubmitted && (
                    <div className="mt-3 pl-8">
                      <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/60 text-xs text-slate-700">
                        <span className="font-bold text-[#0056D2] block mb-0.5">
                          Conceptual Logic & Explanation:
                        </span>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                {!isSubmitted ? (
                  <span>
                    Answered: <strong className="text-slate-800">{answeredCount} of 5</strong>
                  </span>
                ) : (
                  <span>
                    Threshold: <strong className="text-slate-800">80% (4/5)</strong> • Your Score: <strong className={isPassed ? 'text-emerald-600' : 'text-rose-600'}>{scorePercent}%</strong>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  {isSubmitted ? 'Close' : 'Cancel'}
                </button>

                {!isSubmitted ? (
                  <button
                    type="submit"
                    disabled={!isAllAnswered}
                    className="px-6 py-2.5 bg-[#0056D2] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-lg transition shadow-md flex items-center gap-1.5"
                  >
                    <span>Submit for Immediate Grading</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : !isPassed ? (
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition shadow-md flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition shadow-md flex items-center gap-1.5"
                  >
                    <span>Continue Next Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
