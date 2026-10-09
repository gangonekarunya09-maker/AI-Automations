import React from 'react';
import { ArrowLeft, FileText, Shield, AlertCircle } from 'lucide-react';

interface TermsProps {
  onNavigate: (path: string) => void;
}

export const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#E4E3E0] min-h-screen">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24 border-b border-[#CFCFCC]">
        <div className="max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#0E0E0E] editorial-link cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#6B6B6B] block mb-2">
              LEGAL DOCUMENTATION // GOVERNANCE & USAGE
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
              TERMS AND CONDITIONS
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 leading-relaxed">
              Standard commercial terms, license scope, and operational parameters governing the use of Offlo Automations digital blueprints and consulting services.
            </p>
          </div>

          <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] rounded-xl flex items-start gap-3 text-xs text-[#6B6B6B]">
            <AlertCircle className="w-4 h-4 text-[#0E0E0E] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#0E0E0E]">Administrative Notice:</strong> This document outlines terms applicable to Offlo Automations workflows and development services. Specific corporate entity details, registration numbers, and governing jurisdiction must be confirmed and verified by company legal counsel prior to formal enterprise contracting.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content Body */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 01
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Acceptance of Terms
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              By accessing the Offlo Automations website, submitting inquiries, or purchasing workflow blueprints and custom engineering services, you agree to be bound by these Terms and Conditions. If you do not agree with any portion of these terms, you should discontinue use of the platform and our services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 02
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Description of Services & Workflow Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Offlo Automations provides digital workflow blueprints (primarily in JSON format for the n8n orchestration runtime), documentation runbooks, and bespoke automation development consulting.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>
                <strong className="text-[#0E0E0E]">Digital Blueprints:</strong> Structured configurations, JSON definitions, and integration guides designed for self-hosted or cloud-hosted automation environments.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Bespoke Engineering:</strong> Custom workflow design and implementation services scoped under individual project proposals.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Managed Operations:</strong> Optional ongoing infrastructure hosting and maintenance provided under separate service-level agreements where agreed in writing.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 03
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Intellectual Property & Commercial License
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Upon full payment for a workflow blueprint or completed custom engagement, the client receives a non-exclusive, perpetual, commercial license to execute, adapt, modify, and self-host the workflow within their organization.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              <strong className="text-[#0E0E0E]">Restrictions:</strong> You may not redistribute, resell, sub-license, or publicly publish the raw workflow JSON blueprints or documentation as a standalone digital product or competing automation catalog without prior written consent from Offlo Automations.
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 04
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Client Responsibilities & Technical Prerequisites
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              To operate automated workflows successfully, the client is responsible for:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>Maintaining valid, active accounts and credentials for third-party platforms utilized in their pipelines (e.g., Google Workspace, Slack, HubSpot, OpenAI, Apollo).</li>
              <li>Providing their own hosting infrastructure (such as Docker, VPS, or cloud instances) unless a managed service plan is explicitly contracted.</li>
              <li>Safeguarding their API keys, secrets, and database credentials.</li>
              <li>Ensuring that automated processes comply with the acceptable use policies and terms of service of all connected third-party providers.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 05
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Payments, Pricing, and Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Catalog blueprint prices are listed in Indian Rupees (INR) with approximate USD references. Custom engineering engagements require a detailed scoping proposal with milestone deliverables.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Digital blueprint deliverables consist of electronic source files and documentation. Due to the digital nature of downloadable blueprint source files, all purchases are finalized upon file transmission, subject to agreed scoping terms. Custom project refund or cancellation terms must be specified in the individual project proposal.
            </p>
          </div>

          {/* Section 6 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 06
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Limitation of Liability & Disclaimer of Warranties
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Automated workflows rely on external APIs, network connections, and third-party software beyond our direct control. While we design pipelines with industry-standard error handling and retry mechanisms:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>Workflows and services are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranties of uninterrupted operation or suitability for unverified edge cases.</li>
              <li>Offlo Automations is not liable for service outages, rate limiting, data loss, or schema breaking changes imposed by external third-party platforms (e.g., API deprecations by third-party services).</li>
              <li>To the maximum extent permitted by law, our total cumulative liability arising from any claim related to the services shall not exceed the amount actually paid by you for the specific workflow or engagement in question.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 07
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Changes to These Terms
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              We reserve the right to modify these Terms and Conditions as our service offerings evolve. Updates will be reflected on this page with an updated revision date. Continued use of our site following changes constitutes acceptance of the updated terms.
            </p>
          </div>

          {/* Section 8 */}
          <div className="p-8 bg-[#0E0E0E]/60 backdrop-blur-md text-white border border-white/10 rounded-2xl space-y-4 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block">
              SECTION 08
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              Contact & Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              For questions concerning these Terms and Conditions, licensing permissions, or custom enterprise contracting, please submit an inquiry through our contact form or email our team directly:
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <div><strong className="text-white">Email:</strong> gangonekarunya09@gmail.com</div>
              <div><strong className="text-white">Consultation:</strong> Available via the Submit Bottleneck intake form</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
