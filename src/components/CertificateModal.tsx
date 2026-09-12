import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  Download, 
  Share2, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Printer, 
  Sparkles,
  Edit2
} from 'lucide-react';

interface CertificateModalProps {
  course: Course;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  onClose: () => void;
  onVerifyOnline?: (certId: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  studentName,
  onUpdateStudentName,
  onClose,
  onVerifyOnline,
}) => {
  // Generate a deterministic certificate verification ID based on course ID and year
  const verificationId = `LWF-2026-${(course.id * 1337 + 78241) % 90000 + 10000}`;
  const issueDate = "September 11, 2026";
  const verificationUrl = `https://learnwithflow.com/verify/${verificationId}`;

  const [copied, setCopied] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentName, setCurrentName] = useState(studentName);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `I am proud to share that I have officially earned a verified Certificate of Completion in "${course.title}" from LEARN WITH FLOW, founded and led by Muhammad Talha (Founder & CEO). Verification ID: ${verificationId}`
    );
    const url = encodeURIComponent(verificationUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentName.trim()) {
      onUpdateStudentName(currentName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-slate-100 rounded-2xl max-w-4xl w-full max-h-[96vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden my-auto">
        {/* Action Header Bar (No-Print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0056D2] flex items-center justify-center font-black text-sm">
              LWF
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Official Coursera-Grade Credential</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.2 rounded-full">
                  Verified
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Issued by Founder & CEO Muhammad Talha
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Print/Download Button */}
            <button
              id="download-pdf-btn"
              onClick={handlePrint}
              className="bg-[#0056D2] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF / Print</span>
            </button>

            {/* LinkedIn Share Button */}
            <button
              id="share-linkedin-btn"
              onClick={handleShareLinkedIn}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share to LinkedIn</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto flex justify-center bg-slate-200/70">
          {/* Printable Container */}
          <div
            id="printable-certificate"
            className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border-8 border-slate-100 p-8 sm:p-12 relative text-slate-800 overflow-hidden"
            style={{ minHeight: '540px' }}
          >
            {/* Top Royal Blue Accent Bar */}
            <div className="h-3.5 bg-[#0056D2] -mt-8 sm:-mt-12 -mx-8 sm:-mx-12 mb-8"></div>

            {/* Double Gold Border with Fine Corner Ornaments */}
            <div className="border-4 border-double border-amber-500/80 rounded-lg p-6 sm:p-8 relative bg-radial from-amber-50/20 via-white to-white">
              {/* Corner Ornaments in Gold */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-600"></div>
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber-600"></div>
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-600"></div>
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-600"></div>

              {/* Watermark Logo in center background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <div className="text-9xl font-black text-slate-900 tracking-tighter">
                  LWF
                </div>
              </div>

              {/* Header Title */}
              <div className="text-center space-y-3 relative z-10">
                <div className="flex items-center justify-center gap-2 text-[#0056D2] font-black tracking-widest text-xs sm:text-sm uppercase">
                  <span>LEARN WITH FLOW</span>
                  <span className="text-slate-300">|</span>
                  <span>VERIFIED COURSE CERTIFICATE</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-serif text-slate-900 font-bold tracking-tight">
                  Certificate of Completion
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
                  This is officially awarded to
                </p>

                {/* Recipient Name in Serif Typography */}
                <div className="py-2">
                  <div className="text-2xl sm:text-4xl font-serif font-bold text-[#0056D2] border-b-2 border-slate-200 pb-2 max-w-md mx-auto tracking-wide">
                    {studentName}
                  </div>
                </div>

                {/* Formal Statement */}
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-1">
                  for successfully demonstrating technical mastery, completing all curriculum modules, and passing each strict 80% logic assessment barrier in
                </p>

                {/* Course Title */}
                <div className="text-base sm:text-xl font-bold text-slate-900 max-w-lg mx-auto py-1">
                  {course.title}
                </div>

                <div className="text-[11px] text-slate-500">
                  Curriculum category: <strong>{course.category}</strong> • Duration: <strong>{course.estimatedHours} Hours of Rigorous Study</strong>
                </div>
              </div>

              {/* Bottom Credentials, Official Signature, and Verification Seal */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                {/* Bottom Left Signature Section (Explicitly labeled Muhammad Talha, Founder & CEO) */}
                <div className="text-center sm:text-left space-y-1.5">
                  {/* Executive fluid cursive digital signature */}
                  <div className="relative pb-1 select-none inline-block">
                    <svg className="w-48 h-12 text-[#0056D2]" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Fluid cursive calligraphy stroke representing 'Muhammad Talha' */}
                      <path
                        d="M10 42 C 25 15, 30 10, 42 40 C 48 20, 52 18, 58 38 C 65 30, 72 32, 80 44 C 95 20, 105 18, 120 40 C 130 25, 145 22, 160 38 C 175 22, 190 28, 205 35 C 215 32, 225 30, 235 34 M 15 48 C 60 52, 130 50, 220 46"
                        stroke="#003B95"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="h-0.5 bg-slate-200 w-full mt-0.5"></div>
                  </div>
                  <div className="text-xs font-bold text-slate-900 tracking-wide flex items-center gap-1">
                    <span>Muhammad Talha</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#0056D2]">
                    Founder & CEO, LEARN WITH FLOW
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Executive Authority of Academic Accreditation
                  </div>
                </div>

                {/* Center Official Gold/Royal Blue Security Badge Seal */}
                <div className="flex flex-col items-center select-none">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* SVG Gold Medal & Laurel Ribbon */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                      {/* Ribbon tails */}
                      <path d="M 35 70 L 25 95 L 45 85 L 50 95 L 50 70 Z" fill="#003B95" />
                      <path d="M 65 70 L 75 95 L 55 85 L 50 95 L 50 70 Z" fill="#002875" />
                      {/* Outer gold starburst / circle */}
                      <circle cx="50" cy="45" r="38" fill="#D97706" />
                      <circle cx="50" cy="45" r="35" fill="#FBBF24" />
                      <circle cx="50" cy="45" r="32" fill="#0056D2" stroke="#FEF3C7" strokeWidth="2" />
                      {/* Inner Star */}
                      <path
                        d="M 50 25 L 54 36 L 66 36 L 56 44 L 60 56 L 50 48 L 40 56 L 44 44 L 34 36 L 46 36 Z"
                        fill="#FEF3C7"
                      />
                    </svg>
                  </div>
                  <span className="text-[9px] font-extrabold text-[#0056D2] tracking-wider uppercase mt-1">
                    VERIFIED CREDENTIAL
                  </span>
                </div>

                {/* Bottom Right Verification ID & Live QR Section */}
                <div className="flex items-center gap-3 text-right">
                  {/* Live SVG QR Code Graphic pointing to learnwithflow.com/verify */}
                  <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col items-center">
                    <svg className="w-14 h-14" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="29" height="29" fill="white"/>
                      {/* Top-left position marker */}
                      <rect x="2" y="2" width="7" height="7" fill="#0056D2" rx="1"/>
                      <rect x="3.5" y="3.5" width="4" height="4" fill="white"/>
                      <rect x="4.5" y="4.5" width="2" height="2" fill="#0056D2"/>

                      {/* Top-right position marker */}
                      <rect x="20" y="2" width="7" height="7" fill="#0056D2" rx="1"/>
                      <rect x="21.5" y="3.5" width="4" height="4" fill="white"/>
                      <rect x="22.5" y="4.5" width="2" height="2" fill="#0056D2"/>

                      {/* Bottom-left position marker */}
                      <rect x="2" y="20" width="7" height="7" fill="#0056D2" rx="1"/>
                      <rect x="3.5" y="21.5" width="4" height="4" fill="white"/>
                      <rect x="4.5" y="22.5" width="2" height="2" fill="#0056D2"/>

                      {/* Timing & Data Cells */}
                      <rect x="11" y="3" width="2" height="2" fill="#0F172A"/>
                      <rect x="15" y="3" width="2" height="2" fill="#0F172A"/>
                      <rect x="11" y="7" width="2" height="2" fill="#0F172A"/>
                      <rect x="13" y="11" width="3" height="3" fill="#0056D2"/>
                      <rect x="3" y="11" width="2" height="2" fill="#0F172A"/>
                      <rect x="7" y="13" width="2" height="2" fill="#0F172A"/>
                      <rect x="18" y="11" width="2" height="2" fill="#0F172A"/>
                      <rect x="22" y="13" width="3" height="2" fill="#0F172A"/>
                      <rect x="11" y="17" width="2" height="4" fill="#0F172A"/>
                      <rect x="15" y="19" width="3" height="2" fill="#0F172A"/>
                      <rect x="20" y="18" width="3" height="3" fill="#0056D2"/>
                      <rect x="24" y="22" width="3" height="3" fill="#0F172A"/>
                      <rect x="11" y="24" width="4" height="2" fill="#0F172A"/>
                    </svg>
                    <span className="text-[8px] font-bold text-slate-400 mt-0.5">SCAN TO VERIFY</span>
                  </div>

                  <div className="text-center sm:text-right space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      VERIFICATION ID
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                      {verificationId}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Issued: <strong>{issueDate}</strong>
                    </div>
                    <div className="text-[10px] text-[#0056D2] font-semibold underline cursor-pointer">
                      learnwithflow.com/verify
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls (No-Print) */}
        <div className="no-print bg-white p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="Enter Student Name"
                  className="px-2.5 py-1 border border-slate-300 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-[#0056D2]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-[#0056D2] text-white rounded text-xs font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="px-2 py-1 text-slate-500 text-xs"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#0056D2] transition font-semibold"
                title="Change name on certificate"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#0056D2]" />
                <span>Recipient: <strong>{studentName}</strong> (Click to edit)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#0056D2] font-semibold transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Verification URL</span>
                </>
              )}
            </button>

            {onVerifyOnline && (
              <button
                onClick={() => onVerifyOnline(verificationId)}
                className="flex items-center gap-1 text-[#0056D2] hover:underline font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verify Credential Authenticity</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
