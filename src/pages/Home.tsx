import React from 'react';
import { ArrowRight, ArrowUpRight, Check, Clock, Layers, GitMerge, FileSpreadsheet, Mail, Headphones, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Workflow } from '../types';
import { WorkflowCard } from '../components/WorkflowCard';
import { InteractiveFlowVisualizer } from '../components/InteractiveFlowVisualizer';

interface HomeProps {
  workflows: Workflow[];
  onNavigate: (path: string) => void;
  onSelectWorkflow: (workflow: Workflow) => void;
  onRequestWorkflow: (workflow: Workflow) => void;
  onRequestCustom: () => void;
}

export const Home: React.FC<HomeProps> = ({
  workflows,
  onNavigate,
  onSelectWorkflow,
  onRequestWorkflow,
  onRequestCustom
}) => {
  const featuredWorkflows = workflows.filter(w => w.featured).slice(0, 4);

  const manualProblems = [
    {
      icon: Mail,
      title: 'Manually Copying & Qualifying Inbound Leads',
      impact: '5–8 hrs/week lost',
      description: 'Copy-pasting form submissions into CRM, looking up company size on LinkedIn, and typing manual intro emails.'
    },
    {
      icon: Clock,
      title: 'Writing Meeting Summaries & Action Items',
      impact: '4–6 hrs/week lost',
      description: 'Listening back to calls, drafting notes, and reminding team members about commitments over Slack.'
    },
    {
      icon: FileText,
      title: 'Transcribing PDF Invoices & Receipts',
      impact: '6–10 hrs/week lost',
      description: 'Manually keying vendor invoice line items, dates, and bank details into Excel, QuickBooks, or Tally.'
    },
    {
      icon: Headphones,
      title: 'Answering Tier-1 Customer Support Tickets',
      impact: '10–15 hrs/week lost',
      description: 'Typing the same answers repeatedly regarding delivery status, pricing, login issues, and return policies.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Updating & Reconciling Cross-Platform Sheets',
      impact: '4–7 hrs/week lost',
      description: 'Exporting CSV files from Shopify or Stripe to match inventory, bank deposits, and order statuses.'
    },
    {
      icon: GitMerge,
      title: 'Chasing Forgotten Follow-up Emails',
      impact: '3–5 hrs/week lost',
      description: 'Remembering when to email a prospect after silence, without accidentally sending double-messages.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose a Workflow or Describe Your Problem',
      description: 'Browse our catalog of pre-engineered n8n automation blueprints or tell us about your manual operational bottleneck.'
    },
    {
      number: '02',
      title: 'Architecture & Tool Credentialing',
      description: 'We map the precise data contracts, error fallbacks, and authentication keys needed for your software stack.'
    },
    {
      number: '03',
      title: 'Pipeline Engineering & Testing',
      description: 'We configure and stress-test the automation with synthetic and edge-case data before any production deployment.'
    },
    {
      number: '04',
      title: 'Production Launch & Handover',
      description: 'The workflow goes live. You receive full ownership files (JSON), documentation, and credential runbooks.'
    },
    {
      number: '05',
      title: 'Ongoing Monitoring & Optimization',
      description: 'Optional managed hosting and SLA maintenance to ensure your automation never silently fails when APIs update.'
    }
  ];

  const industries = [
    {
      name: 'B2B Sales Teams',
      focus: 'Lead enrichment, instant response, pipeline stage sync, deal alerts',
      metric: 'Under 45s lead response latency'
    },
    {
      name: 'Creative & Marketing Agencies',
      focus: 'Client reporting, content drafting, meeting digests, proposal intake',
      metric: '18+ hours saved per account director'
    },
    {
      name: 'E-Commerce Brands',
      focus: 'Multi-store inventory sync, supplier order routing, tracking alerts',
      metric: 'Zero overselling incidents across channels'
    },
    {
      name: 'Professional Services & Legal',
      focus: 'Document classification, client intake forms, billing reconciliation',
      metric: '90% faster document extraction'
    }
  ];

  return (
    <div className="space-y-28 sm:space-y-36 pb-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 lg:pt-32 overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute inset-0 editorial-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-7">
            {/* Unboxed natural editorial kicker */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Intelligent Business Process Engineering</span>
              <span aria-hidden="true" className="text-neutral-700">/</span>
              <span>n8n Workflows & AI Systems</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.06] text-balance"
            >
              Automate Your Business Without Hiring Another Person.
            </motion.h1>

            {/* Supporting Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto"
            >
              AI-powered workflows and business automations that eliminate repetitive manual work, connect your tools seamlessly, and help your team operate faster.
            </motion.p>

            {/* Action CTAs (Strict single-line labels, rectangular editorial design) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <button
                onClick={() => onNavigate('/workflows')}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>Explore Workflows</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onRequestCustom}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>Request Custom Automation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </motion.div>

            {/* Claim-to-Proof Adjacency Grid */}
            <div className="pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-400">
              <div className="p-3 bg-white/[0.01] border border-white/[0.04]">
                <div className="font-mono font-bold text-white text-sm sm:text-base tabular-nums">48-Hour</div>
                <div className="text-neutral-500 text-[11px] uppercase tracking-wider mt-0.5">Standard Workflow Turnaround</div>
              </div>
              <div className="p-3 bg-white/[0.01] border border-white/[0.04]">
                <div className="font-mono font-bold text-white text-sm sm:text-base tabular-nums">100%</div>
                <div className="text-neutral-500 text-[11px] uppercase tracking-wider mt-0.5">Self-Hostable n8n Architecture</div>
              </div>
              <div className="p-3 bg-white/[0.01] border border-white/[0.04]">
                <div className="font-mono font-bold text-white text-sm sm:text-base tabular-nums">Zero</div>
                <div className="text-neutral-500 text-[11px] uppercase tracking-wider mt-0.5">Proprietary Lock-In</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase Carrier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-14 sm:mt-18 border border-white/[0.1] bg-[#0A0B0F] p-2 sm:p-3 relative group"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
              <img
                src="/src/assets/images/hero_automation_studio_1791448255075.jpg"
                alt="Offlo intelligent automation control facility"
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-transparent opacity-90" />

              {/* Live overlay banner */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 bg-black/80 backdrop-blur-md border border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-white font-medium">Production Automation Engine</span>
                  <span className="text-neutral-600">/</span>
                  <span className="text-neutral-400 font-mono text-[11px]">n8n + AI + API Orchestration</span>
                </div>
                <button
                  onClick={() => onNavigate('/services')}
                  className="text-white hover:text-emerald-400 uppercase tracking-wider font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION: The Manual Bottlenecks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
            The Operational Drain
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Where Your Team Loses 20+ Hours Every Week
          </h2>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            Most businesses do not need another full-time employee. They need to stop paying skilled humans to perform repetitive mechanical copying, pasting, and checking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
          {manualProblems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-[#090A0E] hover:bg-[#0E0F14] transition-colors duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-medium">
                      {prob.impact}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                    {prob.title}
                  </h3>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed mt-2">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-neutral-300">
            Recognize any of these manual processes in your business?
          </span>
          <button
            onClick={onRequestCustom}
            className="text-white hover:text-emerald-400 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors"
          >
            <span>Tell us what you do manually</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. SOLUTION SECTION: Interactive Visual Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
            The Automation Mechanics
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            From Manual Drag to Sub-Second Autonomous Execution
          </h2>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            Every automation connects a business trigger, cleans the data, applies deterministic AI intelligence, and executes direct actions across your existing tool stack.
          </p>
        </div>

        <InteractiveFlowVisualizer />
      </section>

      {/* 4. FEATURED READY-MADE WORKFLOWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
              Production Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Featured Ready-Made Workflows
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              Battle-tested n8n workflows ready to deploy in under 48 hours.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/workflows')}
            className="text-xs uppercase tracking-wider font-semibold text-white hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Browse All {workflows.length} Workflows</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredWorkflows.map(workflow => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onSelect={onSelectWorkflow}
              onRequestWorkflow={onRequestWorkflow}
            />
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
            Execution Roadmap
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            How An Offlo Automation Goes Live
          </h2>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            From initial identification to production reliability in five clear stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map(step => (
            <div
              key={step.number}
              className="p-5 border border-white/[0.08] bg-[#0A0B0F] hover:border-white/20 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-display font-bold text-white font-mono mb-3">
                  {step.number}
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                  {step.title}
                </h3>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed mt-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INDUSTRIES & USE CASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
            Domain Focus
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Automations Tailored To Your Industry
          </h2>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            We engineer workflows around specific operational bottlenecks, not theoretical concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="p-6 border border-white/[0.08] bg-[#0A0B0F] hover:border-white/20 transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-semibold text-white mb-2">{ind.name}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                  {ind.focus}
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-emerald-400">
                {ind.metric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL HIGH-CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-white/[0.12] bg-[#0A0B0E] p-8 sm:p-14 lg:p-18 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              Get Started In 48 Hours
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Have A Repetitive Manual Bottleneck?
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Tell us what you or your team are doing manually today. We will review your process and tell you exactly what can be automated with n8n and AI within 24 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onRequestCustom}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>Request Custom Automation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('/workflows')}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Browse Catalog First</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
