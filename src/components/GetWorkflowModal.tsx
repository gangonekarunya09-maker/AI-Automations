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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl bg-white border border-[#e4e4df] p-6 sm:p-8 shadow-2xl my-8 text-[#1a1a1a]"
      >
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-[#1a1a1a] text-white flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a]">
              Inquiry Recorded & Dispatched
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your acquisition request for <span className="text-[#1a1a1a] font-semibold">{workflow.name}</span> has been logged in our operations pipeline and forwarded to our deployment engineers via n8n webhook.
            </p>
            <div className="p-4 bg-[#f4f4f0] border border-[#e4e4df] text-left text-xs text-neutral-700 space-y-2">
              <div className="font-mono uppercase tracking-wider text-[11px] text-[#1a1a1a] font-semibold">Next Operational Steps:</div>
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="w-1.5 h-1.5 bg-[#2e4ff4] shrink-0"></span>
                <span>Our lead automation engineer will verify your infrastructure credentials.</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="w-1.5 h-1.5 bg-[#2e4ff4] shrink-0"></span>
                <span>You will receive the payment link and workflow manifest within 2 business hours.</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors cursor-pointer shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.2em] mb-1 font-semibold">
              Workflow Acquisition
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1a1a1a] mb-2 tracking-tight">
              {workflow.name}
            </h3>
            <p className="text-neutral-600 text-xs leading-relaxed mb-6">
              Select your preferred operational delivery model and specify your contact details.
            </p>

            {/* Delivery Model Selection */}
            <div className="mb-6 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-2">
                Choose Delivery & Installation Model:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Model A */}
                <div
                  onClick={() => setDeliveryModel('workflow_json')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliveryModel === 'workflow_json'
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm'
                      : 'bg-[#f4f4f0] border-[#e4e4df] text-neutral-600 hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileCode className={`w-4 h-4 ${deliveryModel === 'workflow_json' ? 'text-white' : 'text-[#2e4ff4]'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider font-mono">Workflow JSON</span>
                  </div>
                  <div className={`text-[11px] mb-2 leading-tight ${deliveryModel === 'workflow_json' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Self-hosted n8n template + setup guide
                  </div>
                  <div className={`text-xs font-mono font-bold ${deliveryModel === 'workflow_json' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    ₹{workflow.price_inr.toLocaleString()}
                  </div>
                </div>

                {/* Model C: Hybrid */}
                <div
                  onClick={() => setDeliveryModel('hybrid')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliveryModel === 'hybrid'
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm'
                      : 'bg-[#f4f4f0] border-[#e4e4df] text-neutral-600 hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Settings2 className={`w-4 h-4 ${deliveryModel === 'hybrid' ? 'text-white' : 'text-[#2e4ff4]'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider font-mono">Workflow + Setup</span>
                  </div>
                  <div className={`text-[11px] mb-2 leading-tight ${deliveryModel === 'hybrid' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    We connect credentials & test pipelines
                  </div>
                  <div className={`text-xs font-mono font-bold ${deliveryModel === 'hybrid' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    ₹{Math.round(workflow.price_inr * 1.6).toLocaleString()}
                  </div>
                </div>

                {/* Model B: Managed */}
                <div
                  onClick={() => setDeliveryModel('managed')}
                  className={`p-3.5 border cursor-pointer transition-all ${
                    deliveryModel === 'managed'
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-sm'
                      : 'bg-[#f4f4f0] border-[#e4e4df] text-neutral-600 hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Server className={`w-4 h-4 ${deliveryModel === 'managed' ? 'text-white' : 'text-[#2e4ff4]'}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider font-mono">Managed Ops</span>
                  </div>
                  <div className={`text-[11px] mb-2 leading-tight ${deliveryModel === 'managed' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Full cloud hosting & SLA maintenance
                  </div>
                  <div className={`text-xs font-mono font-bold ${deliveryModel === 'managed' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    ₹{Math.round(workflow.price_inr * 2.5).toLocaleString()}/mo
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vertex Systems"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@vertex.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                  Specific Integrations or Tool Versions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g., We use Slack Enterprise and custom HubSpot deal pipelines."
                  className="w-full px-3.5 py-2 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs focus:border-[#1a1a1a] focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
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
