import React from 'react';
import { CalendarCheck, Database, Layers, QrCode, ShieldCheck } from 'lucide-react';

const LAUNCH_STEPS = [
  {
    time: 'Hour 1–6',
    icon: ShieldCheck,
    title: 'Official Advisor WhatsApp Number & Brand Setup',
    description:
      'We connect your Official WhatsApp Business API number cleanly under your personal advisor or agency identity—100% Meta compliant.',
  },
  {
    time: 'Hour 7–24',
    icon: Layers,
    title: 'All 4 Insurance Automations Pre-Loaded For You',
    description:
      'Lead qualification, T-30 to grace renewal reminders, 24/7 claim checklists & birthday/referral sequences pre-installed.',
  },
  {
    time: 'Hour 25–36',
    icon: QrCode,
    title: 'Instagram/Facebook Ads & Personal QR Connected',
    description:
      'Plug in Click-to-WhatsApp ads (or start organically with your custom Referral QR code for visiting cards and WhatsApp status).',
  },
  {
    time: 'Hour 37–48',
    icon: Database,
    title: 'Diary / Excel Renewal Import & 1-on-1 Walkthrough',
    description:
      'We upload your existing policyholders with policy renewal dates and walk you through your simple mobile/desktop dashboard live.',
  },
];

export function GoLiveRoadmap() {
  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F8FAFC] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B132B]">
            <CalendarCheck className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
            <span>Zero Technical Headaches • Done-For-You</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
            Go Live Under Your Own Brand in 48 Hours
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            No complicated software to configure yourself. Our onboarding team builds your personal WhatsApp assistant
            and imports your book in 2 days.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LAUNCH_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.time}
                className="relative flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-card"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-lg bg-[#0B132B] px-3 py-1 font-heading text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    {item.time}
                  </span>
                  <Icon className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                </div>

                <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-[#0B132B]">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
