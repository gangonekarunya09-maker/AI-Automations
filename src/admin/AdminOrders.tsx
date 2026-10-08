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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
            FULFILLMENT & LICENSING // ACQUISITIONS
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
            WORKFLOW ORDERS
          </h1>
          <p className="text-xs text-[#6B6B6B] mt-1 max-w-xl">
            Track workflow acquisitions, delivery models, invoice fulfillment, and credential setups.
          </p>
        </div>

        {/* Model Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#CFCFCC] rounded-xl shadow-sm text-xs">
          {['All', 'workflow_json', 'hybrid', 'managed'].map(model => (
            <button
              key={model}
              onClick={() => setFilterModel(model)}
              className={`px-3 py-1.5 uppercase tracking-[0.14em] text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                filterModel === model ? 'bg-[#0E0E0E] text-white' : 'text-[#6B6B6B] hover:text-[#0E0E0E]'
              }`}
            >
              {model === 'All' ? 'All' : model === 'workflow_json' ? 'JSON File' : model === 'hybrid' ? 'Hybrid' : 'Managed'}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-[#CFCFCC] bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F5F3] border-b border-[#CFCFCC] text-[#6B6B6B] uppercase text-[10px] tracking-[0.16em] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Customer & Company</th>
                <th className="py-3.5 px-4">Workflow Acquired</th>
                <th className="py-3.5 px-4">Delivery Tier</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Delivery Status</th>
                <th className="py-3.5 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFCFCC]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6B6B6B]">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-[#F6F5F3] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold uppercase text-[#0E0E0E] text-xs">{order.customer_name}</div>
                      <div className="text-[11px] text-[#6B6B6B]">{order.customer_company}</div>
                      <div className="text-[10px] text-[#6B6B6B] mt-0.5">{order.customer_email}</div>
                    </td>

                    <td className="py-4 px-4 text-[#0E0E0E] font-medium">
                      {order.workflow_name}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] rounded-full">
                        {order.delivery_model === 'workflow_json' && <FileCode className="w-3.5 h-3.5 text-[#0E0E0E]" strokeWidth={1.5} />}
                        {order.delivery_model === 'hybrid' && <Settings2 className="w-3.5 h-3.5 text-[#0E0E0E]" strokeWidth={1.5} />}
                        {order.delivery_model === 'managed' && <Server className="w-3.5 h-3.5 text-[#0E0E0E]" strokeWidth={1.5} />}
                        <span>{order.delivery_model === 'workflow_json' ? 'JSON BLUEPRINT' : order.delivery_model.toUpperCase()}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-[#0E0E0E] text-sm tabular-nums">
                      ₹{order.amount_inr.toLocaleString()}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={order.payment_status}
                        onChange={e => handleUpdatePayment(order.id, e.target.value as any)}
                        className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold border rounded-lg focus:outline-none cursor-pointer ${
                          order.payment_status === 'Paid'
                            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                            : order.payment_status === 'Invoice Sent'
                              ? 'bg-[#BEBEBE] text-[#0E0E0E] border-[#BEBEBE]'
                              : 'bg-white text-[#6B6B6B] border-[#CFCFCC]'
                        }`}
                      >
                        <option value="Pending" className="bg-white text-black">Pending</option>
                        <option value="Invoice Sent" className="bg-white text-black">Invoice Sent</option>
                        <option value="Paid" className="bg-white text-black">Paid</option>
                      </select>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={order.delivery_status}
                        onChange={e => handleUpdateDelivery(order.id, e.target.value as any)}
                        className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold border rounded-lg focus:outline-none cursor-pointer ${
                          order.delivery_status === 'Delivered'
                            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                            : order.delivery_status === 'In Progress'
                              ? 'bg-[#F6F5F3] text-[#0E0E0E] border-[#CFCFCC]'
                              : 'bg-white text-[#6B6B6B] border-[#CFCFCC]'
                        }`}
                      >
                        <option value="Awaiting Setup" className="bg-white text-black">Awaiting Setup</option>
                        <option value="In Progress" className="bg-white text-black">In Progress</option>
                        <option value="Delivered" className="bg-white text-black">Delivered</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-[#6B6B6B] text-[11px] whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
