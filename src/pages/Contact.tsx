import React, { useState } from 'react';
import { Check, Send, Phone, Mail } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-14">
      <div className="max-w-2xl space-y-3">
        <div className="text-[11px] font-mono text-[#2e4ff4] uppercase tracking-[0.2em] font-semibold">
          Direct Lead Scoping
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-semibold text-[#1a1a1a] tracking-tight leading-[0.95]">
          Request An Automation
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Tell us what you or your team are doing manually. Our automation engineers will review your software stack and propose an n8n architecture within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Lead Form */}
        <div className="lg:col-span-2 p-6 sm:p-8 border border-[#e4e4df] bg-white shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-[#1a1a1a] text-white flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a]">
                Automation Requirement Logged
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#1a1a1a] font-semibold">{formData.name}</span>. Your requirement has been captured in our operations database and sent to our n8n automation pipeline.
              </p>
              <div className="p-4 bg-[#f4f4f0] border border-[#e4e4df] text-left text-xs text-neutral-700 space-y-2 max-w-md mx-auto">
                <div className="font-mono uppercase tracking-wider text-[11px] text-[#1a1a1a] font-semibold">What Happens Next:</div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-1.5 h-1.5 bg-[#2e4ff4] shrink-0"></span>
                  <span>We map your data contract and verify tool API accessibility.</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <span className="w-1.5 h-1.5 bg-[#2e4ff4] shrink-0"></span>
                  <span>We reply with a structured scope, fixed quote, and feasibility timeline.</span>
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
                  className="px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-colors cursor-pointer shadow-sm"
                >
                  Submit Another Requirement
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-mono">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Zenith Media Ltd"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@zenithmedia.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                  What do you want to automate? (Short title)
                </label>
                <input
                  type="text"
                  value={formData.automation_title}
                  onChange={e => setFormData({ ...formData, automation_title: e.target.value })}
                  placeholder="e.g. Sync WhatsApp lead messages directly to HubSpot CRM and send welcome email"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                  Current Process Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.process_description}
                  onChange={e => setFormData({ ...formData, process_description: e.target.value })}
                  placeholder="Describe what a human does right now step-by-step: Where does data originate? What tools do you open? What do you type or copy? Where does it end up?"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Tools multi-select */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-2">
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
                            ? 'bg-[#1a1a1a] text-white font-semibold shadow-sm'
                            : 'bg-white text-neutral-600 hover:text-black border border-[#e4e4df] hover:border-black'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frequency and Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Frequency of Execution
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none cursor-pointer font-mono"
                  >
                    <option value="Multiple times per day">Multiple times per day</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                    Estimated Budget Allocation
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none cursor-pointer font-mono"
                  >
                    <option value="Below ₹5,000">Below ₹5,000</option>
                    <option value="₹5,000–₹15,000">₹5,000–₹15,000</option>
                    <option value="₹15,000–₹50,000">₹15,000–₹50,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] font-semibold mb-1">
                  Additional Information (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.additional_notes}
                  onChange={e => setFormData({ ...formData, additional_notes: e.target.value })}
                  placeholder="Any specific API constraints, hosting preferences (self-hosted vs managed), or expected deadline."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e4e4df] text-[#1a1a1a] text-xs sm:text-sm focus:border-[#1a1a1a] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-white bg-[#1a1a1a] hover:bg-[#2e4ff4] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98] shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting to Automation Pipeline...' : 'Submit Automation Request'}</span>
                </button>
                <p className="text-[11px] text-neutral-500 text-center mt-2 font-mono">
                  Guaranteed confidential review · Non-disclosure compliance · 24h turnaround
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Trust & Protocol Details */}
        <div className="space-y-6">
          <div className="p-6 sm:p-7 border border-[#e4e4df] bg-[#f4f4f0] space-y-4 shadow-sm">
            <h3 className="text-xl font-serif font-semibold text-[#1a1a1a]">
              What Happens After Submission?
            </h3>
            <ul className="space-y-3.5 text-xs text-neutral-600">
              <li className="flex items-start gap-2.5">
                <span className="text-[#2e4ff4] font-mono font-bold shrink-0">01.</span>
                <span>Our lead systems architect reviews your software stack and webhook feasibility.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#2e4ff4] font-mono font-bold shrink-0">02.</span>
                <span>We draft a proposed data-flow diagram showing triggers, logic nodes, and fail-safes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#2e4ff4] font-mono font-bold shrink-0">03.</span>
                <span>You receive a fixed-price proposal with no open-ended hourly billing.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 sm:p-7 border border-[#e4e4df] bg-white space-y-3.5 text-xs text-neutral-600 shadow-sm">
            <h4 className="font-serif font-semibold text-base text-[#1a1a1a]">Direct Engineering Contact</h4>
            <div className="flex items-center gap-2 text-neutral-700">
              <Mail className="w-3.5 h-3.5 text-[#2e4ff4] shrink-0" />
              <span>ops@offlo.ai</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Phone className="w-3.5 h-3.5 text-[#2e4ff4] shrink-0" />
              <span>+91 98200 12345 (WhatsApp Available)</span>
            </div>
            <div className="pt-2 text-neutral-400 text-[11px] font-mono">
              Response SLA: Sub-2 hours on business days (IST / UTC+5:30).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
