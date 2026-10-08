import React from 'react';
import { ArrowRight, ShieldCheck, Lock, Cpu, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate, onRequestCustom }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-18">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
          Company & Philosophy
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
          We Replace Manual Friction With High-Reliability Automation.
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl">
          Operon Automations was founded on a simple realization: modern businesses do not suffer from a lack of software—they suffer from having human teams act as the manual glue between disconnected applications.
        </p>
      </div>

      {/* Philosophy Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-3.5 hover:border-white/20 transition-colors">
          <div className="w-10 h-10 bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">Zero Vendor Lock-In</h3>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            We build primarily on n8n—an open, self-hostable workflow engine. You receive source workflow JSON files that run on your own infrastructure. You are never held hostage by proprietary SaaS platforms.
          </p>
        </div>

        <div className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-3.5 hover:border-white/20 transition-colors">
          <div className="w-10 h-10 bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">Deterministic AI</h3>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            We do not deploy hallucinating chatbots. We integrate large language models strictly as deterministic structured extraction engines, scoring rubrics, and summarizers bounded by explicit schema validation.
          </p>
        </div>

        <div className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-3.5 hover:border-white/20 transition-colors">
          <div className="w-10 h-10 bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">Fail-Safe Engineering</h3>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Every pipeline includes automated retry queues, rate-limit buffers, dead-letter storage, and instant Slack/WhatsApp alerting so you know immediately if an external service API changes.
          </p>
        </div>
      </div>

      {/* The Tech Stack Breakdown */}
      <div className="p-8 sm:p-10 border border-white/[0.08] bg-[#0A0B0E] space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">
            Why We Build On n8n & Open Protocols
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Zapier and Make charge punitive fees as transaction volume expands and lock your automation logic behind proprietary walls. With n8n:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
          <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/[0.04]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Self-Hosted or Cloud:</span> You can host n8n on a $5/mo VPS or use n8n Cloud, processing millions of tasks with zero per-task surcharges.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/[0.04]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Full Privacy Compliance:</span> Sensitive client customer data, PII, and financial records never transit through intermediate marketing servers.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/[0.04]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Native Code Flexibility:</span> Custom JavaScript and Python nodes can be injected at any pipeline step when off-the-shelf nodes reach their limit.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/[0.04]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Git Version Control:</span> Automation blueprints can be exported, audited, and versioned in private repositories.
            </div>
          </div>
        </div>
      </div>

      {/* Operating Principles */}
      <div className="space-y-5">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">
          Our Operational Standards
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-neutral-400">
          <div className="p-4 bg-white/[0.01] border border-white/[0.04] leading-relaxed">
            <strong className="text-white block mb-1">1. We prioritize outcomes over technology:</strong> If a simple webhook and a Google Sheet formula solves your issue without an LLM, we will tell you. We never over-engineer for the sake of complexity.
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/[0.04] leading-relaxed">
            <strong className="text-white block mb-1">2. Transparent deliverables:</strong> You own the assets. When you purchase an Operon workflow, you receive clean, annotated JSON blueprints, environment variable checklists, and credential guides.
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/[0.04] leading-relaxed">
            <strong className="text-white block mb-1">3. Human-in-the-loop safeguards:</strong> Any process that writes to production financial ledgers or emails external VIP clients includes configurable approval gates.
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-base font-bold text-white">Ready to audit your manual processes?</div>
          <div className="text-xs text-neutral-400 mt-0.5">We will review your workflows and provide a feasibility breakdown within 24 hours.</div>
        </div>
        <button
          onClick={onRequestCustom}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          Request Automation Review
        </button>
      </div>
    </div>
  );
};
