import React from 'react';
import { ArrowRight, Building2, Store, Briefcase, Home as HomeIcon, TrendingUp, Users } from 'lucide-react';

interface IndustriesProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onNavigate, onRequestCustom }) => {
  const industriesList = [
    {
      id: 'agencies',
      icon: Briefcase,
      title: 'Marketing & Creative Agencies',
      summary: 'Replace manual monthly client reporting, social trend scraping, and onboarding friction with autonomous pipelines.',
      before: 'Account managers spend 8 hours at month-end screenshotting Meta Ads, Google Analytics, and Shopify to manually assemble PDF client slide decks.',
      after: 'n8n triggers on the 1st of each month, compiles multi-channel metrics, prompts Gemini to write executive insights, and drafts email reports for review.',
      workflowsRecommended: ['AI Meeting Summarizer', 'Weekly Executive Reporting Agent', 'Social Content Automation']
    },
    {
      id: 'ecommerce',
      icon: Store,
      title: 'E-Commerce Brands & D2C Retailers',
      summary: 'Synchronize inventory between storefronts, route supplier orders, and automate return-refund validations.',
      before: 'Warehouse teams reconcile Shopify vs. Amazon stock on Excel sheets, resulting in overselling during flash promotions and delayed vendor orders.',
      after: 'Inventory levels sync across all sales channels within 3 seconds of purchase; low-stock alerts trigger automated purchase draft orders.',
      workflowsRecommended: ['E-Commerce Inventory Sync', 'PDF Invoice & Expense Reconciliation']
    },
    {
      id: 'sales-teams',
      icon: TrendingUp,
      title: 'High-Velocity B2B Sales Teams',
      summary: 'Instant inbound enrichment, ICP scoring, deal alerts, and objection-handling drafts.',
      before: 'Inbound demo requests sit in an unmonitored mailbox for 6 hours; SDRs manually research LinkedIn before booking a call.',
      after: 'Leads are enriched with revenue and headcount via Apollo API, scored by AI, and sent to the sales rep on Slack with a pre-drafted calendar invite under 45s.',
      workflowsRecommended: ['Inbound Lead Qualifier', 'Email Follow-up Automation']
    },
    {
      id: 'professional-services',
      icon: Building2,
      title: 'Legal, Accounting & Advisory Firms',
      summary: 'Process client receipts, parse engagement contracts, and automate recurring audit paperwork.',
      before: 'Associates spend hours typing vendor invoice line items, case numbers from court PDF listings, and tracking billable milestones.',
      after: 'Multimodal vision models ingest scanned documents, extract required ledger rows, verify totals, and stage them in accounting software.',
      workflowsRecommended: ['Document Processing Automation', 'Executive Reporting Agent']
    },
    {
      id: 'real-estate',
      icon: HomeIcon,
      title: 'Real Estate & Property Management',
      summary: 'Instant tenant inquiry replies on WhatsApp, maintenance dispatch, and lead screening.',
      before: 'Brokers miss high-intent rental inquiries received on weekends; maintenance requests get lost in personal WhatsApp threads.',
      after: 'Automated WhatsApp bot verifies tenant budget and move-in date, schedules site visits on Google Calendar, and logs service tickets.',
      workflowsRecommended: ['Customer Support Automation', 'Inbound Lead Qualifier']
    },
    {
      id: 'startups',
      icon: Users,
      title: 'Early-Stage Startups & Solo Founders',
      summary: 'Operate like a 10-person operations team without premature payroll expansion.',
      before: 'Founders wear five hats, manually checking stripe alerts, writing meeting minutes, and copying bugs to task boards.',
      after: 'Autonomous workflows connect Stripe, GitHub, Notion, and Slack to handle routine data routing with zero human overhead.',
      workflowsRecommended: ['AI Meeting Summarizer', 'Executive Reporting Agent']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.2em] font-semibold">
          Target Verticals
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-semibold text-[#1a1a1a] tracking-tight leading-[0.95]">
          Automations Tailored To Your Industry
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Every industry has unique operational friction points. We focus on specific manual drags where automated data flows deliver immediate, measurable hours saved.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {industriesList.map(ind => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.id}
              className="p-6 sm:p-8 border border-[#e4e4df] bg-white space-y-6 flex flex-col justify-between hover:border-[#1a1a1a] transition-colors shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f4f4f0] border border-[#e4e4df] flex items-center justify-center text-[#2e4ff4]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-[#1a1a1a] tracking-tight">
                      {ind.title}
                    </h2>
                  </div>
                </div>

                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {ind.summary}
                </p>

                {/* Before vs After comparison */}
                <div className="grid grid-cols-1 gap-2.5 pt-2 text-xs">
                  <div className="p-3.5 bg-red-50/50 border-l-2 border-red-500 border-y border-r border-red-100 text-neutral-700">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-red-600 block mb-1 font-semibold">Manual Friction:</span>
                    {ind.before}
                  </div>
                  <div className="p-3.5 bg-[#2e4ff4]/5 border-l-2 border-[#2e4ff4] border-y border-r border-[#2e4ff4]/10 text-neutral-700">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-[#2e4ff4] block mb-1 font-semibold">Autonomous Execution:</span>
                    {ind.after}
                  </div>
                </div>

                {/* Recommended workflows */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                    Recommended Workflows:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-neutral-700">
                    {ind.workflowsRecommended.map((wf, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-[#f4f4f0] border border-[#e4e4df] text-[11px] font-mono">
                        {wf}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e4e4df] flex items-center justify-between">
                <button
                  onClick={() => onNavigate('/workflows')}
                  className="text-xs uppercase tracking-wider font-mono text-neutral-500 hover:text-[#1a1a1a] transition-colors cursor-pointer"
                >
                  View Workflows
                </button>
                <button
                  onClick={onRequestCustom}
                  className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1a1a1a] hover:text-[#2e4ff4] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request Custom Setup</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2e4ff4]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
