import { Workflow, Lead, CustomRequest, Order, AppSettings, WebhookLog } from '../types';

// Pre-seeded high-impact workflows
export const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    name: 'AI Meeting Summarizer & Action Dispatcher',
    slug: 'ai-meeting-summarizer',
    category: 'Operations',
    short_description: 'Converts recorded meetings into structured transcripts, executive summaries, decisions, and assigned Jira/Slack tasks automatically.',
    long_description: 'Eliminates 4+ hours of manual note-taking every week. When a Zoom, Google Meet, or Teams audio recording is uploaded to Google Drive or Dropbox, this workflow triggers an automated pipeline that transcribes via Whisper, extracts strategic action items using Gemini/GPT, and dispatches formatted briefs to Slack channels and attendee inboxes.',
    benefit: 'Saves 35 minutes per meeting and ensures zero dropped action items.',
    price_inr: 4999,
    price_usd: 69,
    original_price_inr: 8999,
    technologies: ['n8n', 'OpenAI Whisper', 'Gemini 1.5 Pro', 'Google Drive', 'Slack API', 'Gmail API'],
    features: [
      'Automatic cloud folder monitoring for audio/video files (mp3, m4a, mp4)',
      'High-accuracy multi-speaker transcription with timestamping',
      'AI-powered extraction of key decisions, blockers, and assigned deliverables',
      'Personalized attendee follow-up emails generated and pre-staged',
      'Instant markdown digest posted to designated Slack or Discord channels',
      'Full n8n workflow JSON with credentials configuration guide'
    ],
    architecture_steps: [
      { step: 1, title: 'Audio Upload Trigger', tool: 'Google Drive / Dropbox', description: 'Watches designated shared folder for new audio/video recordings.' },
      { step: 2, title: 'Chunking & Transcription', tool: 'OpenAI Whisper API', description: 'Splits large audio files into streaming chunks and transcribes verbatim.' },
      { step: 3, title: 'Semantic Extraction', tool: 'Gemini 1.5 Pro', description: 'Extracts agenda context, attendee commitments, deadlines, and executive recap.' },
      { step: 4, title: 'Multi-Channel Dispatch', tool: 'Slack & Gmail', description: 'Posts formatted summary to project channel and sends action lists to participants.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg',
    status: 'published',
    featured: true,
    downloads_count: 142,
    created_at: '2026-03-01T10:00:00Z'
  },
  {
    id: 'wf-2',
    name: 'Autonomous Inbound Lead Qualifier & CRM Enrichment',
    slug: 'lead-qualification-automation',
    category: 'Sales',
    short_description: 'Instantly enriches website form submissions with company intelligence, scores intent via AI, and notifies your sales team on Slack within 45 seconds.',
    long_description: 'Slow response times kill deals. This pipeline intercepts incoming website inquiries, enriches the lead company domain with revenue, employee headcount, and tech stack data via Clearbit/Apollo APIs, prompts an LLM to assign an ICP score (A/B/C/D), logs the enriched lead in HubSpot or Salesforce, and pings your account executive on Slack with a one-click calendar booking link.',
    benefit: 'Reduces lead response latency from 6 hours to under 45 seconds.',
    price_inr: 6999,
    price_usd: 89,
    original_price_inr: 11999,
    technologies: ['n8n', 'Apollo / Clearbit API', 'Gemini 1.5 Flash', 'HubSpot CRM', 'Slack', 'WhatsApp Webhook'],
    features: [
      'Webhook listener compatible with Webflow, WordPress, Typeform, or custom forms',
      'Real-time domain & LinkedIn profile firmographic data enrichment',
      'AI intent classification based on message urgency and business fit',
      'Bi-directional synchronization with HubSpot, Pipedrive, or Salesforce',
      'High-priority lead escalation alerts sent directly to WhatsApp or Slack',
      'Automated custom personalized introductory email sent to the prospect'
    ],
    architecture_steps: [
      { step: 1, title: 'Form Ingestion Webhook', tool: 'Website / Typeform', description: 'Receives customer name, work email, and initial project inquiry.' },
      { step: 2, title: 'Firmographic Enrichment', tool: 'Apollo / Clearbit API', description: 'Fetches company size, industry, revenue bracket, and location.' },
      { step: 3, title: 'AI Scoring Engine', tool: 'Gemini 1.5 Flash', description: 'Evaluates inquiry against your Ideal Customer Profile (ICP) rubric.' },
      { step: 4, title: 'CRM Sync & Rep Alert', tool: 'HubSpot & Slack', description: 'Creates deal record and notifies sales rep with pre-written outreach draft.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/operations_command_center_1791448327737.jpg',
    status: 'published',
    featured: true,
    downloads_count: 218,
    created_at: '2026-03-05T12:00:00Z'
  },
  {
    id: 'wf-3',
    name: 'Intelligent PDF Invoice & Expense Reconciliation Pipeline',
    slug: 'document-processing-automation',
    category: 'AI & Documents',
    short_description: 'Extracts line items, vendor details, tax amounts, and payment terms from unstructured supplier invoices directly into Google Sheets and accounting software.',
    long_description: 'Stop manually typing numbers from scanned PDFs and email attachments. This workflow connects to your AP email inbox, extracts invoice attachments, runs multi-modal vision parsing with Gemini Vision / OCR, validates math totals against line items, logs clean rows into your financial spreadsheet, and stages bills for approval.',
    benefit: 'Cuts invoice data entry time by 90% while preventing duplicate payments.',
    price_inr: 5999,
    price_usd: 79,
    original_price_inr: 9999,
    technologies: ['n8n', 'Gemini 1.5 Pro Vision', 'Gmail IMAP', 'Google Sheets API', 'QuickBooks / Xero API'],
    features: [
      'Automated email filtering for invoices, purchase orders, and receipts',
      'Multi-modal LLM parser handles non-standard, multilingual, and scanned receipts',
      'Automated validation checks: subtotal + tax = total verification',
      'Deduplication check against existing vendor reference numbers',
      'Formatted export to Google Sheets, Notion database, or QuickBooks',
      'Approval notification with PDF preview link sent to finance manager'
    ],
    architecture_steps: [
      { step: 1, title: 'Email Attachment Fetcher', tool: 'Gmail / Outlook IMAP', description: 'Polls incoming inbox for vendor invoices and extracts PDF/image attachments.' },
      { step: 2, title: 'Visual Data Extraction', tool: 'Gemini 1.5 Pro Vision', description: 'Converts unstructured documents into structured JSON line items and tax totals.' },
      { step: 3, title: 'Validation & Math Check', tool: 'n8n Code Node', description: 'Verifies totals match subcomponents and checks for duplicate invoice IDs.' },
      { step: 4, title: 'Ledger Synchronization', tool: 'Google Sheets / QuickBooks', description: 'Appends clean records and archives PDF to structured Google Drive folder.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg',
    status: 'published',
    featured: true,
    downloads_count: 184,
    created_at: '2026-03-08T09:00:00Z'
  },
  {
    id: 'wf-4',
    name: 'Multi-Channel Autonomous Customer Support Resolver',
    slug: 'customer-support-automation',
    category: 'Customer Support',
    short_description: 'AI agent grounded in your company knowledge base that drafts or replies to tier-1 tickets across Zendesk, WhatsApp, and email with human escalation safeguards.',
    long_description: 'Delivers instant 24/7 resolution for common customer questions without hallucinating. The system indexes your documentation, Notion docs, FAQs, and refund policies in a vector store. When a ticket arrives, it retrieves exact reference policies, drafts a contextual response, and either resolves automatically or prompts your human agent with a ready-to-send answer.',
    benefit: 'Resolves 62% of tier-1 support tickets autonomously with sub-2-minute SLA.',
    price_inr: 7999,
    price_usd: 99,
    original_price_inr: 14999,
    technologies: ['n8n', 'Pinecone / Vector DB', 'Gemini 1.5 Flash', 'Zendesk API', 'WhatsApp Cloud API', 'Email'],
    features: [
      'RAG pipeline connected to your internal documentation or Notion knowledge base',
      'Strict guardrails: answers only with verified documentation citations',
      'Sentiment analysis that instantly escalates dissatisfied or VIP clients to humans',
      'Support for email, Zendesk, Freshdesk, Intercom, and WhatsApp Business',
      'Configurable mode: full auto-send or human-in-the-loop review queue',
      'Weekly ticket analytics summary showing top recurring customer pain points'
    ],
    architecture_steps: [
      { step: 1, title: 'Ticket Arrival Trigger', tool: 'Zendesk / WhatsApp / Email', description: 'Detects customer inquiry and categorizes urgency and sentiment.' },
      { step: 2, title: 'Knowledge Base Retrieval', tool: 'Vector DB (Pinecone)', description: 'Retrieves relevant product documentation, warranty guidelines, or FAQs.' },
      { step: 3, title: 'Grounded Answer Generation', tool: 'Gemini 1.5 Flash', description: 'Synthesizes empathetic, brand-aligned response with policy citations.' },
      { step: 4, title: 'Dispatch or Human Review', tool: 'Support Desk Platform', description: 'Replies directly or stages draft in agent queue if sentiment is frustrated.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/hero_automation_studio_1791448255075.jpg',
    status: 'published',
    featured: true,
    downloads_count: 165,
    created_at: '2026-03-11T14:30:00Z'
  },
  {
    id: 'wf-5',
    name: 'Automated Multi-Touch Cold Email & Lead Follow-up Engine',
    slug: 'email-follow-up-automation',
    category: 'Marketing',
    short_description: 'Monitors reply signals, stops follow-up sequences instantly upon response, and automatically drafts bespoke answers based on prospect objections.',
    long_description: 'Never let another warm lead go cold. This automation synchronizes outreach tools with your central CRM. It tracks open and reply webhooks, disables automated drips immediately when a prospect writes back, analyzes their tone (objection, interested, not now), and generates a personalized reply draft for your sales representative.',
    benefit: 'Eliminates embarrassing double-emails while increasing reply conversion by 28%.',
    price_inr: 4999,
    price_usd: 69,
    original_price_inr: 8499,
    technologies: ['n8n', 'Smartlead / Instantly', 'Gemini 1.5 Flash', 'Google Sheets', 'Slack Webhook'],
    features: [
      'Webhook listener for email opens, clicks, replies, and unsubscribes',
      'AI objection classification (price too high, bad timing, send info, competitor)',
      'Automated reply sequencing paused instantly on prospect interaction',
      'Pre-written objection counter-arguments generated and sent to Slack',
      'Master prospect health dashboard synced directly to Google Sheets or Airtable'
    ],
    architecture_steps: [
      { step: 1, title: 'Outreach Reply Webhook', tool: 'Instantly / Smartlead API', description: 'Triggers immediately when an outreach recipient responds.' },
      { step: 2, title: 'Sequence Freeze', tool: 'n8n Logic Node', description: 'Instantly cancels upcoming scheduled automated drip messages.' },
      { step: 3, title: 'Intent & Objection Analysis', tool: 'Gemini 1.5 Flash', description: 'Classifies response into Positive Booking, Price Objection, or Gatekeeper.' },
      { step: 4, title: 'Rep Playbook Notification', tool: 'Slack & CRM', description: 'Alerts sales rep with suggested rebuttal and one-click calendar invitation.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/operations_command_center_1791448327737.jpg',
    status: 'published',
    featured: false,
    downloads_count: 94,
    created_at: '2026-03-14T08:15:00Z'
  },
  {
    id: 'wf-6',
    name: 'E-Commerce Real-time Multi-Warehouse Inventory & Order Sync',
    slug: 'ecommerce-inventory-sync',
    category: 'E-Commerce',
    short_description: 'Syncs stock levels between Shopify, WooCommerce, Amazon, and ERP databases in real-time, preventing overselling and dead-inventory write-offs.',
    long_description: 'Built for multi-channel brands. When an order takes place on Shopify or WooCommerce, this workflow decrements available stock across all connected storefronts and logistics fulfillment partners within 3 seconds, sends low-stock warnings to procurement, and generates unified end-of-day sales tallies.',
    benefit: 'Prevents costly out-of-stock cancellations and eliminates manual inventory reconciliation.',
    price_inr: 6499,
    price_usd: 85,
    original_price_inr: 10999,
    technologies: ['n8n', 'Shopify GraphQL API', 'WooCommerce API', 'PostgreSQL', 'Slack', 'Email'],
    features: [
      'Bidirectional stock synchronization across multiple storefronts',
      'Automated low-inventory threshold triggers with vendor re-order suggestions',
      'Unified order consolidation ledger in Google Sheets or PostgreSQL',
      'Real-time customer shipment tracking notifications dispatched via WhatsApp/SMS'
    ],
    architecture_steps: [
      { step: 1, title: 'Order Webhook Trigger', tool: 'Shopify / WooCommerce', description: 'Fires instantly upon new customer order confirmation.' },
      { step: 2, title: 'Stock Ledger Adjustment', tool: 'n8n & Central Database', description: 'Calculates remaining SKU quantities across warehouse allocations.' },
      { step: 3, title: 'Multi-Channel Update', tool: 'Connected Storefront APIs', description: 'Pushes adjusted inventory counts to all secondary sales channels.' },
      { step: 4, title: 'Reorder Threshold Alert', tool: 'Slack / Procurement Email', description: 'Fires restock notification if quantity dips below safety buffers.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg',
    status: 'published',
    featured: false,
    downloads_count: 112,
    created_at: '2026-03-18T16:00:00Z'
  },
  {
    id: 'wf-7',
    name: 'Social Trend Radar & Autonomous Content Draft Engine',
    slug: 'social-content-automation',
    category: 'Marketing',
    short_description: 'Monitors industry subreddits, trending keywords, and top competitors to draft daily LinkedIn and Twitter thought-leadership drafts in Notion.',
    long_description: 'Automates organic social media research. Runs scheduled crawlers on relevant industry topics, filters high-engagement discussions, prompts an LLM with your brand voice guidelines to generate 3 post angles (story, framework, contrarian insight), and arranges drafts in a Notion approval board with image prompts.',
    benefit: 'Generates 15 weekly content drafts in your brand voice with zero writer block.',
    price_inr: 4499,
    price_usd: 59,
    original_price_inr: 7999,
    technologies: ['n8n', 'Reddit API', 'Perplexity / News APIs', 'Gemini 1.5 Pro', 'Notion API'],
    features: [
      'Daily automated scraping of high-performing industry discussions and news',
      'AI synthesis into structured takeaways, quotes, and contrarian perspectives',
      'Generates 3 hook variations and ready-to-publish drafts per topic',
      'Organizes drafts in a clean Notion calendar database ready for 1-click approval'
    ],
    architecture_steps: [
      { step: 1, title: 'Scheduled Cron Ingestion', tool: 'n8n Cron Scheduler', description: 'Triggers daily at 7:00 AM to fetch trending discussions.' },
      { step: 2, title: 'Data Cleaning & Filter', tool: 'n8n Filter Node', description: 'Removes spam and ranks topics by comment velocity and upvote ratios.' },
      { step: 3, title: 'Brand Tone Generation', tool: 'Gemini 1.5 Pro', description: 'Applies your company style guide to craft LinkedIn & Twitter drafts.' },
      { step: 4, title: 'Notion Board Export', tool: 'Notion API', description: 'Publishes cards to "Needs Review" column with hook score and tags.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/hero_automation_studio_1791448255075.jpg',
    status: 'published',
    featured: false,
    downloads_count: 88,
    created_at: '2026-03-22T11:00:00Z'
  },
  {
    id: 'wf-8',
    name: 'Weekly Executive KPI & Financial Health Digest Agent',
    slug: 'executive-reporting-agent',
    category: 'Operations',
    short_description: 'Pulls data from Stripe, Google Analytics 4, CRM, and ad platforms every Monday morning to generate an executive performance brief with AI analysis.',
    long_description: 'Say goodbye to spending Monday mornings taking screenshots and compiling spreadsheets. This workflow connects to Stripe revenue metrics, Google Analytics traffic, ad spend, and CRM pipeline numbers, computes week-over-week deltas, asks Gemini to generate an executive analysis highlighting wins and risks, and emails a crisp PDF digest to leadership.',
    benefit: 'Delivers executive financial clarity in your inbox at 8:00 AM every Monday.',
    price_inr: 5499,
    price_usd: 75,
    original_price_inr: 9499,
    technologies: ['n8n', 'Stripe API', 'Google Analytics 4', 'Meta Ads API', 'Gemini 1.5 Flash', 'SendGrid'],
    features: [
      'Automated extraction of MRR, net churn, CAC, ROAS, and conversion metrics',
      'Week-over-week comparison engine with delta highlights and trend alerts',
      'AI-authored executive commentary highlighting risks, outliers, and opportunities',
      'Formatted executive email digest and downloadable PDF report'
    ],
    architecture_steps: [
      { step: 1, title: 'Monday Morning Cron', tool: 'n8n Trigger', description: 'Initiates every Monday morning before leadership meetings.' },
      { step: 2, title: 'Multi-Source Aggregation', tool: 'Stripe, GA4, Meta Ads APIs', description: 'Pulls revenue figures, visitor traffic, ad spend, and closed deals.' },
      { step: 3, title: 'Metric Calculation & AI Insight', tool: 'Gemini 1.5 Flash', description: 'Computes variance percentages and writes concise executive analysis.' },
      { step: 4, title: 'Executive Email Delivery', tool: 'SendGrid / Gmail API', description: 'Sends structured HTML report to founders, board, and department leads.' }
    ],
    delivery_models: ['workflow_json', 'managed', 'hybrid'],
    image: '/src/assets/images/operations_command_center_1791448327737.jpg',
    status: 'published',
    featured: true,
    downloads_count: 176,
    created_at: '2026-03-25T07:30:00Z'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Aarav Mehta',
    company: 'Apex Logistics Ltd',
    email: 'aarav@apexlogistics.in',
    phone: '+91 98201 44521',
    message: 'We receive 80+ driver delivery notes and fuel receipts per day that are manually keyed into Tally. We need an automated OCR and validation workflow.',
    automation_type: 'Document & OCR Automation',
    budget: '₹25,000–₹50,000',
    status: 'Proposal',
    notes: 'Sent initial workflow diagram and architecture scope. Meeting scheduled for Friday.',
    source: 'custom_request',
    created_at: '2026-03-28T09:15:00Z'
  },
  {
    id: 'lead-2',
    name: 'Elena Rostova',
    company: 'Vanguard Growth Agency',
    email: 'elena@vanguardgrowth.co',
    phone: '+1 415 892 3341',
    message: 'Interested in the AI Meeting Summarizer workflow. We use Google Meet and Slack. Can we customize the prompt for client account reviews?',
    automation_type: 'Meeting & Productivity Automation',
    budget: '₹5,000–₹15,000',
    status: 'Qualified',
    notes: 'Provided sample prompt configuration. Client wants managed installation.',
    source: 'workflow_inquiry',
    workflow_slug: 'ai-meeting-summarizer',
    created_at: '2026-04-01T14:20:00Z'
  },
  {
    id: 'lead-3',
    name: 'Karthik Raman',
    company: 'Nova Dental Group',
    email: 'karthik@novadental.com',
    phone: '+91 99400 12890',
    message: 'We need WhatsApp appointment reminders and automatic rescheduling synchronized with our Google Calendar and CRM.',
    automation_type: 'Customer Support & WhatsApp',
    budget: '₹15,000–₹50,000',
    status: 'New',
    notes: 'Needs WhatsApp Cloud API business verification assistance.',
    source: 'contact_form',
    created_at: '2026-04-03T11:45:00Z'
  },
  {
    id: 'lead-4',
    name: 'Sarah Jenkins',
    company: 'Lumina Home Decor',
    email: 'sarah@luminadecor.com',
    phone: '+44 20 7946 0912',
    message: 'Looking for multi-store inventory sync between Shopify and our UK warehouse 3PL.',
    automation_type: 'E-Commerce Automation',
    budget: '₹50,000+',
    status: 'Contacted',
    notes: 'Scheduled initial technical discovery call for next Tuesday.',
    source: 'custom_request',
    created_at: '2026-04-05T16:10:00Z'
  }
];

export const INITIAL_CUSTOM_REQUESTS: CustomRequest[] = [
  {
    id: 'req-1',
    name: 'Aarav Mehta',
    company: 'Apex Logistics Ltd',
    email: 'aarav@apexlogistics.in',
    phone: '+91 98201 44521',
    process_description: 'Drivers take photos of delivery POD slips on WhatsApp. Back-office team downloads them, manually types consignee name, date, invoice number into Excel, then uploads to ERP.',
    tools_used: ['WhatsApp', 'Excel', 'Google Drive', 'Tally ERP'],
    frequency: 'Multiple times per day',
    budget: '₹25,000–₹50,000',
    additional_notes: 'Slips are sometimes crumpled or handwritten. Need fallback alert for low-confidence reads.',
    status: 'Proposal',
    created_at: '2026-03-28T09:15:00Z'
  },
  {
    id: 'req-2',
    name: 'Vikram Singhania',
    company: 'Singhania Legal Associates',
    email: 'vikram@singhanialaw.in',
    phone: '+91 98110 99451',
    process_description: 'Case hearing listings from High Court websites are released daily at 6 PM. Associates spend 2 hours searching for firm case numbers across 50-page PDF listings.',
    tools_used: ['Court Website PDFs', 'Gmail', 'Google Sheets'],
    frequency: 'Daily',
    budget: '₹15,000–₹50,000',
    additional_notes: 'Needs to run automatically at 6:30 PM every evening and email associates if their case is on the board.',
    status: 'In Development',
    created_at: '2026-04-02T18:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    customer_name: 'Elena Rostova',
    customer_company: 'Vanguard Growth Agency',
    customer_email: 'elena@vanguardgrowth.co',
    workflow_id: 'wf-1',
    workflow_name: 'AI Meeting Summarizer & Action Dispatcher',
    delivery_model: 'hybrid',
    amount_inr: 8999,
    payment_status: 'Paid',
    delivery_status: 'Delivered',
    created_at: '2026-04-02T15:30:00Z'
  },
  {
    id: 'ord-102',
    customer_name: 'Marcus Bell',
    customer_company: 'Bell Ventures',
    customer_email: 'marcus@bellventures.io',
    workflow_id: 'wf-2',
    workflow_name: 'Autonomous Inbound Lead Qualifier & CRM Enrichment',
    delivery_model: 'workflow_json',
    amount_inr: 6999,
    payment_status: 'Paid',
    delivery_status: 'Delivered',
    created_at: '2026-04-04T11:20:00Z'
  },
  {
    id: 'ord-103',
    customer_name: 'Devraj Patel',
    customer_company: 'Patel Exotics Co',
    customer_email: 'devraj@patelexotics.com',
    workflow_id: 'wf-3',
    workflow_name: 'Intelligent PDF Invoice & Expense Reconciliation Pipeline',
    delivery_model: 'managed',
    amount_inr: 12999,
    payment_status: 'Invoice Sent',
    delivery_status: 'Awaiting Setup',
    created_at: '2026-04-06T14:00:00Z'
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  n8n_webhook_url: 'https://automation.operon.ai/webhook/v1/inbound-lead',
  webhook_secret: 'whsec_operon_prod_99f381c0',
  admin_notification_email: 'ops@operon.ai',
  company_phone: '+91 98200 12345',
  enable_webhook_dispatch: true
};

// Storage keys
const STORAGE_KEYS = {
  WORKFLOWS: 'operon_workflows_v1',
  LEADS: 'operon_leads_v1',
  CUSTOM_REQUESTS: 'operon_custom_requests_v1',
  ORDERS: 'operon_orders_v1',
  SETTINGS: 'operon_settings_v1',
  WEBHOOK_LOGS: 'operon_webhook_logs_v1'
};

export const Storage = {
  getWorkflows(): Workflow[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORKFLOWS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(INITIAL_WORKFLOWS));
        return INITIAL_WORKFLOWS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_WORKFLOWS;
    }
  },

  saveWorkflows(workflows: Workflow[]): void {
    localStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(workflows));
  },

  getWorkflowBySlug(slug: string): Workflow | undefined {
    return this.getWorkflows().find(w => w.slug === slug);
  },

  getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
        return INITIAL_LEADS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LEADS;
    }
  },

  addLead(lead: Omit<Lead, 'id' | 'created_at'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    return newLead;
  },

  updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): void {
    const leads = this.getLeads().map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status,
          notes: notes !== undefined ? notes : lead.notes
        };
      }
      return lead;
    });
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  deleteLead(leadId: string): void {
    const leads = this.getLeads().filter(l => l.id !== leadId);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  },

  getCustomRequests(): CustomRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(INITIAL_CUSTOM_REQUESTS));
        return INITIAL_CUSTOM_REQUESTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CUSTOM_REQUESTS;
    }
  },

  addCustomRequest(req: Omit<CustomRequest, 'id' | 'created_at'>): CustomRequest {
    const requests = this.getCustomRequests();
    const newReq: CustomRequest = {
      ...req,
      id: `req-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    requests.unshift(newReq);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(requests));
    return newReq;
  },

  updateCustomRequestStatus(id: string, status: CustomRequest['status']): void {
    const requests = this.getCustomRequests().map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(requests));
  },

  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
        return INITIAL_ORDERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ORDERS;
    }
  },

  addOrder(order: Omit<Order, 'id' | 'created_at'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus(orderId: string, payment_status?: Order['payment_status'], delivery_status?: Order['delivery_status']): void {
    const orders = this.getOrders().map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          payment_status: payment_status || o.payment_status,
          delivery_status: delivery_status || o.delivery_status
        };
      }
      return o;
    });
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getWebhookLogs(): WebhookLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEBHOOK_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  logWebhook(log: Omit<WebhookLog, 'id' | 'timestamp'>): void {
    const logs = this.getWebhookLogs();
    const newLog: WebhookLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    // Keep last 30 logs
    localStorage.setItem(STORAGE_KEYS.WEBHOOK_LOGS, JSON.stringify(logs.slice(0, 30)));
  }
};
