/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  HelpCircle,
  Trophy,
  GraduationCap,
  MousePointer2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONCEPTS, type ConceptBlank, type ConceptSection } from './constants';
import { cn } from './lib/utils';

const Graph = ({ type, a }: { type: 'exp' | 'log', a: 'greater' | 'less' }) => {
  const isExp = type === 'exp';
  const isGreater = a === 'greater';

  // SVG paths for graphs
  let path = "";
  if (isExp) {
    // y = a^x
    path = isGreater 
      ? "M 10 90 Q 50 85 90 10" // Increasing
      : "M 10 10 Q 50 85 90 90"; // Decreasing
  } else {
    // y = log_a(x)
    path = isGreater
      ? "M 10 90 Q 15 50 90 10" // Increasing
      : "M 10 10 Q 15 50 90 90"; // Decreasing
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-stone-50 rounded-2xl border border-stone-200">
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
        {isExp ? 'y = aˣ' : 'y = logₐx'} ({isGreater ? 'a > 1' : '0 < a < 1'})
      </span>
      <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
        {/* Axes */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="#d1d5db" strokeWidth="1" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#d1d5db" strokeWidth="1" />
        {/* Graph Path */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={path}
          fill="none"
          stroke={isGreater ? "#10b981" : "#f59e0b"}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Key Point */}
        <circle 
          cx={isExp ? 50 : 60} 
          cy={isExp ? 40 : 50} 
          r="3" 
          fill="#1f2937" 
        />
      </svg>
    </div>
  );
};

export default function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null);

  const currentSection = CONCEPTS[currentSectionIndex];

  const sectionBlanks = useMemo(() => {
    return currentSection.content.filter(
      (item): item is ConceptBlank => typeof item !== 'string'
    );
  }, [currentSection]);

  const isSectionComplete = useMemo(() => {
    return sectionBlanks.every(
      (blank) => userAnswers[blank.id]?.trim() === blank.answer
    );
  }, [sectionBlanks, userAnswers]);

  useEffect(() => {
    if (isSectionComplete && !completedSections.has(currentSection.id)) {
      setCompletedSections((prev) => new Set([...prev, currentSection.id]));
      if (currentSectionIndex === CONCEPTS.length - 1) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f59e0b']
        });
      }
    }
  }, [isSectionComplete, currentSection.id, currentSectionIndex, completedSections]);

  const handleInputChange = (id: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleHint = (id: string) => {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextSection = () => {
    if (currentSectionIndex < CONCEPTS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setActiveBlankId(null);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      setActiveBlankId(null);
    }
  };

  const resetApp = () => {
    setCurrentSectionIndex(0);
    setUserAnswers({});
    setShowHints({});
    setCompletedSections(new Set());
    setIsFinished(false);
    setActiveBlankId(null);
  };

  const progress = (completedSections.size / CONCEPTS.length) * 100;

  // Handle click outside to close options
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (activeBlankId && !target.closest('.blank-container')) {
        setActiveBlankId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeBlankId]);

  if (isFinished) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-6 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-stone-900">학습 완료! 전체 요약</h1>
            <p className="text-stone-600 max-w-lg mx-auto">
              모든 개념을 완벽하게 정리했습니다. 아래 요약본을 확인하고 복습해보세요.
            </p>
            <button
              onClick={resetApp}
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              다시 학습하기
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONCEPTS.map((section) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6"
              >
                <h3 className="text-xl font-bold text-stone-900 border-bottom border-stone-100 pb-4">
                  {section.title}
                </h3>
                <div className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">
                  {section.content.map((item, idx) => {
                    if (typeof item === 'string') return item;
                    return (
                      <span key={idx} className="font-bold text-emerald-600 bg-emerald-50 px-1 rounded mx-0.5">
                        {item.answer}
                      </span>
                    );
                  })}
                </div>
                
                {/* Graphs in Summary */}
                {(section.id === 'exp-functions' || section.id === 'log-functions') && (
                  <div className="flex justify-center gap-4 pt-4 border-top border-stone-50">
                    <Graph type={section.id === 'exp-functions' ? 'exp' : 'log'} a="greater" />
                    <Graph type={section.id === 'exp-functions' ? 'exp' : 'log'} a="less" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-bottom border-stone-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">지수와 로그 마스터</h1>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Concept Summary</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Progress</span>
              <span className="text-sm font-mono font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-32 h-2 bg-stone-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Section Title */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Section {currentSectionIndex + 1}</span>
              <h2 className="text-4xl font-bold tracking-tight text-stone-900">{currentSection.title}</h2>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm leading-relaxed text-lg text-stone-700 relative">
              <div className="whitespace-pre-wrap">
                {currentSection.content.map((item, idx) => {
                  if (typeof item === 'string') {
                    return <span key={idx}>{item}</span>;
                  }

                  const isCorrect = userAnswers[item.id]?.trim() === item.answer;
                  const hasValue = userAnswers[item.id]?.length > 0;
                  const isActive = activeBlankId === item.id;

                  return (
                    <span key={item.id} className="inline-block mx-1 relative group blank-container">
                      {item.options ? (
                        <motion.button
                          animate={(!hasValue && !isActive) ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          onClick={() => !isCorrect && setActiveBlankId(isActive ? null : item.id)}
                          className={cn(
                            "px-4 py-1 rounded-lg border-2 transition-all duration-200 font-mono text-center min-w-[100px] flex items-center justify-center gap-2 relative",
                            isCorrect 
                              ? "bg-emerald-50 border-emerald-500 text-emerald-700 cursor-default" 
                              : isActive
                                ? "bg-stone-900 border-stone-900 text-white ring-4 ring-stone-100"
                                : hasValue 
                                  ? "bg-rose-50 border-rose-300 text-rose-700" 
                                  : "bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-white shadow-sm"
                          )}
                        >
                          <span className={cn(!hasValue && "text-stone-400 text-sm font-sans")}>
                            {userAnswers[item.id] || "선택하기"}
                          </span>
                          {!isCorrect && <MousePointer2 className={cn("w-3 h-3", isActive ? "text-white" : "text-stone-400")} />}
                        </motion.button>
                      ) : (
                        <input
                          type="text"
                          value={userAnswers[item.id] || ''}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                          placeholder="???"
                          className={cn(
                            "px-3 py-1 rounded-lg border-2 transition-all duration-200 outline-none font-mono text-center min-w-[80px]",
                            isCorrect 
                              ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                              : hasValue 
                                ? "bg-rose-50 border-rose-300 text-rose-700" 
                                : "bg-stone-50 border-stone-200 focus:border-stone-900 focus:bg-white"
                          )}
                          style={{ width: `${Math.max(item.answer.length + 2, 4)}ch` }}
                        />
                      )}

                      {/* Correct Badge */}
                      {isCorrect && (
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 z-10"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                        </motion.span>
                      )}

                      {/* Hint Trigger */}
                      {!isCorrect && item.hint && (
                        <button
                          onClick={() => toggleHint(item.id)}
                          className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-stone-400 uppercase tracking-tighter hover:text-stone-600"
                        >
                          Hint
                        </button>
                      )}

                      {/* Hint Tooltip */}
                      <AnimatePresence>
                        {showHints[item.id] && !isCorrect && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap"
                          >
                            {item.hint}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-bottom-stone-800" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Options Selector */}
                      <AnimatePresence>
                        {isActive && item.options && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute z-40 top-full mt-3 left-1/2 -translate-x-1/2 bg-white border border-stone-200 rounded-2xl shadow-2xl p-2 grid grid-cols-2 gap-2 min-w-[240px]"
                          >
                            {item.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  handleInputChange(item.id, option);
                                  setActiveBlankId(null);
                                }}
                                className={cn(
                                  "px-4 py-3 rounded-xl font-mono text-sm transition-all text-center",
                                  userAnswers[item.id] === option
                                    ? "bg-stone-900 text-white"
                                    : "bg-stone-50 hover:bg-stone-100 text-stone-700"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                  );
                })}
              </div>

              {/* Graphs in Active View */}
              {(currentSection.id === 'exp-functions' || currentSection.id === 'log-functions') && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10 flex flex-wrap justify-center gap-6 pt-8 border-top border-stone-100"
                >
                  <Graph type={currentSection.id === 'exp-functions' ? 'exp' : 'log'} a="greater" />
                  <Graph type={currentSection.id === 'exp-functions' ? 'exp' : 'log'} a="less" />
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8">
              <button
                onClick={prevSection}
                disabled={currentSectionIndex === 0}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all",
                  currentSectionIndex === 0 
                    ? "text-stone-300 cursor-not-allowed" 
                    : "text-stone-600 hover:bg-stone-200"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>

              <div className="flex items-center gap-2">
                {CONCEPTS.map((_, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      idx === currentSectionIndex ? "w-6 bg-stone-900" : "bg-stone-200"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextSection}
                disabled={!isSectionComplete}
                className={cn(
                  "flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-sm",
                  isSectionComplete 
                    ? "bg-stone-900 text-white hover:bg-stone-800 translate-y-0 active:translate-y-0.5" 
                    : "bg-stone-200 text-stone-400 cursor-not-allowed"
                )}
              >
                {currentSectionIndex === CONCEPTS.length - 1 ? "완료하기" : "다음 단계"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="max-w-3xl mx-auto px-6 py-12 border-top border-stone-200 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Study Guide</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              수식은 버튼을 눌러 올바른 보기를 선택하세요. 용어는 직접 입력하면 됩니다. 
              정답을 맞히면 초록색으로 변하며 다음 단계로 넘어갈 수 있습니다.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Need Help?</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed">
              지수와 로그는 고등 수학의 기초가 되는 중요한 단원입니다. 
              반복적인 학습을 통해 개념을 완벽히 이해하는 것이 중요합니다.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-top border-stone-100 text-center">
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
            &copy; 2026 지수와 로그 마스터 교육용 어플리케이션
          </p>
        </div>
      </footer>
    </div>
  );
}
