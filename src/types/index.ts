export interface Workflow {
  id: string;
  name: string;
  slug: string;
  category: 'Sales' | 'Marketing' | 'Operations' | 'Customer Support' | 'AI & Documents' | 'E-Commerce';
  short_description: string;
  long_description: string;
  benefit: string;
  price_inr: number;
  price_usd: number;
  original_price_inr?: number;
  technologies: string[];
  features: string[];
  architecture_steps: {
    step: number;
    title: string;
    tool: string;
    description: string;
  }[];
  delivery_models: ('workflow_json' | 'managed' | 'hybrid')[];
  image?: string;
  demo_url?: string;
  status: 'published' | 'draft';
  featured: boolean;
  downloads_count: number;
  created_at: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  automation_type: string;
  budget: string;
  status: LeadStatus;
  notes?: string;
  source: 'contact_form' | 'workflow_inquiry' | 'custom_request';
  workflow_slug?: string;
  created_at: string;
}

export interface CustomRequest {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  process_description: string;
  tools_used: string[];
  frequency: string;
  budget: string;
  additional_notes?: string;
  status: 'New' | 'Scoping' | 'Proposal' | 'In Development' | 'Completed' | 'Archived';
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_company: string;
  customer_email: string;
  customer_phone?: string;
  workflow_id: string;
  workflow_name: string;
  delivery_model: 'workflow_json' | 'managed' | 'hybrid';
  amount_inr: number;
  payment_status: 'Pending' | 'Paid' | 'Invoice Sent';
  delivery_status: 'Awaiting Setup' | 'In Progress' | 'Delivered';
  created_at: string;
}

export interface WebhookLog {
  id: string;
  timestamp: string;
  event: string;
  url: string;
  payload: Record<string, unknown>;
  status: 'success' | 'failed';
  response_code?: number;
  message: string;
}

export interface AppSettings {
  n8n_webhook_url: string;
  webhook_secret: string;
  admin_notification_email: string;
  company_phone: string;
  supabase_url?: string;
  supabase_anon_key?: string;
  enable_webhook_dispatch: boolean;
}
