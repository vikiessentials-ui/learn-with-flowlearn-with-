import React from 'react';
import { ShieldCheck, Award, GraduationCap, Heart, Mail, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenNewCourseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenNewCourseModal }) => {
  return (
    <>
      {/* Industry Partners Section directly above footer */}
      <section className="bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#0056D2] mb-1">
              Global Enterprise Alignment
            </p>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Curriculum Aligned with Industry Standards
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Skills and logic assessments engineered to prepare graduates for technical roles across tier-1 organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
            {/* Google */}
            <div className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-xs transition duration-300 w-full max-w-[190px]">
              <div className="h-8 flex items-center justify-center">
                <svg className="h-6 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 mt-1.5 transition">
                Google
              </span>
            </div>

            {/* Meta */}
            <div className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-xs transition duration-300 w-full max-w-[190px]">
              <div className="h-8 flex items-center justify-center">
                <svg className="h-6 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8.4C10.5 5.5 8.1 3.8 5.6 3.8 2.5 3.8 0 6.3 0 10.3c0 5 4.5 9.7 10 10.9v-3.7c-3.7-.8-6.5-3.9-6.5-7.2 0-2.2 1.4-3.7 3.2-3.7 1.8 0 3.6 1.4 5.3 4.2.3.5.5.9.8 1.4.3-.5.5-.9.8-1.4 1.7-2.8 3.5-4.2 5.3-4.2 1.8 0 3.2 1.5 3.2 3.7 0 3.3-2.8 6.4-6.5 7.2v3.7c5.5-1.2 10-5.9 10-10.9 0-4-2.5-6.5-5.6-6.5-2.5 0-4.9 1.7-6.4 4.6l-.8 1.4-.8-1.4z" fill="#0081FB"/>
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 mt-1.5 transition">
                Meta
              </span>
            </div>

            {/* IBM */}
            <div className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-xs transition duration-300 w-full max-w-[190px]">
              <div className="h-8 flex items-center justify-center">
                <svg className="h-5 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" viewBox="0 0 100 40" fill="#1F70C1">
                  <path d="M0 0h12v4H0zm0 6h12v4H0zm0 6h12v4H0zm0 6h12v4H0zm0 6h12v4H0zm0 6h12v4H0zm0 6h12v4H0zm0 6h12v4H0zM18 0h34v4H18zm0 6h34v4H18zm0 6h14v4H18zm20 0h14v4H38zm-20 6h14v4H18zm20 0h14v4H38zm-20 6h34v4H18zm0 6h34v4H18zm0 6h14v4H18zm20 0h14v4H38zm-20 6h14v4H18zm20 0h14v4H38zm-20 6h34v4H18zm0 6h34v4H18zM58 0h12v4H58zm0 6h12v4H58zm0 6h12v4H58zm18 0h12v4H76zm0-6h12v4H76zm0-6h12v4H76zm-18 18h30v4H58zm0 6h30v4H58zm0 6h12v4H58zm18 0h12v4H76zm-18 6h12v4H58zm18 0h12v4H76zm-18 6h12v4H58zm18 0h12v4H76z" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 mt-1.5 transition">
                IBM
              </span>
            </div>

            {/* Microsoft */}
            <div className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-xs transition duration-300 w-full max-w-[190px]">
              <div className="h-8 flex items-center justify-center">
                <svg className="h-6 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" viewBox="0 0 24 24">
                  <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                  <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                  <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                  <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 mt-1.5 transition">
                Microsoft
              </span>
            </div>

            {/* OpenAI */}
            <div className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-xs transition duration-300 w-full max-w-[190px]">
              <div className="h-8 flex items-center justify-center">
                <svg className="h-6 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 4.418-2.865 8.166-6.839 9.49"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 3.314 1.612 6.25 4.095 8.05"/>
                  <circle cx="12" cy="12" r="4" fill="#10A37F" stroke="none" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 mt-1.5 transition">
                OpenAI
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800 py-10 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#0056D2]/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-[#0056D2]">
                <GraduationCap className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">100% Free World-Class Access</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every course, video lesson, and assessment is completely free for learners worldwide. Zero tuition, zero hidden fees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Rigorous 80% Assessment Gate</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Courses enforce an automated 5-question conceptual barrier after every video. Knowledge must be proven before progression.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Verified Coursera-Grade Credentials</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Earn official verifiable certificates signed by Founder & CEO Muhammad Talha upon 100% module and quiz completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & CEO statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0056D2] text-white rounded-lg flex items-center justify-center font-black text-lg">
                LWF
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">LEARN WITH FLOW</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Founded and spearheaded by <strong className="text-slate-200">Muhammad Talha (Founder & CEO)</strong>, LEARN WITH FLOW is democratizing technical education globally by removing paywalls and instituting hard proof-of-work assessments across 1,000,000 professional technical domains.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/80 text-xs">
              <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0056D2]" />
                Founder's Executive Pledge
              </div>
              <p className="text-slate-400 mt-1 italic text-[11px]">
                "Education should never be gated behind wealth. Mastery should only be gated by genuine understanding."
              </p>
              <div className="text-[10px] text-blue-400 font-bold mt-1.5">
                — Muhammad Talha, Founder & CEO
              </div>
            </div>
          </div>

          {/* Catalog & Learning */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Curriculum</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition">
                  Explore 1,000,000 Courses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition">
                  Web Engineering
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition">
                  Artificial Intelligence & ML
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition">
                  Cloud & Kubernetes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('catalog')} className="hover:text-white transition">
                  Cybersecurity & Zero-Trust
                </button>
              </li>
              <li>
                <button onClick={onOpenNewCourseModal} className="text-blue-400 hover:text-blue-300 font-semibold transition">
                  + Add Course Slot (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Leadership */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Leadership & Mission</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition">
                  About CEO Muhammad Talha
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition">
                  The 1,000,000 Course Initiative
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition">
                  Academic Honor Code
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('legal')} className="hover:text-white transition">
                  Contact Office of the CEO
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('my-learning')} className="hover:text-white transition">
                  Certificate Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Legal & Security</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('legal')} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('legal')} className="hover:text-white transition">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('legal')} className="hover:text-white transition">
                  Credential Security Rules
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('legal')} className="hover:text-white transition">
                  Accessibility Standards
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('legal')} className="hover:text-white transition">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} LEARN WITH FLOW Inc. All rights reserved. Founded & Directed by CEO Muhammad Talha.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-[#0056D2]" /> Global Free Access
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-[#0056D2] font-semibold">learnwithflow.com</span>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};
