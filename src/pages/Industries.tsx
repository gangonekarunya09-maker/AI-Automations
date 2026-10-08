import React from 'react';
import { ArrowRight, Briefcase, Store, TrendingUp, Building2, Home as HomeIcon, Users } from 'lucide-react';

interface IndustriesProps {
  onNavigate: (path: string) => void;
  onRequestCustom: () => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onNavigate, onRequestCustom }) => {
  const industriesList = [
    {
      id: 'agencies',
      icon: Briefcase,
      title: 'MARKETING & CREATIVE AGENCIES',
      summary: 'Replace manual monthly client reporting, social trend scraping, and onboarding friction with autonomous pipelines.',
      before: 'Account managers spend 8 hours at month-end screenshotting ad portals and Shopify to manually assemble slide decks.',
      after: 'n8n triggers on the 1st of each month, compiles multi-channel metrics, prompts Gemini to write executive insights, and drafts reports.',
      workflowsRecommended: ['AI Meeting Summarizer', 'Weekly Executive Reporting Agent', 'Social Content Automation']
    },
    {
      id: 'ecommerce',
      icon: Store,
      title: 'E-COMMERCE BRANDS & D2C RETAILERS',
      summary: 'Synchronize inventory between storefronts, route supplier orders, and automate return-refund validations.',
      before: 'Warehouse teams reconcile Shopify vs. Amazon stock on Excel sheets, resulting in overselling and delayed vendor orders.',
      after: 'Inventory levels sync across all sales channels within 3 seconds of purchase; low-stock alerts trigger automated purchase draft orders.',
      workflowsRecommended: ['E-Commerce Inventory Sync', 'PDF Invoice & Expense Reconciliation']
    },
    {
      id: 'sales-teams',
      icon: TrendingUp,
      title: 'HIGH-VELOCITY B2B SALES TEAMS',
      summary: 'Instant inbound enrichment, ICP scoring, deal alerts, and objection-handling drafts.',
      before: 'Inbound demo requests sit in an unmonitored mailbox for 6 hours; SDRs manually research LinkedIn before booking a call.',
      after: 'Leads are enriched with revenue and headcount via Apollo API, scored by AI, and sent to the sales rep on Slack under 45s.',
      workflowsRecommended: ['Inbound Lead Qualifier', 'Email Follow-up Automation']
    },
    {
      id: 'professional-services',
      icon: Building2,
      title: 'LEGAL, ACCOUNTING & ADVISORY FIRMS',
      summary: 'Process client receipts, parse engagement contracts, and automate recurring audit paperwork.',
      before: 'Associates spend hours typing vendor invoice line items, case numbers from court PDF listings, and tracking billable milestones.',
      after: 'Multimodal vision models ingest scanned documents, extract required ledger rows, verify totals, and stage them in accounting software.',
      workflowsRecommended: ['Document Processing Automation', 'Executive Reporting Agent']
    },
    {
      id: 'real-estate',
      icon: HomeIcon,
      title: 'REAL ESTATE & PROPERTY MANAGEMENT',
      summary: 'Instant tenant inquiry replies on WhatsApp, maintenance dispatch, and lead screening.',
      before: 'Brokers miss high-intent rental inquiries received on weekends; maintenance requests get lost in personal messaging threads.',
      after: 'Automated WhatsApp bot verifies tenant budget and move-in date, schedules site visits on Google Calendar, and logs service tickets.',
      workflowsRecommended: ['Customer Support Automation', 'Inbound Lead Qualifier']
    },
    {
      id: 'startups',
      icon: Users,
      title: 'EARLY-STAGE STARTUPS & SOLO FOUNDERS',
      summary: 'Operate like a 10-person operations team without premature payroll expansion.',
      before: 'Founders wear five hats, manually checking stripe alerts, writing meeting minutes, and copying bugs to task boards.',
      after: 'Autonomous workflows connect Stripe, GitHub, Notion, and Slack to handle routine data routing with zero human overhead.',
      workflowsRecommended: ['AI Meeting Summarizer', 'Executive Reporting Agent']
    }
  ];

  return (
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Industries Header */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 border-b border-[#CFCFCC]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
              SECTOR PRACTICE // TARGET VERTICALS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
              INDUSTRY ARCHITECTURES
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 max-w-xl leading-relaxed">
              Every vertical experiences distinct operational bottlenecks. We engineer deterministic data pipelines that eliminate repetitive friction and save measurable hours.
            </p>
          </div>

          <button
            onClick={onRequestCustom}
            className="self-start md:self-auto btn-primary"
          >
            <span>DISCUSS YOUR VERTICAL</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Grid of Sector Cards */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#E4E3E0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {industriesList.map(ind => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="p-8 sm:p-10 bg-white border border-[#CFCFCC] space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0E0E0E] text-white flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#0E0E0E]">
                        {ind.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                    {ind.summary}
                  </p>

                  {/* Contrast comparison */}
                  <div className="grid grid-cols-1 gap-3 pt-2 text-xs">
                    <div className="p-4 bg-[#F6F5F3] border-l-2 border-[#6B6B6B] border-y border-r border-[#CFCFCC] text-[#6B6B6B]">
                      <span className="uppercase tracking-[0.16em] text-[10px] font-bold text-[#0E0E0E] block mb-1">
                        Manual Drag:
                      </span>
                      {ind.before}
                    </div>
                    <div className="p-4 bg-[#F6F5F3] border-l-2 border-[#0E0E0E] border-y border-r border-[#CFCFCC] text-[#0E0E0E]">
                      <span className="uppercase tracking-[0.16em] text-[10px] font-bold text-[#0E0E0E] block mb-1">
                        Automated Resolution:
                      </span>
                      {ind.after}
                    </div>
                  </div>

                  {/* Recommended blueprints */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#6B6B6B] block mb-2">
                      RECOMMENDED BLUEPRINTS:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {ind.workflowsRecommended.map((wf, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#F6F5F3] border border-[#CFCFCC] text-[11px] font-medium text-[#0E0E0E]">
                          {wf}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#CFCFCC] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('/workflows')}
                    className="text-xs uppercase tracking-[0.16em] font-semibold text-[#0E0E0E] editorial-link cursor-pointer"
                  >
                    View Catalog →
                  </button>
                  <button
                    onClick={onRequestCustom}
                    className="h-10 px-5 text-xs uppercase tracking-[0.16em] font-semibold text-white bg-[#0E0E0E] hover:bg-[#222222] transition-colors cursor-pointer"
                  >
                    Request Setup
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
