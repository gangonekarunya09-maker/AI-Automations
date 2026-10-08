import React, { useState } from 'react';
import { CustomRequest } from '../types';
import { Storage } from '../lib/storage';
import { Mail, Phone } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="pb-5 border-b border-white/[0.08]">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
          Custom Automation Requirements
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          In-depth process descriptions and manual bottlenecks submitted by business customers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests List */}
        <div className="lg:col-span-2 space-y-3">
          {customRequests.map(req => {
            const isSelected = selectedReq?.id === req.id;
            return (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className={`p-5 sm:p-6 border border-white/[0.08] bg-[#0A0B0F] hover:border-white/20 cursor-pointer transition-all ${
                  isSelected ? 'border-white/40 bg-white/[0.03]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <div>
                    <h3 className="text-sm font-bold text-white">{req.name}</h3>
                    <div className="text-xs text-neutral-400">{req.company}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-emerald-400">
                      {req.budget}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white/[0.05] text-neutral-300 border border-white/10">
                      {req.status}
                    </span>
                  </div>
                </div>

                <p className="text-neutral-300 text-xs leading-relaxed mb-3 line-clamp-2">
                  {req.process_description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                  <span className="text-neutral-500 uppercase">Tools:</span>
                  {req.tools_used.map(tool => (
                    <span key={tool} className="px-2 py-0.5 bg-black/50 border border-white/10 text-neutral-300">
                      {tool}
                    </span>
                  ))}
                  <span className="text-neutral-700">·</span>
                  <span className="text-neutral-500 uppercase">Frequency:</span>
                  <span className="text-neutral-300">{req.frequency}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="p-6 border border-white/[0.08] bg-[#0A0B0F] space-y-5 text-xs">
          {selectedReq ? (
            <div className="space-y-4">
              <div className="pb-3.5 border-b border-white/[0.08]">
                <h3 className="text-base font-bold text-white tracking-tight">{selectedReq.name}</h3>
                <div className="text-neutral-400">{selectedReq.company}</div>
                <div className="text-[10px] font-mono text-neutral-500 mt-1">
                  Submitted {new Date(selectedReq.created_at).toLocaleString()}
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                  Project Status:
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {STATUS_STAGES.map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedReq.id, st)}
                      className={`py-1.5 px-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        selectedReq.status === st
                          ? 'bg-white text-black font-semibold'
                          : 'bg-white/[0.02] text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="p-3.5 bg-black/40 border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`mailto:${selectedReq.email}`} className="hover:underline font-mono text-[11px]">
                    {selectedReq.email}
                  </a>
                </div>
                {selectedReq.phone && (
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <a href={`tel:${selectedReq.phone}`} className="hover:underline font-mono text-[11px]">
                      {selectedReq.phone}
                    </a>
                  </div>
                )}
                <div className="text-[10px] text-neutral-500 font-mono pt-1">
                  Budget: {selectedReq.budget} · Frequency: {selectedReq.frequency}
                </div>
              </div>

              {/* Detailed Process Description */}
              <div>
                <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                  Step-by-step Current Manual Process:
                </div>
                <div className="p-3.5 bg-[#07080B] border border-white/[0.06] text-neutral-200 leading-relaxed whitespace-pre-wrap text-xs">
                  {selectedReq.process_description}
                </div>
              </div>

              {selectedReq.additional_notes && (
                <div>
                  <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                    Customer Additional Notes:
                  </div>
                  <div className="p-3 bg-[#07080B] border border-white/[0.06] text-neutral-400 text-xs">
                    {selectedReq.additional_notes}
                  </div>
                </div>
              )}

              {/* Tools Selected */}
              <div>
                <div className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider mb-1.5">
                  Tools To Integrate:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedReq.tools_used.map(tool => (
                    <span key={tool} className="px-2.5 py-1 bg-white/[0.03] border border-white/10 text-white font-mono text-[11px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-neutral-500 text-xs">
              Select a requirement card on the left to inspect customer workflow details and update scoping status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
