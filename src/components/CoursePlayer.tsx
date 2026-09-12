import React, { useState, useMemo } from 'react';
import { Course, Module, Lesson } from '../types';
import { YouTubePlayer } from './YouTubePlayer';
import { parseYouTubePlaylist, parseYouTubeUrl } from '../utils/youtube';
import { 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Award, 
  ArrowLeft, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Radio,
  ListVideo,
  Film,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';

interface CoursePlayerProps {
  course: Course;
  onBackToCatalog: () => void;
  onOpenQuiz: (lesson: Lesson, moduleIndex: number, lessonIndex: number) => void;
  onOpenCertificate: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course,
  onBackToCatalog,
  onOpenQuiz,
  onOpenCertificate,
}) => {
  // Parse playlist data if attached
  const parsedPlaylist = parseYouTubePlaylist(course.playlistUrl);
  const hasPlaylist = parsedPlaylist.isValid && !!parsedPlaylist.playlistId;

  // Toggle between single lesson player and full playlist series player
  const [isPlaylistView, setIsPlaylistView] = useState<boolean>(false);

  // Find first unpassed lesson, or default to first lesson
  const findInitialLesson = () => {
    for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
      for (let lIdx = 0; lIdx < course.modules[mIdx].lessons.length; lIdx++) {
        if (!course.modules[mIdx].lessons[lIdx].passed) {
          return { moduleIndex: mIdx, lessonIndex: lIdx };
        }
      }
    }
    return { moduleIndex: 0, lessonIndex: 0 };
  };

  const initial = useMemo(() => findInitialLesson(), [course.id]);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(initial.moduleIndex);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(initial.lessonIndex);
  const [openAccordion, setOpenAccordion] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  // Calculate overall stats
  const { totalLessons, passedLessons, isCourseComplete } = useMemo(() => {
    let total = 0;
    let passed = 0;
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        total++;
        if (l.passed) passed++;
      });
    });
    return {
      totalLessons: total,
      passedLessons: passed,
      isCourseComplete: total > 0 && passed === total,
    };
  }, [course]);

  const progressPercentage = totalLessons > 0 ? Math.round((passedLessons / totalLessons) * 100) : 0;

  // Current active lesson
  const currentModule = course.modules[activeModuleIndex] || course.modules[0];
  const currentLesson = currentModule?.lessons[activeLessonIndex] || currentModule?.lessons[0];

  // Determine if a specific lesson is unlocked:
  // A lesson is unlocked if it is the first lesson of the first module,
  // OR if the lesson immediately preceding it in linear sequence has been passed!
  const isLessonUnlocked = (modIdx: number, lesIdx: number): boolean => {
    if (modIdx === 0 && lesIdx === 0) return true;

    // If within same module, check previous lesson in same module
    if (lesIdx > 0) {
      return !!course.modules[modIdx].lessons[lesIdx - 1]?.passed;
    }

    // If first lesson of subsequent module, check the last lesson of preceding module
    if (modIdx > 0) {
      const prevModule = course.modules[modIdx - 1];
      const lastLessonOfPrevModule = prevModule?.lessons[prevModule.lessons.length - 1];
      return !!lastLessonOfPrevModule?.passed;
    }

    return false;
  };

  const handleSelectLesson = (mIdx: number, lIdx: number) => {
    if (!isLessonUnlocked(mIdx, lIdx)) {
      alert("🔒 Lesson Locked: LEARN WITH FLOW enforces an 80% passing grade on the preceding lesson's assessment before advancing.");
      return;
    }
    setActiveModuleIndex(mIdx);
    setActiveLessonIndex(lIdx);
    setIsPlaylistView(false); // When user picks a lesson, focus on that lesson
  };

  // Find next lesson in linear order
  const getNextLessonCoords = () => {
    if (activeLessonIndex + 1 < currentModule.lessons.length) {
      return { mIdx: activeModuleIndex, lIdx: activeLessonIndex + 1 };
    }
    if (activeModuleIndex + 1 < course.modules.length) {
      return { mIdx: activeModuleIndex + 1, lIdx: 0 };
    }
    return null;
  };

  const nextCoords = getNextLessonCoords();
  const isNextAvailable = nextCoords && isLessonUnlocked(nextCoords.mIdx, nextCoords.lIdx);

  // Find previous lesson in linear order
  const getPrevLessonCoords = () => {
    if (activeLessonIndex > 0) {
      return { mIdx: activeModuleIndex, lIdx: activeLessonIndex - 1 };
    }
    if (activeModuleIndex > 0) {
      const prevMod = course.modules[activeModuleIndex - 1];
      return { mIdx: activeModuleIndex - 1, lIdx: prevMod.lessons.length - 1 };
    }
    return null;
  };
  const prevCoords = getPrevLessonCoords();

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToCatalog}
            className="p-2 rounded-lg text-slate-600 hover:text-[#0056D2] hover:bg-blue-50 border border-slate-200 transition shrink-0"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{course.category}</span>
              <span>›</span>
              <span className="font-semibold text-slate-700 truncate">{course.title}</span>
              {hasPlaylist && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-[#0056D2] border border-blue-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <ListVideo className="w-3 h-3 text-[#0056D2]" />
                  Playlist Connected
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight truncate">
              {currentLesson?.title || course.title}
            </h2>
          </div>
        </div>

        {/* Certificate Quick Status & Playlist Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {hasPlaylist && (
            <button
              type="button"
              onClick={() => setIsPlaylistView((prev) => !prev)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition flex items-center gap-1.5 ${
                isPlaylistView
                  ? 'bg-blue-50 text-[#0056D2] border-blue-300'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <ListVideo className="w-3.5 h-3.5 text-[#0056D2]" />
              <span className="hidden sm:inline">
                {isPlaylistView ? 'Individual Lesson Mode' : 'YouTube Playlist Mode'}
              </span>
            </button>
          )}

          {isCourseComplete ? (
            <button
              onClick={onOpenCertificate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition animate-pulse"
            >
              <Award className="w-4 h-4" />
              <span>Claim Certificate</span>
            </button>
          ) : (
            <button
              onClick={onOpenCertificate}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
              title="Preview official Coursera-style certificate format"
            >
              <Award className="w-3.5 h-3.5 text-[#0056D2]" />
              <span>Preview Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Player Area (2 cols) & Syllabus Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Advanced YouTube Video Player & Connectivity Engine */}
          <YouTubePlayer
            urlOrId={currentLesson?.videoUrl}
            playlistUrl={course.playlistUrl}
            playlistId={parsedPlaylist.playlistId}
            title={currentLesson?.title || course.title}
            autoplay={false}
            duration={currentLesson?.duration}
            moduleTitle={currentModule?.title}
            quizPassed={currentLesson?.passed}
            quizScore={currentLesson?.score}
            isPlaylistView={isPlaylistView}
            onTogglePlaylistView={hasPlaylist ? () => setIsPlaylistView((prev) => !prev) : undefined}
            onFinishLessonAndStartQuiz={() => {
              if (currentLesson) {
                onOpenQuiz(currentLesson, activeModuleIndex, activeLessonIndex);
              }
            }}
          />

          {/* Lesson Notes & Syllabus Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-[#0056D2] uppercase tracking-wider">
                  {currentModule?.title}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {currentLesson?.title}
                </h2>
              </div>
              <div className="text-right text-xs text-slate-500">
                <span>Instructor: <strong className="text-slate-800">{course.instructorName || course.instructor}</strong></span>
                <div className="text-[11px] text-slate-400">{course.instructorRole || 'CEO & Founder, LEARN WITH FLOW'}</div>
              </div>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                Welcome to this technical session of <strong>{course.title}</strong>. Follow the practical code demonstrations, examine error traces, and prepare for the 5-question conceptual logic evaluation at the close of the video.
              </p>

              {hasPlaylist && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <ListVideo className="w-4 h-4 text-[#0056D2]" />
                    <span className="font-semibold text-slate-800">
                      Synchronized YouTube Playlist:
                    </span>
                    <code className="text-slate-600 bg-slate-200/80 px-1.5 py-0.5 rounded font-mono text-[11px]">
                      {parsedPlaylist.playlistId}
                    </code>
                  </div>
                  <a
                    href={parsedPlaylist.canonicalUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0056D2] hover:underline font-semibold flex items-center gap-1 text-xs shrink-0"
                  >
                    <span>View on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-[#0056D2] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Academic Gate Rules (Founder's Standard):
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Minimum passing threshold is strictly <strong>80% (4 out of 5 questions)</strong>.</li>
                  <li>Instant grading and full conceptual explanations are provided on completion.</li>
                  <li>Unlimited retakes are permitted until mastery is demonstrated.</li>
                  <li>100% course completion unlocks an official, verifiable Coursera-style certificate signed by CEO Muhammad Talha.</li>
                </ul>
              </div>
            </div>

            {/* Navigation Buttons: Previous / Next */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => prevCoords && handleSelectLesson(prevCoords.mIdx, prevCoords.lIdx)}
                disabled={!prevCoords}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Previous Lesson
              </button>

              <button
                onClick={() => nextCoords && handleSelectLesson(nextCoords.mIdx, nextCoords.lIdx)}
                disabled={!isNextAvailable}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  isNextAvailable
                    ? 'bg-[#0056D2] hover:bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
                title={!currentLesson?.passed ? "Pass current lesson's 5-question quiz with 80%+ to unlock" : "Advance to next lesson"}
              >
                {!isNextAvailable && !currentLesson?.passed && <Lock className="w-3.5 h-3.5" />}
                <span>Next Lesson →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Dynamic Playlist Sidebar & Syllabus Progress Gating */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Course Completion</h3>
              <span className={`text-xs font-extrabold ${isCourseComplete ? 'text-emerald-600' : 'text-[#0056D2]'}`}>
                {progressPercentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isCourseComplete ? 'bg-emerald-500' : 'bg-[#0056D2]'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{passedLessons} of {totalLessons} lessons passed</span>
              <span>Passing: 80% Threshold</span>
            </div>

            {/* Certificate Unlock Banner */}
            {isCourseComplete ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>All Quizzes Passed!</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Congratulations! You have satisfied all assessment criteria. Your official Coursera-style certificate is ready.
                </p>
                <button
                  onClick={onOpenCertificate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-lg transition shadow-xs"
                >
                  View Official Certificate
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-600">
                  Pass all {totalLessons} quizzes with 80%+ to unlock your verifiable certificate.
                </div>
                <button
                  onClick={onOpenCertificate}
                  className="shrink-0 text-[11px] font-bold text-[#0056D2] hover:underline"
                >
                  Preview
                </button>
              </div>
            )}
          </div>

          {/* Dynamic Playlist & Syllabus Modules Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                {hasPlaylist ? (
                  <ListVideo className="w-4 h-4 text-[#0056D2]" />
                ) : (
                  <Layers className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">
                    {hasPlaylist ? 'Dynamic Playlist Sidebar' : 'Course Syllabus'}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {hasPlaylist ? 'Select video item to load stream' : 'Step-by-step curriculum'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-medium bg-white px-2 py-0.5 rounded border border-slate-200">
                {totalLessons} {totalLessons === 1 ? 'video' : 'videos'}
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
              {course.modules.map((module, mIdx) => {
                const isOpen = openAccordion[mIdx] ?? true;
                return (
                  <div key={module.id} className="text-xs">
                    {/* Module Header Toggle */}
                    <button
                      onClick={() => setOpenAccordion((prev) => ({ ...prev, [mIdx]: !isOpen }))}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition bg-slate-50/30"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 block text-xs">
                          {module.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                        </span>
                      </div>
                      <div className="text-slate-400">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Module Lessons List */}
                    {isOpen && (
                      <div className="bg-slate-50/50 px-3 pb-3 space-y-1.5 pt-1">
                        {module.lessons.map((lesson, lIdx) => {
                          const isCurrent = activeModuleIndex === mIdx && activeLessonIndex === lIdx;
                          const unlocked = isLessonUnlocked(mIdx, lIdx);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => handleSelectLesson(mIdx, lIdx)}
                              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                                isCurrent
                                  ? 'bg-blue-50/90 border-[#0056D2] ring-1 ring-[#0056D2]/30 shadow-xs'
                                  : unlocked
                                  ? 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:shadow-xs'
                                  : 'bg-slate-100/60 border-slate-200/60 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                {isCurrent ? (
                                  <div className="w-5 h-5 rounded-full bg-[#0056D2] text-white flex items-center justify-center shrink-0 animate-pulse">
                                    <Radio className="w-3 h-3" />
                                  </div>
                                ) : lesson.passed ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                ) : unlocked ? (
                                  <PlayCircle className="w-5 h-5 text-slate-400 shrink-0" />
                                ) : (
                                  <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                                )}
                                <div className="truncate">
                                  <span className={`font-semibold block truncate leading-tight ${isCurrent ? 'text-[#0056D2]' : 'text-slate-900'}`}>
                                    {lesson.title}
                                  </span>
                                  <span className="text-[10px] text-slate-500">
                                    {lesson.duration || '20 min'}
                                  </span>
                                </div>
                              </div>

                              {/* Progress Badges: Watching, Completed (80%+), or Locked */}
                              <div className="shrink-0 flex items-center gap-1.5">
                                {isCurrent ? (
                                  <span className="text-[10px] bg-[#0056D2] text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                    Watching
                                  </span>
                                ) : lesson.passed ? (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    {lesson.score ?? 100}%
                                  </span>
                                ) : unlocked ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectLesson(mIdx, lIdx);
                                    }}
                                    className="text-[10px] bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0056D2] border border-slate-200 px-2 py-0.5 rounded-full font-medium transition"
                                  >
                                    Play Video
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-slate-400 bg-slate-200/80 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                    <Lock className="w-2.5 h-2.5" />
                                    Locked
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
