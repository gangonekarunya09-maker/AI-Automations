import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Heart } from 'lucide-react';
import { Workflow } from '../types';

interface WorkflowCardProps {
  workflow: Workflow;
  onSelect: (workflow: Workflow) => void;
  onRequestWorkflow: (workflow: Workflow) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  onSelect,
  onRequestWorkflow,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const triggerTool = workflow.architecture_steps[0]?.tool || 'Webhook';
  const engineTool = workflow.technologies[1] || 'AI Engine';
  const outputTool = workflow.architecture_steps[workflow.architecture_steps.length - 1]?.tool || 'Dispatch';

  return (
    <div className="group bg-[#FFFFFF] border border-[#CFCFCC] flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Schematic Architecture Header with Favorite Heart Icon */}
        <div className="relative p-5 bg-[#F6F5F3] border-b border-[#CFCFCC] overflow-hidden select-none">
          {/* Top metadata strip & Heart icon */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]">
              {workflow.category} // {workflow.id.toUpperCase()}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className="p-1 text-[#6B6B6B] hover:text-[#0E0E0E] transition-colors cursor-pointer"
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              aria-label="Toggle favorite"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-[#0E0E0E] text-[#0E0E0E]' : 'text-[#6B6B6B]'
                }`}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Connected Vector Pipeline Flow Schematic */}
          <div
            onClick={() => onSelect(workflow)}
            className="py-3 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <div className="flex-1 bg-[#FFFFFF] border border-[#CFCFCC] p-2 text-center truncate">
                <div className="text-[8px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-0.5">01 Trigger</div>
                <div className="text-[#0E0E0E] font-semibold truncate text-[10px]">{triggerTool}</div>
              </div>

              <div className="px-1 text-[#6B6B6B] shrink-0 font-mono text-xs">→</div>

              <div className="flex-1 bg-[#FFFFFF] border border-[#CFCFCC] p-2 text-center truncate">
                <div className="text-[8px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-0.5">02 Logic</div>
                <div className="text-[#0E0E0E] font-semibold truncate text-[10px]">{engineTool}</div>
              </div>

              <div className="px-1 text-[#6B6B6B] shrink-0 font-mono text-xs">→</div>

              <div className="flex-1 bg-[#FFFFFF] border border-[#CFCFCC] p-2 text-center truncate">
                <div className="text-[8px] text-[#6B6B6B] uppercase tracking-[0.2em] mb-0.5">03 Target</div>
                <div className="text-[#0E0E0E] font-semibold truncate text-[10px]">{outputTool}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-[#6B6B6B] border-t border-[#CFCFCC] pt-2">
              <span>● Production Certified</span>
              <span>{workflow.downloads_count} Deploys</span>
            </div>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6">
          <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#6B6B6B] mb-2">
            {workflow.technologies.slice(0, 3).join(' · ')}
          </div>

          <h3
            onClick={() => onSelect(workflow)}
            className="text-base sm:text-lg font-bold text-[#0E0E0E] hover:opacity-75 transition-opacity cursor-pointer leading-tight mb-2 uppercase tracking-tight"
          >
            {workflow.name}
          </h3>

          <p className="text-[#6B6B6B] text-xs leading-relaxed mb-4 line-clamp-2">
            {workflow.short_description}
          </p>

          <div className="border-l-2 border-[#0E0E0E] pl-3 py-1 text-xs text-[#0E0E0E] bg-[#F6F5F3] font-medium leading-snug">
            {workflow.benefit}
          </div>
        </div>
      </div>

      {/* Card Footer with Price and Primary Actions */}
      <div className="px-6 py-4 border-t border-[#CFCFCC] bg-[#F6F5F3] flex items-center justify-between gap-3">
        <div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-[#6B6B6B] font-semibold">License</div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-base font-bold text-[#0E0E0E] tracking-tight">
              ₹{workflow.price_inr.toLocaleString()}
            </span>
            <span className="text-xs text-[#6B6B6B]">
              (${workflow.price_usd})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(workflow)}
            className="text-xs font-semibold text-[#0E0E0E] editorial-link cursor-pointer uppercase tracking-wider py-1 px-1"
          >
            Details
          </button>
          <button
            onClick={() => onRequestWorkflow(workflow)}
            className="h-9 px-4 text-[11px] uppercase tracking-[0.16em] font-semibold text-white bg-[#0E0E0E] hover:bg-[#222222] transition-colors flex items-center gap-1.5 cursor-pointer active:scale-[0.99]"
          >
            <span>Get</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
