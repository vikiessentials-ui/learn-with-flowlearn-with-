import React, { useState, useEffect, useMemo } from 'react';
import { Course, Lesson } from './types';
import { 
  TOTAL_CATALOG_COURSES,
  getStoredCourses, 
  saveStoredCourses, 
  getLearnerProfile, 
  saveLearnerProfile,
  getCourseById,
  saveCustomCourse,
  recordLessonProgress,
  getStoredStudentProgress
} from './data/coursesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CourseCatalog } from './components/CourseCatalog';
import { CoursePlayer } from './components/CoursePlayer';
import { QuizModal } from './components/QuizModal';
import { CertificateModal } from './components/CertificateModal';
import { CourseEditorModal } from './components/CourseEditorModal';
import { AboutCeoPage } from './components/AboutCeoPage';
import { LegalPages } from './components/LegalPages';
import { MyLearning } from './components/MyLearning';

export default function App() {
  // Navigation tabs: 'catalog' | 'player' | 'my-learning' | 'about' | 'legal'
  const [activeTab, setActiveTab] = useState<string>('catalog');

  // Courses collection (supporting flagship & active courses)
  const [courses, setCourses] = useState<Course[]>(() => getStoredCourses());

  // Active student/learner profile
  const [studentName, setStudentName] = useState<string>(() => getLearnerProfile().name);

  // Selected course for player & certificate
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(() => getCourseById(1));

  // Active Quiz Modal state
  const [activeQuizLesson, setActiveQuizLesson] = useState<{
    lesson: Lesson;
    moduleIndex: number;
    lessonIndex: number;
  } | null>(null);

  // Certificate Modal state
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  // Admin Course Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Save changes to courses to localStorage
  const updateCoursesState = (newCourses: Course[]) => {
    setCourses(newCourses);
    saveStoredCourses(newCourses);
  };

  // Sync student name to storage
  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
    saveLearnerProfile({ name, email: `${name.toLowerCase().replace(/\s+/g, '.')}@learnwithflow.com` });
  };

  // Handle course selection to start learning
  const handleSelectCourse = (course: Course) => {
    // Ensure we load the fresh deterministic or custom state
    const hydratedCourse = getCourseById(course.id);
    setSelectedCourse(hydratedCourse);
    setActiveTab('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open editor for a specific existing course
  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsEditorOpen(true);
  };

  // Open editor for adding a brand new course slot
  const handleAddNewCourse = () => {
    setEditingCourse(null);
    setIsEditorOpen(true);
  };

  // Save new or updated course from Editor Modal
  const handleSaveCourseFromEditor = (savedCourse: Course) => {
    saveCustomCourse(savedCourse);

    setCourses(prev => {
      const idx = prev.findIndex(c => c.id === savedCourse.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedCourse;
        return copy;
      }
      return [savedCourse, ...prev];
    });

    // If currently playing this course, sync state
    if (selectedCourse && selectedCourse.id === savedCourse.id) {
      setSelectedCourse(savedCourse);
    }
  };

  // Handle quiz trigger from player or module list
  const handleOpenQuiz = (lesson: Lesson, moduleIndex: number, lessonIndex: number) => {
    setActiveQuizLesson({ lesson, moduleIndex, lessonIndex });
  };

  // Pass quiz with >= 80%: Unlock subsequent lesson and update course progress
  const handlePassQuiz = (moduleIndex: number, lessonIndex: number, score: number) => {
    if (!selectedCourse) return;
    const targetLesson = selectedCourse.modules[moduleIndex]?.lessons[lessonIndex];
    if (!targetLesson) return;

    const updatedCourse = recordLessonProgress(selectedCourse.id, targetLesson.id, score);
    setSelectedCourse(updatedCourse);

    setCourses(prev => {
      const idx = prev.findIndex(c => c.id === updatedCourse.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updatedCourse;
        return copy;
      }
      return [updatedCourse, ...prev];
    });
  };

  // Open Certificate for a specific course
  const handleOpenCertificate = (course?: Course) => {
    const target = course || selectedCourse || getCourseById(1);
    setCertificateCourse(target);
    setIsCertificateOpen(true);
  };

  // Compute total completed courses for nav counter
  const completedCoursesCount = useMemo(() => {
    const progressMap = getStoredStudentProgress();
    return Object.values(progressMap).filter(p => p.isComplete).length;
  }, [selectedCourse, courses]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-100 selection:text-[#0056D2]">
      {/* Coursera-Inspired Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        studentName={studentName}
        setStudentName={handleUpdateStudentName}
        onOpenNewCourseModal={handleAddNewCourse}
        enrolledCount={courses.length > 0 ? 3 : 0}
        completedCount={completedCoursesCount}
      />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* TAB 1: 1,000 COURSE CATALOG */}
        {activeTab === 'catalog' && (
          <CourseCatalog
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onEditCourse={handleEditCourse}
            onAddNewCourse={handleAddNewCourse}
            onViewCeo={() => {
              setActiveTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 2: COURSE PLAYER & 80% PROGRESS GATING */}
        {activeTab === 'player' && selectedCourse && (
          <CoursePlayer
            course={selectedCourse}
            onBackToCatalog={() => setActiveTab('catalog')}
            onOpenQuiz={handleOpenQuiz}
            onOpenCertificate={() => handleOpenCertificate(selectedCourse)}
          />
        )}

        {/* TAB 3: MY LEARNING & CREDENTIAL VERIFICATION */}
        {activeTab === 'my-learning' && (
          <MyLearning
            courses={courses}
            studentName={studentName}
            onSelectCourse={handleSelectCourse}
            onOpenCertificate={handleOpenCertificate}
            onExploreCatalog={() => setActiveTab('catalog')}
          />
        )}

        {/* TAB 4: ABOUT FOUNDER & CEO MUHAMMAD TALHA */}
        {activeTab === 'about' && (
          <AboutCeoPage
            onExploreCourses={() => setActiveTab('catalog')}
            onOpenNewCourseModal={handleAddNewCourse}
          />
        )}

        {/* TAB 5: LEGAL & POLICIES (Privacy, Terms, Contact Us) */}
        {activeTab === 'legal' && (
          <LegalPages />
        )}
      </main>

      {/* Footer with Accreditation and Executive Statements */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNewCourseModal={handleAddNewCourse}
      />

      {/* MODAL 1: 5-Question Logic Assessment Modal with 80% Threshold */}
      {activeQuizLesson && (
        <QuizModal
          lesson={activeQuizLesson.lesson}
          moduleIndex={activeQuizLesson.moduleIndex}
          lessonIndex={activeQuizLesson.lessonIndex}
          onClose={() => setActiveQuizLesson(null)}
          onPassQuiz={handlePassQuiz}
        />
      )}

      {/* MODAL 2: Official Coursera-Style Verifiable Certificate Generator */}
      {isCertificateOpen && certificateCourse && (
        <CertificateModal
          course={certificateCourse}
          studentName={studentName}
          onUpdateStudentName={handleUpdateStudentName}
          onClose={() => setIsCertificateOpen(false)}
          onVerifyOnline={(certId) => {
            setIsCertificateOpen(false);
            setActiveTab('my-learning');
          }}
        />
      )}

      {/* MODAL 3: Admin Course Editor Modal (1,000,000 Capacity Support) */}
      {isEditorOpen && (
        <CourseEditorModal
          course={editingCourse}
          totalCoursesCount={TOTAL_CATALOG_COURSES}
          onClose={() => setIsEditorOpen(false)}
          onSaveCourse={handleSaveCourseFromEditor}
        />
      )}
    </div>
  );
}
