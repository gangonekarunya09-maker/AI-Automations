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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-12">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-[#e4e4df]">
        <div className="max-w-2xl">
          <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.2em] mb-2 font-semibold">
            Production Catalog ({filteredWorkflows.length} Available)
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
            Automation Workflows
          </h1>
          <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
            Ready-made n8n workflows and AI-driven business engines. Purchase the source blueprint or choose full-service installation and ongoing managed operations.
          </p>
        </div>

        <button
          onClick={onRequestCustom}
          className="px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#1a1a1a] hover:text-[#2e4ff4] bg-white hover:bg-neutral-50 border border-[#e4e4df] hover:border-[#1a1a1a] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
        >
          <span>Need a Custom Pipeline?</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#2e4ff4]" />
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by workflow name, integration, or tool..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e4e4df] text-xs sm:text-sm text-[#1a1a1a] placeholder-neutral-400 focus:border-[#1a1a1a] focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-black cursor-pointer font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort & Tech Selector */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-600 whitespace-nowrap font-mono text-[11px]">
              <span className="uppercase text-neutral-400">Stack:</span>
              <select
                value={selectedTech}
                onChange={e => setSelectedTech(e.target.value)}
                className="px-3 py-2 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none cursor-pointer shadow-sm font-mono"
              >
                {allTechs.slice(0, 12).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-600 whitespace-nowrap font-mono text-[11px]">
              <span className="uppercase text-neutral-400">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none cursor-pointer shadow-sm font-mono"
              >
                <option value="featured">Featured First</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Segmented Filter Controls as Flow Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white font-semibold shadow-sm'
                    : 'text-neutral-600 hover:text-[#1a1a1a] bg-white hover:bg-neutral-50 border border-[#e4e4df]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workflows Grid */}
      {filteredWorkflows.length === 0 ? (
        <div className="py-20 text-center border border-[#e4e4df] bg-white p-8 space-y-3 shadow-sm">
          <Layers className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-xl font-serif font-semibold text-[#1a1a1a]">
            No workflows match your criteria
          </h3>
          <p className="text-neutral-600 text-xs max-w-sm mx-auto mb-6">
            Try adjusting your search terms or view all available categories. Alternatively, describe your custom manual process.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTech('All');
              }}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-700 bg-[#f4f4f0] hover:bg-neutral-200 border border-[#e4e4df] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={onRequestCustom}
              className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors cursor-pointer"
            >
              Request Custom Automation
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

      {/* Catalog Bottom Banner */}
      <div className="p-6 sm:p-8 border border-[#e4e4df] bg-[#f4f4f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="text-base font-serif font-semibold text-[#1a1a1a] mb-1">
            Looking for an integration or platform not listed here?
          </div>
          <div className="text-xs text-neutral-600 max-w-xl">
            We build custom workflows connecting internal databases, legacy ERPs, WhatsApp Cloud API, and proprietary webhook systems.
          </div>
        </div>

        <button
          onClick={onRequestCustom}
          className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          Request Custom Build
        </button>
      </div>
    </div>
  );
};
