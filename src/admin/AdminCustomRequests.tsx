import React, { useState } from 'react';
import { CustomRequest } from '../types';
import { Storage } from '../lib/storage';
import { Mail, Phone, Layers, ArrowUpRight } from 'lucide-react';

interface AdminCustomRequestsProps {
  customRequests: CustomRequest[];
  onRefresh: () => void;
}

const STATUS_STAGES: CustomRequest['status'][] = [
  'New', 'Scoping', 'Proposal', 'In Development', 'Completed', 'Archived'
];

export const AdminCustomRequests: React.FC<AdminCustomRequestsProps> = ({
  customRequests,
  onRefresh
}) => {
  const [selectedReq, setSelectedReq] = useState<CustomRequest | null>(null);

  const handleUpdateStatus = (id: string, status: CustomRequest['status']) => {
    Storage.updateCustomRequestStatus(id, status);
    if (selectedReq?.id === id) {
      setSelectedReq({ ...selectedReq, status });
    }
    onRefresh();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#CFCFCC]">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
          BESPOKE ARCHITECTURE // REQUIREMENTS INTAKE
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
          CUSTOM REQUIREMENTS QUEUE
        </h1>
        <p className="text-xs text-[#6B6B6B] mt-1 max-w-xl">
          In-depth process descriptions and manual operational bottlenecks submitted by enterprise clients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Requests List */}
        <div className="lg:col-span-2 space-y-4">
          {customRequests.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#CFCFCC] text-xs text-[#6B6B6B]">
              No custom architecture requests received yet.
            </div>
          ) : (
            customRequests.map(req => {
              const isSelected = selectedReq?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`p-6 bg-white border cursor-pointer transition-all ${
                    isSelected ? 'border-[#0E0E0E] bg-[#F6F5F3]' : 'border-[#CFCFCC] hover:border-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-tight text-[#0E0E0E]">{req.name}</h3>
                      <div className="text-xs text-[#6B6B6B]">{req.company}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0E0E0E] bg-[#F6F5F3] px-2.5 py-1 border border-[#CFCFCC]">
                        {req.budget}
                      </span>
                      <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-[#0E0E0E] text-white">
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#0E0E0E] text-xs leading-relaxed mb-4 line-clamp-2">
                    {req.process_description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#6B6B6B] pt-3 border-t border-[#CFCFCC]">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0E0E0E]">Stack:</span>
                    {req.tools_used.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] text-[10px] font-medium">
                        {tool}
                      </span>
                    ))}
                    <span className="text-[#CFCFCC]">·</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0E0E0E]">Frequency:</span>
                    <span className="text-[#0E0E0E] text-[11px]">{req.frequency}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        <div className="p-6 sm:p-7 border border-[#CFCFCC] bg-white space-y-6 text-xs">
          {selectedReq ? (
            <div className="space-y-5">
              <div className="pb-4 border-b border-[#CFCFCC]">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-0.5">
                  REQUIREMENT #{selectedReq.id}
                </span>
                <h3 className="text-lg font-extrabold uppercase text-[#0E0E0E] tracking-tight">{selectedReq.name}</h3>
                <div className="text-xs text-[#6B6B6B]">{selectedReq.company}</div>
                <div className="text-[10px] text-[#6B6B6B] mt-1">
                  Submitted {new Date(selectedReq.created_at).toLocaleString()}
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-2">
                  Update Architecture Lifecycle Stage:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {STATUS_STAGES.map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedReq.id, st)}
                      className={`py-2 px-1.5 text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                        selectedReq.status === st
                          ? 'bg-[#0E0E0E] text-white'
                          : 'bg-[#F6F5F3] text-[#6B6B6B] hover:text-[#0E0E0E] border border-[#CFCFCC]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] space-y-2">
                <div className="flex items-center gap-2.5 text-[#0E0E0E]">
                  <Mail className="w-4 h-4 text-[#0E0E0E] shrink-0" strokeWidth={1.5} />
                  <a href={`mailto:${selectedReq.email}`} className="editorial-link font-medium text-xs">
                    {selectedReq.email}
                  </a>
                </div>
                {selectedReq.phone && (
                  <div className="flex items-center gap-2.5 text-[#0E0E0E]">
                    <Phone className="w-4 h-4 text-[#0E0E0E] shrink-0" strokeWidth={1.5} />
                    <a href={`tel:${selectedReq.phone}`} className="editorial-link font-medium text-xs">
                      {selectedReq.phone}
                    </a>
                  </div>
                )}
                <div className="text-[10px] uppercase tracking-wider text-[#6B6B6B] pt-2 border-t border-[#CFCFCC]/60">
                  Target Budget: <span className="font-bold text-[#0E0E0E]">{selectedReq.budget}</span> · Frequency: <span className="font-bold text-[#0E0E0E]">{selectedReq.frequency}</span>
                </div>
              </div>

              {/* Detailed Process Description */}
              <div>
                <div className="text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-1.5">
                  Current Manual Workflow Bottleneck:
                </div>
                <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] leading-relaxed whitespace-pre-wrap text-xs">
                  {selectedReq.process_description}
                </div>
              </div>

              {selectedReq.additional_notes && (
                <div>
                  <div className="text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-1.5">
                    Customer Additional Notes:
                  </div>
                  <div className="p-3 bg-[#F6F5F3] border border-[#CFCFCC] text-[#6B6B6B] text-xs">
                    {selectedReq.additional_notes}
                  </div>
                </div>
              )}

              {/* Tools Selected */}
              <div>
                <div className="text-[#0E0E0E] text-[10px] uppercase tracking-[0.18em] font-bold mb-2">
                  Requested Connectors & Tools:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedReq.tools_used.map(tool => (
                    <span key={tool} className="px-2.5 py-1 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-[11px] font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-[#6B6B6B] text-xs space-y-2">
              <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#0E0E0E]">No Request Selected</div>
              <p>Select any inquiry card on the left to review client process requirements and update scoping stages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
