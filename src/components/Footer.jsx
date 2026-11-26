import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { getHeroWhatsAppDemoLink } from '../config/siteConfig';

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = getHeroWhatsAppDemoLink();

  return (
    <footer className="border-t border-slate-800 bg-[#0B132B] pb-20 pt-10 text-slate-300 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <BrandLogo dark showSubtag />
          <p className="mt-2.5 max-w-md text-xs leading-relaxed text-slate-400">
            advyu.com • Personal Official WhatsApp Business API &amp; Meta Lead Automation CRM built exclusively for
            Individual Insurance Advisors in India.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-emerald-400/60 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
              <span>WhatsApp +91 9160230223</span>
            </a>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#059669]"
            >
              <span>Activate My Personal CRM Demo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" aria-hidden="true" />
            <span>© {year} ADVYU (advyu.com). Official Meta WABA Aligned.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
