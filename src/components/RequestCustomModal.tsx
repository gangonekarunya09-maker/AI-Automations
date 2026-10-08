import React, { useState } from 'react';
import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Storage } from '../lib/storage';
import { dispatchWebhook } from '../lib/webhook';

interface RequestCustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const COMMON_TOOLS = [
  'Gmail', 'Google Sheets', 'Excel', 'WhatsApp', 'HubSpot / CRM',
  'Slack', 'Shopify', 'Airtable', 'Notion', 'QuickBooks / Tally', 'PostgreSQL / SQL'
];

export const RequestCustomModal: React.FC<RequestCustomModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    process_description: '',
    frequency: 'Daily',
    budget: '₹15,000–₹50,000',
    additional_notes: ''
  });
  const [selectedTools, setSelectedTools] = useState<string[]>(['Gmail', 'Google Sheets']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const toggleTool = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.process_description) {
      setErrorMessage('Please fill in required fields.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // 1. Add to Custom Requests
      const req = Storage.addCustomRequest({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        process_description: formData.process_description,
        tools_used: selectedTools,
        frequency: formData.frequency,
        budget: formData.budget,
        additional_notes: formData.additional_notes,
        status: 'New'
      });

      // 2. Add as Lead for sales pipeline
      Storage.addLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.process_description,
        automation_type: 'Bespoke Custom Automation',
        budget: formData.budget,
        status: 'New',
        source: 'custom_request'
      });

      // 3. Dispatch n8n Webhook
      await dispatchWebhook('custom_request_created', {
        request_id: req.id,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        process_description: formData.process_description,
        tools: selectedTools,
        frequency: formData.frequency,
        budget: formData.budget
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch {
      setErrorMessage('Error recording request. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-[#090A0E] border border-white/[0.12] p-6 sm:p-8 shadow-2xl my-6"
      >
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-white text-black flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Requirement Received & Scoped
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your manual bottleneck has been queued for architectural review. Our systems team will review your tools ({selectedTools.join(', ')}) and contact you within 24 hours with an actionable automation proposal.
            </p>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Bespoke Engineering Intake</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 tracking-tight">
              Describe Your Repetitive Process
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              Tell us what manual tasks consume your team’s time. We will design an automation architecture and show you what can be automated.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Logistics"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@company.com"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  What manual process do you want to automate? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.process_description}
                  onChange={e => setFormData({ ...formData, process_description: e.target.value })}
                  placeholder="Describe what happens today: e.g. We get customer orders via WhatsApp and email, then someone manually creates invoices in Tally and sends shipping tracking links."
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Tools currently used */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  Tools & Platforms Currently In Use:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_TOOLS.map(tool => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleTool(tool)}
                        className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black font-semibold'
                            : 'bg-white/[0.02] text-neutral-400 hover:text-white border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frequency and Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Frequency of this Task
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090A0E] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Multiple times per day">Multiple times per day</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#090A0E] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Below ₹5,000">Below ₹5,000</option>
                    <option value="₹5,000–₹15,000">₹5,000–₹15,000</option>
                    <option value="₹15,000–₹50,000">₹15,000–₹50,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting to Automation Pipeline...' : 'Submit Automation Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-[11px] text-neutral-500 text-center mt-2 font-mono">
                  Payload synchronized to Supabase + n8n webhook listener.
                </div>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
