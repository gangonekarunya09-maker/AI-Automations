import React from 'react';
import { ArrowRight, Lock, Cpu, ShieldCheck, Check } from 'lucide-react';

interface AboutProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate, onRequestCustom }) => {
  return (
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 border-b border-[#CFCFCC]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
              STUDIO PHILOSOPHY // MISSION STATEMENT
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
              ABOUT OFFLO
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 max-w-xl leading-relaxed">
              We eliminate repetitive manual work by engineering deterministic, private automation pipelines that execute with enterprise velocity.
            </p>
          </div>

          <button
            onClick={onRequestCustom}
            className="self-start md:self-auto btn-primary"
          >
            <span>SUBMIT BOTTLENECK</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Core Principles */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#E4E3E0]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#CFCFCC] space-y-4">
              <div className="w-12 h-12 bg-[#0E0E0E] text-white flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0E0E]">
                ZERO VENDOR LOCK-IN
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                We build primarily on n8n—an open, self-hostable workflow runtime. You receive clean source JSON files that execute on your servers. You are never trapped by proprietary per-task SaaS tax.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#CFCFCC] space-y-4">
              <div className="w-12 h-12 bg-[#0E0E0E] text-white flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0E0E]">
                DETERMINISTIC AI
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                We do not deploy hallucinating chatbots. We integrate large language models strictly as structured extraction engines, scoring rubrics, and summarizers bounded by explicit JSON schema validation.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#CFCFCC] space-y-4">
              <div className="w-12 h-12 bg-[#0E0E0E] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0E0E]">
                FAIL-SAFE ENGINEERING
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Every pipeline includes automated retry queues, rate-limit buffers, dead-letter storage, and instant Slack alerts so you know immediately if an external service API updates.
              </p>
            </div>
          </div>

          {/* Deep Dive Architecture Block */}
          <div className="p-8 sm:p-12 bg-[#0E0E0E] text-white border border-[#0E0E0E] space-y-8">
            <div className="border-b border-white/15 pb-6">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-neutral-400 block mb-1">
                STACK SELECTION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                WHY WE BUILD ON N8N & OPEN PROTOCOLS
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-300">
              <div className="p-5 bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white block">
                  01 // SELF-HOSTED ON PREMISE
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Run workflows on a $5/month VPS or your internal VPC. Process millions of high-throughput transactions with zero per-task surcharges.
                </p>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white block">
                  02 // PRIVACY COMPLIANCE
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Sensitive customer records, PII, and financial ledgers never transit through intermediate marketing servers. Everything stays in your cloud.
                </p>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white block">
                  03 // JAVASCRIPT & PYTHON NODES
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Custom algorithms, math validations, and data transformations can be injected directly into any step when standard nodes reach their limit.
                </p>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white block">
                  04 // GIT VERSION CONTROL
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Blueprints are exportable, reviewable, and version-controlled alongside your engineering codebase in GitHub or GitLab.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="p-8 sm:p-12 bg-white border border-[#CFCFCC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
                PROCESS FEASIBILITY AUDIT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
                READY TO AUDIT YOUR MANUAL PROCESSES?
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1">
                We review your operational workflows and return a feasibility breakdown within 24 hours.
              </p>
            </div>

            <button
              onClick={onRequestCustom}
              className="btn-primary"
            >
              REQUEST PROCESS AUDIT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
