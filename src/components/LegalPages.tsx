import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Mail, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Building,
  UserCheck
} from 'lucide-react';

interface LegalPagesProps {
  initialSubTab?: 'privacy' | 'terms' | 'contact';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ initialSubTab = 'privacy' }) => {
  const [subTab, setSubTab] = useState<'privacy' | 'terms' | 'contact'>(initialSubTab);

  // Contact Form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill out all required fields.");
      return;
    }
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setContactForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  const FAQS = [
    {
      q: "Why does LEARN WITH FLOW require an 80% passing score on every lesson quiz?",
      a: "Founder & CEO Muhammad Talha established the 80% threshold to guarantee that our certificates represent real, undeniable competence. Anyone can play a video in the background, but our rigorous 5-question logic assessments ensure students master key concepts before advancing."
    },
    {
      q: "Are the courses and certificates truly 100% free?",
      a: "Yes. Every single course slot, video lesson, assessment, and verified Coursera-style certificate signed by CEO Muhammad Talha is completely free of charge. There are no subscriptions, paywalls, or hidden graduation fees."
    },
    {
      q: "Can employers verify the authenticity of my certificate?",
      a: "Yes! Every certificate issued generates a unique Verification ID (e.g. LWF-2026-XXXXX) registered in our verification system. Employers can visit learnwithflow.com/verify to validate the student's name, completion date, and curriculum scope."
    },
    {
      q: "How many courses are available on LEARN WITH FLOW?",
      a: "The platform's dynamic capacity engine supports up to 1,000 course slots spanning Web Development, Artificial Intelligence, Cloud Computing, Cybersecurity, Data Science, and Systems Architecture."
    },
    {
      q: "Can instructors or community leaders add or customize courses?",
      a: "Yes! Using the interactive Admin Course Editor, qualified contributors can configure course slots, upload custom video links, and formulate 5-question conceptual logic quizzes."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Sub-navigation tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1.5 shadow-xs">
        <button
          onClick={() => setSubTab('privacy')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 ${
            subTab === 'privacy'
              ? 'bg-[#0056D2] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setSubTab('terms')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 ${
            subTab === 'terms'
              ? 'bg-[#0056D2] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>

        <button
          onClick={() => setSubTab('contact')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 ${
            subTab === 'contact'
              ? 'bg-[#0056D2] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Us & FAQ</span>
        </button>
      </div>

      {/* PRIVACY POLICY */}
      {subTab === 'privacy' && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
              Legal Document
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              LEARN WITH FLOW Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: September 2026 • Endorsed by Office of the CEO Muhammad Talha
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Our Commitment to Student Privacy</h2>
            <p>
              At <strong>LEARN WITH FLOW</strong>, led by Founder & CEO Muhammad Talha, we believe educational platforms must protect learner dignity. We do NOT monetize learner personal data, sell private information to third-party ad networks, or run deceptive behavioral tracking.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Data We Collect and Why</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Learner Name & Profile:</strong> Used exclusively to engrave recipient names onto verifiable Coursera-style certificates.
              </li>
              <li>
                <strong>Assessment & Quiz Submissions:</strong> Recorded locally and within platform memory to evaluate the 80% passing threshold and unlock subsequent lessons.
              </li>
              <li>
                <strong>Course Progress & Enrolment:</strong> Maintained to ensure seamless resumption of technical coursework.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Certificate Verification Public Data</h2>
            <p>
              When you complete 100% of a course and unlock an official certificate, the associated Verification ID (e.g. <code>LWF-2026-XXXXX</code>), issue date, course title, and recipient name are publicly verifiable via our verification portal so prospective employers can authenticate credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Contacting the Data Protection Officer</h2>
            <p>
              For privacy queries or data removal requests, contact the Founder's executive office directly at <code className="text-[#0056D2] font-semibold">privacy@learnwithflow.com</code>.
            </p>
          </section>
        </div>
      )}

      {/* TERMS OF SERVICE */}
      {subTab === 'terms' && (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
              Legal Agreement
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Terms of Service & Academic Honor Code
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: September 2026 • LEARN WITH FLOW Global EdTech Infrastructure
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing courses, video lectures, and assessments on <strong>LEARN WITH FLOW</strong>, you agree to abide by these Terms of Service and our Academic Honor Code enacted by Founder & CEO Muhammad Talha.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. The 80% Assessment Gating Standard</h2>
            <p>
              Students acknowledge that advancement through video curricula requires achieving a minimum passing score of <strong>80% on each module's 5-question conceptual logic evaluation</strong>. Unlocking subsequent lessons requires satisfying this prerequisite. Unlimited retakes are provided without penalty.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Certificate Authenticity & Prohibited Conduct</h2>
            <p>
              Official certificates bearing the signature of Muhammad Talha represent verified academic accomplishment. Falsifying completion, tampering with verification hashes, or redistributing proprietary question banks under fraudulent pretexts will result in permanent credential revocation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Intellectual Property & 100% Free Access</h2>
            <p>
              All curriculum modules, video lessons, and logic assessment suites are provided free of monetary cost to learners globally under LEARN WITH FLOW's open educational mandate.
            </p>
          </section>
        </div>
      )}

      {/* CONTACT US & FAQ */}
      {subTab === 'contact' && (
        <div className="space-y-8">
          {/* Contact Inquiry Form */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                Support & Inquiries
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Contact Office of the Founder & CEO
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have a question about our 1,000-course initiative, corporate partnership, or certificate verification? Reach out below.
              </p>
            </div>

            {submittedMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your message has been received by the LEARN WITH FLOW leadership team. We will respond promptly.
                </span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject Category
                </label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0056D2]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Certificate Verification">Certificate Verification Assistance</option>
                  <option value="Curriculum Suggestion">Curriculum Suggestion (1,000 Courses Initiative)</option>
                  <option value="Partnership with CEO">Partnership with CEO Muhammad Talha</option>
                  <option value="Technical Issue">Technical / Assessment Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your inquiry..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0056D2] leading-relaxed"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Leadership</span>
                </button>
              </div>
            </form>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                Common Questions
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-3">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-[#0056D2] transition py-1"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#0056D2] shrink-0" />
                        {faq.q}
                      </span>
                      <span className="text-slate-400">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-xs text-slate-600 leading-relaxed pl-6 pr-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
