import React from 'react';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
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
  return (
    <div className="group border border-white/[0.08] bg-[#0A0B0F] hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Card Visual Header if image available */}
        {workflow.image && (
          <div
            onClick={() => onSelect(workflow)}
            className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 border-b border-white/[0.08] cursor-pointer"
          >
            <img
              src={workflow.image}
              alt={workflow.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0F] via-transparent to-transparent opacity-80" />

            {/* Corner Badge */}
            <div className="absolute top-3 left-3">
              <span className="font-mono text-[10px] uppercase tracking-wider bg-black/80 backdrop-blur-sm text-neutral-300 px-2.5 py-1 border border-white/10">
                {workflow.category}
              </span>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="w-7 h-7 flex items-center justify-center bg-white text-black rounded-none">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Metadata row if no image, or stack kicker */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400 uppercase tracking-wider mb-2.5">
            <span className="text-emerald-400 font-medium">{workflow.category}</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="truncate">{workflow.technologies.slice(0, 3).join(' · ')}</span>
          </div>

          {/* Primary Title */}
          <h3
            onClick={() => onSelect(workflow)}
            className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer leading-snug mb-3"
          >
            {workflow.name}
          </h3>

          {/* Short Description */}
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
            {workflow.short_description}
          </p>

          {/* Key Benefit Highlight */}
          <div className="p-3 bg-white/[0.02] border-l-2 border-emerald-400 border-y border-r border-white/[0.04] text-xs text-neutral-300 mb-5 flex items-start gap-2.5">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-snug text-neutral-300">{workflow.benefit}</span>
          </div>

          {/* Technologies connected */}
          <div className="text-[11px] text-neutral-400 font-mono flex items-baseline gap-1.5 pt-1">
            <span className="text-neutral-600 uppercase">Stack:</span>
            <span className="text-neutral-400 truncate">{workflow.technologies.join(' · ')}</span>
          </div>
        </div>
      </div>

      {/* Card Footer with Price and Primary Actions */}
      <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Commercial License</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
              ₹{workflow.price_inr.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              (${workflow.price_usd})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(workflow)}
            className="px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-neutral-300 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer whitespace-nowrap"
          >
            Details
          </button>
          <button
            onClick={() => onRequestWorkflow(workflow)}
            className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <span>Get</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
