import React from 'react';

export function BrandLogo({ dark = false, showSubtag = false }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
          dark
            ? 'bg-[#16213E] border-emerald-500/40 text-emerald-400'
            : 'bg-[#0B132B] border-[#0B132B] text-emerald-400'
        } shadow-sm`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 2.5L19.5 5.6V11.8C19.5 16.7 16.3 20.6 12 22C7.7 20.6 4.5 16.7 4.5 11.8V5.6L12 2.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.7 12.2L11 14.5L15.6 9.6"
            stroke="#10B981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-xl font-extrabold tracking-tight ${
            dark ? 'text-white' : 'text-[#0B132B]'
          }`}
        >
          ADVYU
        </span>
        {showSubtag && (
          <span
            className={`mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] ${
              dark ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Advisor CRM
          </span>
        )}
      </span>
    </span>
  );
}
