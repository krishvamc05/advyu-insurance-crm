import React, { useState } from 'react';
import { CheckCircle2, HeartHandshake, Lock, MessageSquareHeart, ShieldCheck, Users } from 'lucide-react';
import claimTrustFamilyImg from '../assets/images/claim-trust-family.jpg';

const LOYALTY_PILLARS = [
  {
    icon: HeartHandshake,
    title: 'Midnight Claim Concierge (Without Waking Up Late)',
    description:
      'If a policyholder faces an emergency hospitalization or accident at 11:30 PM, your WhatsApp assistant immediately sends the exact insurer checklist, collects policy details, and alerts you with one neat summary.',
  },
  {
    icon: ShieldCheck,
    title: '100% Ban-Safe Official WhatsApp Protection',
    description:
      'Never risk getting your personal WhatsApp number banned by unofficial bulk-messaging apps. ADVYU runs on Meta’s Official WhatsApp Business API so your client list stays safe forever.',
  },
  {
    icon: Users,
    title: 'Turn Every Smooth Claim & Renewal Into 3x Referrals',
    description:
      'Right after a claim settles or policy renews, ADVYU automatically sends a polite thank-you note with your 1-tap shareable digital card—bringing warm family & colleague leads directly to you.',
  },
];

export function ClaimsLoyaltySection() {
  const [previewMode, setPreviewMode] = useState('claim');

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Copy & Pillars */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B132B] shadow-sm">
              <Lock className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
              <span>Ban-Safe • Client Trust &amp; Referral Engine</span>
            </div>

            <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
              Deliver Big-Firm Service As a Solo Advisor—And Win Clients For Life
            </h2>

            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Clients don’t leave advisors over ₹500 price differences—they leave when responses feel slow during
              renewals or claims. ADVYU makes you look fast, organized, and dependable 24/7.
            </p>

            <div className="mt-8 space-y-5">
              {LOYALTY_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B132B] text-white">
                      <Icon className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-extrabold text-[#0B132B]">{pillar.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Realistic Family Image + Interactive WhatsApp Preview */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-3.5 shadow-card-hover sm:p-4">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={claimTrustFamilyImg}
                  alt="Smiling relieved Indian couple on their sofa reading a WhatsApp claim settlement message from their trusted insurance advisor"
                  className="h-[250px] w-full object-cover object-top sm:h-[340px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Client Peace of Mind = Warm Referrals
                  </span>
                  <span className="rounded-full bg-[#0B132B]/85 px-3 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur-md">
                    Zero extra staff needed
                  </span>
                </div>
              </div>

              {/* Interactive Moment Toggle */}
              <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B132B]">
                    <MessageSquareHeart className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    See How Clients Experience You
                  </span>
                  <div className="inline-flex rounded-lg border border-[#E2E8F0] bg-white p-0.5 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('claim')}
                      className={`rounded-md px-2.5 py-1 transition-colors ${
                        previewMode === 'claim' ? 'bg-[#0B132B] text-white' : 'text-slate-600 hover:text-[#0B132B]'
                      }`}
                    >
                      11:30 PM Claim Help
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode('referral')}
                      className={`rounded-md px-2.5 py-1 transition-colors ${
                        previewMode === 'referral' ? 'bg-[#10B981] text-white' : 'text-slate-600 hover:text-[#0B132B]'
                      }`}
                    >
                      Referral Multiplier
                    </button>
                  </div>
                </div>

                {previewMode === 'claim' ? (
                  <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700">
                    <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                      <strong className="text-[#0B132B]">Client (11:32 PM):</strong> “Need cashless hospital admission for
                      my father at Apollo.”
                    </div>
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-slate-800">
                      <strong className="text-emerald-800">Your ADVYU Bot (11:32 PM):</strong> “We’re right here with
                      you! Upload 1) Policy E-Card &amp; 2) Doctor Admission Note below—I’ve already alerted your advisor
                      with high priority.”
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-slate-800">
                      <strong className="text-emerald-800">Auto-Follow-Up After Claim Settlement:</strong> “Thrilled your
                      ₹3.4L claim settled smoothly! If any family member wants honest cover guidance, share my 1-tap
                      WhatsApp card below.”
                    </div>
                    <div className="rounded-lg bg-white p-2.5 border border-slate-200 font-semibold text-[#0B132B]">
                      Result: Client forwards your QR card → 2 new Term &amp; Health leads enter your bot automatically.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
