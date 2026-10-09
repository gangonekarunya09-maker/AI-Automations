import React from 'react';
import { ArrowLeft, Shield, AlertCircle, Database, Lock, Eye } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (path: string) => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
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
              DATA PRIVACY & TRANSPARENCY // PRACTICES SPECIFICATION
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#0E0E0E] leading-none">
              PRIVACY POLICY
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-4 leading-relaxed">
              This Privacy Policy explains how Offlo Automations collects, stores, processes, and protects information submitted by visitors and clients through this web application.
            </p>
          </div>

          <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] rounded-xl flex items-start gap-3 text-xs text-[#6B6B6B]">
            <AlertCircle className="w-4 h-4 text-[#0E0E0E] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#0E0E0E]">Compliance Notice for Business Owner:</strong> This policy reflects the concrete data practices and technical implementations of this website. Prior to formal publication in strictly regulated jurisdictions (e.g., EU GDPR, California CCPA/CPRA, India DPDP Act), business entity details and designated data protection officers should be verified with your legal counsel.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content Body */}
      <section className="w-full px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 01
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Scope and Overview
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Offlo Automations (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this website to provide technical workflow blueprints, demonstration environments, and engineering consultation. This policy applies to personal data collected when you interact with our website, request custom automation architectures, or submit inquiries.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 02
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Information We Collect
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              We collect information that you voluntarily provide to us when using our interactive forms:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>
                <strong className="text-[#0E0E0E]">Contact Identification:</strong> Full name, professional email address, phone number (optional), and company name.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Operational Requirements:</strong> Descriptions of your internal business bottlenecks, tools utilized (e.g., Gmail, Slack, HubSpot), process frequencies, estimated budget ranges, and project timeline specifications.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Workflow Acquisition Requests:</strong> Selected delivery model preferences (e.g., raw JSON files, managed setup, or hybrid deployment) and implementation notes.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Administrative Credentials:</strong> If accessing the administrative dashboard, password hashes or session tokens stored within browser session storage.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 03
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              How Information Is Collected & Processed
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Information is collected directly through:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>The <strong className="text-[#0E0E0E]">Submit Bottleneck / Contact Form</strong> on the website.</li>
              <li>The <strong className="text-[#0E0E0E]">Request Custom Architecture Modal</strong> dialog.</li>
              <li>The <strong className="text-[#0E0E0E]">Get Workflow Modal</strong> when ordering or inquiring about specific blueprints.</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed pt-2">
              We use this information exclusively to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside">
              <li>Evaluate the feasibility of your automation requirements and calculate architectural scope.</li>
              <li>Contact you with proposed milestone deliverables, technical runbooks, and quotes.</li>
              <li>Provide customer support, pipeline debugging, and technical onboarding assistance.</li>
              <li>Maintain operational logs of inbound inquiries for our internal administrative pipeline.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 04
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Cookies & Local Storage Technologies
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              <strong className="text-[#0E0E0E]">No Advertising Trackers:</strong> This website does not deploy third-party advertising cookies, cross-site behavioral tracking scripts, or data-broker pixels.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              <strong className="text-[#0E0E0E]">Client-Side Storage:</strong> The application uses browser <code className="bg-[#F6F5F3] px-1 py-0.5 rounded text-[#0E0E0E]">localStorage</code> and <code className="bg-[#F6F5F3] px-1 py-0.5 rounded text-[#0E0E0E]">sessionStorage</code> strictly to:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside">
              <li>Persist workflow catalog data and user submissions locally on your device.</li>
              <li>Maintain administrative authentication state during active browser sessions.</li>
              <li>Store user preferences and configuration settings.</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed pt-1">
              You can clear these records at any time through your browser settings by clearing site data.
            </p>
          </div>

          {/* Section 5 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 05
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Third-Party Services & Data Sharing
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              We do not sell, rent, or trade your personal information. Data transmission is limited to the functional infrastructure required to process your request:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>
                <strong className="text-[#0E0E0E]">Webhook Integrations (n8n):</strong> When you submit a request, payload notifications may be dispatched via HTTPS webhooks to an n8n automation runtime configured by the administrator.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Cloud Database (Supabase):</strong> If enabled in the admin configuration, records may sync to a secure Supabase PostgreSQL database instance configured for persistence.
              </li>
              <li>
                <strong className="text-[#0E0E0E]">Hosting Infrastructure:</strong> The website is served via Google Cloud Run and related infrastructure providers that process web requests in accordance with standard internet routing protocols.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 06
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Data Security Practices
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              We implement reasonable organizational and technical safeguards appropriate to the sensitivity of data handled, including:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>Enforcing HTTPS transport layer security for web sessions and outbound webhook transmissions.</li>
              <li>Supporting HMAC SHA-256 secret verification for administrative webhook dispatches.</li>
              <li>Restricting administrative portal access with password-gated authentication.</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed pt-2">
              Please note that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </div>

          {/* Section 7 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 07
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Data Retention & Your Privacy Rights
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              We retain inquiry records for as long as necessary to fulfill the business purposes outlined in this policy or to comply with applicable legal obligations.
            </p>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Depending on your location, you may have rights under applicable privacy legislation, including:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#6B6B6B] list-disc list-inside pt-2">
              <li>Requesting confirmation of whether we hold personal information about you.</li>
              <li>Requesting access to or a copy of your submitted information.</li>
              <li>Requesting correction of inaccurate or incomplete contact records.</li>
              <li>Requesting deletion of your personal data from our intake pipeline.</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed pt-1">
              To exercise any of these rights, contact our operations desk using the contact details below.
            </p>
          </div>

          {/* Section 8 */}
          <div className="p-8 bg-white border border-[#CFCFCC] rounded-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              SECTION 08
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0E0E]">
              Children&apos;s Privacy
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Our website and automation services are directed exclusively at business professionals and organizations. We do not knowingly solicit or collect personal information from individuals under the age of 18.
            </p>
          </div>

          {/* Section 9 */}
          <div className="p-8 bg-[#0E0E0E]/60 backdrop-blur-md text-white border border-white/10 rounded-2xl space-y-4 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block">
              SECTION 09
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              Contact Us Regarding Privacy
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              If you have questions, concerns, or requests concerning this Privacy Policy or our data handling practices, please contact our team:
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <div><strong className="text-white">Email:</strong> gangonekarunya09@gmail.com</div>
              <div><strong className="text-white">Organization:</strong> Offlo Automations</div>
              <div><strong className="text-white">Inquiries:</strong> Available via the Submit Bottleneck intake form</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
