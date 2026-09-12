export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "18 min"
  videoUrl: string; // YouTube, Vimeo, or direct video URL
  passed: boolean;
  score?: number; // percentage (0 - 100)
  quiz: QuizQuestion[];
  resources?: { title: string; url: string }[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  thumbnail: string;
  description: string;
  instructor: string;
  instructorName?: string; // defaults to 'Muhammad Talha'
  instructorRole?: string;
  rating: number;
  studentsCount: number;
  estimatedHours: number;
  modules: Module[];
  tags: string[];
  featured?: boolean;
  playlistUrl?: string; // Dedicated YouTube Playlist URL or ID (e.g. list=PLxxx)
}

export interface CertificateRecord {
  id: string; // e.g. "LWF-2026-98421"
  courseId: number;
  courseTitle: string;
  studentName: string;
  issueDate: string;
  verificationUrl: string;
  instructor: string;
  instructorTitle: string;
  averageScore: number;
  totalModules: number;
  totalLessons: number;
}

export interface LearnerProfile {
  name: string;
  email: string;
  enrolledCourseIds: number[];
  completedCourseIds: number[];
}
