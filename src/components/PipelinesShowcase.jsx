import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Clock,
  FileCheck2,
  HeartHandshake,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const PIPELINES = [
  {
    id: 'new-business',
    tabLabel: '1. Instant Lead-to-Policy',
    shortLabel: 'Instant Lead-to-Policy Issuance',
    icon: Briefcase,
    tagline: 'Your WhatsApp bot replies in 5 seconds, qualifies buyer budgets, and chases KYC docs automatically.',
    stages: [
      {
        name: 'New Lead',
        tag: 'NB | Fresh Inquiry',
        delay: 'Instant (0 sec)',
        waAction: 'Sends your branded personal welcome message with Term, Health, and Motor quick-reply buttons.',
        sampleMsg:
          'Namaste Amit! Thank you for messaging R. Sharma Insurance Advisory. Which plan are you exploring for your family today?',
      },
      {
        name: '5-Sec Bot Qualification',
        tag: 'NB | Auto-Scored',
        delay: '< 45 sec',
        waAction: 'Captures age, city, family size, income slab & target cover so you only get on calls with serious buyers.',
        sampleMsg: 'Age 34 • Income ₹18L+ • Looking for ₹2 Cr Term Plan. Lead Score: 92/100 (HOT).',
      },
      {
        name: 'Call Slot Booked',
        tag: 'NB | Call Booked',
        delay: 'Automated Reminder',
        waAction: 'Books a 15-minute slot on your calendar and texts a reminder 1 hour before so prospects actually pick up.',
        sampleMsg: 'Your 15-min insurance comparison call with me is confirmed for 5:00 PM today!',
      },
      {
        name: 'Insurer PDF Sent',
        tag: 'NB | Proposal Sent',
        delay: '+24h Auto Nudge',
        waAction: 'Shares your comparison quote PDF inside WhatsApp and follows up politely if unread after 24 hours.',
        sampleMsg: 'Hi Amit, here is your 2-plan comparison sheet for ₹2 Cr Term Cover. Reply QUOTE if you want rider changes.',
      },
      {
        name: 'KYC & Medical Auto-Chase',
        tag: 'NB | Underwriting',
        delay: 'Daily Gentle Chase',
        waAction: 'Prompts client for PAN, Aadhaar, and tele-medical booking without you making awkward reminder calls.',
        sampleMsg: 'Quick reminder: Upload your PAN photo right here & confirm tomorrow’s 9 AM home medical slot.',
      },
      {
        name: 'Payment Link',
        tag: 'NB | Link Sent',
        delay: '+6h Nudge',
        waAction: 'Sends official insurer checkout link and alerts your phone immediately if payment stalls.',
        sampleMsg: 'Your proposal #PR-4910 is approved! Complete your premium directly via the official insurer link below.',
      },
      {
        name: 'Policy Issued',
        tag: 'NB | Issued ✓',
        delay: 'Auto-Archived',
        waAction: 'Sends digital policy copy, saves renewal date automatically, and schedules next year’s T-30 reminder.',
        sampleMsg: 'Congratulations! Your policy is issued. I have saved your policy copy here and set your renewal tracker.',
      },
    ],
  },
  {
    id: 'renewals',
    tabLabel: '2. Autopilot Renewals',
    shortLabel: 'Autopilot Renewal & NCB Retention',
    icon: RefreshCw,
    tagline: 'Never lose a policy renewal to a diary miss or aggregator app again—T-30 to grace-period reminders run themselves.',
    stages: [
      {
        name: 'Due in 30 Days',
        tag: 'REN | Due in 30 Days',
        delay: 'T-30 Days',
        waAction: 'Sends an official, polite renewal alert highlighting policy number, NCB bonus & premium amount.',
        sampleMsg: 'Renewal Alert: Your Star Health Family Floater (₹42,500) renews in 30 days. Zero-gap renewal ready.',
      },
      {
        name: 'T-15 / T-7 Auto-Reminders',
        tag: 'REN | Follow-Up',
        delay: 'T-15 & T-7 Days',
        waAction: 'Reminds policyholders why renewing on time preserves waiting-period credits and No-Claim Bonus.',
        sampleMsg: '7 days left! Keep your 3-year waiting-period continuity intact by renewing before 30 Nov.',
      },
      {
        name: '1-Tap UPI Renewal Link',
        tag: 'REN | Link Sent',
        delay: 'T-3 Days',
        waAction: 'Delivers the direct UPI/NetBanking renewal link so clients pay in 30 seconds instead of searching online.',
        sampleMsg: 'Tap Pay Now below to renew Policy #SH-22109 in 30 seconds—your updated receipt arrives instantly.',
      },
      {
        name: 'Grace Period Rescue Alert',
        tag: 'REN | Grace Alert',
        delay: 'T+1 to T+15',
        waAction: 'Sends urgent grace-period message AND alerts your phone so you personally save high-value renewals.',
        sampleMsg: 'Urgent Notice: Your policy is in grace period. Reply CALL and I will help process it within 10 minutes.',
      },
      {
        name: 'Renewed + Thank You',
        tag: 'REN | Renewed ✓',
        delay: 'Post-Payment',
        waAction: 'Sends receipt, resets next year’s reminder clock automatically, and asks for 1-tap feedback.',
        sampleMsg: 'Thank you for renewing with me for another year! Reply anytime if you need tax certificates or cover updates.',
      },
    ],
  },
  {
    id: 'claims',
    tabLabel: '3. 24/7 Claims Desk',
    shortLabel: '24/7 Claims & Client Loyalty Desk',
    icon: HeartHandshake,
    tagline: 'Look like an elite concierge even at midnight—instant claim checklists win lifelong trust and 3x family referrals.',
    stages: [
      {
        name: 'Instant Claim Intimation',
        tag: 'CLM | Intimated',
        delay: '24/7 Instant',
        waAction: 'Client types CLAIM anytime; your bot reassures them immediately and sends an urgent alert to your phone.',
        sampleMsg: 'Don’t worry—I am right here with you. Select Claim Type: Cashless Hospitalization / Motor / Reimbursement.',
      },
      {
        name: 'Auto Checklist (Health/Motor/Life)',
        tag: 'CLM | Checklist Sent',
        delay: '< 10 sec',
        waAction: 'Automatically sends the exact required document checklist based on Health, Motor, or Life claim type.',
        sampleMsg: 'Please keep ready: 1) Policy E-Card 2) Doctor Admission Note 3) Aadhaar/PAN copy. Upload photos right here.',
      },
      {
        name: 'Document Upload in Chat',
        tag: 'CLM | Docs Collected ✓',
        delay: 'Organized Auto-Save',
        waAction: 'Collects crisp photos/PDFs inside WhatsApp so you have everything ready to submit to TPA in minutes.',
        sampleMsg: 'Got all 4 documents clearly! Submitting your pre-auth request right now.',
      },
      {
        name: 'TPA Status Nudge',
        tag: 'CLM | TPA Submitted',
        delay: 'Live Updates',
        waAction: 'Keeps anxious families calm with milestone updates and alerts you immediately if TPA raises a query.',
        sampleMsg: 'Update: Cashless pre-auth submitted to TPA (#CLM-8841). I am tracking approval live.',
      },
      {
        name: 'Claim Settled + 3x Referral Ask',
        tag: 'CLM | Settled ✓',
        delay: 'Post-Settlement',
        waAction: 'Celebrates smooth settlement and sends your personal WhatsApp referral card when trust is at its peak.',
        sampleMsg: 'So glad your ₹3.40L claim settled smoothly! If friends or relatives need a dependable advisor, share my card below.',
      },
    ],
  },
  {
    id: 'referrals',
    tabLabel: '4. MDRT Cross-Sell & Referrals',
    shortLabel: 'MDRT Cross-Sell & Referral Engine',
    icon: Sparkles,
    tagline: 'Generate new policies from your existing book every month through smart cross-sells and milestone touches.',
    stages: [
      {
        name: 'Lapsed Policy Win-Back',
        tag: 'WIN | Revival Offer',
        delay: 'T+45 / T+90',
        waAction: 'Automatically contacts old lapsed policyholders with simplified revival windows to recover dead commission.',
        sampleMsg: 'Good news: Your old policy qualifies for simplified revival until the 15th without full re-underwriting.',
      },
      {
        name: 'Term / Health Coverage Gap Pitch',
        tag: 'XSELL | Multi-Line',
        delay: 'Day 60 Post-Issuance',
        waAction: 'Spots Motor-only or Health-only clients and pitches complementary Term Life or Super Top-Up protection.',
        sampleMsg: 'Your car is covered—have you locked a ₹15L Health Super Top-Up to beat 14% medical inflation?',
      },
      {
        name: 'Birthday & Anniversary Wishes',
        tag: 'ENG | Milestone',
        delay: 'Calendar Auto-Trigger',
        waAction: 'Never miss a client’s birthday or policy anniversary—sends warm wishes under your personal signature.',
        sampleMsg: 'Happy Birthday, Vikram! Wishing your family great health. Tap here for a free annual coverage check.',
      },
      {
        name: 'Automated Family Referral Link',
        tag: 'REF | Warm Intro',
        delay: 'On Positive CSAT',
        waAction: 'Gives happy clients a 1-tap WhatsApp forward card linked directly to your Personal Referral QR.',
        sampleMsg: 'Share my 1-tap WhatsApp connect link with 2 colleagues who want honest, zero-spam insurance advice.',
      },
    ],
  },
];

