import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'Will using automated WhatsApp reminders ban my personal or business number?',
    answer:
      'No — ADVYU runs 100% on the Official Meta WhatsApp Business API using pre-approved templates and proper opt-in controls. Unlike unauthorized desktop bulk-senders or grey Chrome extensions, your number and client chat history stay completely safe from bans.',
  },
  {
    question: 'Do I need coding skills, a full-time laptop, or office staff to run this?',
    answer:
      'Zero technical skills needed. Our team configures all 4 automations for you in 48 hours. Once live, you get hot lead alerts and can reply right from your phone or laptop without hiring an extra assistant.',
  },
  {
    question: 'How do I import my existing policyholders from diaries or Excel sheets?',
    answer:
      'During onboarding, just share your simple Excel or CSV sheet with client name, WhatsApp number, insurer, policy number, and renewal due date. We upload everything for you so T-30, T-15, and T-7 reminders begin firing automatically.',
  },
  {
    question: 'Does this work even if I am not running Facebook or Instagram ads yet?',
    answer:
      'Yes! Most solo advisors see immediate ROI just from automating renewals on their existing policy book and adding their Personal Referral QR Code to visiting cards, email signatures, and WhatsApp statuses—then plug in Meta ads whenever ready.',
  },
  {
    question: 'Can I customize messages for LIC, Term Life, Health, and Motor policies?',
    answer:
      'Yes — all 4 pre-built pipelines come ready with wording tailored specifically to Indian Term Life, Health Mediclaim, Motor, and Endowment/ULIP policies, personalized with your own advisor name and signature.',
  },
  {
    question: 'What happens later if my practice grows and I hire sub-agents or callers?',
    answer:
      'Your ADVYU advisor workspace upgrades smoothly anytime. You can start solo today and unlock multi-agent team portals whenever you decide to expand—with zero data migration.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F8FAFC] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B132B]">
            <HelpCircle className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
            <span>Advisor Questions Answered</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Everything independent insurance advisors ask before switching from manual WhatsApp &amp; Excel.
          </p>
        </div>

        <div className="mt-10 space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? 'border-[#0B132B] bg-[#F8FAFC]' : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] sm:px-6 sm:py-5"
                >
                  <span className="font-heading text-base font-bold text-[#0B132B] sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#10B981]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200/80 px-5 pb-5 pt-3.5 text-sm leading-relaxed text-slate-700 sm:px-6 sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
