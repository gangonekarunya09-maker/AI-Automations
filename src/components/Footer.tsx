import React from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestCustom }) => {
  return (
    <footer className="w-full bg-[#0E0E0E] text-white border-t border-[#0E0E0E]">
      <div className="w-full px-4 sm:px-8 py-16 lg:py-24">
        {/* Top headline / wordmark statement */}
        <div className="border-b border-white/15 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-neutral-400 block mb-2">
              AUTOMATION STUDIO // ARCHITECTURE & SYSTEMS
            </span>
            <div className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] uppercase text-white leading-none">
              OFFLO STUDIO
            </div>
          </div>
          <button
            onClick={onRequestCustom}
            className="self-start md:self-auto h-12 px-8 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Request Custom Architecture</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Column 1: Core purpose */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block">
              01 // PHILOSOPHY
            </span>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              We engineer zero-latency workflow pipelines, n8n automations, and AI agents with complete data privacy and full client code ownership.
            </p>
            <div className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 pt-2">
              RUNTIMES DEPLOYED GLOBALLY
            </div>
          </div>

          {/* Column 2: Workflows */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-4">
              02 // BLUEPRINTS
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-[0.14em]">
              <li>
                <button onClick={() => onNavigate('/workflows?category=Sales')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Inbound Sales & CRM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows?category=Operations')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Operations & KPI Reporting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows?category=AI & Documents')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Document & PDF Reconciliation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows?category=Customer Support')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Autonomous Triage Agents
                </button>
              </li>
              <li className="pt-2">
                <button onClick={() => onNavigate('/workflows')} className="text-white editorial-link font-semibold text-left">
                  Explore Full Catalog →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Industries */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-4">
              03 // EXPERTISE
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-[0.14em]">
              <li>
                <button onClick={() => onNavigate('/services')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Custom Pipeline Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Managed Cloud Orchestration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  B2B SaaS & Tech Teams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Creative & Marketing Agencies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Logistics & Professional Firms
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio & Admin */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-4">
              04 // STUDIO
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-[0.14em]">
              <li>
                <button onClick={() => onNavigate('/about')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  About Offlo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="text-neutral-300 hover:text-white transition-colors cursor-pointer text-left">
                  Consultation & Intake
                </button>
              </li>
              <li className="pt-3 border-t border-white/10">
                <button
                  onClick={() => onNavigate('/admin')}
                  className="text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer uppercase text-[11px]"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Terminal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom hairline row */}
        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px] uppercase tracking-[0.16em]">
          <div>
            © {new Date().getFullYear()} OFFLO AUTOMATIONS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>SELF-HOSTABLE RUNTIMES</span>
            <span>DATA PRIVACY ENFORCED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
