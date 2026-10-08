import React, { useState } from 'react';
import { Check, Send, Phone, Mail, ArrowRight } from 'lucide-react';
import { Storage } from '../lib/storage';
import { dispatchWebhook } from '../lib/webhook';

interface ContactProps {
  onSuccess?: () => void;
}

const COMMON_TOOLS = [
  'Gmail', 'Google Sheets', 'Excel', 'WhatsApp', 'HubSpot / CRM',
  'Slack', 'Shopify', 'Airtable', 'Notion', 'QuickBooks / Tally',
  'PostgreSQL', 'Google Drive', 'Zendesk', 'Stripe'
];

export const Contact: React.FC<ContactProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    automation_title: '',
    process_description: '',
    frequency: 'Daily',
    budget: '₹15,000–₹50,000',
    additional_notes: ''
  });

  const [selectedTools, setSelectedTools] = useState<string[]>(['Gmail', 'Google Sheets']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleTool = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.process_description) {
      setErrorMessage('Please fill in your name, email, and description of your process.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // 1. Add Custom Request
      const customReq = Storage.addCustomRequest({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        process_description: `${formData.automation_title ? `[${formData.automation_title}] ` : ''}${formData.process_description}`,
        tools_used: selectedTools,
        frequency: formData.frequency,
        budget: formData.budget,
        additional_notes: formData.additional_notes,
        status: 'New'
      });

      // 2. Add Lead record for sales pipeline
      Storage.addLead({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.process_description,
        automation_type: formData.automation_title || 'Custom Automation Request',
        budget: formData.budget,
        status: 'New',
        source: 'contact_form'
      });

      // 3. Dispatch Webhook to n8n
      await dispatchWebhook('custom_request_created', {
        request_id: customReq.id,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        automation_title: formData.automation_title,
        process_description: formData.process_description,
        tools_used: selectedTools,
        frequency: formData.frequency,
        budget: formData.budget,
        additional_notes: formData.additional_notes
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch {
      setErrorMessage('Something went wrong recording your request. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 border-b border-[#CFCFCC]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
            CONSULTATION & SCOPING // 24-HOUR TURNAROUND
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
            SUBMIT BOTTLENECK
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 max-w-xl leading-relaxed">
            Outline the repetitive tasks your team performs manually. Our automation architects will evaluate your stack and deliver a proposed data contract with feasibility metrics.
          </p>
        </div>
      </section>

      {/* Form & Sidebar Area */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#E4E3E0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-8 p-8 sm:p-12 bg-white border border-[#CFCFCC]">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#0E0E0E] text-white flex items-center justify-center mx-auto mb-2">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                  REQUIREMENT LOGGED
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#0E0E0E] font-bold">{formData.name}</span>. Your operational requirements have been securely recorded and dispatched to our architecture pipeline.
                </p>
                <div className="p-5 bg-[#F6F5F3] border border-[#CFCFCC] text-left text-xs text-[#0E0E0E] space-y-2.5 max-w-md mx-auto">
                  <div className="uppercase tracking-[0.16em] text-[10px] font-bold text-[#0E0E0E]">Next Steps:</div>
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <span className="w-1.5 h-1.5 bg-[#0E0E0E] shrink-0"></span>
                    <span>Systems team maps data contracts & tool API endpoints.</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6B6B]">
                    <span className="w-1.5 h-1.5 bg-[#0E0E0E] shrink-0"></span>
                    <span>You receive fixed scope, architecture diagram, and timeline.</span>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        automation_title: '',
                        process_description: '',
                        frequency: 'Daily',
                        budget: '₹15,000–₹50,000',
                        additional_notes: ''
                      });
                    }}
                    className="btn-primary"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-[#F6F5F3] border-l-4 border-[#0E0E0E] text-[#0E0E0E] text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Zenith Media Ltd"
                      className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@zenithmedia.com"
                      className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                    Automation Objective / Working Title
                  </label>
                  <input
                    type="text"
                    value={formData.automation_title}
                    onChange={e => setFormData({ ...formData, automation_title: e.target.value })}
                    placeholder="e.g. WhatsApp Inbound Lead Sync to HubSpot & AI Email Dispatch"
                    className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                    Current Process Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.process_description}
                    onChange={e => setFormData({ ...formData, process_description: e.target.value })}
                    placeholder="Describe what a human does right now step-by-step: Where does data originate? What tools do you open? What do you type or copy? Where does it end up?"
                    className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Tools multi-select */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                    Tools & Platforms Currently In Use:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_TOOLS.map(tool => {
                      const isSelected = selectedTools.includes(tool);
                      return (
                        <button
                          type="button"
                          key={tool}
                          onClick={() => toggleTool(tool)}
                          className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
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

                {/* Frequency and Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                      Frequency of Execution
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] focus:border-[#0E0E0E] focus:outline-none cursor-pointer"
                    >
                      <option value="Multiple times per day">Multiple times per day</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                      Estimated Budget Allocation
                    </label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] focus:border-[#0E0E0E] focus:outline-none cursor-pointer"
                    >
                      <option value="Below ₹5,000">Below ₹5,000</option>
                      <option value="₹5,000–₹15,000">₹5,000–₹15,000</option>
                      <option value="₹15,000–₹50,000">₹15,000–₹50,000</option>
                      <option value="₹50,000+">₹50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additional_notes}
                    onChange={e => setFormData({ ...formData, additional_notes: e.target.value })}
                    placeholder="API constraints, hosting preferences (self-hosted vs managed), or expected launch date."
                    className="w-full px-4 py-3 bg-white border border-[#CFCFCC] text-xs text-[#0E0E0E] placeholder-[#6B6B6B] focus:border-[#0E0E0E] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>{isSubmitting ? 'TRANSMITTING TO PIPELINE...' : 'SUBMIT AUTOMATION REQUEST'}</span>
                  </button>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B] text-center mt-3 font-semibold">
                    Confidential audit · Non-disclosure protection · 24h turnaround
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-white border border-[#CFCFCC] space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
                WHAT TO EXPECT
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0E0E]">
                EVALUATION PROTOCOL
              </h3>
              <ul className="space-y-4 text-xs text-[#6B6B6B] pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#0E0E0E] shrink-0 font-mono">01.</span>
                  <span>Systems architect audits tool API accessibility and authentication models.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#0E0E0E] shrink-0 font-mono">02.</span>
                  <span>We map a structured execution graph showing nodes, error traps, and fallbacks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#0E0E0E] shrink-0 font-mono">03.</span>
                  <span>You receive a fixed milestone proposal with zero surprise hourly overages.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-[#0E0E0E] text-white border border-[#0E0E0E] space-y-4 text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block">
                DIRECT INTAKE
              </span>
              <h4 className="text-base font-bold uppercase tracking-tight text-white">Operations Desk</h4>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span>ops@offlo.ai</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>+91 98200 12345 (WhatsApp Desk)</span>
              </div>
              <div className="pt-3 border-t border-white/15 text-[10px] uppercase tracking-wider text-neutral-400">
                Response SLA: Sub-2 hours on business days
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
