import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { Storage } from '../lib/storage';
import { Mail, Phone, Trash2, ArrowUpRight } from 'lucide-react';

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
        return 'bg-[#0E0E0E] text-white border-[#0E0E0E]';
      case 'Contacted':
        return 'bg-[#F6F5F3] text-[#0E0E0E] border-[#CFCFCC]';
      case 'Qualified':
        return 'bg-[#BEBEBE] text-[#0E0E0E] border-[#BEBEBE]';
      case 'Proposal':
        return 'bg-[#A9A9A9] text-[#0E0E0E] border-[#A9A9A9]';
      case 'Won':
        return 'bg-[#0E0E0E] text-white font-bold border-[#0E0E0E]';
      case 'Lost':
        return 'bg-white text-[#6B6B6B] border-[#CFCFCC]';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
            SALES PIPELINE // INBOUND QUALIFICATION
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
            INBOUND LEADS
          </h1>
          <p className="text-xs text-[#6B6B6B] mt-1 max-w-xl">
            Track inquiries, update qualification stages, and capture customer requirements in real time.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#CFCFCC] text-xs overflow-x-auto">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1.5 uppercase tracking-[0.14em] text-[11px] font-semibold transition-colors cursor-pointer ${
              filterStatus === 'All' ? 'bg-[#0E0E0E] text-white' : 'text-[#6B6B6B] hover:text-[#0E0E0E]'
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
                className={`px-3 py-1.5 uppercase tracking-[0.14em] text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  filterStatus === st ? 'bg-[#0E0E0E] text-white' : 'text-[#6B6B6B] hover:text-[#0E0E0E]'
                }`}
              >
                {st} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads Table */}
        <div className="lg:col-span-2 border border-[#CFCFCC] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F5F3] border-b border-[#CFCFCC] text-[#6B6B6B] uppercase text-[10px] tracking-[0.16em] font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Lead & Company</th>
                  <th className="py-3.5 px-4">Automation Request</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CFCFCC]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#6B6B6B]">
                      No leads match the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setNoteDraft(lead.notes || '');
                        }}
                        className={`hover:bg-[#F6F5F3] cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F6F5F3]' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#0E0E0E] uppercase text-xs">{lead.name}</div>
                          <div className="text-[11px] text-[#6B6B6B]">{lead.company || 'Direct individual'}</div>
                          <div className="text-[10px] text-[#6B6B6B] mt-0.5">{lead.email}</div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="text-[#0E0E0E] font-medium">{lead.automation_type}</div>
                          <div className="text-[#6B6B6B] text-[11px] truncate max-w-xs">{lead.message}</div>
                        </td>

                        <td className="py-4 px-4 font-semibold text-[#0E0E0E]">
                          {lead.budget || 'Custom'}
                        </td>

                        <td className="py-4 px-4">
                          <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border font-bold ${getStatusBadge(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-[#6B6B6B] text-[11px] whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Inspector Panel */}
        <div className="p-6 sm:p-7 border border-[#CFCFCC] bg-white space-y-6">
          {selectedLead ? (
            <div className="space-y-6 text-xs">
              <div className="flex items-start justify-between pb-4 border-b border-[#CFCFCC]">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-0.5">
                    LEAD INSPECTOR #{selectedLead.id}
                  </span>
                  <h3 className="text-lg font-extrabold uppercase text-[#0E0E0E] tracking-tight">{selectedLead.name}</h3>
                  <div className="text-xs text-[#6B6B6B]">{selectedLead.company}</div>
                </div>
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="p-2 text-[#6B6B6B] hover:text-[#0E0E0E] hover:bg-[#F6F5F3] transition-colors cursor-pointer"
                  title="Delete Lead Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-2">
                  Update Stage:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {STATUS_OPTIONS.map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`py-2 px-2 text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                        selectedLead.status === st
                          ? 'bg-[#0E0E0E] text-white'
                          : 'bg-[#F6F5F3] text-[#6B6B6B] hover:text-[#0E0E0E] border border-[#CFCFCC]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-2.5 p-4 bg-[#F6F5F3] border border-[#CFCFCC]">
                <div className="flex items-center gap-2.5 text-[#0E0E0E]">
                  <Mail className="w-4 h-4 text-[#0E0E0E] shrink-0" strokeWidth={1.5} />
                  <a href={`mailto:${selectedLead.email}`} className="editorial-link font-medium text-xs">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2.5 text-[#0E0E0E]">
                    <Phone className="w-4 h-4 text-[#0E0E0E] shrink-0" strokeWidth={1.5} />
                    <a href={`tel:${selectedLead.phone}`} className="editorial-link font-medium text-xs">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
                <div className="text-[10px] uppercase tracking-wider text-[#6B6B6B] pt-2 border-t border-[#CFCFCC]/60">
                  Budget: <span className="font-bold text-[#0E0E0E]">{selectedLead.budget}</span> · Source: <span className="font-bold text-[#0E0E0E]">{selectedLead.source}</span>
                </div>
              </div>

              {/* Message from customer */}
              <div>
                <div className="text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-1.5">
                  Inquiry Brief:
                </div>
                <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] leading-relaxed text-xs">
                  {selectedLead.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <div className="text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-1.5">
                  Internal Ops & Architecture Notes:
                </div>
                <textarea
                  rows={3}
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  placeholder="Record customer constraints, proposal links, or technical notes..."
                  className="w-full p-3 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] resize-none transition-colors"
                />
                <button
                  onClick={() => handleSaveNotes(selectedLead.id)}
                  className="mt-2.5 w-full btn-primary h-10 text-[11px]"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-[#6B6B6B] text-xs space-y-2">
              <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#0E0E0E]">No Lead Selected</div>
              <p>Click any row in the pipeline table to view complete contact details, advance qualification stage, or attach notes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
