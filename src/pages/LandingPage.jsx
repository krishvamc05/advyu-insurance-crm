import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { RevenueLeaksSection } from '../components/RevenueLeaksSection';
import { LeakageCalculator } from '../components/LeakageCalculator';
import { PipelinesShowcase } from '../components/PipelinesShowcase';
import { SocialLeadEngine } from '../components/SocialLeadEngine';
import { ClaimsLoyaltySection } from '../components/ClaimsLoyaltySection';
import { GoLiveRoadmap } from '../components/GoLiveRoadmap';
import { QualificationCallout } from '../components/QualificationCallout';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { FloatingWhatsAppCta } from '../components/FloatingWhatsAppCta';

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0B132B]">
      {/* 1. Sticky Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section (Realistic Advisor Portrait + Live Personal Assistant Mockup) */}
        <HeroSection />

        {/* 3. The 4 Daily Traps Costing Solo Agents Lakhs (With Nighttime Admin Pain Visual) */}
        <RevenueLeaksSection />

        {/* 4. Interactive Personal Renewal & Commission Recovery Calculator */}
        <LeakageCalculator />

        {/* 5. 4 Built-In Automations Working For You 24/7 */}
        <PipelinesShowcase />

        {/* 6. Social Media & Personal QR Referral Engine (With Mobile Lifestyle Visual) */}
        <SocialLeadEngine />

        {/* 7. 24/7 Claims Support & Referral Multiplier (With Relieved Family Visual) */}
        <ClaimsLoyaltySection />

        {/* 8. 48-Hour Done-For-You Launch Roadmap */}
        <GoLiveRoadmap />

        {/* 9. Solo Advisor Demo Callout Card */}
        <QualificationCallout />

        {/* 10. Individual Agent FAQ Accordion */}
        <FaqSection />
      </main>

      <Footer />
      <FloatingWhatsAppCta />
    </div>
  );
}
