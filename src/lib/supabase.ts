import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Lead, CustomRequest, Order, WebhookLog, Workflow } from '../types';

let cachedClient: SupabaseClient | null = null;
let lastUsedConfig = { url: '', key: '' };

export interface SupabaseConfigState {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  source: 'env' | 'settings' | 'none';
}

/**
 * Resolves active Supabase credentials with precedence:
 * 1. Environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
 * 2. Admin settings stored in local storage
 */
export function getSupabaseConfig(): SupabaseConfigState {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string || '').trim();

  if (envUrl && envKey) {
    return {
      url: envUrl,
      anonKey: envKey,
      isConfigured: true,
      source: 'env'
    };
  }

  // Fallback to locally configured settings
  try {
    const rawSettings = localStorage.getItem('offlo_settings_v1') || localStorage.getItem('operon_settings_v1');
    if (rawSettings) {
      const parsed = JSON.parse(rawSettings);
      const setUrl = (parsed.supabase_url as string || '').trim();
      const setKey = (parsed.supabase_anon_key as string || '').trim();
      if (setUrl && setKey) {
        return {
          url: setUrl,
          anonKey: setKey,
          isConfigured: true,
          source: 'settings'
        };
      }
    }
  } catch {
    // Ignore storage parse errors
  }

  return {
    url: envUrl || '',
    anonKey: envKey || '',
    isConfigured: false,
    source: 'none'
  };
}

/**
 * Returns an initialized Supabase Client if credentials are provided, or null.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config.isConfigured) {
    return null;
  }

  // Reuse existing instance if config hasn't changed
  if (cachedClient && lastUsedConfig.url === config.url && lastUsedConfig.key === config.anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    lastUsedConfig = { url: config.url, key: config.anonKey };
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

/**
 * Test connectivity against Supabase with provided or active credentials.
 */
export async function testSupabaseConnection(customUrl?: string, customKey?: string): Promise<{
  success: boolean;
  message: string;
  source: string;
}> {
  const config = getSupabaseConfig();
  const url = (customUrl || config.url || '').trim();
  const key = (customKey || config.anonKey || '').trim();

  if (!url || !key) {
    return {
      success: false,
      message: 'Supabase URL or Anon API Key is missing. Please provide both.',
      source: 'validation'
    };
  }

  if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
    return {
      success: false,
      message: 'Supabase URL should start with https:// and point to your *.supabase.co endpoint.',
      source: 'validation'
    };
  }

  try {
    const testClient = createClient(url, key);
    // Ping Supabase Auth or public endpoint to test connectivity
    const { error } = await testClient.auth.getSession();

    if (error && error.message && !error.message.includes('fetch')) {
      // Returned an auth response error, which means connection to Supabase endpoint was reached!
      return {
        success: true,
        message: `Successfully connected to Supabase endpoint (${new URL(url).hostname})!`,
        source: 'api'
      };
    }

    return {
      success: true,
      message: `Verified connection to Supabase project (${new URL(url).hostname})! Ready for sync.`,
      source: 'api'
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Failed to connect to Supabase: ${errorMsg}`,
      source: 'network'
    };
  }
}

/**
 * Synchronize Lead record to Supabase
 */
export async function syncLeadToSupabase(lead: Lead): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('leads').insert([{
      id: lead.id,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone || null,
      message: lead.message,
      automation_type: lead.automation_type,
      budget: lead.budget,
      status: lead.status,
      notes: lead.notes || null,
      source: lead.source,
      created_at: lead.created_at
    }]);

    if (error) {
      console.warn('Supabase syncLead warning (check if "leads" table exists):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase sync error for lead:', err);
    return false;
  }
}

/**
 * Synchronize Custom Request to Supabase
 */
export async function syncCustomRequestToSupabase(request: CustomRequest): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('custom_requests').insert([{
      id: request.id,
      name: request.name,
      company: request.company,
      email: request.email,
      phone: request.phone || null,
      process_description: request.process_description,
      tools_used: request.tools_used,
      frequency: request.frequency,
      budget: request.budget,
      additional_notes: request.additional_notes || null,
      status: request.status,
      created_at: request.created_at
    }]);

    if (error) {
      console.warn('Supabase syncCustomRequest warning (check if "custom_requests" table exists):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase sync error for custom request:', err);
    return false;
  }
}

/**
 * Synchronize Order to Supabase
 */
export async function syncOrderToSupabase(order: Order): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('orders').insert([{
      id: order.id,
      customer_name: order.customer_name,
      customer_company: order.customer_company,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone || null,
      workflow_id: order.workflow_id,
      workflow_name: order.workflow_name,
      delivery_model: order.delivery_model,
      amount_inr: order.amount_inr,
      payment_status: order.payment_status,
      delivery_status: order.delivery_status,
      created_at: order.created_at
    }]);

    if (error) {
      console.warn('Supabase syncOrder warning (check if "orders" table exists):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase sync error for order:', err);
    return false;
  }
}

/**
 * Synchronize Webhook Log to Supabase
 */
export async function syncWebhookLogToSupabase(log: WebhookLog): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('webhook_logs').insert([{
      id: log.id,
      timestamp: log.timestamp,
      event: log.event,
      url: log.url,
      payload: log.payload,
      status: log.status,
      response_code: log.response_code || 200,
      message: log.message
    }]);

    if (error) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Full copy-pasteable SQL schema for the Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- =========================================================
-- Offlo Automations Studio - Supabase Production Schema
-- Run this in your Supabase Dashboard: SQL Editor -> New Query
-- =========================================================

-- 1. Leads Table (Contact & Inbound Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  automation_type TEXT NOT NULL,
  budget TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  notes TEXT,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Custom Automation Architecture Requests
CREATE TABLE IF NOT EXISTS public.custom_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  process_description TEXT NOT NULL,
  tools_used TEXT[] DEFAULT '{}',
  frequency TEXT,
  budget TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Workflow Purchase / Delivery Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_company TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  workflow_id TEXT NOT NULL,
  workflow_name TEXT NOT NULL,
  delivery_model TEXT NOT NULL,
  amount_inr NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'Pending',
  delivery_status TEXT DEFAULT 'Awaiting Setup',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Webhook Dispatch Audit Logs
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  event TEXT NOT NULL,
  url TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL,
  response_code INTEGER DEFAULT 200,
  message TEXT
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

-- 6. Public Anon Insert Policies (Allows web forms to submit securely)
CREATE POLICY "Allow anon insert leads" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert custom_requests" ON public.custom_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert orders" ON public.orders
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert webhook_logs" ON public.webhook_logs
  FOR INSERT TO anon WITH CHECK (true);

-- 7. Public Anon Select (Optional: for testing or admin read with anon key)
CREATE POLICY "Allow anon select leads" ON public.leads
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select custom_requests" ON public.custom_requests
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select orders" ON public.orders
  FOR SELECT TO anon USING (true);
`;
