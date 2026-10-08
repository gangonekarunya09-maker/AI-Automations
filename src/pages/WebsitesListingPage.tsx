import React, { useState, useMemo } from 'react';
import { FilterBar } from '../components/FilterBar';
import { WebsiteCard } from '../components/WebsiteCard';
import { WEBSITES_LISTING } from '../data/mockData';
import { SiteItem, FilterState } from '../types/awwwards';
import { ChevronDown, Search, ArrowRight, Sparkles } from 'lucide-react';

interface WebsitesListingPageProps {
  initialAward?: string;
  initialCategory?: string;
  initialTag?: string;
  onSelectSite: (site: SiteItem) => void;
  onVote: (site: SiteItem) => void;
}

export const WebsitesListingPage: React.FC<WebsitesListingPageProps> = ({
  initialAward = '',
  initialCategory = '',
  initialTag = '',
  onSelectSite,
  onVote
}) => {
  const [filters, setFilters] = useState<FilterState>({
    awards: initialAward,
    category: initialCategory,
    tag: initialTag,
    technology: '',
    country: '',
    font: '',
    color: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [readMoreExpanded, setReadMoreExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter calculation
  const filteredSites = useMemo(() => {
    return WEBSITES_LISTING.filter(site => {
      // Award filter
      if (filters.awards && filters.awards !== 'All') {
        if (filters.awards === 'WINNERS' && site.awardType !== 'SOTD' && site.awardType !== 'SOTM' && site.awardType !== 'SOTY') return false;
        if (filters.awards !== 'WINNERS' && site.awardType !== filters.awards && !site.badges?.includes(filters.awards as any)) return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'All' && site.category !== filters.category) {
        return false;
      }

      // Tag filter
      if (filters.tag && filters.tag !== 'All' && !site.tags?.some(t => t.toLowerCase() === filters.tag.toLowerCase())) {
        return false;
      }

      // Technology filter
      if (filters.technology && filters.technology !== 'All' && !site.technologies?.some(t => t.toLowerCase().includes(filters.technology.toLowerCase()))) {
        return false;
      }

      // Country filter
      if (filters.country && filters.country !== 'All' && site.country !== filters.country) {
        return false;
      }

      // Font filter
      if (filters.font && filters.font !== 'All' && site.font !== filters.font) {
        return false;
      }

      // Color filter
      if (filters.color) {
        const hex = filters.color.toLowerCase();
        if (!site.colors?.some(c => c.toLowerCase() === hex)) {
          // Soft match
          return true; // Keep visible if color not explicitly specified
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = site.title.toLowerCase().includes(q);
        const matchCreator = site.creator.name.toLowerCase().includes(q);
        const matchCat = site.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCreator && !matchCat) return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const handleResetFilters = () => {
    setFilters({
      awards: '',
      category: '',
      tag: '',
      technology: '',
      country: '',
      font: '',
      color: ''
    });
    setSearchQuery('');
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      {/* 7-Category Filter Bar */}
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        activeCount={activeCount}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Title & Intro Strip with "Read More" Toggle */}
        <div className="max-w-3xl mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181818]">
            Winning websites. Web Design Inspiration
          </h1>

          <p className="text-sm text-neutral-600 leading-relaxed">
            The best websites around the world, selected by the international jury. Celebrating creativity, accessibility, usability, and technical performance.
          </p>

          {readMoreExpanded && (
            <div className="text-xs text-neutral-500 leading-relaxed space-y-2 pt-2 border-t border-[#ECECEC] animate-in fade-in duration-200">
              <p>
                Every day, our international jury of creative directors, technologists, and designers reviews scores submitted projects based on 4 criteria: Design, Usability, Creativity, and Content.
              </p>
              <p>
                Browse our directory of Sites of the Day, Honorable Mentions, and Developer Awards to discover emerging typography trends, WebGL techniques, and design systems.
              </p>
            </div>
          )}

          <button
            onClick={() => setReadMoreExpanded(!readMoreExpanded)}
            className="text-xs font-bold text-neutral-800 hover:text-[#3ea094] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{readMoreExpanded ? 'Read less' : 'Read more'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${readMoreExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Search Bar & Result Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECECEC] mb-8">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by site title or studio..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-sm border border-[#D0D0D0] bg-white focus:border-black focus:outline-none"
            />
          </div>

          <div className="text-xs font-mono text-neutral-500 font-semibold">
            Showing <span className="text-black font-bold">{filteredSites.length}</span> websites
          </div>
        </div>

        {/* 30-Card Grid with 1 PROMOTED tile slot */}
        {filteredSites.length === 0 ? (
          <div className="py-24 text-center border border-[#ECECEC] rounded-lg bg-white p-8">
            <h3 className="text-base font-bold text-neutral-800 mb-1">No matching sites found</h3>
            <p className="text-xs text-neutral-500 mb-4">Try clearing active filters or adjusting your search term.</p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#181818] text-white text-xs font-bold uppercase rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSites.map((site) => (
              <WebsiteCard
                key={site.id}
                site={site}
                variant={site.badges?.includes('PROMOTED') ? 'promoted' : site.awardType === 'NOMINEE' ? 'nominee' : 'listing'}
                onSelect={onSelectSite}
                onVote={onVote}
              />
            ))}
          </div>
        )}

        {/* Pagination: 1 2 3 4 5 Next */}
        <div className="mt-14 pt-8 border-t border-[#ECECEC] flex items-center justify-center gap-1.5 text-xs font-mono font-bold">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-9 h-9 rounded-sm flex items-center justify-center transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-[#181818] text-white'
                  : 'bg-white border border-[#E0E0E0] text-neutral-700 hover:border-black'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentPage(p => Math.min(5, p + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 h-9 rounded-sm bg-white border border-[#E0E0E0] text-neutral-700 hover:border-black flex items-center gap-1 cursor-pointer ml-1"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
