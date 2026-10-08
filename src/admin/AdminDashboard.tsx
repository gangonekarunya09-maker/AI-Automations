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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Operations & Revenue Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time synchronization across inbound leads, custom requests, and workflow orders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('workflows')}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            + Add Workflow
          </button>
          <button
            onClick={() => onNavigateTab('settings')}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-neutral-300 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Webhook className="w-3.5 h-3.5 text-emerald-400" />
            <span>Test Webhook</span>
          </button>
        </div>
      </div>

      {/* Metric Cards (Tabular numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total & New Leads */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="p-6 border border-white/[0.08] bg-[#0A0B0F] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider">Inbound Leads</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-white tabular-nums">
              {leads.length}
            </span>
            {newLeads.length > 0 && (
              <span className="text-xs font-mono text-emerald-400">
                ({newLeads.length} new)
              </span>
            )}
          </div>
          <div className="text-[11px] text-neutral-500 mt-3 flex items-center gap-1 font-mono uppercase tracking-wider">
            <span>View pipeline</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Custom Automation Requests */}
        <div
          onClick={() => onNavigateTab('custom-requests')}
          className="p-6 border border-white/[0.08] bg-[#0A0B0F] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider">Custom Requests</span>
            <FileCode2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-white tabular-nums">
              {customRequests.length}
            </span>
            {newRequests.length > 0 && (
              <span className="text-xs font-mono text-blue-400">
                ({newRequests.length} pending review)
              </span>
            )}
          </div>
          <div className="text-[11px] text-neutral-500 mt-3 flex items-center gap-1 font-mono uppercase tracking-wider">
            <span>Review requirements</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Total Orders */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="p-6 border border-white/[0.08] bg-[#0A0B0F] hover:border-white/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider">Workflow Orders</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-white tabular-nums">
              {orders.length}
            </span>
            {pendingOrders.length > 0 && (
              <span className="text-xs font-mono text-amber-400">
                ({pendingOrders.length} pending setup)
              </span>
            )}
          </div>
          <div className="text-[11px] text-neutral-500 mt-3 flex items-center gap-1 font-mono uppercase tracking-wider">
            <span>Manage deliveries</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Realized Revenue */}
        <div className="p-6 border border-white/[0.08] bg-[#0A0B0F]">
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider">Settled Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-emerald-300 tabular-nums">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-500 mt-3 font-mono">
            {workflows.filter(w => w.status === 'published').length} active catalog products
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Recent Custom Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inbound Leads */}
        <div className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-4">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-white">Recent Inbound Leads</h3>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs font-mono uppercase text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              All Leads →
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map(lead => (
              <div
                key={lead.id}
                className="p-4 bg-white/[0.02] border border-white/[0.06] text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{lead.name}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                    lead.status === 'New'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : lead.status === 'Won'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-white/[0.05] text-neutral-300 border border-white/10'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <div className="text-neutral-400 text-[11px]">
                  {lead.company} · {lead.email}
                </div>
                <div className="text-neutral-300 line-clamp-1 text-[11px]">
                  "{lead.message}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Custom Automation Inquiries */}
        <div className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-4">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono text-white">Custom Requirements Queue</h3>
            <button
              onClick={() => onNavigateTab('custom-requests')}
              className="text-xs font-mono uppercase text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
            >
              All Requests →
            </button>
          </div>

          <div className="space-y-3">
            {customRequests.slice(0, 4).map(req => (
              <div
                key={req.id}
                className="p-4 bg-white/[0.02] border border-white/[0.06] text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{req.name} ({req.company})</span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Budget: {req.budget}
                  </span>
                </div>
                <div className="text-neutral-300 text-[11px] line-clamp-2">
                  {req.process_description}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono pt-1">
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
