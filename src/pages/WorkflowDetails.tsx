import React from 'react';
import { ArrowLeft, ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { Workflow } from '../types';

interface WorkflowDetailsProps {
  workflow: Workflow;
  onBack: () => void;
  onRequestWorkflow: (workflow: Workflow) => void;
  onRequestCustom: () => void;
}

export const WorkflowDetails: React.FC<WorkflowDetailsProps> = ({
  workflow,
  onBack,
  onRequestWorkflow,
  onRequestCustom
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Back navigation & breadcrumb */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[#1a1a1a] transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Workflow Catalog</span>
        </button>
      </div>

      {/* Hero Block */}
      <div className="space-y-7">
        <div className="flex items-center gap-2 text-xs font-mono text-[#2e4ff4] uppercase tracking-[0.15em] font-semibold">
          <span>{workflow.category}</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500 font-normal">Blueprint #{workflow.id}</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500 font-normal">{workflow.downloads_count} Deployments</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-semibold text-[#1a1a1a] tracking-tight leading-[0.95]">
          {workflow.name}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
          {workflow.long_description}
        </p>

        {/* Quantified Benefit Callout */}
        <div className="p-4 bg-[#f4f4f0] border-l-2 border-[#2e4ff4] text-sm text-[#1a1a1a] flex items-start gap-3 max-w-2xl">
          <Check className="w-4 h-4 text-[#2e4ff4] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#1a1a1a]">Direct Business Impact: </span>
            <span className="text-neutral-700">{workflow.benefit}</span>
          </div>
        </div>

        {/* Pricing & Acquisition Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-7 border border-[#e4e4df] bg-white shadow-sm">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Commercial License</div>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-3xl font-serif font-bold text-[#1a1a1a] tabular-nums">
                ₹{workflow.price_inr.toLocaleString()}
              </span>
              <span className="text-sm font-mono text-neutral-500">
                (${workflow.price_usd} USD)
              </span>
              {workflow.original_price_inr && (
                <span className="text-xs font-mono text-neutral-400 line-through tabular-nums ml-2">
                  ₹{workflow.original_price_inr.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-500 mt-1 font-mono">
              Includes full source n8n workflow file, test suites, and 30 days setup guidance.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onRequestWorkflow(workflow)}
              className="px-7 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.98] shadow-sm"
            >
              <span>Get This Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onRequestCustom}
              className="px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#1a1a1a] hover:text-[#2e4ff4] bg-white hover:bg-neutral-50 border border-[#e4e4df] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Request Custom Variation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
            </button>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS: Step-by-Step Architecture Pipeline */}
      <div className="space-y-7 pt-8 border-t border-[#e4e4df]">
        <div>
          <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.15em] mb-1 font-semibold">
            System Pipeline
          </div>
          <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
            How This Automation Works
          </h2>
          <p className="text-neutral-600 text-xs sm:text-sm mt-1">
            Deterministic step-by-step sequence executed by n8n.
          </p>
        </div>

        <div className="space-y-3">
          {workflow.architecture_steps.map((st) => (
            <div
              key={st.step}
              className="p-5 sm:p-6 border border-[#e4e4df] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#f4f4f0] border border-[#e4e4df] text-[#2e4ff4] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  0{st.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">{st.title}</h3>
                    <span className="text-[11px] font-mono text-neutral-500">via {st.tool}</span>
                  </div>
                  <p className="text-neutral-600 text-xs leading-relaxed max-w-2xl">
                    {st.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TECHNOLOGIES USED */}
      <div className="space-y-4 pt-8 border-t border-[#e4e4df]">
        <div>
          <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.15em] mb-1 font-semibold">
            Tech Stack
          </div>
          <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
            Connected Software & Services
          </h2>
          <p className="text-neutral-600 text-xs mt-1">
            All endpoints connect via official REST/GraphQL APIs or secure OAuth2 credentials.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {workflow.technologies.map(tech => (
            <div
              key={tech}
              className="px-3.5 py-1.5 bg-white border border-[#e4e4df] text-xs text-[#1a1a1a] font-mono shadow-sm"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* WHAT YOU RECEIVE */}
      <div className="space-y-4 pt-8 border-t border-[#e4e4df]">
        <div>
          <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.15em] mb-1 font-semibold">
            Deliverables
          </div>
          <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
            What You Receive
          </h2>
          <p className="text-neutral-600 text-xs mt-1">
            Everything needed to install in your own self-hosted n8n instance or have us manage it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {workflow.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 bg-white border border-[#e4e4df] flex items-start gap-3 text-xs text-neutral-700 shadow-sm"
            >
              <Check className="w-3.5 h-3.5 text-[#2e4ff4] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* THREE DELIVERY TIERS EXPLAINED */}
      <div className="space-y-6 pt-8 border-t border-[#e4e4df]">
        <div>
          <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.15em] mb-1 font-semibold">
            Acquisition Options
          </div>
          <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
            Flexible Delivery Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border border-[#e4e4df] bg-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs uppercase font-mono tracking-wider font-semibold text-[#1a1a1a] mb-2">Model A — Workflow JSON</div>
              <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                You import the JSON into your own n8n instance, paste your API keys, and run it. Best for technical teams.
              </p>
            </div>
            <div className="pt-4 border-t border-[#e4e4df] text-xs font-mono text-[#1a1a1a] font-bold">
              ₹{workflow.price_inr.toLocaleString()} one-time
            </div>
          </div>

          <div className="p-6 border border-[#1a1a1a] bg-[#f4f4f0] flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs uppercase font-mono tracking-wider font-semibold text-[#1a1a1a] mb-2">Model C — Hybrid Setup</div>
              <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                We configure the workflow, connect your tool credentials, conduct synthetic test runs, and verify error traps with your team.
              </p>
            </div>
            <div className="pt-4 border-t border-[#e4e4df] text-xs font-mono text-[#2e4ff4] font-bold">
              ₹{Math.round(workflow.price_inr * 1.6).toLocaleString()} one-time
            </div>
          </div>

          <div className="p-6 border border-[#e4e4df] bg-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs uppercase font-mono tracking-wider font-semibold text-[#1a1a1a] mb-2">Model B — Managed Ops</div>
              <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                We host, monitor, and maintain the automation 24/7 on dedicated cloud infrastructure with proactive error resolution.
              </p>
            </div>
            <div className="pt-4 border-t border-[#e4e4df] text-xs font-mono text-[#1a1a1a] font-bold">
              ₹{Math.round(workflow.price_inr * 2.5).toLocaleString()} / month
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 border border-[#e4e4df] bg-[#f4f4f0] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-2xl font-serif font-semibold text-[#1a1a1a] mb-1">
            Ready to deploy {workflow.name}?
          </h3>
          <p className="text-neutral-600 text-xs">
            Submit your inquiry to receive the deployment manifest and compatibility review.
          </p>
        </div>

        <button
          onClick={() => onRequestWorkflow(workflow)}
          className="px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors cursor-pointer whitespace-nowrap active:scale-[0.98] shadow-sm"
        >
          Request Workflow Now
        </button>
      </div>
    </div>
  );
};
