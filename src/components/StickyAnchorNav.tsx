import React, { useEffect, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface AnchorItem {
  id: string;
  label: string;
}

interface StickyAnchorNavProps {
  items: AnchorItem[];
  ctaLabel?: string;
  ctaUrl?: string;
  onCtaClick?: () => void;
  offsetThreshold?: number; // Scroll Y threshold to reveal nav
}

export const StickyAnchorNav: React.FC<StickyAnchorNavProps> = ({
  items,
  ctaLabel = 'Visit Sotd.',
  ctaUrl,
  onCtaClick,
  offsetThreshold = 400
}) => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setVisible(scrollPos > offsetThreshold);

      // Scroll-spy: find section currently in viewport
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, offsetThreshold]);

  if (!visible) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7E7E7] transition-all animate-in fade-in duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* Navigation items */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
          {items.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive ? 'text-black font-bold' : 'text-neutral-500 hover:text-black'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3ea094] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA Button */}
        {ctaLabel && (
          <div className="shrink-0 pl-4 border-l border-[#E7E7E7] hidden sm:block">
            {onCtaClick ? (
              <button
                onClick={onCtaClick}
                className="px-3.5 py-1 text-xs font-bold text-white bg-[#181818] hover:bg-[#3ea094] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>{ctaLabel}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            ) : ctaUrl ? (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1 text-xs font-bold text-white bg-[#181818] hover:bg-[#3ea094] rounded-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{ctaLabel}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
