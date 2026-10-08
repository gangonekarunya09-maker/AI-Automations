import React, { useState } from 'react';
import { Filter, X, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { FilterState } from '../types/awwwards';
import { COLOR_SWATCHES } from '../data/mockData';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  activeCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  activeCount
}) => {
  const [activeTab, setActiveTab] = useState<keyof FilterState | null>(null);

  const filterTabs: { key: keyof FilterState; label: string; options: string[] }[] = [
    {
      key: 'awards',
      label: 'Awards',
      options: ['All', 'SOTD', 'NOMINEE', 'DEV', 'HM', 'SOTM']
    },
    {
      key: 'category',
      label: 'Category',
      options: ['All', 'Architecture', 'E-commerce', 'Design Agencies', 'Technology', 'Hotel & Restaurant', 'Fashion', 'Science', 'Typography', 'Mobile & Apps']
    },
    {
      key: 'tag',
      label: 'Tag',
      options: ['All', 'Luxury', 'Animation', 'Clean', 'Minimal', 'Transitions', 'Microinteractions', 'Editorial', 'WebGL', '3D Models']
    },
    {
      key: 'technology',
      label: 'Technology',
      options: ['All', 'GSAP', 'Next.js', 'Three.js', 'WebGL', 'Shopify', 'React', 'Tailwind', 'Astro']
    },
    {
      key: 'country',
      label: 'Country',
      options: ['All', 'Denmark', 'Germany', 'Switzerland', 'Sweden', 'France', 'Japan', 'United Kingdom', 'Norway', 'United States']
    },
    {
      key: 'font',
      label: 'Font',
      options: ['All', 'Cabinet Grotesk', 'Syne', 'Cormorant Garamond', 'Plus Jakarta Sans', 'PP Neue Montreal', 'Satoshi', 'Space Grotesk']
    }
  ];

  const handleSelectOption = (key: keyof FilterState, val: string) => {
    onChange({
      ...filters,
      [key]: val === 'All' ? '' : val
    });
    setActiveTab(null);
  };

  const handleSelectColor = (hex: string) => {
    onChange({
      ...filters,
      color: filters.color === hex ? '' : hex
    });
  };

  return (
    <div className="bg-white border-b border-[#E7E7E7] sticky top-16 z-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
        {/* Horizontal Filter Tabs Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {filterTabs.map(tab => {
              const currentValue = filters[tab.key];
              const isSelected = Boolean(currentValue);
              const isOpen = activeTab === tab.key;

              return (
                <div key={tab.key} className="relative">
                  <button
                    onClick={() => setActiveTab(isOpen ? null : tab.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#181818] text-white border-[#181818]'
                        : isOpen
                          ? 'border-black text-black bg-neutral-50'
                          : 'border-[#E0E0E0] text-neutral-700 hover:border-black bg-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isSelected && (
                      <span className="font-mono text-[10px] text-[#3ea094] max-w-[80px] truncate">
                        : {currentValue}
                      </span>
                    )}
                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-56 max-h-64 overflow-y-auto bg-white border border-[#E0E0E0] rounded-md shadow-xl z-50 p-2 space-y-1 animate-in fade-in duration-100">
                      {tab.options.map(opt => {
                        const active = (opt === 'All' && !currentValue) || currentValue === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelectOption(tab.key, opt)}
                            className={`w-full text-left px-2.5 py-1.5 text-xs rounded transition-colors flex items-center justify-between cursor-pointer ${
                              active ? 'bg-neutral-100 font-bold text-black' : 'text-neutral-700 hover:bg-neutral-50'
                            }`}
                          >
                            <span>{opt}</span>
                            {active && <Check className="w-3.5 h-3.5 text-[#3ea094]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Color Swatch Trigger */}
            <div className="relative">
              <button
                onClick={() => setActiveTab(activeTab === 'color' ? null : 'color')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  filters.color
                    ? 'bg-[#181818] text-white border-[#181818]'
                    : activeTab === 'color'
                      ? 'border-black text-black bg-neutral-50'
                      : 'border-[#E0E0E0] text-neutral-700 hover:border-black bg-white'
                }`}
              >
                <span>Colors</span>
                {filters.color && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white shrink-0"
                    style={{ backgroundColor: filters.color }}
                  />
                )}
                <ChevronDown className={`w-3 h-3 transition-transform ${activeTab === 'color' ? 'rotate-180' : ''}`} />
              </button>

              {/* 27-Swatch Color Palette Popover */}
              {activeTab === 'color' && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-[#E0E0E0] rounded-md shadow-xl z-50 p-3 space-y-2 animate-in fade-in duration-100">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                    Filter by Dominant Palette
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {COLOR_SWATCHES.map(swatch => {
                      const isSelected = filters.color === swatch.hex;
                      return (
                        <button
                          key={swatch.hex}
                          onClick={() => handleSelectColor(swatch.hex)}
                          title={swatch.name}
                          className={`w-7 h-7 rounded-full border transition-transform cursor-pointer relative flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-black scale-110' : 'hover:scale-105 border-neutral-300'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {isSelected && (
                            <Check className={`w-3.5 h-3.5 ${swatch.hex === '#FFFFFF' || swatch.hex === '#F5F5F5' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Reset & Counter Controls */}
          <div className="flex items-center gap-3 ml-auto text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-neutral-500 font-mono">
              <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[11px] font-bold text-neutral-800">
                {activeCount}
              </span>
              <span className="hidden sm:inline">Active</span>
            </div>

            {activeCount > 0 && (
              <button
                onClick={onReset}
                className="text-neutral-600 hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#3ea094]" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
