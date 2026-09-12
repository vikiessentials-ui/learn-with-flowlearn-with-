import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  User, 
  PlusCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Search
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  onOpenNewCourseModal: () => void;
  enrolledCount: number;
  completedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentName,
  setStudentName,
  onOpenNewCourseModal,
  enrolledCount,
  completedCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setStudentName(tempName.trim());
      setIsNameModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 backdrop-blur-md bg-white/90 shadow-xs transition-colors">
      {/* Top Notice Bar */}
      <div className="bg-[#0056D2] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
              100% FREE EDUCATION
            </span>
            <span className="hidden sm:inline text-blue-100">
              Founded & Led by CEO Muhammad Talha • 1,000,000 Accredited Tech Courses
            </span>
          </div>
          <div className="flex items-center gap-4 text-blue-100 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> 80% Assessment Gating Enforced
            </span>
            <span className="hidden md:inline">• Official Verifiable Certificates</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="brand-logo"
          onClick={() => { setActiveTab('catalog'); setIsMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 bg-[#0056D2] text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md group-hover:bg-blue-700 transition">
            LWF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">LEARN WITH FLOW</span>
              <span className="bg-blue-50 text-[#0056D2] border border-blue-200 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                EdTech
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Led by Founder & CEO Muhammad Talha
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            id="nav-catalog-tab"
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'text-[#0056D2] bg-blue-50'
                : 'text-slate-700 hover:text-[#0056D2] hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Explore Courses
            <span className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
              1,000,000
            </span>
          </button>

          <button
            id="nav-mylearning-tab"
            onClick={() => setActiveTab('my-learning')}
            className={`px-3.5 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'my-learning'
                ? 'text-[#0056D2] bg-blue-50'
                : 'text-slate-700 hover:text-[#0056D2] hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            My Learning
            {(enrolledCount > 0 || completedCount > 0) && (
              <span className="text-[11px] bg-[#0056D2] text-white px-1.5 py-0.2 rounded-full font-bold">
                {enrolledCount}
              </span>
            )}
          </button>

          <button
            id="nav-about-ceo-tab"
            onClick={() => setActiveTab('about')}
            className={`px-3.5 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'about'
                ? 'text-[#0056D2] bg-blue-50'
                : 'text-slate-700 hover:text-[#0056D2] hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            About CEO & Vision
          </button>

          <button
            id="nav-legal-tab"
            onClick={() => setActiveTab('legal')}
            className={`px-3.5 py-2 rounded-md text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'legal'
                ? 'text-[#0056D2] bg-blue-50'
                : 'text-slate-700 hover:text-[#0056D2] hover:bg-slate-50'
            }`}
          >
            Policies & Contact
          </button>
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Create Course Button */}
          <button
            id="nav-add-course-btn"
            onClick={onOpenNewCourseModal}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:border-[#0056D2] hover:text-[#0056D2] hover:bg-blue-50/50 transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#0056D2]" />
            <span>Admin: + Add Course</span>
          </button>

          {/* Learner Profile Pill */}
          <button
            id="learner-profile-pill"
            onClick={() => { setTempName(studentName); setIsNameModalOpen(true); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition text-left"
            title="Click to personalize student certificate name"
          >
            <div className="w-6 h-6 rounded-full bg-[#0056D2] text-white flex items-center justify-center text-xs font-bold">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block text-[10px] leading-none">Learner</span>
              <span className="font-bold text-slate-800 leading-tight block max-w-[110px] truncate">
                {studentName}
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#0056D2] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => { setActiveTab('catalog'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activeTab === 'catalog' ? 'bg-blue-50 text-[#0056D2]' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Explore 1,000,000 Courses
            </span>
            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full font-bold">1M</span>
          </button>

          <button
            onClick={() => { setActiveTab('my-learning'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activeTab === 'my-learning' ? 'bg-blue-50 text-[#0056D2]' : 'text-slate-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> My Learning & Progress
            </span>
            <span className="text-xs bg-blue-100 text-[#0056D2] px-2 py-0.5 rounded-full font-bold">
              {enrolledCount} enrolled
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'about' ? 'bg-blue-50 text-[#0056D2]' : 'text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> About CEO Muhammad Talha
          </button>

          <button
            onClick={() => { setActiveTab('legal'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activeTab === 'legal' ? 'bg-blue-50 text-[#0056D2]' : 'text-slate-700'
            }`}
          >
            Policies & Contact
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { onOpenNewCourseModal(); setIsMobileMenuOpen(false); }}
              className="w-full py-2 px-3 bg-[#0056D2] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Admin: + Create / Edit Course
            </button>

            <button
              onClick={() => { setTempName(studentName); setIsNameModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full py-2 px-3 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-between"
            >
              <span>Certificate Name: <strong className="text-[#0056D2]">{studentName}</strong></span>
              <span className="text-[11px] text-blue-600 underline">Change</span>
            </button>
          </div>
        </div>
      )}

      {/* Student Name Modal */}
      {isNameModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0056D2]" />
                Personalize Learner Name
              </h3>
              <button
                onClick={() => setIsNameModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              This name will be inscribed onto your official, verifiable Coursera-style certificates and leadership endorsements issued by Founder & CEO Muhammad Talha.
            </p>
            <form onSubmit={handleSaveName} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Legal Name for Certificate:
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="e.g. Alex Morgan or Muhammad Talha"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#0056D2] text-sm"
                  autoFocus
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNameModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-[#0056D2] text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Save Name
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
