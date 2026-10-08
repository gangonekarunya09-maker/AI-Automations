import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Clock, Layers, GitMerge, FileSpreadsheet, Mail, Headphones, FileText, ShieldCheck, Zap, Cpu, Terminal, ArrowDown } from 'lucide-react';
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
  const catalogWorkflows = workflows.slice(0, 4);

  const benefits = [
    {
      title: '100% CODE OWNERSHIP',
      subline: 'Full JSON blueprints & credential runbooks supplied.',
      icon: Terminal
    },
    {
      title: 'ZERO SILENT FAILURES',
      subline: 'Deterministic error catching and instant alert routes.',
      icon: ShieldCheck
    },
    {
      title: '48-HOUR LAUNCH VELOCITY',
      subline: 'Fast turnarounds from scope approval to live runtime.',
      icon: Zap
    },
    {
      title: 'MANAGED RUNTIME SLA',
      subline: 'Optional cloud hosting & continuous API maintenance.',
      icon: Cpu
    }
  ];

  const categories = [
    {
      id: 'Sales',
      title: 'SALES & INBOUND ENRICHMENT',
      description: 'Capture inbound inquiries, enrich firmographics via AI, and alert reps in under 45 seconds.',
      icon: Mail,
      tag: '01'
    },
    {
      id: 'Operations',
      title: 'OPERATIONS & RECONCILIATION',
      description: 'Parse PDF invoices, extract line items with OCR, and balance cross-platform financials.',
      icon: FileSpreadsheet,
      tag: '02'
    },
    {
      id: 'Customer Support',
      title: 'TRIAGE & AUTONOMOUS DISPATCH',
      description: 'Transcribe meetings, isolate blockers, and triage support tickets with zero human latency.',
      icon: Headphones,
      tag: '03'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'CHOOSE BLUEPRINT OR DEFINE BOTTLENECK',
      description: 'Select an off-the-shelf n8n architecture or outline your company manual process.'
    },
    {
      number: '02',
      title: 'CREDENTIAL & DATA CONTRACT SCOPING',
      description: 'We audit your tool stack, error handlers, and security tokens with zero plain-text leaks.'
    },
    {
      number: '03',
      title: 'PIPELINE STRESS TESTING',
      description: 'Every webhook route undergoes synthetic payload tests and rate-limit verification.'
    },
    {
      number: '04',
      title: 'PRODUCTION HANDOVER',
      description: 'Your runtime goes live with full ownership files, runbooks, and direct API endpoints.'
    },
    {
      number: '05',
      title: 'CONTINUOUS SLA MONITORING',
      description: 'Optional managed oversight to ensure downstream schema changes never interrupt workflows.'
    }
  ];

  const bottlenecks = [
    {
      icon: Mail,
      title: 'Inbound Lead Qualification',
      loss: '6–8 HRS/WEEK',
      desc: 'Copy-pasting form submissions into CRM, looking up revenue on Apollo, and drafting introductory emails.'
    },
    {
      icon: Clock,
      title: 'Meeting Summaries & Actions',
      loss: '4–6 HRS/WEEK',
      desc: 'Re-listening to call recordings, manually compiling action items, and pinging teammates on Slack.'
    },
    {
      icon: FileText,
      title: 'Invoice & Expense Extraction',
      loss: '7–10 HRS/WEEK',
      desc: 'Typing vendor invoice amounts, tax IDs, and bank details into spreadsheets or accounting software.'
    },
    {
      icon: Headphones,
      title: 'Tier-1 Customer Support Triage',
      loss: '10–14 HRS/WEEK',
      desc: 'Repeatedly answering identical questions regarding delivery schedules, pricing, and account verification.'
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#E4E3E0]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Generous spacing, oversized typography, sharp geometry */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#E4E3E0] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[580px] sm:min-h-[640px]">
          {/* Top-Left: Eyebrow tagline (3 short uppercase lines with a short underline) */}
          <div className="mb-10 sm:mb-14">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-[#0E0E0E] space-y-1">
              <div>ENGINEERED AUTONOMY</div>
              <div>PRODUCTION-GRADE N8N BLUEPRINTS</div>
              <div className="text-[#6B6B6B]">ZERO BOTTLENECK OPERATIONS</div>
            </div>
            <div className="w-16 h-[1.5px] bg-[#0E0E0E] mt-3" />
          </div>

          {/* Center Graphic + Giant Display Wordmark */}
          <div className="relative my-auto py-8">
            {/* Giant Display Headline */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-extrabold uppercase text-[#0E0E0E] display-title select-none tracking-[-0.04em]">
              OFFLO
            </h1>

            {/* Sharp Architectural Schematic Cutout sitting over the wordmark */}
            <div className="mt-4 sm:-mt-8 lg:-mt-12 bg-[#0E0E0E] text-white p-5 sm:p-7 max-w-2xl border border-[#0E0E0E]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-3 pb-2 border-b border-white/15">
                <span>RUNTIME SCHEMA // PIPELINE V1.4</span>
                <span className="text-white">● ACTIVE CLUSTER</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/10 p-2.5">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">INPUT</span>
                  <span className="font-bold text-white text-[11px]">WEBHOOK / OCR</span>
                </div>
                <div className="bg-white/10 p-2.5">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">LOGIC</span>
                  <span className="font-bold text-white text-[11px]">LLM + N8N ENGINE</span>
                </div>
                <div className="bg-white/10 p-2.5">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">TARGET</span>
                  <span className="font-bold text-white text-[11px]">CRM / ERP SYNC</span>
                </div>
              </div>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                Autonomous orchestration for modern enterprises. Zero fragile Zapier chains. Fully self-hostable with guaranteed deterministic outputs.
              </p>
            </div>
          </div>

          {/* Bottom Row: Actions (Left) and Metadata Stack (Right) */}
          <div className="pt-12 sm:pt-16 border-t border-[#CFCFCC] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            {/* Bottom-left: One solid black button plus one text link with a thin underline */}
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => onNavigate('/workflows')}
                className="btn-primary"
              >
                <span>EXPLORE WORKFLOWS</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={onRequestCustom}
                className="text-xs uppercase tracking-[0.16em] font-bold text-[#0E0E0E] editorial-link cursor-pointer py-2"
              >
                REQUEST CUSTOM ARCHITECTURE →
              </button>
            </div>

            {/* Bottom-right: Small uppercase label stack with a short underline */}
            <div className="text-left sm:text-right">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0E0E0E] space-y-0.5">
                <div>EDITION 2026 // V1.4 PRODUCTION</div>
                <div className="text-[#6B6B6B]">DEPLOYED TO PRIVATE CLUSTERS</div>
              </div>
              <div className="w-12 h-[1.5px] bg-[#0E0E0E] mt-2 sm:ml-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY BAND: Full-width black section, 3 equal columns */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#0E0E0E] text-white py-16 sm:py-24 px-4 sm:px-8 border-y border-[#0E0E0E]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-neutral-400 mb-10 pb-4 border-b border-white/15">
            01 // CORE AUTOMATION CAPABILITIES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className={`${idx !== 0 ? 'pt-8 md:pt-0 md:pl-10' : ''} flex gap-5 items-start`}>
                  {/* Small square thumbnail on the left */}
                  <div className="w-14 h-14 bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Title, description, and link on the right */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                      ARCH-CLASS {cat.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate(`/workflows?category=${encodeURIComponent(cat.id)}`)}
                        className="text-xs uppercase tracking-[0.16em] font-semibold text-white editorial-link cursor-pointer"
                      >
                        Explore Category →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURE BANNER: Full-bleed mid-gray section (#BEBEBE -> #A9A9A9) */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#BEBEBE] text-[#0E0E0E] py-20 sm:py-32 px-4 sm:px-8 border-b border-[#CFCFCC]">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left: Small spaced eyebrow, big bold 2-line headline, short desc, 1 solid black button */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-[#0E0E0E] block">
              BESPOKE PROCESS ARCHITECTURE
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] leading-[0.95] text-[#0E0E0E]">
              ELIMINATE MANUAL BOTTLENECKS
              <br />
              AT ENTERPRISE VELOCITY
            </h2>

            <p className="text-sm sm:text-base text-[#333333] max-w-xl leading-relaxed">
              When generic SaaS subscriptions fail to match your proprietary operational rules, our studio designs high-throughput, self-healing pipelines tailored precisely to your internal schema.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <button
                onClick={onRequestCustom}
                className="btn-primary"
              >
                <span>BOOK PRIVATE CONSULTATION</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={() => onNavigate('/services')}
                className="text-xs uppercase tracking-[0.16em] font-bold text-[#0E0E0E] editorial-link cursor-pointer"
              >
                VIEW SERVICE SPECS →
              </button>
            </div>
          </div>

          {/* Right: Technical process diagram / high-contrast blueprint */}
          <div className="lg:col-span-5 bg-[#0E0E0E] text-white p-7 sm:p-9 border border-[#0E0E0E] space-y-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 pb-3 border-b border-white/15">
              <span>ARCHITECTURE SPEC</span>
              <span>GUARANTEED 99.9% UPTIME</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <span className="text-neutral-400 uppercase tracking-wider text-[10px]">INGESTION LATENCY</span>
                <span className="font-bold text-white">&lt; 350ms</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <span className="text-neutral-400 uppercase tracking-wider text-[10px]">DATA STORAGE</span>
                <span className="font-bold text-white">SUPABASE POSTGRESQL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <span className="text-neutral-400 uppercase tracking-wider text-[10px]">AUTH & SIGNATURE</span>
                <span className="font-bold text-white">HMAC SHA-256</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                <span className="text-neutral-400 uppercase tracking-wider text-[10px]">CODE HANDOVER</span>
                <span className="font-bold text-white">100% UNRESTRICTED JSON</span>
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/15 flex items-center justify-between">
              <span>ZERO VENDOR LOCK-IN</span>
              <span>SELF-HOST ON DOCKER / CLOUD</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TRUST / BENEFITS STRIP: Soft gray background, 4 equal items in a row */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#E4E3E0] py-14 px-4 sm:px-8 border-b border-[#CFCFCC]">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="p-2.5 bg-[#0E0E0E] text-white shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0E0E0E] mb-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">
                    {b.subline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CONTENT GRID SECTION: Near-white background, 4-column grid */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#F6F5F3] py-20 sm:py-28 px-4 sm:px-8 border-b border-[#CFCFCC]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header row: uppercase section title on left, "View all" underlined link on right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#CFCFCC]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B] block mb-1">
                CATALOG // PRODUCTION RELEASES
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                READY-TO-DEPLOY BLUEPRINTS
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/workflows')}
              className="text-xs uppercase tracking-[0.18em] font-bold text-[#0E0E0E] editorial-link cursor-pointer self-start sm:self-auto"
            >
              VIEW ALL WORKFLOWS ({workflows.length}) →
            </button>
          </div>

          {/* 4-Column Grid of Sharp-cornered tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {catalogWorkflows.map((workflow) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                onSelect={onSelectWorkflow}
                onRequestWorkflow={onRequestWorkflow}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/workflows')}
              className="btn-primary"
            >
              <span>EXPLORE ALL {workflows.length} WORKFLOWS</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE FLOW VISUALIZER: Reskinned in monochrome editorial style */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#E4E3E0] py-20 sm:py-28 px-4 sm:px-8 border-b border-[#CFCFCC]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
              REAL-TIME ORCHESTRATION ENGINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              EXPERIENCE A LIVE AUTOMATION PIPELINE
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-3 leading-relaxed">
              Toggle live nodes below to inspect how payloads parse, enrich, and dispatch without humans in the loop.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#CFCFCC] p-4 sm:p-8">
            <InteractiveFlowVisualizer />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTLENECKS SECTION: Manual drag eliminated */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#F6F5F3] py-20 sm:py-28 px-4 sm:px-8 border-b border-[#CFCFCC]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-12 pb-6 border-b border-[#CFCFCC]">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B] block mb-1">
              THE COST OF MANUAL PROCESSES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              RECLAIM 20+ HOURS EVERY WEEK
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottlenecks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-[#FFFFFF] p-6 border border-[#CFCFCC] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-[#F6F5F3] text-[#0E0E0E]">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#0E0E0E] bg-[#E4E3E0] px-2 py-0.5">
                        {item.loss}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold uppercase text-[#0E0E0E] mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#CFCFCC] mt-6">
                    <button
                      onClick={onRequestCustom}
                      className="text-xs uppercase tracking-[0.14em] font-bold text-[#0E0E0E] editorial-link cursor-pointer"
                    >
                      Automate This →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. 5-STEP METHODOLOGY: Sharp horizontal cards with hairlines */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#E4E3E0] py-20 sm:py-28 px-4 sm:px-8 border-b border-[#CFCFCC]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-12 pb-6 border-b border-[#CFCFCC] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#6B6B6B] block mb-1">
                ENGINEERING PROTOCOL
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                HOW WE DEPLOY AUTOMATIONS
              </h2>
            </div>
            <div className="text-xs uppercase tracking-[0.16em] font-bold text-[#6B6B6B]">
              5 PHASES // 100% RELIABILITY
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((st) => (
              <div
                key={st.number}
                className="bg-[#FFFFFF] border border-[#CFCFCC] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center gap-6">
                  <span className="text-2xl sm:text-4xl font-black text-[#0E0E0E] tracking-tight shrink-0 font-mono">
                    {st.number}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#0E0E0E] mb-1">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
                      {st.description}
                    </p>
                  </div>
                </div>

                <div className="sm:shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0E0E0E] px-3 py-1 bg-[#F6F5F3] border border-[#CFCFCC]">
                    CERTIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout in Home */}
          <div className="mt-16 bg-[#0E0E0E] text-white p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-neutral-400 block mb-2">
                READY TO SCALE YOUR CAPACITY?
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight leading-tight">
                LET'S MAP YOUR AUTOMATION PIPELINE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl">
                Submit your manual process bottlenecks or select a production workflow. We deliver blueprints with full ownership runbooks.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={onRequestCustom}
                className="h-12 px-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <span>REQUEST CUSTOM SCOPE</span>
              </button>
              <button
                onClick={() => onNavigate('/workflows')}
                className="h-12 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white border border-white/30 hover:border-white transition-colors cursor-pointer"
              >
                <span>BROWSE WORKFLOWS</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
