import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const NAV_ANCHORS = [
  { label: 'How It Works', id: 'how-it-works' },
  { label: '4 Built-in Automations', id: 'pipelines' },
  { label: 'Commission Calculator', id: 'roi-calculator' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (event, targetId) => {
    event.preventDefault();
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link to="/" className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          <BrandLogo showSubtag />
        </Link>

        {/* Desktop 3 Anchor Links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary Navigation">
          {NAV_ANCHORS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => handleAnchorClick(e, item.id)}
              className="whitespace-nowrap text-sm font-semibold text-slate-600 transition-colors hover:text-[#0B132B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Single Prominent CTA */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/apply"
            className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-lg bg-[#10B981] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#059669] hover:shadow-cta-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Get CRM</span>
            <span className="hidden sm:inline">Get My Advisor CRM</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] p-2 text-[#0B132B] hover:bg-slate-50 lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#E2E8F0] bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {NAV_ANCHORS.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0B132B]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
