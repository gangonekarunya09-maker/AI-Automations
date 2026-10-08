import React, { useState } from 'react';
import { Order } from '../types';
import { Storage } from '../lib/storage';
import { FileCode, Server, Settings2 } from 'lucide-react';

interface AdminOrdersProps {
  orders: Order[];
  onRefresh: () => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, onRefresh }) => {
  const [filterModel, setFilterModel] = useState<string>('All');

  const filteredOrders = orders.filter(o => {
    if (filterModel === 'All') return true;
    return o.delivery_model === filterModel;
  });

  const handleUpdatePayment = (orderId: string, status: Order['payment_status']) => {
    Storage.updateOrderStatus(orderId, status, undefined);
    onRefresh();
  };

  const handleUpdateDelivery = (orderId: string, status: Order['delivery_status']) => {
    Storage.updateOrderStatus(orderId, undefined, status);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            Workflow Orders & Inquiries
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Track workflow acquisitions, delivery models, invoice fulfillment, and credential setups.
          </p>
        </div>

        {/* Model Filter */}
        <div className="flex items-center gap-1 p-1 bg-black/60 border border-white/[0.08] text-xs">
          {['All', 'workflow_json', 'hybrid', 'managed'].map(model => (
            <button
              key={model}
              onClick={() => setFilterModel(model)}
              className={`px-3 py-1 font-mono uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                filterModel === model ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {model === 'All' ? 'All' : model === 'workflow_json' ? 'JSON File' : model === 'hybrid' ? 'Hybrid' : 'Managed'}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-white/[0.08] bg-[#0A0B0F] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#07080B] border-b border-white/[0.08] text-neutral-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Customer & Company</th>
                <th className="py-3 px-4">Workflow Acquired</th>
                <th className="py-3 px-4">Delivery Tier</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{order.customer_name}</div>
                    <div className="text-[11px] text-neutral-400">{order.customer_company}</div>
                    <div className="text-[10px] text-neutral-500 font-mono">{order.customer_email}</div>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-200 font-medium">
                    {order.workflow_name}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${
                      order.delivery_model === 'workflow_json'
                        ? 'bg-white/[0.03] text-neutral-300 border-white/10'
                        : order.delivery_model === 'hybrid'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-900'
                          : 'bg-purple-950/60 text-purple-300 border-purple-900'
                    }`}>
                      {order.delivery_model === 'workflow_json' && <FileCode className="w-3 h-3 text-emerald-400" />}
                      {order.delivery_model === 'hybrid' && <Settings2 className="w-3 h-3 text-blue-400" />}
                      {order.delivery_model === 'managed' && <Server className="w-3 h-3 text-purple-400" />}
                      <span>{order.delivery_model === 'workflow_json' ? 'JSON' : order.delivery_model}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-white tabular-nums">
                    ₹{order.amount_inr.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={order.payment_status}
                      onChange={e => handleUpdatePayment(order.id, e.target.value as any)}
                      className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border focus:outline-none cursor-pointer ${
                        order.payment_status === 'Paid'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : order.payment_status === 'Invoice Sent'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-white/[0.03] text-neutral-400 border-white/10'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Invoice Sent">Invoice Sent</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={order.delivery_status}
                      onChange={e => handleUpdateDelivery(order.id, e.target.value as any)}
                      className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border focus:outline-none cursor-pointer ${
                        order.delivery_status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : order.delivery_status === 'In Progress'
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : 'bg-white/[0.03] text-neutral-400 border-white/10'
                      }`}
                    >
                      <option value="Awaiting Setup">Awaiting Setup</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px] whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
