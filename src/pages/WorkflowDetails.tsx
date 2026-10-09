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
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Top Breadcrumb & Nav */}
      <div className="w-full px-4 sm:px-8 py-6 border-b border-[#CFCFCC] bg-[#F6F5F3]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#0E0E0E] editorial-link cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workflow Catalog</span>
          </button>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]">
            {workflow.category} // {workflow.id.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-14 lg:py-20 space-y-16">
        {/* Title Header */}
        <div className="space-y-6">
          <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#6B6B6B]">
            BLUEPRINT #{workflow.id.toUpperCase()} // PRODUCTION ARCHITECTURE
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
            {workflow.name}
          </h1>

          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed max-w-3xl">
            {workflow.long_description}
          </p>

          {/* Quantified Impact Banner */}
          <div className="p-5 bg-[#F6F5F3] border-l-4 border-[#0E0E0E] border-y border-r border-[#CFCFCC] rounded-xl flex items-start gap-4 max-w-2xl">
            <Check className="w-5 h-5 text-[#0E0E0E] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase tracking-[0.14em] font-bold text-[#0E0E0E] block mb-0.5">
                TARGET OPERATIONAL BENEFIT
              </span>
              <span className="text-xs sm:text-sm text-[#0E0E0E] font-medium leading-relaxed">
                {workflow.benefit}
              </span>
            </div>
          </div>

          {/* Acquisition Strip */}
          <div className="pt-4 p-8 bg-[#0E0E0E]/60 backdrop-blur-md text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/10 shadow-xl">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                COMMERCIAL LICENSE
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  ₹{workflow.price_inr.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-400 font-semibold">
                  (${workflow.price_usd} USD)
                </span>
                {workflow.original_price_inr && (
                  <span className="text-xs text-neutral-600 line-through ml-2">
                    ₹{workflow.original_price_inr.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                Includes full JSON source, credential runbooks, and 30-day onboarding guidance.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onRequestWorkflow(workflow)}
                className="h-12 px-8 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>GET WORKFLOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestCustom}
                className="h-12 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-white border border-white/30 hover:border-white transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>CUSTOM SCOPE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline Architecture Sequence */}
        <div className="space-y-6 pt-10 border-t border-[#CFCFCC]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
              EXECUTION GRAPH
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              STEP-BY-STEP SEQUENCE
            </h2>
          </div>

          <div className="space-y-3">
            {workflow.architecture_steps.map((st) => (
              <div
                key={st.step}
                className="p-6 bg-white border border-[#CFCFCC] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 bg-[#0E0E0E] text-white font-bold text-sm rounded-xl flex items-center justify-center shrink-0">
                    0{st.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-bold uppercase text-[#0E0E0E] tracking-tight">{st.title}</h3>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6B6B6B]">VIA {st.tool}</span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-2xl">
                      {st.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Tool Stack */}
        <div className="space-y-4 pt-10 border-t border-[#CFCFCC]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
              INTEGRATIONS
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              CONNECTED PLATFORMS & SERVICES
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {workflow.technologies.map(tech => (
              <div
                key={tech}
                className="px-4 py-2 bg-white border border-[#CFCFCC] rounded-full text-xs font-semibold text-[#0E0E0E] uppercase tracking-wider"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="space-y-4 pt-10 border-t border-[#CFCFCC]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
              SPECIFICATION
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              WHAT IS INCLUDED
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {workflow.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#CFCFCC] rounded-xl flex items-start gap-3 text-xs text-[#0E0E0E]"
              >
                <Check className="w-4 h-4 text-[#0E0E0E] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Three Delivery Models */}
        <div className="space-y-6 pt-10 border-t border-[#CFCFCC]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
              DELIVERY MODELS
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              CHOOSE HOW YOU OPERATE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#CFCFCC] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0E0E0E] block mb-2">
                  MODEL A // WORKFLOW JSON
                </span>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  Import the JSON into your own self-hosted n8n environment, connect your API keys, and run independently.
                </p>
              </div>
              <div className="pt-4 border-t border-[#CFCFCC] text-sm font-bold text-[#0E0E0E]">
                ₹{workflow.price_inr.toLocaleString()} one-time
              </div>
            </div>

            <div className="p-6 bg-[#0E0E0E]/60 backdrop-blur-md text-white border border-white/10 rounded-2xl flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-[0.16em] font-bold text-white block mb-2">
                  MODEL C // HYBRID SETUP
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  We configure the workflow on your servers, connect external credentials, and conduct stress-testing with your team.
                </p>
              </div>
              <div className="pt-4 border-t border-white/20 text-sm font-bold text-white">
                ₹{Math.round(workflow.price_inr * 1.6).toLocaleString()} one-time
              </div>
            </div>

            <div className="p-6 bg-white border border-[#CFCFCC] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#0E0E0E] block mb-2">
                  MODEL B // MANAGED OPS
                </span>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  We host, monitor, and maintain the automation 24/7 on dedicated cloud infrastructure with proactive error patching.
                </p>
              </div>
              <div className="pt-4 border-t border-[#CFCFCC] text-sm font-bold text-[#0E0E0E]">
                ₹{Math.round(workflow.price_inr * 2.5).toLocaleString()} / month
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 bg-[#0E0E0E]/60 backdrop-blur-md text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-1">
              READY TO DEPLOY THIS BLUEPRINT?
            </h3>
            <p className="text-xs text-neutral-400">
              Submit your inquiry for instant delivery manifest or custom scoping.
            </p>
          </div>

          <button
            onClick={() => onRequestWorkflow(workflow)}
            className="h-12 px-8 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            REQUEST WORKFLOW NOW
          </button>
        </div>
      </div>
    </div>
  );
};
