import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Play, Database, Send, Zap } from 'lucide-react';

interface PipelinePreset {
  id: string;
  name: string;
  label: string;
  trigger: { name: string; type: string; payload: string };
  data: { name: string; details: string };
  aiLogic: { model: string; action: string; output: string };
  action: { target: string; result: string };
  businessResult: { metric: string; description: string };
}

const PRESETS: PipelinePreset[] = [
  {
    id: 'lead-qualification',
    name: 'Inbound Lead Qualification',
    label: 'Sales Pipeline',
    trigger: {
      name: 'Form Ingestion Webhook',
      type: 'POST /v1/lead',
      payload: '{"email": "elena@acme.com", "company": "Acme Corp", "size": "50-200"}'
    },
    data: {
      name: 'Apollo Firmographic Enrichment',
      details: 'Fetched: $14M ARR, 120 employees, SaaS industry, HubSpot user'
    },
    aiLogic: {
      model: 'Gemini 1.5 Flash Intent Scorer',
      action: 'ICP Evaluation & Lead Priority',
      output: 'Tier-A High Intent (Score: 94/100). Qualified for immediate AE escalation.'
    },
    action: {
      target: 'HubSpot Deal Created + Slack Alert',
      result: 'Deal #4829 created in "Sales Qualified" + AE pinged with 1-click booking'
    },
    businessResult: {
      metric: '< 45s Response Latency',
      description: 'Prospect receives personalized intro before closing their browser tab.'
    }
  },
  {
    id: 'meeting-summarizer',
    name: 'Meeting Audio to Action Dispatch',
    label: 'Executive Ops',
    trigger: {
      name: 'Google Meet Audio Uploaded',
      type: 'Drive Event: new_file.m4a',
      payload: '{"file": "Weekly_Exec_Sync_45min.m4a", "duration": "42m 18s"}'
    },
    data: {
      name: 'Whisper Speech Chunking',
      details: 'Transcribed 6,840 words across 4 detected speaker channels'
    },
    aiLogic: {
      model: 'Gemini 1.5 Pro Synthesizer',
      action: 'Extract Decisions & Deadlines',
      output: 'Extracted: 3 Strategic Decisions, 6 Assigned Deliverables, 1 Budget Blocker'
    },
    action: {
      target: 'Slack Digest + Jira Tickets',
      result: 'Executive brief posted to #leadership; 4 tasks staged in Jira sprint'
    },
    businessResult: {
      metric: '3.5 Hours Saved / Week',
      description: 'Zero forgotten action items; team aligned within 3 minutes of call end.'
    }
  },
  {
    id: 'invoice-ocr',
    name: 'Vendor Invoice & Expense Audit',
    label: 'Finance & AP',
    trigger: {
      name: 'AP Inbox Email Attachment',
      type: 'IMAP Event: PDF received',
      payload: '{"subject": "Invoice #INV-2026-904", "vendor": "Stripe Atlas", "file": "inv.pdf"}'
    },
    data: {
      name: 'Multimodal Vision Extraction',
      details: 'Parsed 14 line-items, tax sub-totals, bank wire IBAN, and payment terms'
    },
    aiLogic: {
      model: 'Gemini 1.5 Flash Math Verifier',
      action: 'Subtotal & Tax Validation',
      output: 'Line items match total ($4,290.00). Vendor approved. Prepared ledger entry.'
    },
    action: {
      target: 'ERP Sync + Approval Ping',
      result: 'Staged in QuickBooks as "Awaiting Payment" + finance manager pinged'
    },
    businessResult: {
      metric: '100% Extraction Accuracy',
      description: 'Zero manual data entry from messy PDF invoices.'
    }
  }
];

