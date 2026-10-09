import React, { useState, useMemo } from 'react';
import { Search, Layers, ArrowRight } from 'lucide-react';
import { Workflow } from '../types';
import { WorkflowCard } from '../components/WorkflowCard';

interface WorkflowsProps {
  workflows: Workflow[];
  initialCategory?: string;
  onSelectWorkflow: (workflow: Workflow) => void;
  onRequestWorkflow: (workflow: Workflow) => void;
  onRequestCustom: () => void;
}

const CATEGORIES = [
  'All',
  'Sales',
  'Marketing',
  'Operations',
  'Customer Support',
  'AI & Documents',
  'E-Commerce'
];

export const Workflows: React.FC<WorkflowsProps> = ({
  workflows,
  initialCategory = 'All',
  onSelectWorkflow,
  onRequestWorkflow,
  onRequestCustom
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');

  // Extract all unique technologies
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    workflows.forEach(w => w.technologies.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [workflows]);

  const filteredWorkflows = useMemo(() => {
    return workflows.filter(w => {
      // Status check
      if (w.status !== 'published') return false;

      // Category check
      if (selectedCategory !== 'All' && w.category !== selectedCategory) {
        return false;
      }

      // Tech check
      if (selectedTech !== 'All' && !w.technologies.includes(selectedTech)) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = w.name.toLowerCase().includes(query);
        const matchesDesc = w.short_description.toLowerCase().includes(query);
        const matchesTech = w.technologies.some(t => t.toLowerCase().includes(query));
        const matchesCat = w.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTech && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price_inr - b.price_inr;
      if (sortBy === 'price-desc') return b.price_inr - a.price_inr;
      if (sortBy === 'popular') return b.downloads_count - a.downloads_count;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [workflows, selectedCategory, selectedTech, searchQuery, sortBy]);

  return (
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Top Header Banner */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 border-b border-[#CFCFCC]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
              CATALOG INDEX // {filteredWorkflows.length} AVAILABLE BLUEPRINTS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
              WORKFLOW CATALOG
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 max-w-xl leading-relaxed">
              Tested, production-certified automation architectures. Purchase source JSON files with complete credential runbooks or order end-to-end setup.
            </p>
          </div>

          <button
            onClick={onRequestCustom}
            className="self-start md:self-auto btn-primary"
          >
            <span>REQUEST CUSTOM BUILD</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="w-full px-4 sm:px-8 py-6 bg-[#F6F5F3] border-b border-[#CFCFCC]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search workflows, tools, or integrations..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CFCFCC] rounded-xl text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6B6B] hover:text-[#0E0E0E] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-[#6B6B6B] uppercase text-[11px] font-semibold tracking-wider">
                <span>Stack:</span>
                <select
                  value={selectedTech}
                  onChange={e => setSelectedTech(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#CFCFCC] rounded-lg text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none cursor-pointer"
                >
                  {allTechs.slice(0, 12).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-[#6B6B6B] uppercase text-[11px] font-semibold tracking-wider">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-white border border-[#CFCFCC] rounded-lg text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer whitespace-nowrap rounded-full ${
                    isActive
                      ? 'bg-[#0E0E0E] text-white'
                      : 'bg-white text-[#6B6B6B] hover:text-[#0E0E0E] border border-[#CFCFCC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflows Grid Area */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#E4E3E0]">
        <div className="max-w-7xl mx-auto">
          {filteredWorkflows.length === 0 ? (
            <div className="py-24 text-center bg-white border border-[#CFCFCC] rounded-2xl p-8 space-y-4 max-w-xl mx-auto">
              <Layers className="w-10 h-10 text-[#6B6B6B] mx-auto" strokeWidth={1.5} />
              <h3 className="text-base font-bold uppercase tracking-tight text-[#0E0E0E]">
                No blueprints match your criteria
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Try resetting your filters or describe your custom workflow needs.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedTech('All');
                  }}
                  className="px-4 py-2 rounded-lg text-xs uppercase tracking-[0.14em] font-semibold text-[#0E0E0E] border border-[#0E0E0E] cursor-pointer"
                >
                  Reset Filters
                </button>
                <button
                  onClick={onRequestCustom}
                  className="btn-primary"
                >
                  Request Custom Build
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map(workflow => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onSelect={onSelectWorkflow}
                  onRequestWorkflow={onRequestWorkflow}
                />
              ))}
            </div>
          )}

          {/* Bottom Banner */}
          <div className="mt-16 bg-[#0E0E0E]/60 backdrop-blur-md text-white p-8 sm:p-12 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/10 shadow-xl">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">
                ENTERPRISE BESPOKE ARCHITECTURE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                Require a custom webhook pipe or internal API bridge?
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                We develop resilient n8n pipelines for custom ERPs, proprietary databases, and internal enterprise tools.
              </p>
            </div>

            <button
              onClick={onRequestCustom}
              className="h-11 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Request Custom Build
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
