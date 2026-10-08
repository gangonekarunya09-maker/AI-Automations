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
  const triggerTool = workflow.architecture_steps[0]?.tool || 'Webhook';
  const engineTool = workflow.technologies[1] || 'AI Engine';
  const outputTool = workflow.architecture_steps[workflow.architecture_steps.length - 1]?.tool || 'Output Dispatch';

  return (
    <div className="group border border-white/[0.08] bg-[#0A0B0F] hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Code-driven Schematic Pipeline Header (Zero Raster Images) */}
        <div
          onClick={() => onSelect(workflow)}
          className="relative p-4 sm:p-5 bg-[#07080B] border-b border-white/[0.08] cursor-pointer overflow-hidden group-hover:bg-[#0C0E14] transition-colors"
        >
          {/* Subtle vector grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-60" />

          {/* Top metadata strip */}
          <div className="relative flex items-center justify-between text-[10px] font-mono mb-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-neutral-300 uppercase tracking-wider font-semibold">{workflow.category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span>{workflow.id.toUpperCase()}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white ml-1">
                <ArrowUpRight className="w-3.5 h-3.5 inline" />
              </span>
            </div>
          </div>

          {/* Connected Pipeline Flow Schematic */}
          <div className="relative py-2 px-1">
            <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
              <div className="flex-1 bg-white/[0.04] border border-white/10 p-2 text-center truncate group-hover:border-emerald-500/30 transition-colors">
                <div className="text-[9px] text-neutral-400 uppercase tracking-widest mb-0.5">01 Trigger</div>
                <div className="text-neutral-200 font-medium truncate">{triggerTool}</div>
              </div>

              <div className="flex items-center justify-center px-1 text-emerald-400 shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex-1 bg-white/[0.04] border border-white/10 p-2 text-center truncate group-hover:border-emerald-500/30 transition-colors">
                <div className="text-[9px] text-neutral-400 uppercase tracking-widest mb-0.5">02 Logic</div>
                <div className="text-neutral-200 font-medium truncate">{engineTool}</div>
              </div>

              <div className="flex items-center justify-center px-1 text-emerald-400 shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex-1 bg-white/[0.04] border border-white/10 p-2 text-center truncate group-hover:border-emerald-500/30 transition-colors">
                <div className="text-[9px] text-neutral-400 uppercase tracking-widest mb-0.5">03 Target</div>
                <div className="text-neutral-200 font-medium truncate">{outputTool}</div>
              </div>
            </div>

            {/* Live Telemetry Ping Bar */}
            <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-white/[0.06] pt-2">
              <span className="flex items-center gap-1">
                <span className="text-emerald-400">●</span> 100% Deterministic Run
              </span>
              <span>{workflow.downloads_count} Deployments</span>
            </div>
          </div>
        </div>

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
