import React from 'react';
import { AlertTriangle, Ban, CalendarX2, Clock3, TrendingDown } from 'lucide-react';
import overwhelmedAgentImg from '../assets/images/pain-overwhelmed-agent.jpg';

const SOLO_PAINS = [
  {
    icon: CalendarX2,
    badge: 'Leak #1 • Missed Renewals',
    title: 'Silent Policy Lapses & Diary Chaos',
    description:
      'Tracking renewal dates in physical diaries or Excel means forgetting T-30 and T-7 follow-ups—and clients quietly renewing on aggregator apps instead of with you.',
    metric: '10–15% avoidable renewal commission lost yearly',
  },
  {
    icon: TrendingDown,
    badge: 'Leak #2 • Speed-to-Lead',
    title: 'Cold Instagram & Facebook Leads',
    description:
      'When you are driving or sitting with a family, social leads wait 2–4 hours for your reply and buy from the first advisor who messages back in 10 seconds.',
    metric: '78% of social prospects go cold after 15 mins',
  },
  {
    icon: Clock3,
    badge: 'Leak #3 • Evening Admin',
    title: 'Endless Manual KYC & Quote Chasing',
    description:
      'Copy-pasting insurer PDFs every night, begging for PAN/Aadhaar uploads, and reminding clients for medicals steals hours you should spend closing policies.',
    metric: '12+ hours wasted every week on manual follow-ups',
  },
  {
    icon: Ban,
    badge: 'Leak #4 • Number Ban & Referrals',
    title: 'WhatsApp Ban Risk & Forgotten Referrals',
    description:
      'Sending bulk broadcasts from personal numbers or cracked tools risks permanently banning your client WhatsApp—while happy clients are never nudged to refer friends.',
    metric: '1 ban erases years of client trust overnight',
  },
];

export function RevenueLeaksSection() {
  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
            <span>Why Hard-Working Advisors Hit an Income Ceiling</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
            The 4 Daily Traps Costing Solo Agents Lakhs in Commission
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            You don’t have a sales talent problem—you have a manual follow-up bottleneck. Doing everything 1-by-1 on
            personal WhatsApp doesn’t scale past 150 policies.
          </p>
        </div>

        {/* Visual Storytelling Split: Realistic Overwhelmed Agent Photo + 4 Pain Cards */}
        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left Realistic Pain Image Card */}
          <div className="flex flex-col overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#0B132B] text-white shadow-card lg:col-span-5">
            <div className="relative h-72 w-full sm:h-80 lg:h-full lg:min-h-[360px]">
              <img
                src={overwhelmedAgentImg}
                alt="Exhausted Indian insurance agent working late at night surrounded by paper policy files, handwritten diary notes, Excel spreadsheet, and unread messages"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block rounded-md border border-amber-400/40 bg-amber-500/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  10:45 PM Reality Check
                </span>
                <h3 className="mt-2.5 font-heading text-xl font-extrabold leading-snug text-white">
                  Still Updating Policy Excel Sheets &amp; Chasing Renewals at Night?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Every unread WhatsApp query and missed diary reminder quietly hands your hard-earned commission to a
                  competitor.
                </p>
              </div>
            </div>
          </div>

          {/* Right 2x2 Pain Agitation Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {SOLO_PAINS.map((leak) => {
              const Icon = leak.icon;
              return (
                <article
                  key={leak.title}
                  className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B132B] text-white">
                        <Icon className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
                      </span>
                      <span className="rounded-md border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                        {leak.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-bold text-[#0B132B]">{leak.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{leak.description}</p>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-semibold text-rose-600">
                    {leak.metric}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
