import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Download,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import {
  DEFAULT_WABA_MESSAGE,
  getWhatsAppDeepLink,
  isCalendarConfigured,
  siteConfig,
} from '../config/siteConfig';
import { formatInrCompact } from '../utils/formatInr';
import { getLeadSubmission } from '../utils/funnelStorage';

export function ThankYouPage() {
  const location = useLocation();
  const submission = location.state || getLeadSubmission();

  if (!submission) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B]">
        <header className="border-b border-[#E2E8F0] bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <Link to="/">
              <BrandLogo showSubtag />
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-card">
            <h1 className="font-heading text-2xl font-extrabold text-[#0B132B]">
              Complete Your 45-Second Advisor Check First
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Tell us about your advisory practice and insurance lines so we can unlock your live WhatsApp bot demo and
              personalized 48-hour launch plan.
            </p>
            <Link
              to="/apply"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-white shadow-cta-emerald hover:bg-[#059669]"
            >
              <span>Go to Advisor Qualification Funnel</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const firstName = submission.firstName || submission.leadName?.split(/\s+/)[0] || 'Advisor';
  const city = submission.city || 'India';
  const practiceType = submission.practiceType || 'Insurance Advisor';
  const activeClients = submission.activeClients || '50–250 Policyholders';
  const isHotAdvisor = submission.qualificationTier === 'hot_qualified_advisor';
  const calendarConfigured = isCalendarConfigured(siteConfig.demoCalendarUrl);

  const hotWhatsAppLink = getWhatsAppDeepLink(
    `${DEFAULT_WABA_MESSAGE} (${firstName}, ${practiceType} from ${city}, ${activeClients})`
  );

  const starterWhatsAppLink = getWhatsAppDeepLink(
    `${DEFAULT_WABA_MESSAGE} (${firstName}, ${practiceType} from ${city})`
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0B132B]">
      {/* Header */}
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/">
            <BrandLogo showSubtag />
          </Link>
          <Link to="/" className="text-xs font-semibold text-slate-600 hover:text-[#0B132B] sm:text-sm">
            Return to ADVYU Overview
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {isHotAdvisor ? (
          /* BRANCH A: ACTIVE INDIVIDUAL ADVISOR (50+ CLIENTS) */
          <div className="space-y-8">
            <div className="bg-navy-grid rounded-3xl border border-slate-700 p-6 text-white shadow-xl sm:p-9">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span>Advisor Demo Unlocked • {activeClients}</span>
                  </div>
                  <h1 className="mt-4 font-heading text-2xl font-extrabold leading-tight sm:text-4xl">
                    Great news, {firstName}! Your Personal 48-Hour CRM Setup Is Ready.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    Book your 15-minute live walkthrough for your {city} practice below, and test our live Insurance
                    Advisor WhatsApp Bot right now on your own phone.
                  </p>
                </div>

                {/* Bold Instant WhatsApp Bot Handoff */}
                <div className="shrink-0 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 lg:max-w-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>Instant Bot Experience</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-200">
                    Pre-filled with <strong>{firstName}</strong> ({city} • {activeClients}) so you can experience the
                    automated lead &amp; renewal bot directly.
                  </p>
                  <a
                    href={hotWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-5 py-3.5 text-sm font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669]"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>Test the Live Advisor WhatsApp Bot Now</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5 border-t border-slate-700/80 pt-5 text-xs">
                <span className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-slate-200">
                  Practice: {practiceType}
                </span>
                <span className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-slate-200">
                  #1 Goal: {submission.primaryGoal}
                </span>
                {submission.estimatedLeakageInr > 0 && (
                  <span className="rounded-lg border border-amber-400/30 bg-amber-500/15 px-3 py-1.5 font-bold text-amber-300">
                    Recoverable Opportunity: {formatInrCompact(submission.estimatedLeakageInr)}/yr
                  </span>
                )}
              </div>
            </div>

            {/* Embedded Demo Calendar Scheduler */}
            <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-card sm:p-8">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B132B] text-white">
                    <Calendar className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-extrabold text-[#0B132B]">
                      Book Your 15-Min Personal CRM Setup Walkthrough
                    </h2>
                    <p className="text-xs text-slate-500 sm:text-sm">
                      We’ll show you live renewal reminders, Meta lead qualification &amp; your 48-hour launch roadmap.
                    </p>
                  </div>
                </div>

                {calendarConfigured && (
                  <a
                    href={siteConfig.demoCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
                  >
                    <span>Open Calendar in New Tab</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>

              {calendarConfigured ? (
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0]">
                  <iframe
                    src={siteConfig.demoCalendarUrl}
                    title="ADVYU 15-Min Individual Advisor Demo Scheduler"
                    className="h-[520px] w-full border-0 bg-white sm:h-[640px]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  data-calendar-embed-placeholder="[YOUR_CALENDLY_OR_CAL_LINK]"
                  className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-[#F8FAFC] p-5 text-center sm:p-12"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B132B] text-[#10B981]">
                    <Calendar className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-extrabold text-[#0B132B] break-words">
                    Demo Scheduler Embed Ready (<code className="break-all text-sm sm:text-base">[YOUR_CALENDLY_OR_CAL_LINK]</code>)
                  </h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
                    Set <code className="rounded bg-slate-200/70 px-1.5 py-0.5 text-xs font-semibold">VITE_DEMO_CALENDAR_URL</code>{' '}
                    to your Calendly or Cal.com booking URL in <code className="rounded bg-slate-200/70 px-1.5 py-0.5 text-xs font-semibold">.env</code>{' '}
                    to render your live booking calendar automatically for <strong>{firstName}</strong>.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={hotWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-bold text-white shadow-cta-emerald hover:bg-[#059669]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Pick Slot &amp; Launch Bot on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </section>

            {/* Bonus 6-Page Playbook PDF Download for Qualified Advisors */}
            <section className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  <Download className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
                  Free Bonus Before Our Call
                </span>
                <h3 className="mt-2.5 font-heading text-lg font-extrabold text-[#0B132B] sm:text-xl">
                  Download Your Personalized 6-Page Solo Agent Automation Playbook (PDF)
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  Includes your {city} ROI snapshot, copy-paste WhatsApp scripts, T-30 to grace-period renewal sequence,
                  and 48-hour Excel migration checklist.
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const { downloadAutomationBlueprint } = await import('../utils/blueprintDownload');
                  downloadAutomationBlueprint({
                    advisorName: firstName,
                    city,
                    practiceType,
                    estimatedLeakageInr: submission.estimatedLeakageInr || 0,
                  });
                }}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0B132B] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#16213E] sm:w-auto"
              >
                <Download className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                <span>Download 6-Page Playbook PDF</span>
              </button>
            </section>
          </div>
        ) : (
          /* BRANCH B: STARTER / GROWING ADVISOR (< 50 CLIENTS) */
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-card sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Award className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                <span>Starter Advisor Growth Kit Unlocked</span>
              </div>

              <h1 className="mt-4 font-heading text-2xl font-extrabold text-[#0B132B] sm:text-3xl">
                Welcome, {firstName}! Here Is Your Solo Insurance Agent Automation Playbook.
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Because you’re building your first 50 policyholders in <strong className="text-[#0B132B]">{city}</strong>,
                start with our free WhatsApp &amp; MDRT SOP Playbook below—and test our live bot directly on WhatsApp
                whenever you’re ready to automate full-time.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" aria-hidden="true" />
                  <div className="text-sm text-slate-700">
                    <strong className="font-bold text-[#0B132B]">Priority Starter Track Logged:</strong>{' '}
                    {practiceType} • {city} • Goal: {submission.primaryGoal}.
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5">
                  <div>
                    <h2 className="font-heading text-base font-extrabold text-[#0B132B]">
                      Solo Agent WhatsApp &amp; MDRT Playbook (6-Page PDF)
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      Download our 6-page illustrated PDF playbook with copy-paste WhatsApp scripts, T-30 renewal timelines
                      &amp; 48-hour Excel migration steps.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const { downloadAutomationBlueprint } = await import('../utils/blueprintDownload');
                      downloadAutomationBlueprint({
                        advisorName: firstName,
                        city,
                        practiceType,
                        estimatedLeakageInr: submission.estimatedLeakageInr || 0,
                      });
                    }}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B132B] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#16213E]"
                  >
                    <Download className="h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                    <span>Download 6-Page Playbook PDF</span>
                  </button>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <div>
                    <h2 className="font-heading text-base font-extrabold text-[#0B132B]">
                      Want To Test The Live Bot Today?
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                      Try our interactive Term, Health &amp; Renewal WhatsApp flow right now or ask our team about our
                      starter launch plan.
                    </p>
                  </div>
                  <a
                    href={starterWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#059669]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Try Live Bot on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