export const InteractiveFlowVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('lead-qualification');
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isSimulating, setIsSimulating] = useState(false);

  const activePreset = PRESETS.find(p => p.id === selectedId) || PRESETS[0];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    const stepInterval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 550);
  };

  return (
    <div className="bg-white p-6 sm:p-10 space-y-8 select-none">
      {/* Top preset switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
            INTERACTIVE SYSTEM CONSOLE
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
            PIPELINE EXECUTION TRACE
          </h3>
        </div>

        {/* Preset selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedId(preset.id);
                setActiveStep(4);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedId === preset.id
                  ? 'bg-[#0E0E0E] text-white'
                  : 'bg-[#F6F5F3] text-[#6B6B6B] hover:text-[#0E0E0E] border border-[#CFCFCC]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* Step 1: Trigger */}
        <div className={`p-4 border transition-colors ${
          activeStep >= 0
            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
            : 'bg-[#F6F5F3] text-[#6B6B6B] border-[#CFCFCC]'
        }`}>
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.16em] font-bold">
            <span>01 / TRIGGER</span>
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold uppercase mb-1">{activePreset.trigger.name}</div>
          <div className="text-[10px] opacity-75 truncate">{activePreset.trigger.type}</div>
        </div>

        {/* Step 2: Ingestion */}
        <div className={`p-4 border transition-colors ${
          activeStep >= 1
            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
            : 'bg-[#F6F5F3] text-[#6B6B6B] border-[#CFCFCC]'
        }`}>
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.16em] font-bold">
            <span>02 / INGESTION</span>
            <Database className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold uppercase mb-1">{activePreset.data.name}</div>
          <div className="text-[10px] opacity-75 line-clamp-2">{activePreset.data.details}</div>
        </div>

        {/* Step 3: AI Logic */}
        <div className={`p-4 border transition-colors ${
          activeStep >= 2
            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
            : 'bg-[#F6F5F3] text-[#6B6B6B] border-[#CFCFCC]'
        }`}>
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.16em] font-bold">
            <span>03 / AI LOGIC</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold uppercase mb-1">{activePreset.aiLogic.model}</div>
          <div className="text-[10px] opacity-75 line-clamp-2">{activePreset.aiLogic.action}</div>
        </div>

        {/* Step 4: Action */}
        <div className={`p-4 border transition-colors ${
          activeStep >= 3
            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
            : 'bg-[#F6F5F3] text-[#6B6B6B] border-[#CFCFCC]'
        }`}>
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.16em] font-bold">
            <span>04 / TARGET</span>
            <Send className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold uppercase mb-1">{activePreset.action.target}</div>
          <div className="text-[10px] opacity-75 line-clamp-2">{activePreset.action.result}</div>
        </div>

        {/* Step 5: Outcome */}
        <div className={`p-4 border transition-colors ${
          activeStep >= 4
            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
            : 'bg-[#F6F5F3] text-[#6B6B6B] border-[#CFCFCC]'
        }`}>
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.16em] font-bold">
            <span>05 / OUTCOME</span>
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs font-bold uppercase mb-1">{activePreset.businessResult.metric}</div>
          <div className="text-[10px] opacity-75 line-clamp-2">{activePreset.businessResult.description}</div>
        </div>
      </div>

      {/* Live Payload Inspector Box */}
      <div className="p-6 bg-[#0E0E0E] text-white border border-[#0E0E0E] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/15 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white animate-pulse"></span>
            <span className="text-xs uppercase tracking-[0.18em] font-bold text-white">LIVE PAYLOAD INSPECTION</span>
            <span className="text-neutral-500">//</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400">{activePreset.name}</span>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="h-10 px-5 text-xs uppercase tracking-[0.16em] font-semibold text-[#0E0E0E] bg-white hover:bg-neutral-200 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? 'SIMULATING RUN...' : 'TRIGGER SIMULATION'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 block mb-2 font-bold">
              // INGESTED WEBHOOK JSON
            </span>
            <pre className="p-4 bg-white/5 border border-white/10 text-neutral-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {activePreset.trigger.payload}
            </pre>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 block mb-2 font-bold">
              // AI DETERMINISTIC OUTPUT
            </span>
            <div className="p-4 bg-white/5 border border-white/10 text-white font-mono text-[11px] leading-relaxed">
              {activePreset.aiLogic.output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
