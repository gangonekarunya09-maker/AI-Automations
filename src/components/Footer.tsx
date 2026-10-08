import React from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestCustom }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Purpose Column */}
          <div className="md:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="font-display font-bold text-lg tracking-tight text-white hover:text-emerald-400 transition-colors block text-left cursor-pointer"
            >
              Operon Automations
            </button>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              We design, build, and deploy production-grade AI workflows, n8n automations, and custom integrations that eliminate repetitive manual drag with high-reliability engineering.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-neutral-500">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Webhook Infrastructure Active
              </span>
              <span>/</span>
              <span>V1 Production Release</span>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-neutral-300 mb-4">
              Workflows
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('/workflows?category=Sales')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Sales & CRM Workflows
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows?category=Operations')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Operations & Reporting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows?category=AI & Documents')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Document & OCR Pipelines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows?category=Customer Support')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Customer Support Agents
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/workflows')} className="hover:text-white transition-colors cursor-pointer font-medium text-emerald-400 text-left pt-1 block">
                  View All Workflows →
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Services */}
          <div>
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-neutral-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Custom Automation Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Managed Automation Ops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Agencies & Studios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  E-Commerce & Retail
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  B2B Professional Services
                </button>
              </li>
            </ul>
          </div>

          {/* Organization & Admin */}
          <div>
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-neutral-300 mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Operon
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Submit Requirement
                </button>
              </li>
              <li>
                <button onClick={onRequestCustom} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-emerald-400 font-medium text-left">
                  Request Custom Scope <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="pt-2">
                <button onClick={() => onNavigate('/admin')} className="text-neutral-500 hover:text-neutral-300 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer">
                  <Shield className="w-3 h-3" />
                  <span>Admin System</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and quiet credits */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Operon Automations. Deterministic workflow engineering powered by n8n and AI models.
          </div>
          <div className="flex items-center gap-6 font-mono text-neutral-500">
            <span>n8n · Gemini 1.5 · Webhooks · Self-Hostable</span>
            <button onClick={() => onNavigate('/admin/settings')} className="text-neutral-500 hover:text-neutral-300 cursor-pointer">
              Settings & API
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
