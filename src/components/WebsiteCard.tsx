import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { SiteItem } from '../types/awwwards';

interface WebsiteCardProps {
  site: SiteItem;
  variant?: 'nominee' | 'winner' | 'listing' | 'promoted';
  onSelect: (site: SiteItem) => void;
  onVote?: (site: SiteItem) => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  site,
  variant = 'listing',
  onSelect,
  onVote
}) => {
  const isPromoted = site.badges?.includes('PROMOTED');

  return (
    <div className={`group flex flex-col justify-between transition-all ${
      isPromoted ? 'p-4 rounded-lg bg-[#F4F8F7] border border-[#3ea094]/40' : ''
    }`}>
      <div>
        {/* Thumbnail Frame */}
        <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-neutral-100 border border-[#ECECEC] mb-3">
          <img
            src={site.thumbnail}
            alt={site.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {site.badges?.map(b => (
              <span
                key={b}
                className={`text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-sm uppercase ${
                  b === 'SOTD'
                    ? 'bg-[#181818] text-[#3ea094]'
                    : b === 'DEV'
                      ? 'bg-[#181818] text-white'
                      : b === 'PROMOTED'
                        ? 'bg-[#3ea094] text-white'
                        : 'bg-white/90 text-neutral-800'
                }`}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Nominee "Vote Now" Hover Action */}
          {variant === 'nominee' && onVote && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVote(site);
                }}
                className="px-5 py-2 rounded-sm bg-[#3ea094] hover:bg-[#33857b] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg transform translate-y-1 group-hover:translate-y-0 cursor-pointer"
              >
                Vote Now
              </button>
            </div>
          )}
        </div>

        {/* Small Uppercase Category Label */}
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-neutral-400 uppercase mb-1">
          <span>{isPromoted ? 'SPONSORED' : (site.category || 'WEBSITE')}</span>
          {site.score > 0 && !isPromoted && (
            <span className="font-mono text-neutral-600 font-bold">{site.score.toFixed(2)}</span>
          )}
        </div>

        {/* Main Title */}
        <h3
          onClick={() => onSelect(site)}
          className="font-bold text-[15px] sm:text-[16px] text-[#181818] hover:text-[#3ea094] transition-colors leading-snug cursor-pointer line-clamp-1 mb-1"
        >
          {site.title}
        </h3>

        {/* URL Kicker */}
        <div className="text-[11px] font-mono text-neutral-400 truncate mb-1">
          {site.url}
        </div>
      </div>

      {/* Creator & Meta Line */}
      <div className="pt-2 border-t border-[#F0F0F0] mt-2 flex items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5 truncate">
          <span>by</span>
          <span className="font-semibold text-neutral-800 truncate">{site.creator.name}</span>
          {site.creator.isPro && (
            <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-black text-white shrink-0">
              PRO
            </span>
          )}
        </div>

        <div className="text-neutral-400 text-[10px] whitespace-nowrap pl-2">
          {site.date}
        </div>
      </div>
    </div>
  );
};
