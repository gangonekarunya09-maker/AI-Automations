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
      setErrorMessage('Please fill in your name, company, and email.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
      <div className="relative w-full max-w-2xl bg-white border border-[#0E0E0E] p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-1 text-[#0E0E0E] hover:opacity-70 transition-opacity cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-14 h-14 bg-[#0E0E0E] text-white flex items-center justify-center mx-auto mb-2">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
              INQUIRY RECORDED
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-[#0E0E0E]">{formData.name}</span>. We have generated order record <span className="font-bold text-[#0E0E0E]">#{workflow.id.toUpperCase()}</span> and notified our operations team.
            </p>
            <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-left text-xs text-[#0E0E0E] space-y-2 max-w-md mx-auto">
              <div className="font-bold uppercase tracking-[0.16em] text-[10px]">What Happens Next:</div>
              <div className="text-[#6B6B6B]">1. You receive the complete deployment manifest and pre-flight checklist.</div>
              <div className="text-[#6B6B6B]">2. We issue an invoice with instant payment link and coordinate installation.</div>
            </div>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="btn-primary"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
                ACQUISITION INQUIRY // {workflow.id.toUpperCase()}
              </span>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                {workflow.name}
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Select your preferred delivery tier and submit your organization details.
              </p>
            </div>

            {/* Delivery Model Selection */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                Choose Delivery Tier:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Model A */}
                <div
                  onClick={() => setDeliveryModel('workflow_json')}
                  className={`p-4 border cursor-pointer transition-colors ${
                    deliveryModel === 'workflow_json'
                      ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                      : 'bg-[#F6F5F3] text-[#0E0E0E] border-[#CFCFCC] hover:border-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileCode className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Workflow JSON</span>
                  </div>
                  <div className={`text-[10px] mb-3 leading-tight ${deliveryModel === 'workflow_json' ? 'text-neutral-400' : 'text-[#6B6B6B]'}`}>
                    Self-hosted n8n template + runbook
                  </div>
                  <div className="text-xs font-bold tracking-tight">
                    ₹{workflow.price_inr.toLocaleString()}
                  </div>
                </div>

                {/* Model C: Hybrid */}
                <div
                  onClick={() => setDeliveryModel('hybrid')}
                  className={`p-4 border cursor-pointer transition-colors ${
                    deliveryModel === 'hybrid'
                      ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                      : 'bg-[#F6F5F3] text-[#0E0E0E] border-[#CFCFCC] hover:border-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Settings2 className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Workflow + Setup</span>
                  </div>
                  <div className={`text-[10px] mb-3 leading-tight ${deliveryModel === 'hybrid' ? 'text-neutral-400' : 'text-[#6B6B6B]'}`}>
                    We connect credentials & test pipelines
                  </div>
                  <div className="text-xs font-bold tracking-tight">
                    ₹{Math.round(workflow.price_inr * 1.6).toLocaleString()}
                  </div>
                </div>

                {/* Model B: Managed */}
                <div
                  onClick={() => setDeliveryModel('managed')}
                  className={`p-4 border cursor-pointer transition-colors ${
                    deliveryModel === 'managed'
                      ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                      : 'bg-[#F6F5F3] text-[#0E0E0E] border-[#CFCFCC] hover:border-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Server className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Managed Ops</span>
                  </div>
                  <div className={`text-[10px] mb-3 leading-tight ${deliveryModel === 'managed' ? 'text-neutral-400' : 'text-[#6B6B6B]'}`}>
                    Full hosting & SLA maintenance
                  </div>
                  <div className="text-xs font-bold tracking-tight">
                    ₹{Math.round(workflow.price_inr * 2.5).toLocaleString()}/mo
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {errorMessage && (
                <div className="p-3 bg-[#F6F5F3] border-l-4 border-[#0E0E0E] text-[#0E0E0E] text-xs font-bold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Logistics"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@apexlogistics.in"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98201 44521"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                  Specific Requirements or Target Tool APIs (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. We use self-hosted PostgreSQL and custom webhook endpoints."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary h-12"
                >
                  <span>{isSubmitting ? 'RECORDING INQUIRY...' : 'SUBMIT WORKFLOW ACQUISITION INQUIRY'}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
