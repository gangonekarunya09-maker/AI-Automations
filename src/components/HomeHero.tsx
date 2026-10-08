import React from 'react';
import { ExternalLink, ArrowRight, Award } from 'lucide-react';
import { SiteItem } from '../types/awwwards';

interface HomeHeroProps {
  sotd: SiteItem;
  onSelect: (site: SiteItem) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ sotd, onSelect }) => {
  return (
    <section className="relative pt-6 pb-12 sm:pb-16 bg-white border-b border-[#ECECEC]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Full Link Card Area */}
        <div
          onClick={() => onSelect(sotd)}
          className="group cursor-pointer block rounded-xl overflow-hidden"
        >
          {/* Label Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-[#181818] text-[#3ea094]">
                Site of the Day
              </span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500 font-medium">{sotd.date}</span>
            </div>

            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-neutral-400 text-xs">Score</span>
              <span className="text-lg font-bold text-[#181818]">{sotd.score.toFixed(2)}</span>
              <span className="text-neutral-400 text-xs">of 10</span>
            </div>
          </div>

          {/* Title & Creator Line */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181818] group-hover:text-[#3ea094] transition-colors leading-[1.05]">
                {sotd.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-neutral-500 mt-2 font-medium">
                <span>by</span>
                <span className="font-bold text-neutral-900">{sotd.creator.name}</span>
                {sotd.creator.isPro && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-black text-white">
                    PRO
                  </span>
                )}
                {sotd.creator.location && (
                  <>
                    <span>·</span>
                    <span className="text-neutral-400">{sotd.creator.location}</span>
                  </>
                )}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800 group-hover:text-[#3ea094]">
              <span>Explore Site of the Day</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Large Hero Preview Showcase Image */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 border border-[#E0E0E0] shadow-sm">
            <img
              src={sotd.heroImage || sotd.thumbnail}
              alt={sotd.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 sm:p-8">
              <div className="text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                <span>Click to view full jury score & design analysis</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
