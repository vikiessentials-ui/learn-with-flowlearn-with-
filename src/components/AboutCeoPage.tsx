import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Heart, 
  Globe2, 
  Users, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Target,
  BookOpen,
  Briefcase
} from 'lucide-react';

interface AboutCeoPageProps {
  onExploreCourses: () => void;
  onOpenNewCourseModal: () => void;
}

export const AboutCeoPage: React.FC<AboutCeoPageProps> = ({
  onExploreCourses,
  onOpenNewCourseModal,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Header */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0056D2] border border-blue-200 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          The Leadership & Vision Behind LEARN WITH FLOW
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Democratizing World-Class Tech Education.
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          How Founder & CEO Muhammad Talha is tearing down educational paywalls, instituting rigorous 80% logic assessment gates, and creating 1,000 free certified pathways for learners worldwide.
        </p>
      </section>

      {/* CEO Executive Spotlight Card */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-12 items-center">
          {/* Avatar / Portrait graphic representation */}
          <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#003B95] via-[#0056D2] to-blue-400 p-1.5 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center overflow-hidden relative">
                  <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-50 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl font-serif font-black text-[#0056D2] select-none">
                      MT
                    </span>
                  </div>
                </div>
              </div>

              {/* Founder Badge */}
              <div className="absolute bottom-1 right-2 bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Founder & CEO</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Muhammad Talha</h2>
              <p className="text-[#0056D2] font-semibold text-sm mt-0.5">
                Founder & Chief Executive Officer
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Architect of LEARN WITH FLOW • Tech Evangelist
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> 100% Free Education Pledge
              </span>
            </div>
          </div>

          {/* CEO Narrative & Quote */}
          <div className="md:col-span-7 space-y-5">
            <div className="border-l-4 border-[#0056D2] pl-4 space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-[#0056D2]">
                Founder's Manifest
              </div>
              <blockquote className="text-lg sm:text-xl font-serif italic text-slate-800 leading-snug">
                "We reject the belief that elite technical knowledge belongs behind subscription walls and steep university tuition. At LEARN WITH FLOW, our tuition is zero—but our standards are uncompromising. Pass the 80% test, earn your verifiable credential, and build the future."
              </blockquote>
            </div>

            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Muhammad Talha established <strong>LEARN WITH FLOW</strong> to solve a fundamental paradox in modern education: while digital content is abundant, genuine proof-of-work credentials and structured curricula have been locked behind predatory paywalls.
              </p>
              <p>
                Under Talha's leadership, the platform is expanding to <strong>1,000 rigorous technical specializations</strong> spanning Full-Stack Web Development, LLMs & Generative AI, Cloud Infrastructure, and Ethical Hacking. Unlike platforms where video completion alone yields certificates, LEARN WITH FLOW mandates an automated 5-question logic assessment after every lesson with a strict 80% passing threshold.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <div className="text-xl font-extrabold text-[#0056D2]">1,000</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Course Slots</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <div className="text-xl font-extrabold text-slate-900">$0.00</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Forever Free</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <div className="text-xl font-extrabold text-emerald-600">80%</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Passing Gate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Operational Pillars */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">The LEARN WITH FLOW Philosophy</h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Engineered from first principles to guarantee authentic skill development without commercial exploitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#0056D2] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">100% Free Forever</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No credit cards required. No tiered subscriptions. No trial periods that expire. Every single course slot and assessment is accessible to anyone on Earth with an internet connection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Strict 80% Assessment Gating</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Watching a video is passive; solving problems is active. Every video triggers a 5-question conceptual logic exam. You must score 80%+ to unlock the next video, guaranteeing genuine comprehension.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verifiable Coursera-Style Proof</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Graduates receive an official certificate signed by Founder & CEO Muhammad Talha featuring unique cryptographic-style Verification IDs and instant online verification for employers.
            </p>
          </div>
        </div>
      </section>

      {/* The 1,000,000 Courses Initiative Blueprint */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Strategic Roadmap
            </span>
            <h3 className="text-2xl font-bold">The 1,000,000 Course Capacity Blueprint</h3>
          </div>
          <button
            onClick={onOpenNewCourseModal}
            className="bg-[#0056D2] hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Admin: Open Course Architect</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Under the directive of Founder & CEO Muhammad Talha, LEARN WITH FLOW has achieved an enterprise catalog capacity of <strong>1,000,000 accredited technical courses</strong> across 8 strategic engineering verticals: Web Systems, Artificial Intelligence, Cloud Infrastructure, Ethical Hacking, Data Pipelines, High-Availability Systems, Mobile Platforms, and Design Engineering.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-blue-400">Web Engineering</div>
            <div className="text-slate-400 text-[11px] mt-1">TypeScript, React, Node, REST & GraphQL</div>
          </div>
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-blue-400">AI & LLMs</div>
            <div className="text-slate-400 text-[11px] mt-1">Transformers, RAG, PyTorch, Multi-Agent Systems</div>
          </div>
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-blue-400">Cloud & DevOps</div>
            <div className="text-slate-400 text-[11px] mt-1">Kubernetes, Docker, Terraform, CI/CD</div>
          </div>
          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="font-bold text-blue-400">Cybersecurity</div>
            <div className="text-slate-400 text-[11px] mt-1">OWASP, Penetration Testing, Zero-Trust Architecture</div>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="text-center py-6 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Start Your Free Journey Today</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Enroll in any course, complete video lessons, and earn your official certificate.
        </p>
        <button
          onClick={onExploreCourses}
          className="bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition inline-flex items-center gap-2"
        >
          <span>Explore 1,000,000 Free Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
