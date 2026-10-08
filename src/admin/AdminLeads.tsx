import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { Storage } from '../lib/storage';
import { Mail, Phone, Trash2 } from 'lucide-react';

interface AdminLeadsProps {
  leads: Lead[];
  onRefresh: () => void;
}

const STATUS_OPTIONS: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

export const AdminLeads: React.FC<AdminLeadsProps> = ({ leads, onRefresh }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [noteDraft, setNoteDraft] = useState('');

  const filteredLeads = leads.filter(l => {
    if (filterStatus === 'All') return true;
    return l.status === filterStatus;
  });

  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    Storage.updateLeadStatus(leadId, newStatus);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    onRefresh();
  };

  const handleSaveNotes = (leadId: string) => {
    Storage.updateLeadStatus(leadId, selectedLead!.status, noteDraft);
    if (selectedLead) {
      setSelectedLead({ ...selectedLead, notes: noteDraft });
    }
    onRefresh();
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Delete this lead record permanently?')) {
      Storage.deleteLead(leadId);
      if (selectedLead?.id === leadId) setSelectedLead(null);
      onRefresh();
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Contacted':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'Qualified':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'Proposal':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'Won':
        return 'bg-emerald-900 text-white border-emerald-600';
      case 'Lost':
        return 'bg-white/[0.05] text-neutral-400 border-white/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            Inbound Leads & Sales Pipeline
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Track inquiries, update qualification stages, and capture customer requirements.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 p-1 bg-black/60 border border-white/[0.08] text-xs overflow-x-auto">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1 font-mono uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
              filterStatus === 'All' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All ({leads.length})
          </button>
          {STATUS_OPTIONS.map(st => {
            const count = leads.filter(l => l.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 font-mono uppercase tracking-wider text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                  filterStatus === st ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {st} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table */}
        <div className="lg:col-span-2 border border-white/[0.08] bg-[#0A0B0F] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#07080B] border-b border-white/[0.08] text-neutral-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Lead Name / Company</th>
                  <th className="py-3 px-4">Requested Automation</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredLeads.map(lead => {
                  const isSelected = selectedLead?.id === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setNoteDraft(lead.notes || '');
                      }}
                      className={`hover:bg-white/[0.02] cursor-pointer transition-colors ${
                        isSelected ? 'bg-white/[0.04]' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-[11px] text-neutral-400">{lead.company || 'Direct individual'}</div>
                        <div className="text-[10px] text-neutral-500 font-mono mt-0.5">{lead.email}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-neutral-200 font-medium">{lead.automation_type}</div>
                        <div className="text-neutral-500 text-[10px] truncate max-w-xs">{lead.message}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-neutral-300">
                        {lead.budget || 'Custom'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-500 text-[11px] font-mono whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Inspector Panel */}
        <div className="p-6 border border-white/[0.08] bg-[#0A0B0F] space-y-6">
          {selectedLead ? (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{selectedLead.name}</h3>
                  <div className="text-neutral-400 text-xs">{selectedLead.company}</div>
                </div>
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-2">
                  Update Pipeline Status:
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {STATUS_OPTIONS.map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`py-1.5 px-2 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        selectedLead.status === st
                          ? 'bg-white text-black font-semibold'
                          : 'bg-white/[0.02] text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-2 p-3.5 bg-black/40 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline font-mono text-[11px]">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <a href={`tel:${selectedLead.phone}`} className="hover:underline font-mono text-[11px]">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                <div className="text-[10px] text-neutral-500 font-mono pt-1">
                  Budget: {selectedLead.budget} · Source: {selectedLead.source}
                </div>
              </div>

              {/* Message from customer */}
              <div>
                <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                  Customer Inquiry Message:
                </div>
                <div className="p-3.5 bg-[#07080B] border border-white/[0.06] text-neutral-300 leading-relaxed text-xs">
                  {selectedLead.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                  Internal Ops & Architecture Notes:
                </div>
                <textarea
                  rows={3}
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  placeholder="Record customer constraints, proposal links, or technical notes..."
                  className="w-full p-3 bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white resize-none transition-colors"
                />
                <button
                  onClick={() => handleSaveNotes(selectedLead.id)}
                  className="mt-2.5 px-4 py-2 font-mono uppercase text-[11px] bg-white text-black hover:bg-neutral-200 font-semibold cursor-pointer transition-colors active:scale-[0.98]"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-neutral-500 text-xs">
              Select a lead from the list to review contact details, change stage, or save internal scoping notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
