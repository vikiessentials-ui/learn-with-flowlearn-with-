import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { 
  CATEGORIES, 
  TOTAL_CATALOG_COURSES, 
  queryMillionCourses,
  getCourseById
} from '../data/coursesData';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Edit3, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  GraduationCap,
  ListVideo,
  Hash,
  Compass,
  Zap,
  Globe
} from 'lucide-react';

interface CourseCatalogProps {
  courses?: Course[];
  onSelectCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
  onAddNewCourse: () => void;
  onViewCeo: () => void;
}

const ITEMS_PER_PAGE = 12;

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourse,
  onEditCourse,
  onAddNewCourse,
  onViewCeo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'duration'>('popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Quick course ID jump input
  const [courseIdInput, setCourseIdInput] = useState<string>('');
  // Quick page jump input
  const [pageJumpInput, setPageJumpInput] = useState<string>('');

  // 1 Million Course Engine Query
  const queryResult = useMemo(() => {
    return queryMillionCourses({
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
      searchQuery,
      selectedCategory,
      selectedLevel,
      sortBy
    });
  }, [currentPage, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const { courses: paginatedCourses, totalCount, totalPages } = queryResult;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  // Direct Jump to Course # ID
  const handleJumpToCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(courseIdInput.replace(/\D/g, ''), 10);
    if (!isNaN(id) && id >= 1 && id <= TOTAL_CATALOG_COURSES) {
      const targetCourse = getCourseById(id);
      onSelectCourse(targetCourse);
      setCourseIdInput('');
    }
  };

  // Direct Jump to Page
  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageJumpInput.replace(/\D/g, ''), 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setPageJumpInput('');
      const el = document.getElementById('catalog-controls');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check completion stats for each course
  const getCourseProgressStats = (course: Course) => {
    let totalLessons = 0;
    let passedLessons = 0;
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        totalLessons++;
        if (l.passed) passedLessons++;
      });
    });
    return { totalLessons, passedLessons, isComplete: totalLessons > 0 && passedLessons === totalLessons };
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-r from-[#003B95] via-[#0056D2] to-[#1E40AF] text-white rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/2 bottom-0 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Founder & CEO Muhammad Talha's 100% Free Education Initiative
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold border border-amber-300/30">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              1,000,000 Accredited Tech Courses
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            World-Class Tech Education. <br />
            <span className="text-amber-300">1,000,000 Courses. 100% Free.</span>
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-3xl">
            Explore the world's most comprehensive catalog of <strong>1,000,000 accredited technical courses</strong> covering Full-Stack Web, Generative AI, Cloud Infrastructure, Cybersecurity, and Distributed Systems. Led by <strong>Muhammad Talha</strong>, every lesson enforces a strict 80% assessment gate to ensure genuine engineering competence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('catalog-controls');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#0056D2] font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-50 transition shadow-md flex items-center gap-2"
            >
              Explore 1,000,000 Courses <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewCeo}
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition"
            >
              Meet CEO Muhammad Talha
            </button>
            <div className="flex items-center gap-2 text-xs text-blue-100 sm:ml-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Verifiable Coursera-Style Certificates</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15 text-xs text-blue-100">
            <div>
              <div className="font-bold text-white text-base">1,000,000</div>
              <div className="text-blue-200 text-[11px]">Accredited Courses</div>
            </div>
            <div>
              <div className="font-bold text-white text-base">8 Disciplines</div>
              <div className="text-blue-200 text-[11px]">Modern Tech Stacks</div>
            </div>
            <div>
              <div className="font-bold text-white text-base">80% Gate</div>
              <div className="text-blue-200 text-[11px]">Rigorous Assessment</div>
            </div>
            <div>
              <div className="font-bold text-white text-base">Free Forever</div>
              <div className="text-blue-200 text-[11px]">No Paywalls or Ads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Jump to Course # (1 - 1,000,000) Tool */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Direct Course Finder</span>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                1 - 1,000,000
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Instantly open any course across the 1 million repository by its unique ID.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-400 text-xs hidden lg:inline">Quick Jump:</span>
            {[1, 100, 1000, 10000, 100000, 500000, 1000000].map((id) => (
              <button
                key={id}
                onClick={() => onSelectCourse(getCourseById(id))}
                className="px-2 py-1 bg-slate-100 hover:bg-blue-50 hover:text-[#0056D2] hover:border-blue-200 border border-slate-200 rounded-md font-semibold text-slate-600 transition"
              >
                #{id.toLocaleString()}
              </button>
            ))}
          </div>

          <form onSubmit={handleJumpToCourse} className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-36">
              <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                min="1"
                max={TOTAL_CATALOG_COURSES}
                placeholder="ID (e.g. 5400)"
                value={courseIdInput}
                onChange={(e) => setCourseIdInput(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition shrink-0"
            >
              Open Course
            </button>
          </form>
        </div>
      </section>

      {/* Catalog Search & Category Filter Controls */}
      <div id="catalog-controls" className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 1,000,000 courses by title, topic, ID (e.g. #48291), or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0056D2] focus:bg-white transition text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Level Filter, Sort, and Add Course Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => { setSelectedLevel(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 py-2.5 px-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0056D2] shadow-xs cursor-pointer"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 py-2.5 px-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0056D2] shadow-xs cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated (4.8+)</option>
              <option value="duration">Longest Duration</option>
              <option value="newest">Recently Added</option>
            </select>

            {/* Admin Add Course Button */}
            <button
              onClick={onAddNewCourse}
              className="shrink-0 bg-[#0056D2] hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Course</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-semibold transition border ${
                  isSelected
                    ? 'bg-[#0056D2] text-white border-[#0056D2] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-[#0056D2]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Status Bar: Total courses & 1M Capacity Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2 border-b border-slate-200/80 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-800 text-sm">
            {totalCount.toLocaleString()} {totalCount === 1 ? 'Course' : 'Courses'} Available
          </span>
          <span className="text-slate-300">•</span>
          <span className="bg-blue-50 text-[#0056D2] px-2.5 py-0.5 rounded font-bold border border-blue-200/80 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Global Capacity: 1,000,000 Active Courses
          </span>
          {selectedCategory !== 'All Categories' && (
            <span className="text-slate-600">in <strong>{selectedCategory}</strong> (~125,000 courses)</span>
          )}
        </div>
        <div className="font-medium text-slate-600">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE + 1).toLocaleString()} -{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalCount).toLocaleString()} of {totalCount.toLocaleString()}
        </div>
      </div>

      {/* Course Cards Grid */}
      {paginatedCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No courses match your criteria</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or selecting a different category from the filter above.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); setSelectedLevel('All'); }}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold"
            >
              Reset All Filters
            </button>
            <button
              onClick={onAddNewCourse}
              className="text-xs bg-[#0056D2] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              + Create New Course Slot
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCourses.map((course) => {
            const { totalLessons, passedLessons, isComplete } = getCourseProgressStats(course);
            const progressPercent = totalLessons > 0 ? Math.round((passedLessons / totalLessons) * 100) : 0;

            return (
              <div
                key={course.id}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Section */}
                <div>
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Category Pill */}
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                      {course.category}
                    </span>

                    {/* Course ID and Edit Action Overlay */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      <span className="bg-white/95 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                        #{course.id.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditCourse(course);
                        }}
                        title="Edit Course Details & Modules (Admin)"
                        className="w-7 h-7 rounded bg-white/95 text-slate-700 hover:text-[#0056D2] hover:bg-blue-50 flex items-center justify-center shadow-xs transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress Badge if Enrolled/Started */}
                    {passedLessons > 0 && (
                      <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-xs text-white p-2 rounded-lg text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-semibold text-emerald-400">
                            {isComplete ? 'Course Completed' : `In Progress (${progressPercent}%)`}
                          </span>
                          <span className="text-[10px] text-slate-300">
                            {passedLessons}/{totalLessons} Lessons Passed
                          </span>
                        </div>
                        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating}</span>
                          <span className="text-slate-400 text-[11px]">({course.studentsCount.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.estimatedHours}h</span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <h3 
                        onClick={() => onSelectCourse(course)}
                        className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0056D2] transition cursor-pointer line-clamp-2"
                      >
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Instructor & Module stats */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {/* Instructor Name with muted text-sm style */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm text-slate-500 truncate">
                          Instructor: <span className="text-slate-600 font-medium">{course.instructorName || course.instructor || 'Muhammad Talha'}</span>
                        </div>
                        {course.playlistUrl && (
                          <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-[#0056D2] bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full" title="YouTube Playlist Integrated">
                            <ListVideo className="w-3 h-3 text-[#0056D2]" />
                            Playlist
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="text-slate-500">
                          Curriculum
                        </div>
                        <div className="text-right">
                          <span className="font-medium text-slate-600">
                            {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'} ({totalLessons} Lessons)
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      {course.tags && course.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {course.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full bg-slate-900 group-hover:bg-[#0056D2] text-white font-bold text-xs py-2.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>{passedLessons > 0 ? 'Continue Learning' : 'Start Course'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1,000,000 Catalog Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Page <strong className="text-slate-900">{currentPage.toLocaleString()}</strong> of <strong className="text-slate-900">{totalPages.toLocaleString()}</strong>
              {' '}(Showing {((currentPage - 1) * ITEMS_PER_PAGE + 1).toLocaleString()} - {Math.min(currentPage * ITEMS_PER_PAGE, totalCount).toLocaleString()} of {totalCount.toLocaleString()} courses)
            </div>

            {/* Main Pager Buttons */}
            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                title="First page"
              >
                « 1
              </button>

              {/* Previous Page */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dynamic 5-window page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                let pageNum = currentPage;
                if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition ${
                        currentPage === pageNum
                          ? 'bg-[#0056D2] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum.toLocaleString()}
                    </button>
                  );
                }
                return null;
              })}

              {/* Next Page */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                title="Last page"
              >
                {totalPages.toLocaleString()} »
              </button>
            </div>
          </div>

          {/* Quick Page Jump and Milestone Shortcuts */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 overflow-x-auto">
              <span className="font-semibold text-slate-600 shrink-0">Milestones:</span>
              {[1, 100, 1000, 10000, 50000, totalPages].map((pg) => (
                <button
                  key={pg}
                  onClick={() => {
                    setCurrentPage(pg);
                    const el = document.getElementById('catalog-controls');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2 py-0.5 bg-slate-50 hover:bg-blue-50 hover:text-[#0056D2] border border-slate-200 rounded text-[11px] font-medium transition shrink-0"
                >
                  Page {pg.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Jump to Page Form */}
            <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
              <span className="text-slate-500 text-xs">Jump to Page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                placeholder={`1 - ${totalPages.toLocaleString()}`}
                value={pageJumpInput}
                onChange={(e) => setPageJumpInput(e.target.value)}
                className="w-24 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-[#0056D2] text-white font-bold text-xs px-3 py-1 rounded-lg transition"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Action Callout */}
      <div className="bg-slate-100/80 rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#0056D2]" />
            Enterprise Capacity Management (1,000,000 Courses)
          </h4>
          <p className="text-xs text-slate-600">
            Founder & CEO Muhammad Talha can modify titles, descriptions, YouTube playlists, and 5-question conceptual quizzes on any course card or dynamically add new modules.
          </p>
        </div>
        <button
          onClick={onAddNewCourse}
          className="shrink-0 bg-white border border-slate-300 text-slate-800 hover:text-[#0056D2] hover:border-[#0056D2] font-semibold text-xs px-4 py-2 rounded-lg transition shadow-xs flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-[#0056D2]" />
          Add / Configure Course Slot
        </button>
      </div>
    </div>
  );
};
