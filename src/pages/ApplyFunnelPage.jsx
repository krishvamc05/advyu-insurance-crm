import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { submitLeadToCrm } from '../services/crmWebhook';
import { formatInrCompact } from '../utils/formatInr';
import { getCalculatorMetrics, saveLeadSubmission } from '../utils/funnelStorage';
import { computeQualificationTier, normalizeIndianWhatsApp } from '../utils/qualification';

const PRACTICE_OPTIONS = [
  {
    value: 'Independent Multi-Insurer Advisor',
    desc: 'Selling across multiple Life, Health & General insurers directly to families',
  },
  {
    value: 'LIC / Life Insurance Agent',
    desc: 'Building a recurring LIC / Term / Endowment book & chasing MDRT milestones',
  },
  {
    value: 'Health & Mediclaim Specialist',
    desc: 'Focusing on family floaters, super top-ups, portability & cashless claim support',
  },
  {
    value: 'Motor & General Insurance Agent',
    desc: 'Managing high-volume annual motor renewals, NCB retention & cross-sell',
  },
];

const CLIENT_BUCKETS = [
  { value: 'Just Starting (< 50 Clients)', tag: 'New Advisor' },
  { value: '50–250 Policyholders', tag: 'Growing Book' },
  { value: '250–1,000 Policyholders', tag: 'Established Pro' },
  { value: '1,000+ Policyholders (MDRT / Top Producer)', tag: 'MDRT / COT' },
];

const INSURANCE_LINES = [
  'Term / Life',
  'Health',
  'Motor',
  'ULIP / Investments',
  'Commercial / SME',
];

const GOAL_OPTIONS = [
  {
    value: 'Automate Policy Renewals & Stop Lapses',
    desc: 'Send automatic T-30, T-15 & T-7 reminders with 1-tap UPI renewal links',
  },
  {
    value: 'Convert Meta / Instagram Leads Instantly',
    desc: 'Reply to social leads in 5 seconds & book pre-qualified calls automatically',
  },
  {
    value: 'Qualify Leads & Chase KYC Automatically',
    desc: 'Stop chasing PAN, Aadhaar & medical test reminders manually at night',
  },
  {
    value: '24/7 WhatsApp Assistant + More Referrals',
    desc: 'Deliver instant claim checklists & turn happy clients into 3x family referrals',
  },
];

