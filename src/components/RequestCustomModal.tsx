import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
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
      setErrorMessage('Please fill in your name, email, and process description.');
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
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      process_description: '',
      frequency: 'Daily',
      budget: '₹15,000–₹50,000',
      additional_notes: ''
    });
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
              SCOPE INTAKE RECORDED
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-[#0E0E0E]">{formData.name}</span>. Your custom architecture requirement is logged. Our lead architect will review feasibility within 24 hours.
            </p>
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
                ENGINEERING INTAKE // 24H FEASIBILITY REVIEW
              </span>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                REQUEST BESPOKE AUTOMATION
              </h3>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Describe your current manual workflow and tool stack to receive an n8n architecture proposal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3 bg-[#F6F5F3] border-l-4 border-[#0E0E0E] text-[#0E0E0E] text-xs font-bold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vanguard Agency"
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
                    placeholder="elena@vanguard.co"
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
                    placeholder="+1 415 892 3341"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                  Step-by-Step Manual Process *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.process_description}
                  onChange={e => setFormData({ ...formData, process_description: e.target.value })}
                  placeholder="Where does data originate? What tools do you open? What repetitive actions do humans take?"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Tools multi-select */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                  Connected Platforms:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_TOOLS.map(tool => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => toggleTool(tool)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#0E0E0E] text-white'
                            : 'bg-[#F6F5F3] text-[#6B6B6B] hover:text-[#0E0E0E] border border-[#CFCFCC]'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Frequency
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none cursor-pointer"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Multiple times per day">Multiple times per day</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:border-[#0E0E0E] focus:outline-none cursor-pointer"
                  >
                    <option value="₹15,000–₹50,000">₹15,000–₹50,000</option>
                    <option value="Below ₹15,000">Below ₹15,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary h-12"
                >
                  <span>{isSubmitting ? 'TRANSMITTING SCOPE...' : 'SUBMIT AUTOMATION REQUEST'}</span>
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
