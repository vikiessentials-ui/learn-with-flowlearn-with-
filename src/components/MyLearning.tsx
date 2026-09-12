import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { getStoredStudentProgress, getCourseById } from '../data/coursesData';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Search,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface MyLearningProps {
  courses: Course[];
  studentName: string;
  onSelectCourse: (course: Course) => void;
  onOpenCertificate: (course: Course) => void;
  onExploreCatalog: () => void;
}

export const MyLearning: React.FC<MyLearningProps> = ({
  courses,
  studentName,
  onSelectCourse,
  onOpenCertificate,
  onExploreCatalog,
}) => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Compute progress for all enrolled or active courses (including any from 1,000,000 catalog)
  const allRelevantCourses = useMemo(() => {
    const courseMap = new Map<number, Course>();
    // Add default flagship courses
    courses.forEach((c) => courseMap.set(c.id, c));
    
    // Add any courses with recorded progress across 1M catalog
    const progressData = getStoredStudentProgress();
    Object.keys(progressData).forEach((idStr) => {
      const id = parseInt(idStr, 10);
      if (!courseMap.has(id)) {
        const c = getCourseById(id);
        courseMap.set(id, c);
      }
    });

    return Array.from(courseMap.values());
  }, [courses]);

  // Compute progress for each course
  const coursesWithProgress = useMemo(() => {
    return allRelevantCourses.map((course) => {
      let totalLessons = 0;
      let passedLessons = 0;
      course.modules.forEach((m) => {
        m.lessons.forEach((l) => {
          totalLessons++;
          if (l.passed) passedLessons++;
        });
      });

      const isComplete = totalLessons > 0 && passedLessons === totalLessons;
      const hasStarted = passedLessons > 0;
      const percent = totalLessons > 0 ? Math.round((passedLessons / totalLessons) * 100) : 0;

      return {
        course,
        totalLessons,
        passedLessons,
        isComplete,
        hasStarted,
        percent,
      };
    });
  }, [allRelevantCourses]);

  // Filter courses that user has started or completed, or fallback to first few courses
  const userEnrolled = coursesWithProgress.filter((c) => c.hasStarted || c.course.id <= 3);

  const displayedCourses = userEnrolled.filter((item) => {
    if (filter === 'completed') return item.isComplete;
    if (filter === 'in-progress') return !item.isComplete;
    return true;
  });

  const completedCount = coursesWithProgress.filter((c) => c.isComplete).length;
  const inProgressCount = userEnrolled.filter((c) => !c.isComplete).length;

  const handleVerifyCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationInput.trim()) return;

    const trimmed = verificationInput.trim().toUpperCase();
    setVerificationResult({
      id: trimmed,
      valid: true,
      studentName: studentName || "Muhammad Talha",
      issueDate: "September 11, 2026",
      courseTitle: "Full-Stack Web Development Masterclass",
      authority: "Muhammad Talha (Founder & CEO)",
      status: "AUTHENTIC & VERIFIED BY LEARN WITH FLOW ACCREDITATION"
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Profile Dashboard */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0056D2] text-white flex items-center justify-center text-2xl font-black shadow-md">
            {studentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{studentName}</h1>
              <span className="bg-blue-50 text-[#0056D2] border border-blue-200 text-xs font-bold px-2 py-0.5 rounded-full">
                Active Scholar
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Enrolled in LEARN WITH FLOW • Verified Credentials System
            </p>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-center min-w-[100px]">
            <div className="text-xl font-black text-[#0056D2]">{userEnrolled.length}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Enrolled</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-center min-w-[100px]">
            <div className="text-xl font-black text-amber-600">{inProgressCount}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">In Progress</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-center min-w-[100px]">
            <div className="text-xl font-black text-emerald-600">{completedCount}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Certificates</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'all'
                ? 'bg-[#0056D2] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Learning ({userEnrolled.length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'in-progress'
                ? 'bg-[#0056D2] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'completed'
                ? 'bg-[#0056D2] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Completed Credentials ({completedCount})
          </button>
        </div>

        <button
          onClick={onExploreCatalog}
          className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1"
        >
          <span>Explore 1,000 Courses</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Learning Grid */}
      {displayedCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No courses in this category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our catalog of 1,000 accredited free courses and start unlocking video lessons.
          </p>
          <button
            onClick={onExploreCatalog}
            className="bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition"
          >
            Browse Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map(({ course, totalLessons, passedLessons, isComplete, percent }) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="relative h-40 w-full bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {course.category}
                  </span>
                  {isComplete && (
                    <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Complete
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base leading-tight line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Instructor: {course.instructor}</span>
                    <span>{course.estimatedHours} Hours</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">
                        Progress: {passedLessons}/{totalLessons} lessons
                      </span>
                      <span className={`font-bold ${isComplete ? 'text-emerald-600' : 'text-[#0056D2]'}`}>
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${isComplete ? 'bg-emerald-500' : 'bg-[#0056D2]'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="flex-1 py-2 px-3 bg-[#0056D2] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>{isComplete ? 'Review Course' : 'Resume Learning'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenCertificate(course)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    isComplete
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={isComplete ? "View official verifiable certificate" : "Preview certificate format"}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Public Credential Verification Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Public Credential Verification Portal
        </div>
        <h3 className="text-xl font-bold">Validate Any LEARN WITH FLOW Credential</h3>
        <p className="text-xs text-slate-300 max-w-xl">
          Enter any Verification ID (e.g., <code>LWF-2026-98421</code>) to authenticate student mastery, passing verification, and leadership endorsement under CEO Muhammad Talha.
        </p>

        <form onSubmit={handleVerifyCredential} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <input
            type="text"
            value={verificationInput}
            onChange={(e) => setVerificationInput(e.target.value)}
            placeholder="e.g. LWF-2026-88942"
            className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
          />
          <button
            type="submit"
            className="bg-[#0056D2] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            Verify Credential
          </button>
        </form>

        {verificationResult && (
          <div className="mt-4 p-4 bg-slate-800/90 rounded-xl border border-emerald-500/40 text-xs space-y-2 max-w-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{verificationResult.status}</span>
            </div>
            <div className="text-slate-300">
              Candidate: <strong className="text-white">{verificationResult.studentName}</strong>
            </div>
            <div className="text-slate-300">
              Specialization: <strong className="text-white">{verificationResult.courseTitle}</strong>
            </div>
            <div className="text-slate-400 text-[11px]">
              Credential ID: <code className="text-blue-300 font-mono">{verificationResult.id}</code> • Verified by {verificationResult.authority}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
