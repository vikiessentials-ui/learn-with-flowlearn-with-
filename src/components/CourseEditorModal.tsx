import React, { useState } from 'react';
import { Course, Module, Lesson, QuizQuestion } from '../types';
import { CATEGORIES, generateStandardQuiz } from '../data/coursesData';
import { parseYouTubeUrl, parseYouTubePlaylist, CURATED_PLAYLIST_PRESETS, CuratedPlaylistPreset } from '../utils/youtube';
import { 
  X, 
  Plus, 
  Trash2, 
  Video, 
  HelpCircle, 
  Layers, 
  Save, 
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Play,
  ExternalLink,
  Eye,
  EyeOff,
  ListVideo,
  Sparkles,
  Link2,
  Radio,
  ArrowRight,
  RefreshCw,
  Film
} from 'lucide-react';

interface CourseEditorModalProps {
  course: Course | null; // if null, creating a new course slot
  onClose: () => void;
  onSaveCourse: (updatedCourse: Course) => void;
  totalCoursesCount: number;
}

export const CourseEditorModal: React.FC<CourseEditorModalProps> = ({
  course,
  onClose,
  onSaveCourse,
  totalCoursesCount,
}) => {
  // If editing an existing course, clone it; otherwise initialize a clean new course slot
  const [formData, setFormData] = useState<Course>(() => {
    if (course) {
      return JSON.parse(JSON.stringify(course));
    }
    const newId = totalCoursesCount + 1;
    return {
      id: newId,
      title: "New Technical Specialization",
      category: "Web Development",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      description: "Comprehensive technical training designed to master core principles and pass the 80% logic assessment barrier.",
      instructor: "Muhammad Talha",
      instructorName: "Muhammad Talha",
      instructorRole: "Founder & CEO, LEARN WITH FLOW",
      rating: 4.9,
      studentsCount: 1,
      estimatedHours: 24,
      tags: ["Technical", "Mastery", "Production"],
      playlistUrl: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n",
      modules: [
        {
          id: `mod-${newId}-1`,
          title: "Module 1: Foundations & Architecture",
          description: "Core fundamentals and system mechanics.",
          lessons: [
            {
              id: `les-${newId}-1-1`,
              title: "Lesson 1: Core Mechanics & Environment Setup",
              duration: "20 min",
              videoUrl: "https://www.youtube.com/embed/8aGhZQkoFbQ",
              passed: false,
              quiz: generateStandardQuiz("System Architecture")
            }
          ]
        }
      ]
    };
  });

  const [activeTab, setActiveTab] = useState<'details' | 'playlist' | 'modules'>('details');
  const [expandedModule, setExpandedModule] = useState<number>(0);
  const [previewingLessonKey, setPreviewingLessonKey] = useState<string | null>(null);
  const [showPlaylistTestPlayer, setShowPlaylistTestPlayer] = useState<boolean>(true);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Parse current playlist input
  const parsedPlaylist = parseYouTubePlaylist(formData.playlistUrl);

  // Quick preset educational YouTube videos
  const PRESET_VIDEOS = [
    { label: "Full Course Intro", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ" },
    { label: "JavaScript Engine", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ" },
    { label: "Deep Neural Networks", url: "https://www.youtube.com/watch?v=aircAruvnKk" },
    { label: "Kubernetes Architecture", url: "https://www.youtube.com/watch?v=d6WC5n9G_sM" },
    { label: "Ethical Hacking / Cyber", url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" }
  ];

  // Quick preset thumbnails
  const PRESET_THUMBS = [
    { label: "Web / Code", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80" },
    { label: "AI / Neurons", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80" },
    { label: "Cloud / Network", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80" },
    { label: "Cybersecurity", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80" },
    { label: "Data Science", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" },
    { label: "Servers / Infra", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80" }
  ];

  // Helper: auto-generate/sync lessons from a playlist
  const handleSyncPlaylistToLessons = (preset?: CuratedPlaylistPreset) => {
    const targetPlaylistId = preset?.playlistId || parsedPlaylist.playlistId;
    if (!targetPlaylistId) {
      alert("Please enter a valid YouTube Playlist URL or ID first.");
      return;
    }

    const playlistLessons = preset?.sampleLessons || [
      { title: `Part 1: Foundational Architecture & Core Principles`, videoId: "8aGhZQkoFbQ", duration: "25 min" },
      { title: `Part 2: Production Design Patterns & System State`, videoId: "dGcsHMXbSOA", duration: "30 min" },
      { title: `Part 3: End-to-End Implementation & Real-World Lab`, videoId: "vn3tm0quoqE", duration: "35 min" },
      { title: `Part 4: Optimization, Security Audits & Edge Cases`, videoId: "aircAruvnKk", duration: "28 min" },
      { title: `Part 5: Production Deployment, Monitoring & Scaling`, videoId: "d6WC5n9G_sM", duration: "40 min" },
    ];

    const newModuleId = `mod-${formData.id}-pl-${Date.now()}`;
    const generatedLessons: Lesson[] = playlistLessons.map((plItem, idx) => ({
      id: `les-${newModuleId}-${idx + 1}`,
      title: plItem.title,
      duration: plItem.duration,
      videoUrl: `https://www.youtube.com/watch?v=${plItem.videoId}&list=${targetPlaylistId}`,
      passed: false,
      quiz: generateStandardQuiz(`${formData.title} - ${plItem.title.split(':')[0]}`)
    }));

    const newModule: Module = {
      id: newModuleId,
      title: `Playlist Series: ${preset?.label || formData.title}`,
      description: `Comprehensive multi-part playlist track synchronized directly from YouTube Playlist ${targetPlaylistId}.`,
      lessons: generatedLessons
    };

    setFormData((prev) => ({
      ...prev,
      playlistUrl: preset?.playlistUrl || prev.playlistUrl,
      modules: [newModule],
    }));

    setSyncNotice(`✓ Successfully mapped ${generatedLessons.length} playlist video lessons with automated 5-question conceptual quizzes!`);
    setTimeout(() => setSyncNotice(null), 5000);
  };

  // Handlers for modules
  const handleAddModule = () => {
    const newModNumber = formData.modules.length + 1;
    const newModId = `mod-${formData.id}-${Date.now()}`;
    const newModule: Module = {
      id: newModId,
      title: `Module ${newModNumber}: Advanced Implementation`,
      description: "Advanced principles and practical implementation.",
      lessons: [
        {
          id: `les-${newModId}-1`,
          title: `Lesson 1: Deep Dive`,
          duration: "25 min",
          videoUrl: "https://www.youtube.com/embed/vn3tm0quoqE",
          passed: false,
          quiz: generateStandardQuiz(formData.title || "Advanced Engineering")
        }
      ]
    };
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
    setExpandedModule(formData.modules.length);
  };

  const handleRemoveModule = (modIdx: number) => {
    if (formData.modules.length <= 1) {
      alert("A course must have at least one module.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, idx) => idx !== modIdx),
    }));
  };

  const handleModuleTitleChange = (modIdx: number, val: string) => {
    setFormData((prev) => {
      const copy = [...prev.modules];
      copy[modIdx].title = val;
      return { ...prev, modules: copy };
    });
  };

  // Handlers for lessons within module
  const handleAddLesson = (modIdx: number) => {
    const targetModule = formData.modules[modIdx];
    const newLesNumber = targetModule.lessons.length + 1;
    const newLessonId = `les-${targetModule.id}-${Date.now()}`;
    const newLesson: Lesson = {
      id: newLessonId,
      title: `Lesson ${newLesNumber}: Technical Walkthrough`,
      duration: "20 min",
      videoUrl: "https://www.youtube.com/embed/8aGhZQkoFbQ",
      passed: false,
      quiz: generateStandardQuiz(targetModule.title || "Core Mechanics")
    };

    setFormData((prev) => {
      const copy = [...prev.modules];
      copy[modIdx].lessons.push(newLesson);
      return { ...prev, modules: copy };
    });
  };

  const handleRemoveLesson = (modIdx: number, lesIdx: number) => {
    if (formData.modules[modIdx].lessons.length <= 1) {
      alert("A module must contain at least one lesson.");
      return;
    }
    setFormData((prev) => {
      const copy = [...prev.modules];
      copy[modIdx].lessons = copy[modIdx].lessons.filter((_, idx) => idx !== lesIdx);
      return { ...prev, modules: copy };
    });
  };

  const handleLessonChange = (
    modIdx: number,
    lesIdx: number,
    field: keyof Lesson,
    value: any
  ) => {
    setFormData((prev) => {
      const copy = [...prev.modules];
      copy[modIdx].lessons[lesIdx] = {
        ...copy[modIdx].lessons[lesIdx],
        [field]: value,
      };
      return { ...prev, modules: copy };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please provide a valid course title.");
      return;
    }
    // Ensure instructorName is consistent
    const cleanInstructor = formData.instructorName || formData.instructor || "Muhammad Talha";
    const cleanedCourse: Course = {
      ...formData,
      instructor: cleanInstructor,
      instructorName: cleanInstructor,
      instructorRole: formData.instructorRole || "Founder & CEO, LEARN WITH FLOW",
      playlistUrl: formData.playlistUrl?.trim() || undefined,
    };
    onSaveCourse(cleanedCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0056D2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {course ? `Edit Course #${course.id}` : 'Create New Course Slot'}
              </h2>
              <p className="text-xs text-slate-500">
                Founder & CEO Portal • Muhammad Talha • YouTube Playlist & Curriculum Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (3 Dedicated Views: Details, YouTube Playlist Engine, Modules) */}
        <div className="flex items-center gap-1 border-b border-slate-200 px-6 pt-3 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
              activeTab === 'details'
                ? 'border-[#0056D2] text-[#0056D2]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Course Details & Instructor
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('playlist')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 relative ${
              activeTab === 'playlist'
                ? 'border-[#0056D2] text-[#0056D2]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ListVideo className="w-4 h-4 text-[#0056D2]" />
            <span>YouTube Playlist Control</span>
            {parsedPlaylist.isValid && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
              activeTab === 'modules'
                ? 'border-[#0056D2] text-[#0056D2]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Modules & Video Lessons ({formData.modules.length})</span>
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-5">
              {/* Course Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Distributed Microservices with Go & gRPC"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                  required
                />
              </div>

              {/* Category, Level, Estimated Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Duration (Hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={formData.estimatedHours}
                    onChange={(e) => setFormData({ ...formData, estimatedHours: Number(e.target.value) || 20 })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                  />
                </div>
              </div>

              {/* Thumbnail URL & Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[11px] text-slate-400 font-semibold">Quick Presets:</span>
                  {PRESET_THUMBS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnail: preset.url })}
                      className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-[#0056D2] border border-slate-200 px-2 py-0.5 rounded transition"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Preview Thumbnail */}
                {formData.thumbnail && (
                  <div className="mt-3 relative h-28 w-48 rounded-lg overflow-hidden border border-slate-200 shadow-xs">
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded">
                      Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed curriculum overview..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0056D2] leading-relaxed"
                />
              </div>

              {/* Instructor Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Instructor Name
                  </label>
                  <input
                    type="text"
                    value={formData.instructorName || formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value, instructorName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                    placeholder="Muhammad Talha"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Defaults to platform founder Muhammad Talha.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Instructor Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.instructorRole || "Founder & CEO, LEARN WITH FLOW"}
                    onChange={(e) => setFormData({ ...formData, instructorRole: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Printed on official Coursera-style certificates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: YOUTUBE PLAYLIST CONTROL (DUAL MODE ENGINE) */}
          {activeTab === 'playlist' && (
            <div className="space-y-6">
              {/* Dual Mode Overview Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-200/80 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0056D2]">
                  <ListVideo className="w-5 h-5 text-[#0056D2]" />
                  <span>Dual Mode Curriculum Delivery Engine</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As Founder & CEO, you can power a course through an entire <strong>YouTube Playlist</strong> (e.g. <code>list=PLxxxx...</code>) OR custom <strong>Individual Video Lessons</strong>. When both are configured, students can seamlessly switch between the full playlist series player and individual lesson streams, while the strict <strong>80% quiz progress gate</strong> is preserved across every video.
                </p>
              </div>

              {/* Dedicated YouTube Playlist URL / ID Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    YouTube Playlist URL / ID <span className="text-slate-400 font-normal">(e.g. https://www.youtube.com/playlist?list=PLxxx or ID)</span>
                  </label>
                  {parsedPlaylist.isValid && (
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Valid Playlist: {parsedPlaylist.playlistId?.slice(0, 14)}...
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={formData.playlistUrl || ''}
                    onChange={(e) => setFormData({ ...formData, playlistUrl: e.target.value })}
                    placeholder="https://www.youtube.com/playlist?list=PL4cUxeGkcC9gksOX3Wg4azP5ZKz4yBr_n"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono pr-28 focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                  />
                  {formData.playlistUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, playlistUrl: '' })}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Presets for Technical Playlists */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Curated Technical Playlist Presets (Click to Attach):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CURATED_PLAYLIST_PRESETS.map((preset) => (
                      <button
                        key={preset.playlistId}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, playlistUrl: preset.playlistUrl });
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs transition flex flex-col justify-between ${
                          parsedPlaylist.playlistId === preset.playlistId
                            ? 'bg-blue-50/80 border-[#0056D2] ring-1 ring-[#0056D2]'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                          <span>{preset.label}</span>
                          <span className="text-[10px] text-[#0056D2] bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                            {preset.sampleLessons.length} Videos
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {preset.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-Map to Syllabus Action Button */}
                {parsedPlaylist.isValid && (
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#0056D2]" />
                          <span>Map Playlist into Course Modules & 80% Quizzes</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Automatically generates interactive lesson slots for this playlist, each with an automated 5-question conceptual logic assessment.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const matchingPreset = CURATED_PLAYLIST_PRESETS.find(
                            (p) => p.playlistId === parsedPlaylist.playlistId
                          );
                          handleSyncPlaylistToLessons(matchingPreset);
                        }}
                        className="shrink-0 bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Map & Sync Playlist Lessons</span>
                      </button>
                    </div>

                    {syncNotice && (
                      <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-semibold animate-fade-in">
                        {syncNotice}
                      </div>
                    )}
                  </div>
                )}

                {/* Live Playlist Test Player */}
                {parsedPlaylist.isValid && parsedPlaylist.playlistId && (
                  <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ListVideo className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold">
                          Admin Live Test: YouTube Playlist Player
                        </span>
                      </div>
                      <a
                        href={parsedPlaylist.canonicalUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <span>Open Playlist in YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-slate-800">
                      <iframe
                        src={parsedPlaylist.embedUrl!}
                        title="YouTube Playlist Embed Preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MODULES & VIDEO LESSONS */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Curriculum Modules & Video Lessons</h3>
                  <p className="text-xs text-slate-500">
                    Add multiple video embeds per module. Each video lesson features an automated 5-question logic assessment with 80% progress gating.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition shadow-xs shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Module</span>
                </button>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-4">
                {formData.modules.map((module, modIdx) => {
                  const isExpanded = expandedModule === modIdx;
                  return (
                    <div
                      key={module.id || modIdx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                    >
                      {/* Module Header Bar */}
                      <div className="p-3.5 bg-slate-50/80 flex items-center justify-between border-b border-slate-200">
                        <div className="flex items-center gap-3 flex-1 mr-4">
                          <button
                            type="button"
                            onClick={() => setExpandedModule(isExpanded ? -1 : modIdx)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-500 transition"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <input
                            type="text"
                            value={module.title}
                            onChange={(e) => handleModuleTitleChange(modIdx, e.target.value)}
                            className="font-bold text-xs text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#0056D2] focus:bg-white px-1 py-0.5 rounded w-full"
                          />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveModule(modIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                            title="Delete Module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Module Content */}
                      {isExpanded && (
                        <div className="p-4 space-y-4 bg-white">
                          <div className="space-y-3">
                            {module.lessons.map((lesson, lesIdx) => (
                              <div
                                key={lesson.id || lesIdx}
                                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3 hover:border-slate-300 transition"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-[#0056D2] bg-blue-50 px-2 py-0.5 rounded">
                                    Video Lesson #{lesIdx + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLesson(modIdx, lesIdx)}
                                    className="text-slate-400 hover:text-rose-600 transition p-1"
                                    title="Delete Lesson"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                                      Lesson Title
                                    </label>
                                    <input
                                      type="text"
                                      value={lesson.title}
                                      onChange={(e) =>
                                        handleLessonChange(modIdx, lesIdx, 'title', e.target.value)
                                      }
                                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                                      placeholder="e.g. Memory Layout & Event Queue"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                                      Duration
                                    </label>
                                    <input
                                      type="text"
                                      value={lesson.duration}
                                      onChange={(e) =>
                                        handleLessonChange(modIdx, lesIdx, 'duration', e.target.value)
                                      }
                                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                                      placeholder="e.g. 24 min"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-[10px] font-bold text-slate-600">
                                      YouTube Video Link (Watch, Shorts, Embed, or Video ID)
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const key = `${modIdx}-${lesIdx}`;
                                        setPreviewingLessonKey(previewingLessonKey === key ? null : key);
                                      }}
                                      className="text-[10px] text-[#0056D2] hover:underline font-semibold flex items-center gap-1"
                                    >
                                      {previewingLessonKey === `${modIdx}-${lesIdx}` ? (
                                        <>
                                          <EyeOff className="w-3 h-3" />
                                          <span>Hide Test Player</span>
                                        </>
                                      ) : (
                                        <>
                                          <Eye className="w-3 h-3" />
                                          <span>Instant Live Preview</span>
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={lesson.videoUrl}
                                      onChange={(e) =>
                                        handleLessonChange(modIdx, lesIdx, 'videoUrl', e.target.value)
                                      }
                                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono pr-20"
                                      placeholder="https://www.youtube.com/watch?v=... or ID"
                                    />
                                    {lesson.videoUrl && parseYouTubeUrl(lesson.videoUrl).isValid && (
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                        Valid Link
                                      </span>
                                    )}
                                  </div>

                                  {/* Quick Video Presets */}
                                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                    <span className="text-[9px] text-slate-400 font-medium">Quick links:</span>
                                    {PRESET_VIDEOS.map((pv) => (
                                      <button
                                        key={pv.label}
                                        type="button"
                                        onClick={() => handleLessonChange(modIdx, lesIdx, 'videoUrl', pv.url)}
                                        className="text-[9px] bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#0056D2] border border-slate-200 px-1.5 py-0.5 rounded transition"
                                      >
                                        {pv.label}
                                      </button>
                                    ))}
                                  </div>

                                  {/* Instant Live Preview Test Player */}
                                  {previewingLessonKey === `${modIdx}-${lesIdx}` && (
                                    <div className="mt-2.5 p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                                      <div className="flex items-center justify-between text-xs text-white">
                                        <span className="font-bold flex items-center gap-1.5 text-blue-400">
                                          <Play className="w-3.5 h-3.5 fill-blue-400" />
                                          Live Admin Test Player
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                          {parseYouTubeUrl(lesson.videoUrl).isValid ? 'Stream Connected' : 'Invalid Link'}
                                        </span>
                                      </div>

                                      {parseYouTubeUrl(lesson.videoUrl).isValid ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-slate-800">
                                          <iframe
                                            src={parseYouTubeUrl(lesson.videoUrl).embedUrl || ''}
                                            title="Admin Video Preview"
                                            className="w-full h-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                          />
                                        </div>
                                      ) : (
                                        <div className="p-4 text-center text-xs text-slate-400 bg-slate-950 rounded-lg">
                                          Enter a valid YouTube URL to test-play.
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-100">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Automated 5-Question Logic Assessment Attached
                                  </span>
                                  <span>Threshold: 80% passing</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Add Lesson to this module button */}
                          <button
                            type="button"
                            onClick={() => handleAddLesson(modIdx)}
                            className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-[#0056D2] hover:text-[#0056D2] rounded-xl text-xs font-bold text-slate-600 transition flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Another Video Lesson to this Module</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form Submit Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
            <div className="text-xs text-slate-500">
              Changes will immediately update the active catalog and save to browser storage.
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Course to Catalog</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
