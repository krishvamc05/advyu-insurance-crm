import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getHeroWhatsAppDemoLink } from '../config/siteConfig';

export function FloatingWhatsAppCta() {
  const whatsappUrl = getHeroWhatsAppDemoLink();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp about ADVYU InsureTech Automation CRM"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#10B981] px-4 py-3 text-xs font-bold text-white shadow-cta-emerald transition-all hover:scale-[1.03] hover:bg-[#059669] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-sm"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
