import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface ServicesProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate, onRequestCustom }) => {
  const servicesList = [
    {
      id: 'lead-engine',
      title: 'INBOUND LEAD QUALIFICATION & CRM PIPELINES',
      headline: 'CAPTURE → ENRICH → SCORE → SALES REP ALERT IN 45 SECONDS',
      description: 'Stop letting high-value inbound leads sit in an inbox for hours while prospects compare competitors. We build pipelines that automatically verify email validity, look up employee headcount and revenue via enrichment APIs, score against your target customer profile, and ping your account executive on Slack with a pre-drafted response.',
      flow: ['Website Form Webhook', 'Apollo / Clearbit Enrichment', 'Gemini ICP Scoring', 'HubSpot / Salesforce Sync', 'Instant Slack Alert'],
      deliverables: ['Custom n8n Webhook Endpoint', 'CRM Field Schema Mapping', 'Deduplication Queue', 'Lead Notification Bot']
    },
    {
      id: 'customer-support',
      title: 'AUTONOMOUS AI CUSTOMER SUPPORT AGENTS',
      headline: '24/7 GROUNDED RESOLUTIONS WITH ZERO HALLUCINATIONS',
      description: 'Deploy AI agents trained specifically on your company FAQs, Notion docs, warranty terms, and refund policies. The agent answers common questions instantly across WhatsApp, Zendesk, or email, with built-in sentiment guards that automatically escalate frustrated customers to human managers.',
      flow: ['Customer Ticket Received', 'Vector Search in Docs', 'Grounded LLM Response', 'Confidence Check', 'Automated Reply or Triage'],
      deliverables: ['Knowledge Base Pipeline', 'Multi-Channel Connectors', 'Escalation Safeguards', 'Weekly Resolution Analytics']
    },
    {
      id: 'document-processing',
      title: 'INTELLIGENT DOCUMENT & INVOICE OCR PROCESSING',
      headline: 'EXTRACT STRUCTURED DATA FROM PDFS DIRECTLY INTO LEDGERS',
      description: 'Eliminate manual data entry for vendor invoices, receipts, bills of lading, and legal contracts. We configure multimodal vision pipelines that read unstructured documents in any format, extract line items and tax totals with mathematical validation, and write clean rows into spreadsheets or ERPs.',
      flow: ['Email / Drive PDF Drop', 'Multimodal Vision OCR', 'Line-item Extraction', 'Arithmetic Balance Check', 'Accounting System Sync'],
      deliverables: ['Automated Inbox Scraper', 'Vision Parsing Engine', 'Discrepancy Alerts', 'Historical Archive']
    },
    {
      id: 'email-orchestration',
      title: 'CONTEXTUAL MULTI-TOUCH EMAIL ORCHESTRATION',
      headline: 'SMART REPLY DETECTION & DYNAMIC FOLLOW-UP PAUSES',
      description: 'Ensure sales prospects and client accounts receive timely, relevant follow-ups without awkward double-messaging. Our workflows monitor incoming replies, immediately pause automated drip campaigns the second a prospect responds, and synthesize an objection-handling draft for your team.',
      flow: ['Prospect Reply Detected', 'Sequence Paused', 'AI Intent Classification', 'Objection Counter-Draft Synthesized', 'CRM Deal Stage Advanced'],
      deliverables: ['Smartlead / Instantly Webhooks', 'Reply Sentiment Classifier', 'Slack Approval Dispatcher', 'Activity Log Database']
    },
    {
      id: 'bespoke-ops',
      title: 'BESPOKE BUSINESS PROCESS & INTERNAL GLUE',
      headline: 'YOU EXPLAIN THE BOTTLENECK; WE BUILD THE ENGINE',
      description: 'Every business has idiosyncratic operational glue—data moved manually between legacy software, daily Excel reconciliations, or repetitive status notifications. You describe the step-by-step human clicks, and we engineer an autonomous n8n pipeline that executes it automatically.',
      flow: ['Discovery & Mapping', 'Data Contract Architecture', 'n8n Logic & Fallbacks', 'Synthetic Stress Testing', 'Production Launch & Handover'],
      deliverables: ['End-to-End Blueprint', 'Source n8n JSON Files', 'Credentials Runbook', '30-Day Guarantee']
    }
  ];

  return (
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Services Header */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 border-b border-[#CFCFCC]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
              STUDIO SERVICES // ARCHITECTURE & DEPLOYMENT
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
              ENGINEERING SERVICES
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 max-w-xl leading-relaxed">
              We design, build, and deploy deterministic automation architectures tailored to your exact business rules—connecting your software with zero manual drag.
            </p>
          </div>

          <button
            onClick={onRequestCustom}
            className="self-start md:self-auto btn-primary"
          >
            <span>SUBMIT PROCESS BOTTLENECK</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Services Breakdown Cards */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#E4E3E0]">
        <div className="max-w-7xl mx-auto space-y-12">
          {servicesList.map((srv, idx) => (
            <div
              key={srv.id}
              className="p-8 sm:p-12 bg-white border border-[#CFCFCC] rounded-2xl space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCC]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] mb-1 block">
                    CAPABILITY 0{idx + 1}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                    {srv.title}
                  </h2>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] bg-[#F6F5F3] px-3.5 py-1.5 border border-[#CFCFCC] rounded-full self-start md:self-auto">
                  {srv.headline}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed max-w-4xl">
                {srv.description}
              </p>

              {/* Execution Flow */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-3">
                  EXECUTION FLOW:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {srv.flow.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <div className="px-3.5 py-1.5 bg-[#F6F5F3] border border-[#CFCFCC] rounded-lg text-xs font-semibold text-[#0E0E0E] uppercase tracking-wider">
                        {step}
                      </div>
                      {sIdx < srv.flow.length - 1 && (
                        <span className="text-[#6B6B6B] text-xs font-mono">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Included Deliverables */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-3">
                  INCLUDED DELIVERABLES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {srv.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="p-3.5 bg-[#F6F5F3] border border-[#CFCFCC] rounded-xl text-xs text-[#0E0E0E] flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#0E0E0E] shrink-0" />
                      <span className="font-medium">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end border-t border-[#CFCFCC]">
                <button
                  onClick={onRequestCustom}
                  className="btn-primary"
                >
                  <span>REQUEST SCOPE FOR THIS CAPABILITY</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models Band */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#0E0E0E] text-white border-t border-[#0E0E0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="pb-8 border-b border-white/15">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-neutral-400 block mb-1">
              ENGAGEMENT TIERS
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              HOW WE DELIVER
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 border border-white/15 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-2">
                  TIER 01
                </span>
                <h4 className="text-lg font-bold uppercase tracking-tight text-white mb-2">Ready-Made Blueprints</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  Production-tested n8n workflow JSON files. Ideal if you have internal technical capacity to connect your own credentials.
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 text-xs uppercase tracking-wider text-white font-bold">
                Fixed one-time price (from ₹4,999)
              </div>
            </div>

            <div className="p-8 bg-white text-[#0E0E0E] border border-white rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-2">
                  TIER 02 // MOST POPULAR
                </span>
                <h4 className="text-lg font-bold uppercase tracking-tight text-[#0E0E0E] mb-2">Bespoke Engineering</h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6">
                  We design, test, and deploy a custom automation pipeline specifically tailored to your team’s proprietary workflows and edge cases.
                </p>
              </div>
              <div className="pt-4 border-t border-[#CFCFCC] text-xs uppercase tracking-wider text-[#0E0E0E] font-bold">
                Milestone based (₹15,000–₹50,000+)
              </div>
            </div>

            <div className="p-8 bg-white/5 border border-white/15 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-2">
                  TIER 03
                </span>
                <h4 className="text-lg font-bold uppercase tracking-tight text-white mb-2">Managed Automation Ops</h4>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  Ongoing cloud hosting, API version migration, error debugging, and quarterly workflow enhancements on an ongoing retainer.
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 text-xs uppercase tracking-wider text-white font-bold">
                Monthly retainer (from ₹12,999/mo)
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <button
              onClick={onRequestCustom}
              className="h-12 px-8 rounded-xl text-xs font-semibold uppercase tracking-[0.18em] text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              SCHEDULE A SCOPING CALL
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