export function ApplyFunnelPage() {
  const navigate = useNavigate();
  const calculatorMetrics = useMemo(() => getCalculatorMetrics(), []);
  const attachedLeakageInr =
    calculatorMetrics && calculatorMetrics.touched ? Number(calculatorMetrics.estimatedLeakageInr) || 0 : 0;

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formState, setFormState] = useState({
    leadName: '',
    city: '',
    practiceType: '',
    activeClients: '',
    insuranceLines: [],
    primaryGoal: '',
    whatsappInput: '',
    email: '',
  });

  const progressPercent = step === 1 ? 33 : step === 2 ? 67 : 100;

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const toggleInsuranceLine = (line) => {
    setFormState((prev) => {
      const exists = prev.insuranceLines.includes(line);
      const nextLines = exists
        ? prev.insuranceLines.filter((item) => item !== line)
        : [...prev.insuranceLines, line];
      return { ...prev, insuranceLines: nextLines };
    });
    setErrors((prev) => {
      if (!prev.insuranceLines) return prev;
      const copy = { ...prev };
      delete copy.insuranceLines;
      return copy;
    });
  };

  const validateStep1 = () => {
    const nextErrors = {};
    if (formState.leadName.trim().length < 2) {
      nextErrors.leadName = 'Please enter your full name.';
    }
    if (formState.city.trim().length < 2) {
      nextErrors.city = 'Please enter your city or primary market.';
    }
    if (!formState.practiceType) {
      nextErrors.practiceType = 'Please select your primary advisory practice.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!formState.activeClients) {
      nextErrors.activeClients = 'Please choose your current active policyholder range.';
    }
    if (formState.insuranceLines.length === 0) {
      nextErrors.insuranceLines = 'Select at least one insurance line you sell.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};
    if (!formState.primaryGoal) {
      nextErrors.primaryGoal = 'Please select your #1 goal right now.';
    }

    const waResult = normalizeIndianWhatsApp(formState.whatsappInput);
    if (!waResult.valid) {
      nextErrors.whatsappInput = waResult.error;
    }

    const emailTrimmed = formState.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    setErrors(nextErrors);
    return { valid: Object.keys(nextErrors).length === 0, formattedWhatsApp: waResult.formatted };
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const { valid, formattedWhatsApp } = validateStep3();
    if (!valid) return;

    setSubmitting(true);

    const qualificationTier = computeQualificationTier({
      activeClients: formState.activeClients,
    });

    const leadSubmissionData = {
      leadName: formState.leadName.trim(),
      city: formState.city.trim(),
      practiceType: formState.practiceType,
      whatsappNumber: formattedWhatsApp,
      email: formState.email.trim(),
      activeClients: formState.activeClients,
      insuranceLines: formState.insuranceLines,
      primaryGoal: formState.primaryGoal,
      estimatedLeakageInr: attachedLeakageInr,
      qualificationTier,
    };

    const webhookResponse = await submitLeadToCrm(leadSubmissionData);

    const firstName = leadSubmissionData.leadName.split(/\s+/)[0] || leadSubmissionData.leadName;
    const finalSummary = {
      ...leadSubmissionData,
      firstName,
      webhookStatus: webhookResponse.ok
        ? webhookResponse.simulated
          ? 'simulated'
          : 'delivered'
        : 'fallback',
      submittedAt: webhookResponse.payload.submitted_at,
    };

    saveLeadSubmission(finalSummary);
    setSubmitting(false);
    navigate('/thank-you', { state: finalSummary });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0B132B]">
      {/* Clean Distraction-Free Header */}
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="focus:outline-none">
            <BrandLogo showSubtag />
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
              Ban-Safe Official WABA Setup
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0B132B] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Overview</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
            45-Second Personal Advisor Setup Check
          </span>
          <h1 className="mt-3 font-heading text-2xl font-extrabold text-[#0B132B] sm:text-3xl">
            Activate Your Personal WhatsApp Insurance CRM
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Tell us about your policy book so we can tailor your live WhatsApp bot demo and 48-hour launch plan.
          </p>
        </div>

        {/* Attached ROI Audit Banner */}
        {attachedLeakageInr > 0 && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs sm:text-sm">
            <span className="font-medium text-emerald-900">
              Your Calculator Estimate: <strong>{formatInrCompact(attachedLeakageInr)}/yr</strong> recoverable
              premium opportunity
            </span>
            <span className="shrink-0 rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              Synced ✓
            </span>
          </div>
        )}

        {/* Progressive 3-Step Card */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-card">
          <div className="border-b border-[#E2E8F0] bg-[#0B132B] px-6 py-5 text-white sm:px-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
              <span>Step {step} of 3</span>
              <span className="text-emerald-400">
                {step === 1 && 'Your Advisory Practice'}
                {step === 2 && 'Book Size & Insurance Lines'}
                {step === 3 && 'Top Goal & WhatsApp Contact'}
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-[#10B981] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2.5 grid grid-cols-3 text-[11px] font-semibold text-slate-400">
              <span className={step >= 1 ? 'text-white' : ''}>1. Advisor Profile</span>
              <span className={`text-center ${step >= 2 ? 'text-white' : ''}`}>2. Policy Book</span>
              <span className={`text-right ${step >= 3 ? 'text-white' : ''}`}>3. Unlock Bot Demo</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="leadName" className="block font-heading text-sm font-bold text-[#0B132B]">
                      Your Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="leadName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Rajesh Deshmukh"
                      value={formState.leadName}
                      onChange={(e) => updateField('leadName', e.target.value)}
                      className={`mt-2 w-full rounded-xl border px-4 py-3 text-base sm:text-sm text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.leadName
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-[#E2E8F0] focus:border-[#10B981] focus:ring-[#10B981]/20'
                      }`}
                    />
                    {errors.leadName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.leadName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block font-heading text-sm font-bold text-[#0B132B]">
                      City / Market <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative mt-2">
                      <MapPin
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                      />
                      <input
                        id="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="e.g. Pune, Hyderabad, Jaipur"
                        value={formState.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className={`w-full rounded-xl border py-3 pl-10 pr-4 text-base sm:text-sm text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.city
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                            : 'border-[#E2E8F0] focus:border-[#10B981] focus:ring-[#10B981]/20'
                        }`}
                      />
                    </div>
                    {errors.city && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="block font-heading text-sm font-bold text-[#0B132B]">
                    What Best Describes Your Advisory Practice? <span className="text-rose-600">*</span>
                  </span>
                  <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                    {PRACTICE_OPTIONS.map((option) => {
                      const selected = formState.practiceType === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField('practiceType', option.value)}
                          className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? 'border-[#10B981] bg-emerald-50/70 ring-2 ring-[#10B981]/25'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-heading text-sm font-bold text-[#0B132B]">{option.value}</span>
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                selected ? 'border-[#10B981] bg-[#10B981] text-white' : 'border-slate-300 bg-white'
                              }`}
                            >
                              {selected && <Check className="h-3 w-3" />}
                            </span>
                          </div>
                          <span className="mt-1.5 text-xs leading-relaxed text-slate-500">{option.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.practiceType && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.practiceType}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-4 text-base font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                  >
                    <span>Continue to Policy Book</span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="block font-heading text-sm font-bold text-[#0B132B]">
                    Active Policyholders You Currently Manage <span className="text-rose-600">*</span>
                  </span>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Helps us calibrate your automated renewal sequences and WhatsApp message plan.
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {CLIENT_BUCKETS.map((option) => {
                      const selected = formState.activeClients === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField('activeClients', option.value)}
                          className={`flex flex-col rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? 'border-[#10B981] bg-emerald-50/70 ring-2 ring-[#10B981]/25'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Award
                              className={`h-4 w-4 ${selected ? 'text-[#10B981]' : 'text-slate-400'}`}
                              aria-hidden="true"
                            />
                            <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-600">
                              {option.tag}
                            </span>
                          </div>
                          <span className="mt-2.5 font-heading text-sm font-extrabold text-[#0B132B] sm:text-base">
                            {option.value}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.activeClients && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.activeClients}
                    </p>
                  )}
                </div>

                <div>
                  <span className="block font-heading text-sm font-bold text-[#0B132B]">
                    Insurance Lines You Sell <span className="text-rose-600">*</span>
                  </span>
                  <p className="mt-0.5 text-xs text-slate-500">Select all templates you want pre-loaded on Day 1.</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {INSURANCE_LINES.map((line) => {
                      const selected = formState.insuranceLines.includes(line);
                      return (
                        <button
                          key={line}
                          type="button"
                          onClick={() => toggleInsuranceLine(line)}
                          aria-pressed={selected}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all ${
                            selected
                              ? 'border-[#0B132B] bg-[#0B132B] text-white shadow-sm'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] text-slate-700 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          {selected ? (
                            <CheckCircle2 className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                          ) : (
                            <span className="h-3.5 w-3.5 rounded-full border border-slate-300 bg-white" />
                          )}
                          <span>{line}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.insuranceLines && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.insuranceLines}
                    </p>
                  )}
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 sm:w-1/3"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-4 text-base font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669] sm:w-2/3"
                  >
                    <span>Continue to Final Step</span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="block font-heading text-sm font-bold text-[#0B132B]">
                    What Is Your #1 Goal Right Now? <span className="text-rose-600">*</span>
                  </span>
                  <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                    {GOAL_OPTIONS.map((option) => {
                      const selected = formState.primaryGoal === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField('primaryGoal', option.value)}
                          className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? 'border-[#10B981] bg-emerald-50/70 ring-2 ring-[#10B981]/25'
                              : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-heading text-sm font-bold text-[#0B132B]">{option.value}</span>
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                selected ? 'border-[#10B981] bg-[#10B981] text-white' : 'border-slate-300 bg-white'
                              }`}
                            >
                              {selected && <Check className="h-3 w-3" />}
                            </span>
                          </div>
                          <span className="mt-1.5 text-xs leading-relaxed text-slate-500">{option.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.primaryGoal && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.primaryGoal}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="whatsappInput" className="block font-heading text-sm font-bold text-[#0B132B]">
                      Your WhatsApp Number <span className="text-rose-600">*</span>
                    </label>
                    <div className="mt-2 flex overflow-hidden rounded-xl border border-[#E2E8F0] focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/20">
                      <span className="flex items-center border-r border-[#E2E8F0] bg-[#F8FAFC] px-3.5 text-sm font-bold text-[#0B132B]">
                        +91
                      </span>
                      <input
                        id="whatsappInput"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        value={formState.whatsappInput}
                        onChange={(e) => updateField('whatsappInput', e.target.value)}
                        className="w-full px-3.5 py-3 text-base text-[#0B132B] placeholder:text-slate-400 focus:outline-none sm:text-sm"
                      />
                    </div>
                    {errors.whatsappInput && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.whatsappInput}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="advisorEmail" className="block font-heading text-sm font-bold text-[#0B132B]">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="advisorEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="rajesh.advisory@gmail.com"
                      value={formState.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`mt-2 w-full rounded-xl border px-4 py-3 text-base sm:text-sm text-[#0B132B] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-[#E2E8F0] focus:border-[#10B981] focus:ring-[#10B981]/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 sm:w-1/3"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-4 text-base font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-75 sm:w-2/3"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        <span>Unlocking Your Live Demo...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock My Live Advisor Demo &amp; Setup Plan</span>
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
                  <span>100% private. Your client details &amp; contact stay strictly confidential.</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
