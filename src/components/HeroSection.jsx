import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import heroAdvisorImg from '../assets/images/hero-advisor.jpg';
import { getHeroWhatsAppDemoLink } from '../config/siteConfig';

const TRUST_ITEMS = [
  '100% Ban-Safe Official WhatsApp API',
  'Zero Tech Skills Needed (Done-For-You)',
  'Pre-Built Term, Health & Motor Flows',
  'Go Live Under Your Name in 48 Hours',
];

const LIVE_NOTIFICATIONS = [
  {
    name: 'Priya Nair • Term ₹2 Cr',
    tag: 'NB | Proposal Sent',
    tagTone: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
    note: 'Bot collected age, income & booked 5 PM call',
  },
  {
    name: 'Amitabh Verma • Health ₹42.5k',
    tag: 'REN | Due in 7 Days',
    tagTone: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
    note: 'Auto T-7 reminder + UPI link sent on WhatsApp',
  },
  {
    name: 'Meera Kulkarni • Cashless Claim',
    tag: 'CLM | Docs Collected ✓',
    tagTone: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
    note: 'Hospital bills & pre-auth uploaded 24/7',
  },
];

export function HeroSection() {
  const whatsappDemoUrl = getHeroWhatsAppDemoLink();

  return (
    <section className="bg-navy-grid relative overflow-hidden border-b border-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Conversion Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
              <span>FOR INDIVIDUAL INSURANCE AGENTS &amp; MDRT ADVISORS • OFFICIAL WHATSAPP CRM</span>
            </div>

            <h1 className="mt-5 font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[45px]">
              Stop Chasing Renewals &amp; Cold Leads Manually. Turn WhatsApp Into Your 24/7 Policy-Closing Assistant.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Launch your personal Official WhatsApp &amp; Meta Lead Automation under your own advisor brand—live in 48
              hours. Auto-qualify Instagram &amp; Facebook leads in 5 seconds, send T-30 to T-1 renewal reminders with
              UPI links, chase KYC docs, and multiply referrals without hiring staff.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#10B981] px-6 py-4 text-base font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B]"
              >
                <span>Activate My Personal CRM Demo</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>

              <a
                href={whatsappDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-600 bg-white/5 px-5 py-4 text-base font-semibold text-white transition-colors hover:border-emerald-400/60 hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                <span>Try Live Advisor Bot</span>
              </a>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-400">
              Ideal for solo LIC, Term Life, Health, Motor &amp; Multi-Insurer advisors building high-retention books.
            </p>
          </div>

          {/* Right Realistic Visual + Floating Live Assistant Overlay */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#0F1A38] p-3 shadow-2xl sm:p-4">
              {/* Realistic Advisor Photo */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={heroAdvisorImg}
                  alt="Independent Indian insurance advisor smiling while reviewing automated WhatsApp renewals and client proposals on his phone"
                  className="h-[260px] w-full object-cover object-top sm:h-[340px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/20 to-transparent" />

                {/* Top Floating Verified Badge */}
                <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-[#0B132B]/85 px-3 py-1 text-[11px] font-bold text-emerald-300 backdrop-blur-md">
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#10B981]" aria-hidden="true" />
                    Official Advisor WABA Active
                  </span>
                  <span className="hidden items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#0B132B]/85 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md sm:inline-flex">
                    <TrendingUp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    14 Renewals Auto-Collected This Week
                  </span>
                </div>
              </div>

              {/* Paired Personal Advisor Live Assistant Feed */}
              <div className="mt-3 rounded-2xl border border-slate-700/90 bg-[#0B132B] p-3.5 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Your 24/7 Personal WhatsApp Assistant</span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-300 sm:text-slate-400">
                    <span className="sm:hidden">14 Renewals Collected</span>
                    <span className="hidden sm:inline">Auto-pilot On</span>
                  </span>
                </div>

                <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  {LIVE_NOTIFICATIONS.map((item) => (
                    <div
                      key={item.name}
                      className="min-w-0 rounded-xl border border-slate-800 bg-[#131F42]/90 p-2.5"
                    >
                      <div className="text-xs font-bold text-white truncate">{item.name}</div>
                      <span
                        className={`mt-1.5 inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold ${item.tagTone}`}
                      >
                        {item.tag}
                      </span>
                      <p className="mt-1.5 text-[11px] leading-snug text-slate-300">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-10 border-t border-slate-800/90 pt-7">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
