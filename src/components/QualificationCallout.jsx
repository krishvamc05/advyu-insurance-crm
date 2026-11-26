import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { getHeroWhatsAppDemoLink } from '../config/siteConfig';

const INCLUDED_HIGHLIGHTS = [
  'Official Ban-Safe WhatsApp Business API Setup Under Your Name',
  '24/7 AI Lead Qualifier for Instagram, Facebook & Referral QR Leads',
  'Autopilot T-30, T-15, T-7 & Grace-Period Renewal Reminders + Payment Links',
  '24/7 Claim Intimation & Document Checklist Collector (Health, Motor, Life)',
  '48-Hour Done-For-You Setup + Existing Diary/Excel Policy Import',
];

export function QualificationCallout() {
  const whatsappUrl = getHeroWhatsAppDemoLink();

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-grid overflow-hidden rounded-3xl border border-slate-700 p-7 text-white shadow-2xl sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Built Exclusively For Solo Insurance Producers</span>
              </div>

              <h2 className="mt-4 font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Your Complete Personal Insurance CRM &amp; 24/7 WhatsApp Assistant
              </h2>
              <p className="mt-2 text-sm font-semibold text-emerald-300 sm:text-base">
                (LIC Advisors, Health &amp; Motor Specialists, Multi-Insurer Agents &amp; MDRT Aspirants)
              </p>

              <p className="mt-4 rounded-xl border border-slate-700/90 bg-white/[0.04] p-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                <em>
                  Stop paying ₹15,000/month for an assistant to chase renewals and leads. Automate your entire book from
                  one mobile-friendly workspace—live in 48 hours.
                </em>
              </p>

              <ul className="mt-6 space-y-2.5">
                {INCLUDED_HIGHLIGHTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-[#131F42]/90 p-6 lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>15-Min Live Advisor Walkthrough</span>
              </div>
              <div className="mt-3 font-heading text-2xl font-extrabold text-white">
                See Your Bot Live Today
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Answer 3 quick questions about your policy book to unlock your live WhatsApp bot demo, personalized ROI
                audit, and 48-hour launch plan.
              </p>

              <Link
                to="/apply"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-5 py-4 text-center text-base font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
              >
                <span>Unlock My Live Advisor Demo</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-emerald-400/60 hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                <span>Explore on WhatsApp (+91 9160230223)</span>
              </a>

              <p className="mt-3 text-center text-xs text-slate-400">
                Zero coding required • Official Meta WABA • Works on mobile &amp; desktop
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
