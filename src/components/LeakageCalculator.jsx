import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator, IndianRupee, ShieldAlert, TrendingUp } from 'lucide-react';
import { formatIndianNumber, formatInrCompact, formatInrFull } from '../utils/formatInr';
import { saveCalculatorMetrics } from '../utils/funnelStorage';
import { suggestClientBucket } from '../utils/qualification';

export function LeakageCalculator() {
  const navigate = useNavigate();
  const [policyholders, setPolicyholders] = useState(350);
  const [avgPremium, setAvgPremium] = useState(25000);
  const [monthlyLeads, setMonthlyLeads] = useState(40);
  const [hasInteracted, setHasInteracted] = useState(false);

  const metrics = useMemo(() => {
    const totalBook = policyholders * avgPremium;
    // 12% typical annual renewal drop-off from manual diary/Excel tracking
    const savedRenewalPremium = Math.round(totalBook * 0.12);
    // Conservative +8% conversion lift on inbound leads from 5-sec automated replies vs 3-hour callbacks
    const extraNewBusinessPremium = Math.round(monthlyLeads * 12 * 0.08 * avgPremium);
    const totalPremiumOpportunity = savedRenewalPremium + extraNewBusinessPremium;

    // 15% blended renewal commission + 20% blended first-year commission on recovered policies
    const renewalCommissionSaved = Math.round(savedRenewalPremium * 0.15);
    const newBizCommissionEarned = Math.round(extraNewBusinessPremium * 0.2);
    const totalExtraCommission = renewalCommissionSaved + newBizCommissionEarned;
    const monthlyExtraIncome = Math.round(totalExtraCommission / 12);

    return {
      totalBook,
      savedRenewalPremium,
      extraNewBusinessPremium,
      totalPremiumOpportunity,
      totalExtraCommission,
      monthlyExtraIncome,
    };
  }, [policyholders, avgPremium, monthlyLeads]);

  useEffect(() => {
    saveCalculatorMetrics({
      policyholders,
      avgPremium,
      monthlyLeads,
      estimatedLeakageInr: metrics.totalPremiumOpportunity,
      extraCommissionInr: metrics.totalExtraCommission,
      suggestedClientBucket: suggestClientBucket(policyholders),
      touched: hasInteracted,
    });
  }, [
    policyholders,
    avgPremium,
    monthlyLeads,
    metrics.totalPremiumOpportunity,
    metrics.totalExtraCommission,
    hasInteracted,
  ]);

  const handleBookWithMetrics = () => {
    saveCalculatorMetrics({
      policyholders,
      avgPremium,
      monthlyLeads,
      estimatedLeakageInr: metrics.totalPremiumOpportunity,
      extraCommissionInr: metrics.totalExtraCommission,
      suggestedClientBucket: suggestClientBucket(policyholders),
      touched: true,
    });
    navigate('/apply');
  };

  const sliderBackground = (value, min, max) => {
    const pct = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #CBD5E1 ${pct}%, #CBD5E1 100%)`,
    };
  };

  return (
    <section id="roi-calculator" className="scroll-mt-20 border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Calculator className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
            <span>Personal Advisor ROI Calculator</span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-[#0B132B] sm:text-4xl">
            How Much Commission Are You Losing Every Year?
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Move the sliders below to calculate how much renewal &amp; new-business commission ADVYU recovers for your
            personal book.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-card lg:grid-cols-12">
          {/* Left Sliders */}
          <div className="space-y-8 bg-white p-6 sm:p-8 lg:col-span-7 lg:p-10">
            {/* Slider 1: Active Policyholders */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="calc-policyholders" className="font-heading text-sm font-bold text-[#0B132B] sm:text-base">
                  Your Active Policyholders
                </label>
                <span className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 font-heading text-sm font-extrabold text-[#0B132B] sm:text-base">
                  {formatIndianNumber(policyholders)} Clients
                </span>
              </div>
              <input
                id="calc-policyholders"
                type="range"
                min={50}
                max={2500}
                step={25}
                value={policyholders}
                onChange={(e) => {
                  setHasInteracted(true);
                  setPolicyholders(Number(e.target.value));
                }}
                style={sliderBackground(policyholders, 50, 2500)}
                className="advyu-slider mt-3.5"
              />
              <div className="mt-1.5 flex justify-between text-xs font-medium text-slate-400">
                <span>50 Clients</span>
                <span>1,250 Clients</span>
                <span>2,500+ MDRT</span>
              </div>
            </div>

            {/* Slider 2: Average Annual Premium */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="calc-premium" className="font-heading text-sm font-bold text-[#0B132B] sm:text-base">
                  Average Annual Premium (₹)
                </label>
                <span className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 font-heading text-sm font-extrabold text-[#0B132B] sm:text-base">
                  {formatInrFull(avgPremium)}
                </span>
              </div>
              <input
                id="calc-premium"
                type="range"
                min={10000}
                max={100000}
                step={1000}
                value={avgPremium}
                onChange={(e) => {
                  setHasInteracted(true);
                  setAvgPremium(Number(e.target.value));
                }}
                style={sliderBackground(avgPremium, 10000, 100000)}
                className="advyu-slider mt-3.5"
              />
              <div className="mt-1.5 flex justify-between text-xs font-medium text-slate-400">
                <span>₹10,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Slider 3: Monthly Social & Referral Leads */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="calc-leads" className="font-heading text-sm font-bold text-[#0B132B] sm:text-base">
                  New Social / Referral Inquiries Per Month
                </label>
                <span className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 font-heading text-sm font-extrabold text-[#0B132B] sm:text-base">
                  {monthlyLeads} Leads / mo
                </span>
              </div>
              <input
                id="calc-leads"
                type="range"
                min={10}
                max={300}
                step={5}
                value={monthlyLeads}
                onChange={(e) => {
                  setHasInteracted(true);
                  setMonthlyLeads(Number(e.target.value));
                }}
                style={sliderBackground(monthlyLeads, 10, 300)}
                className="advyu-slider mt-3.5"
              />
              <div className="mt-1.5 flex justify-between text-xs font-medium text-slate-400">
                <span>10 / mo</span>
                <span>150 / mo</span>
                <span>300 / mo</span>
              </div>
            </div>

            {/* Book Summary Strip */}
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:grid-cols-3">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 sm:block sm:border-b-0 sm:pb-0">
                <div className="text-xs font-medium text-slate-500 sm:text-[11px]">Your Active Book</div>
                <div className="font-heading text-sm font-extrabold text-[#0B132B] sm:mt-0.5 sm:text-base">
                  {formatInrCompact(metrics.totalBook)}
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 sm:block sm:border-b-0 sm:pb-0">
                <div className="text-xs font-medium text-slate-500 sm:text-[11px]">Renewals Saved</div>
                <div className="font-heading text-sm font-extrabold text-amber-600 sm:mt-0.5 sm:text-base">
                  {formatInrCompact(metrics.savedRenewalPremium)}
                </div>
              </div>
              <div className="flex items-center justify-between sm:block">
                <div className="text-xs font-medium text-slate-500 sm:text-[11px]">New Biz Uplift</div>
                <div className="font-heading text-sm font-extrabold text-[#10B981] sm:mt-0.5 sm:text-base">
                  {formatInrCompact(metrics.extraNewBusinessPremium)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Results Panel */}
          <div className="bg-navy-grid flex flex-col justify-between p-6 text-white sm:p-8 lg:col-span-5 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/35 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                Personal Income Recovery Estimate
              </span>

              <div className="mt-6 rounded-2xl border border-slate-700/80 bg-white/[0.04] p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Annual Premium At Risk From Manual Follow-Ups
                </div>
                <div className="mt-2 font-heading text-3xl font-extrabold text-amber-400 sm:text-4xl">
                  {formatInrCompact(metrics.totalPremiumOpportunity)}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {formatInrFull(metrics.totalPremiumOpportunity)}/yr combined missed renewals &amp; slow-reply leads
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  <span>Estimated Extra Commission In Your Pocket</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2 font-heading text-3xl font-extrabold text-[#10B981] sm:text-4xl">
                  <span>{formatInrCompact(metrics.totalExtraCommission)}</span>
                  <span className="text-sm font-semibold text-emerald-200">/ year</span>
                </div>
                <div className="mt-1 text-xs font-semibold text-emerald-100">
                  That’s ~{formatInrFull(metrics.monthlyExtraIncome)} / month in recovered income
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleBookWithMetrics}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-4 text-base font-bold text-white shadow-cta-emerald transition-all hover:bg-[#059669] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
              >
                <IndianRupee className="h-4 w-4" aria-hidden="true" />
                <span>Stop Losing This Commission — Book Demo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                Even saving 2 lapsed renewals a month pays for your entire CRM many times over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
