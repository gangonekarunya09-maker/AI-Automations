import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Play, Database, Send, Zap } from 'lucide-react';
import { motion } from 'motion/react';

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
      name: 'Webflow Form Webhook',
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
      output: 'Tier-A High Intent (Score: 94/100). Needs CRM sync + AE Slack notification.'
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
      model: 'Gemini 1.5 Pro Semantic Synthesizer',
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
      details: 'Extracted Line items, Tax ID, Subtotals, Due dates, Bank details'
    },
    aiLogic: {
      model: 'Deterministic Math Validator',
      action: 'Subtotal & Deduplication Check',
      output: 'Math verified ($4,250.00). Vendor verified in ledger. No duplicate found.'
    },
    action: {
      target: 'Google Sheets + QuickBooks Sync',
      result: 'Row appended to FY26 Ledger; drafted in QB awaiting CFO 1-click approval'
    },
    businessResult: {
      metric: '92% Faster Processing',
      description: 'Eliminates manual typing errors and late payment penalties.'
    }
  }
];

export const InteractiveFlowVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('lead-qualification');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4); // All resolved by default

  const activePreset = PRESETS.find(p => p.id === selectedId) || PRESETS[0];

  const handleSimulate = () => {
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
    <div className="border border-white/[0.08] bg-[#08090D] p-6 lg:p-8 relative overflow-hidden">
      {/* Top preset switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-[11px] uppercase font-mono tracking-wider text-emerald-400 mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Interactive Architecture Visualizer</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
            How An Offlo Automation Executes
          </h3>
        </div>

        {/* Preset selectors */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-black/60 border border-white/[0.08]">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedId(preset.id);
                setActiveStep(4);
              }}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedId === preset.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Stage Bar */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-2.5 relative">
        {/* Step 1: Trigger */}
        <div className={`p-4 border transition-all duration-300 relative ${
          activeStep >= 0
            ? 'bg-white/[0.04] border-white/20 text-white'
            : 'bg-black/30 border-white/[0.05] text-neutral-500'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
              01 / Trigger
            </span>
            <Zap className={`w-3.5 h-3.5 ${activeStep >= 0 ? 'text-amber-400' : 'text-neutral-600'}`} />
          </div>
          <div className="text-xs font-semibold text-white mb-1.5 leading-snug">{activePreset.trigger.name}</div>
          <div className="text-[11px] font-mono text-neutral-400 truncate">{activePreset.trigger.type}</div>
        </div>

        {/* Step 2: Data Intake */}
        <div className={`p-4 border transition-all duration-300 relative ${
          activeStep >= 1
            ? 'bg-white/[0.04] border-white/20 text-white'
            : 'bg-black/30 border-white/[0.05] text-neutral-500'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
              02 / Ingestion
            </span>
            <Database className={`w-3.5 h-3.5 ${activeStep >= 1 ? 'text-blue-400' : 'text-neutral-600'}`} />
          </div>
          <div className="text-xs font-semibold text-white mb-1.5 leading-snug">{activePreset.data.name}</div>
          <div className="text-[11px] text-neutral-400 leading-snug line-clamp-2">{activePreset.data.details}</div>
        </div>

        {/* Step 3: AI / Logic */}
        <div className={`p-4 border transition-all duration-300 relative ${
          activeStep >= 2
            ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
            : 'bg-black/30 border-white/[0.05] text-neutral-500'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">
              03 / AI Logic
            </span>
            <Sparkles className={`w-3.5 h-3.5 ${activeStep >= 2 ? 'text-emerald-400' : 'text-neutral-600'}`} />
          </div>
          <div className="text-xs font-semibold text-emerald-200 mb-1.5 leading-snug">{activePreset.aiLogic.model}</div>
          <div className="text-[11px] text-neutral-300 leading-snug line-clamp-2">{activePreset.aiLogic.action}</div>
        </div>

        {/* Step 4: System Action */}
        <div className={`p-4 border transition-all duration-300 relative ${
          activeStep >= 3
            ? 'bg-white/[0.04] border-white/20 text-white'
            : 'bg-black/30 border-white/[0.05] text-neutral-500'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
              04 / Action
            </span>
            <Send className={`w-3.5 h-3.5 ${activeStep >= 3 ? 'text-purple-400' : 'text-neutral-600'}`} />
          </div>
          <div className="text-xs font-semibold text-white mb-1.5 leading-snug">{activePreset.action.target}</div>
          <div className="text-[11px] text-neutral-400 leading-snug line-clamp-2">{activePreset.action.result}</div>
        </div>

        {/* Step 5: Measurable Result */}
        <div className={`p-4 border transition-all duration-300 relative ${
          activeStep >= 4
            ? 'bg-white/[0.04] border-white/20 text-white'
            : 'bg-black/30 border-white/[0.05] text-neutral-500'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
              05 / Outcome
            </span>
            <CheckCircle2 className={`w-3.5 h-3.5 ${activeStep >= 4 ? 'text-emerald-400' : 'text-neutral-600'}`} />
          </div>
          <div className="text-xs font-bold text-white mb-1.5 font-mono">{activePreset.businessResult.metric}</div>
          <div className="text-[11px] text-neutral-400 leading-snug line-clamp-2">{activePreset.businessResult.description}</div>
        </div>
      </div>

      {/* Live Node Data Inspector Box */}
      <div className="mt-6 p-4 sm:p-5 bg-black/80 border border-white/[0.08] font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-white/[0.08] gap-2 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-neutral-200 uppercase tracking-wider text-[11px]">Live Payload Trace</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400 text-[11px]">{activePreset.name}</span>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 bg-white text-black hover:bg-neutral-200 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isSimulating ? 'Simulating Pipeline...' : 'Test Run Pipeline'}</span>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-neutral-300">
          <div>
            <div className="text-neutral-500 uppercase tracking-wider text-[10px] mb-1.5">
              // Ingested Event Payload
            </div>
            <pre className="bg-[#050608] p-3 border border-white/[0.06] text-neutral-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
              {activePreset.trigger.payload}
            </pre>
          </div>
          <div>
            <div className="text-emerald-400 uppercase tracking-wider text-[10px] mb-1.5">
              // AI Decision & Synthesized Output
            </div>
            <div className="bg-[#050608] p-3 border border-emerald-950/60 text-emerald-300 leading-relaxed font-mono">
              {activePreset.aiLogic.output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