export function PipelinesShowcase() {
  const [activeTabId, setActiveTabId] = useState(PIPELINES[0].id);
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  const activePipeline = PIPELINES.find((p) => p.id === activeTabId) || PIPELINES[0];
  const activeStage = activePipeline.stages[selectedStageIdx] || activePipeline.stages[0];

  const handleTabChange = (pipelineId) => {
    setActiveTabId(pipelineId);
    setSelectedStageIdx(0);
  };

  return (
    <section id="pipelines" className="scroll-mt-20 border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B132B] shadow-sm">
            <FileCheck2 className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
            <span>Pre-Built For You • Zero Flow-Building Required</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
            4 Built-In Automations Working For You 24/7
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Click any tab and stage below to inspect the exact WhatsApp messages sent automatically under your advisor
            brand.
          </p>
        </div>

        {/* Pipeline Tabs */}
        <div
          role="tablist"
          aria-label="Pre-built advisor WhatsApp automations"
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PIPELINES.map((pipeline) => {
            const Icon = pipeline.icon;
            const isActive = pipeline.id === activePipeline.id;
            return (
              <button
                key={pipeline.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(pipeline.id)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? 'border-[#0B132B] bg-[#0B132B] text-white shadow-card-hover'
                    : 'border-[#E2E8F0] bg-white text-[#0B132B] hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isActive ? 'bg-[#10B981] text-white' : 'bg-slate-100 text-[#0B132B]'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-heading text-sm font-bold leading-snug">{pipeline.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pipeline Card */}
        <div className="mt-6 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-heading text-xl font-extrabold text-[#0B132B]">{activePipeline.shortLabel}</h3>
              <p className="mt-1 text-sm text-slate-600">{activePipeline.tagline}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {activePipeline.stages.length} Ready-to-Run Stages
            </span>
          </div>

          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Click any stage to preview your automated WhatsApp message:
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {activePipeline.stages.map((stage, idx) => {
                const isSelected = idx === selectedStageIdx;
                return (
                  <React.Fragment key={stage.name}>
                    <button
                      type="button"
                      onClick={() => setSelectedStageIdx(idx)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left text-xs font-bold transition-all sm:text-sm ${
                        isSelected
                          ? 'border-[#10B981] bg-emerald-50 text-[#0B132B] ring-2 ring-[#10B981]/30'
                          : 'border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-extrabold ${
                          isSelected ? 'bg-[#10B981] text-white' : 'bg-[#0B132B] text-white'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{stage.name}</span>
                    </button>
                    {idx < activePipeline.stages.length - 1 && (
                      <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-400 sm:inline" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Stage Inspector */}
          <div className="mt-6 grid gap-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-[#0B132B] px-2.5 py-1 text-xs font-bold text-white">
                  Stage {selectedStageIdx + 1}: {activeStage.name}
                </span>
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {activeStage.tag}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {activeStage.delay}
                </span>
              </div>

              <h4 className="mt-4 font-heading text-sm font-bold uppercase tracking-wider text-slate-500">
                What ADVYU Does Automatically For You
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-[#0B132B] sm:text-base">{activeStage.waAction}</p>
            </div>

            <div className="rounded-xl border border-emerald-200/80 bg-white p-4 shadow-sm lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Bot className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                <span>WhatsApp Sent Under Your Name</span>
              </div>
              <div className="mt-2.5 rounded-lg rounded-tl-none border border-emerald-100 bg-emerald-50/70 p-3 text-xs leading-relaxed text-slate-800 sm:text-sm">
                “{activeStage.sampleMsg}”
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>Meta-Approved Ban-Safe Template ✓✓</span>
                <span>Zero Manual Typing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
