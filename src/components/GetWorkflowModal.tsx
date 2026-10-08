import React, { useState } from 'react';
import { X, Check, ArrowRight, FileCode, Server, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Workflow } from '../types';
import { Storage } from '../lib/storage';
import { dispatchWebhook } from '../lib/webhook';

interface GetWorkflowModalProps {
  workflow: Workflow | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const GetWorkflowModal: React.FC<GetWorkflowModalProps> = ({
  workflow,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [deliveryModel, setDeliveryModel] = useState<'workflow_json' | 'managed' | 'hybrid'>('workflow_json');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !workflow) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setErrorMessage('Please fill in required fields.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // 1. Record lead
      Storage.addLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: `Workflow Order Inquiry: ${workflow.name} [Delivery: ${deliveryModel}]. Notes: ${formData.notes || 'None'}`,
        automation_type: workflow.name,
        budget: `₹${workflow.price_inr.toLocaleString()}`,
        status: 'New',
        source: 'workflow_inquiry',
        workflow_slug: workflow.slug
      });

      // 2. Record Order
      const amount = deliveryModel === 'managed'
        ? workflow.price_inr * 2.5
        : deliveryModel === 'hybrid'
          ? workflow.price_inr * 1.6
          : workflow.price_inr;

      Storage.addOrder({
        customer_name: formData.name,
        customer_company: formData.company,
        customer_email: formData.email,
        customer_phone: formData.phone,
        workflow_id: workflow.id,
        workflow_name: workflow.name,
        delivery_model: deliveryModel,
        amount_inr: Math.round(amount),
        payment_status: 'Pending',
        delivery_status: 'Awaiting Setup'
      });

      // 3. Dispatch n8n Webhook
      await dispatchWebhook('order_inquiry', {
        workflow_id: workflow.id,
        workflow_name: workflow.name,
        delivery_model: deliveryModel,
        amount_inr: amount,
        customer: formData
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch {
      setErrorMessage('An unexpected issue occurred. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({ name: '', company: '', email: '', phone: '', notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl bg-[#090A0E] border border-white/[0.12] p-6 sm:p-8 shadow-2xl my-8"
      >
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-white text-black flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Inquiry Recorded & Dispatched
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your acquisition request for <span className="text-white font-medium">{workflow.name}</span> has been logged in our operations pipeline and forwarded to our deployment engineers via n8n webhook.
            </p>
            <div className="p-4 bg-white/[0.02] border border-white/[0.08] text-left text-xs text-neutral-300 space-y-2">
              <div className="font-mono uppercase tracking-wider text-[11px] text-white">Next Operational Steps:</div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0"></span>
                <span>Our lead automation engineer will verify your infrastructure credentials.</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0"></span>
                <span>You will receive the payment link and workflow manifest within 2 business hours.</span>
              </div>
            </div>
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
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Workflow Acquisition
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 tracking-tight">
              {workflow.name}
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              Select your preferred operational delivery model and specify your contact details.
            </p>

            {/* Delivery Model Selection */}
            <div className="mb-6 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                Choose Delivery & Installation Model:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Model A */}
                <div
                  onClick={() => setDeliveryModel('workflow_json')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliveryModel === 'workflow_json'
                      ? 'bg-white text-black border-white'
                      : 'bg-[#0E0F14] border-white/[0.08] text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileCode className={`w-4 h-4 ${deliveryModel === 'workflow_json' ? 'text-black' : 'text-emerald-400'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider">Workflow JSON</span>
                  </div>
                  <div className={`text-[11px] mb-2 leading-tight ${deliveryModel === 'workflow_json' ? 'text-neutral-700' : 'text-neutral-500'}`}>
                    Self-hosted n8n template + setup guide
                  </div>
                  <div className={`text-xs font-mono font-bold ${deliveryModel === 'workflow_json' ? 'text-black' : 'text-white'}`}>
                    ₹{workflow.price_inr.toLocaleString()}
                  </div>
                </div>

                {/* Model C: Hybrid */}
                <div
                  onClick={() => setDeliveryModel('hybrid')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliveryModel === 'hybrid'
                      ? 'bg-white text-black border-white'
                      : 'bg-[#0E0F14] border-white/[0.08] text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Settings2 className={`w-4 h-4 ${deliveryModel === 'hybrid' ? 'text-black' : 'text-blue-400'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider">Workflow + Setup</span>
                  </div>
                  <div className={`text-[11px] mb-2 leading-tight ${deliveryModel === 'hybrid' ? 'text-neutral-700' : 'text-neutral-500'}`}>
                    We connect credentials & test pipelines
                  </div>
                  <div className={`text-xs font-mono font-bold ${deliveryModel === 'hybrid' ? 'text-black' : 'text-white'}`}>
                    ₹{Math.round(workflow.price_inr * 1.6).toLocaleString()}
                  </div>
                </div>

                {/* Model B: Managed */}
                <div
                  onClick={() => setDeliveryModel('managed')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliveryModel === 'managed'
                      ? 'bg-white text-black border-white'
                      : 'bg-[#0E0F14] border-white/[0.08] text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Server className={`w-4 h-4 ${deliveryModel === 'managed' ? 'text-black' : 'text-purple-400'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider">Managed Ops</span>
                  </div>
                  <div className={`text-[11px] mb-2 leading-tight ${deliveryModel === 'managed' ? 'text-neutral-700' : 'text-neutral-500'}`}>
                    Full cloud hosting & SLA maintenance
                  </div>
                  <div className={`text-xs font-mono font-bold ${deliveryModel === 'managed' ? 'text-black' : 'text-white'}`}>
                    ₹{Math.round(workflow.price_inr * 2.5).toLocaleString()}/mo
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vertex Systems"
                    className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@vertex.com"
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
                  Specific Integrations or Tool Versions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g., We use Slack Enterprise and custom HubSpot deal pipelines."
                  className="w-full px-3.5 py-2 bg-white/[0.03] border border-white/10 text-white text-xs focus:border-white focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Dispatching Request...' : 'Proceed with Workflow Request'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2 font-mono">
                  No automated card charge today · Compatibility review and invoice link dispatched directly.
                </p>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
