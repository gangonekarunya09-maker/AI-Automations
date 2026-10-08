import React from 'react';
import { Users, ShoppingBag, FileCode2, ArrowUpRight, TrendingUp, Webhook } from 'lucide-react';
import { Workflow, Lead, CustomRequest, Order } from '../types';

interface AdminDashboardProps {
  workflows: Workflow[];
  leads: Lead[];
  customRequests: CustomRequest[];
  orders: Order[];
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  workflows,
  leads,
  customRequests,
  orders,
  onNavigateTab
}) => {
  const newLeads = leads.filter(l => l.status === 'New');
  const newRequests = customRequests.filter(r => r.status === 'New');
  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment_status === 'Paid' ? o.amount_inr : 0), 0);
  const pendingOrders = orders.filter(o => o.payment_status === 'Pending' || o.payment_status === 'Invoice Sent');

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
            CONTROL PLANE // REAL-TIME METRICS
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
            OPERATIONS DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('workflows')}
            className="btn-primary h-10 px-5 text-xs"
          >
            + ADD WORKFLOW
          </button>
          <button
            onClick={() => onNavigateTab('settings')}
            className="h-10 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#0E0E0E] bg-white border border-[#CFCFCC] hover:bg-[#F6F5F3] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Webhook className="w-3.5 h-3.5 text-[#0E0E0E]" />
            <span>CONFIG & SUPABASE</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total & New Leads */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="p-6 bg-white border border-[#CFCFCC] hover:border-[#0E0E0E] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold">Inbound Leads</span>
            <Users className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#0E0E0E] tracking-tight">
              {leads.length}
            </span>
            {newLeads.length > 0 && (
              <span className="text-xs uppercase tracking-wider font-bold text-[#0E0E0E]">
                ({newLeads.length} new)
              </span>
            )}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#6B6B6B] mt-4 flex items-center gap-1 group-hover:text-[#0E0E0E]">
            <span>View pipeline</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Custom Automation Requests */}
        <div
          onClick={() => onNavigateTab('custom-requests')}
          className="p-6 bg-white border border-[#CFCFCC] hover:border-[#0E0E0E] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold">Custom Scopes</span>
            <FileCode2 className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#0E0E0E] tracking-tight">
              {customRequests.length}
            </span>
            {newRequests.length > 0 && (
              <span className="text-xs uppercase tracking-wider font-bold text-[#0E0E0E]">
                ({newRequests.length} pending)
              </span>
            )}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#6B6B6B] mt-4 flex items-center gap-1 group-hover:text-[#0E0E0E]">
            <span>Review inquiries</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Total Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-6 bg-white border border-[#CFCFCC] hover:border-[#0E0E0E] transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold">Blueprint Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-[#0E0E0E] tracking-tight">
              {orders.length}
            </span>
            {pendingOrders.length > 0 && (
              <span className="text-xs uppercase tracking-wider font-bold text-[#0E0E0E]">
                ({pendingOrders.length} pending)
              </span>
            )}
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#6B6B6B] mt-4 flex items-center gap-1 group-hover:text-[#0E0E0E]">
            <span>Manage deliveries</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Settled Revenue */}
        <div className="p-6 bg-[#0E0E0E] text-white border border-[#0E0E0E]">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold">Settled Revenue</span>
            <TrendingUp className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-neutral-400 mt-4">
            {workflows.filter(w => w.status === 'published').length} active catalog products
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Recent Custom Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inbound Leads */}
        <div className="p-8 bg-white border border-[#CFCFCC] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCC]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0E0E]">Recent Inbound Leads</h3>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs uppercase tracking-[0.14em] font-bold text-[#0E0E0E] editorial-link cursor-pointer"
            >
              All Leads →
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map(lead => (
              <div
                key={lead.id}
                className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase text-[#0E0E0E]">{lead.name}</span>
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-[#0E0E0E] text-white">
                    {lead.status}
                  </span>
                </div>
                <div className="text-[#6B6B6B] text-[11px]">
                  {lead.company} · {lead.email}
                </div>
                <div className="text-[#0E0E0E] line-clamp-1 text-xs pt-1 font-medium">
                  "{lead.message}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Custom Automation Inquiries */}
        <div className="p-8 bg-white border border-[#CFCFCC] space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCC]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0E0E]">Custom Requirements Queue</h3>
            <button
              onClick={() => onNavigateTab('custom-requests')}
              className="text-xs uppercase tracking-[0.14em] font-bold text-[#0E0E0E] editorial-link cursor-pointer"
            >
              All Requests →
            </button>
          </div>

          <div className="space-y-3">
            {customRequests.slice(0, 4).map(req => (
              <div
                key={req.id}
                className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase text-[#0E0E0E]">{req.name} ({req.company})</span>
                  <span className="text-[10px] uppercase font-bold text-[#6B6B6B]">
                    {req.budget}
                  </span>
                </div>
                <div className="text-[#0E0E0E] text-xs line-clamp-2 pt-1 font-medium">
                  {req.process_description}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#6B6B6B] uppercase font-semibold pt-1">
                  <span>Tools: </span>
                  <span>{req.tools_used.slice(0, 4).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
