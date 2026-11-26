import React from 'react';
import { Bot, CalendarCheck, Flame, Megaphone, QrCode, Zap } from 'lucide-react';
import socialLeadsLifestyleImg from '../assets/images/social-leads-lifestyle.jpg';

const STEPS = [
  {
    step: '01',
    icon: Megaphone,
    title: 'Instagram / Facebook Ad or Personal Visiting Card QR',
    description:
      'Prospects tap your Click-to-WhatsApp Reel/Feed ad or scan the WhatsApp QR on your digital card or WhatsApp status.',
  },
  {
    step: '02',
    icon: Bot,
    title: '5-Sec Bot Qualifies Age, Income & Family Cover',
    description:
      'While you’re driving or in a meeting, ADVYU greets them instantly and collects age, city, annual income & policy goal.',
  },
  {
    step: '03',
    icon: Flame,
    title: 'Auto-Scored Hot / Warm / Cold + Phone Alert',
    description:
      'Serious buyers get scored 80+ (HOT) and pinged directly to your phone so you never waste evenings calling junk leads.',
  },
  {
    step: '04',
    icon: CalendarCheck,
    title: 'Consultation Booked Straight Into Your Calendar',
    description:
      'Qualified prospects pick a 15-minute call time themselves—so you walk into pre-sold conversations ready to close.',
  },
];

export function SocialLeadEngine() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Realistic Lifestyle Visual */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#0B132B] shadow-card-hover">
              <img
                src={socialLeadsLifestyleImg}
                alt="Smiling Indian female insurance advisor reviewing pre-qualified inbound WhatsApp leads on her phone at a bright cafe table"
                className="h-[320px] w-full object-cover object-top sm:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/15 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/15 bg-[#0B132B]/90 p-3.5 text-white backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-emerald-400 sm:text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <QrCode className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Instagram Reel Ad → WhatsApp Bot
                  </span>
                  <span>4 sec ago</span>
                </div>
                <p className="mt-1.5 text-xs font-bold leading-snug text-white sm:text-sm">
                  “HOT Lead: Rahul M. (Age 33, ₹22L Income) wants ₹2 Cr Term Plan — Call booked for 6:00 PM”
                </p>
              </div>
            </div>
          </div>

          {/* Right 4-Step Engine */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Zap className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
              <span>How It Works • Zero Manual Cold Calling</span>
            </div>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
              Turn Instagram, Facebook &amp; Referrals Into Booked Policy Calls
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Whether leads come from Meta ads or referrals scanning your QR code, ADVYU qualifies every buyer before you
              ever pick up the phone.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B132B] text-white">
                        <Icon className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-base font-extrabold text-[#0B132B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
