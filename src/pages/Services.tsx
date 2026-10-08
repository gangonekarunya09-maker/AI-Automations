import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate, onRequestCustom }) => {
  const servicesList = [
    {
      id: 'lead-engine',
      title: 'Inbound Lead Qualification & CRM Automation',
      headline: 'Capture → Enrich → Score → Sales Rep Alert in 45 Seconds',
      description: 'Stop letting high-value inbound leads sit in an inbox for 4 hours while prospects compare competitors. We build pipelines that automatically verify email validity, look up employee headcount and revenue via enrichment APIs, score against your target customer profile, and ping your account executive on Slack with a pre-drafted personalized response.',
      flow: ['Website Form / Ad Webhook', 'Apollo / Clearbit Enrichment', 'Gemini ICP Scoring', 'HubSpot / Salesforce Deal', 'Instant Slack / WhatsApp Alert'],
      deliverables: ['Custom n8n Webhook Endpoint', 'CRM Field Mapping', 'Fail-Safe Deduplication Queue', 'Lead Notification Bot']
    },
    {
      id: 'customer-support',
      title: 'Autonomous AI Customer Support Agents',
      headline: '24/7 Grounded Resolutions with Zero Hallucinations',
      description: 'Deploy AI agents trained specifically on your company FAQs, Notion docs, warranty terms, and refund policies. The agent answers common questions instantly across WhatsApp, Zendesk, or email, with built-in sentiment guards that automatically escalate frustrated customers to human managers.',
      flow: ['Customer Ticket Received', 'Vector Search in Docs', 'Grounded LLM Response Generation', 'Confidence Check', 'Automated Reply or Human Review'],
      deliverables: ['Knowledge Base Embeddings Pipeline', 'Multi-Channel Connectors', 'Escalation Safeguards', 'Weekly Ticket Resolution Dashboard']
    },
    {
      id: 'document-processing',
      title: 'Intelligent Document & Invoice OCR Processing',
      headline: 'Extract Structured Data from PDFs & Scans Directly into Databases',
      description: 'Eliminate manual data entry for vendor invoices, receipts, bills of lading, and legal contracts. We configure multimodal vision pipelines that read unstructured documents in any format, extract line items and tax totals with mathematical validation, and write clean rows into Google Sheets, QuickBooks, or ERPs.',
      flow: ['Email / Drive PDF Drop', 'Multimodal Vision OCR', 'Line-item Table Extraction', 'Arithmetic Totals Check', 'Accounting System & Sheets Sync'],
      deliverables: ['Automated Inbox Scraper', 'Vision Parsing Prompts', 'Discrepancy Email Alerts', 'Historical Document Archive']
    },
    {
      id: 'email-orchestration',
      title: 'Contextual Multi-Touch Email & Outbound Automation',
      headline: 'Smart Reply Detection & Dynamic Follow-up Pauses',
      description: 'Ensure sales prospects and client accounts receive timely, relevant follow-ups without awkward double-messaging. Our workflows monitor incoming replies, immediately pause automated drip campaigns the second a prospect responds, and synthesize an objection-handling draft for your team.',
      flow: ['Prospect Reply Detected', 'Automated Sequence Paused', 'AI Tone & Intent Classification', 'Objection Counter-Draft Synthesized', 'CRM Deal Stage Advanced'],
      deliverables: ['Smartlead / Instantly Webhooks', 'Reply Sentiment Classifier', 'Slack Approval Dispatcher', 'Activity Log Database']
    },
    {
      id: 'bespoke-ops',
      title: 'Custom Business Process & Internal Tools Automation',
      headline: 'You Explain The Manual Bottleneck; We Build The Engine',
      description: 'Every business has idiosyncratic operational glue—data moved manually between legacy software, daily Excel reconciliations, or repetitive status notifications. You describe the step-by-step human clicks, and we engineer an autonomous n8n pipeline that executes it automatically.',
      flow: ['Discovery Call & Process Mapping', 'Data Contract Architecture', 'n8n Logic & Error Handling', 'Synthetic Testing', 'Live Deployment & Maintenance'],
      deliverables: ['End-to-End Architecture Blueprint', 'Source n8n JSON Files', 'Credentials Security Runbook', '30-Day Guarantee']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-20">
      {/* Services Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.2em] font-semibold">
          Engineering Capabilities
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-semibold text-[#1a1a1a] tracking-tight leading-[0.95]">
          Custom Automation Development
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          We engineer robust, deterministic automation systems designed around business outcomes—not technical jargon. We connect your existing software stack using n8n, modern APIs, and reliable AI models.
        </p>
      </div>

      {/* Services Breakdown Cards */}
      <div className="space-y-10">
        {servicesList.map((srv, idx) => (
          <div
            key={srv.id}
            className="p-6 sm:p-10 border border-[#e4e4df] bg-white space-y-8 hover:border-[#1a1a1a] transition-colors shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e4e4df]">
              <div>
                <div className="text-xs font-mono text-[#2e4ff4] mb-1.5 uppercase tracking-wider font-semibold">
                  Capability 0{idx + 1}
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
                  {srv.title}
                </h2>
              </div>
              <div className="text-xs font-mono text-neutral-600 bg-[#f4f4f0] px-3.5 py-1.5 border border-[#e4e4df] self-start md:self-auto font-medium">
                {srv.headline}
              </div>
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-4xl">
              {srv.description}
            </p>

            {/* Sequence flow */}
            <div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2.5">
                Execution Flow:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {srv.flow.map((step, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <div className="px-3.5 py-1.5 bg-[#f4f4f0] border border-[#e4e4df] text-xs text-[#1a1a1a] font-mono">
                      {step}
                    </div>
                    {sIdx < srv.flow.length - 1 && (
                      <span className="text-neutral-400 text-xs font-mono">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2.5">
                Included Deliverables:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {srv.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="p-3 bg-[#fbfbf9] border border-[#e4e4df] text-xs text-neutral-700 flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2e4ff4] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end border-t border-[#e4e4df]">
              <button
                onClick={onRequestCustom}
                className="px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.98] shadow-sm"
              >
                <span>Request Scope For This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Comparison Table */}
      <div className="p-8 sm:p-10 border border-[#e4e4df] bg-[#f4f4f0] space-y-8 shadow-sm">
        <div>
          <h3 className="text-3xl font-serif font-semibold text-[#1a1a1a] mb-2 tracking-tight">
            How Businesses Partner With Us
          </h3>
          <p className="text-neutral-600 text-xs sm:text-sm">
            Whether you want source code ownership or managed white-glove operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[#e4e4df] bg-white shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-serif font-semibold text-[#1a1a1a] mb-2">Ready-Made Blueprints</h4>
              <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                Instant access to production-tested n8n workflow files. Ideal if you have internal technical capacity to connect your own credentials.
              </p>
            </div>
            <div className="text-xs font-mono text-[#2e4ff4] pt-2 border-t border-[#e4e4df] font-semibold">Fixed one-time price (from ₹4,999)</div>
          </div>

          <div className="p-6 border border-[#1a1a1a] bg-white shadow-md flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-serif font-semibold text-[#1a1a1a] mb-2">Bespoke Project Engineering</h4>
              <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                We design, test, and deploy a custom automation pipeline specifically tailored to your team’s proprietary workflows and edge cases.
              </p>
            </div>
            <div className="text-xs font-mono text-[#2e4ff4] pt-2 border-t border-[#e4e4df] font-semibold">Milestone based (₹15,000–₹50,000+)</div>
          </div>

          <div className="p-6 border border-[#e4e4df] bg-white shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-serif font-semibold text-[#1a1a1a] mb-2">Managed Automation Ops</h4>
              <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                Ongoing cloud hosting, API version migration, error debugging, and quarterly workflow enhancements on an ongoing retainer.
              </p>
            </div>
            <div className="text-xs font-mono text-[#2e4ff4] pt-2 border-t border-[#e4e4df] font-semibold">Monthly retainer (from ₹12,999/mo)</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <h3 className="text-3xl sm:text-4xl font-serif font-semibold text-[#1a1a1a] mb-3 tracking-tight">
          Have a process you want automated?
        </h3>
        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
          Describe the repetitive manual clicks your team performs. We will tell you exactly what can be automated within 24 hours.
        </p>
        <button
          onClick={onRequestCustom}
          className="px-7 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-all inline-flex items-center gap-2 cursor-pointer active:scale-[0.98] shadow-sm"
        >
          <span>Submit Custom Automation Requirement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
