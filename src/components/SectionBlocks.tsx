import React from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { DIRECTORY_TABLE_ROWS } from '../data/mockData';

// 1. Section Header (Awwwards authentic typography: eyebrow + H2 + subtext + CTA)
export const SectionHeader: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}> = ({ eyebrow, title, subtitle, ctaLabel, onCtaClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#181818] leading-[1.1]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {ctaLabel && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="text-xs font-bold tracking-wider uppercase text-neutral-800 hover:text-[#3ea094] transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap self-start md:self-end pb-1 border-b border-transparent hover:border-[#3ea094]"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// 2. Dual Promo CTAs
export const DualPromoCTAs: React.FC<{
  onSubmitSite: () => void;
  onBePro: () => void;
}> = ({ onSubmitSite, onBePro }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
      {/* Promo 1: Submit */}
      <div className="relative rounded-xl p-8 sm:p-10 bg-gradient-to-br from-[#1C1D21] to-[#111215] text-white overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg group">
        <div className="relative z-10 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#3ea094] font-bold">
            Share your work
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Submit your website for visibility and recognition.
          </h3>
        </div>

        <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          <button
            onClick={onSubmitSite}
            className="px-6 py-2.5 rounded-sm bg-[#3ea094] hover:bg-[#33857b] text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer w-fit"
          >
            Submit Website
          </button>
          <a href="#faqs" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got questions? Read our FAQs</span>
          </a>
        </div>
      </div>

      {/* Promo 2: Be Pro */}
      <div className="relative rounded-xl p-8 sm:p-10 bg-gradient-to-br from-[#24272D] to-[#16181D] text-white overflow-hidden flex flex-col justify-between min-h-[260px] shadow-lg group">
        <div className="relative z-10 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Be a member
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Get access to special pro features and unlimited courses.
          </h3>
        </div>

        <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          <button
            onClick={onBePro}
            className="px-6 py-2.5 rounded-sm bg-white hover:bg-neutral-200 text-black text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer w-fit"
          >
            Be Pro
          </button>
          <a href="#faqs" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got questions? Read our FAQs</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// 3. Directory Table (4-row table with badges INT / PRO)
export const DirectoryTable: React.FC<{ onSelectCreator: (name: string) => void }> = ({ onSelectCreator }) => {
  return (
    <div className="rounded-lg border border-[#ECECEC] bg-white overflow-hidden mt-6 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F8F8] border-b border-[#ECECEC] text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">Profile</th>
              <th className="py-3 px-5">Awards</th>
              <th className="py-3 px-5">Categories</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {DIRECTORY_TABLE_ROWS.map(row => (
              <tr key={row.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900">{row.name}</span>
                    <span className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded ${
                      row.badge === 'INT' ? 'bg-[#181818] text-white' : 'bg-neutral-200 text-neutral-800'
                    }`}>
                      {row.badge}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-5 text-neutral-600 font-medium">
                  {row.profile}
                </td>
                <td className="py-3.5 px-5 font-mono font-bold text-[#3ea094]">
                  {row.awards}
                </td>
                <td className="py-3.5 px-5 text-neutral-500 truncate max-w-xs">
                  {row.categories}
                </td>
                <td className="py-3.5 px-5 text-right">
                  <button
                    onClick={() => onSelectCreator(row.name)}
                    className="text-xs font-semibold text-neutral-700 hover:text-black hover:underline cursor-pointer"
                  >
                    View →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
