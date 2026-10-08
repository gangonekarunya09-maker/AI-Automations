import React, { useState } from 'react';
import { Storage } from '../lib/storage';
import { dispatchWebhook, generateCurlExample } from '../lib/webhook';
import { getSupabaseConfig, testSupabaseConnection, SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { AppSettings, WebhookLog } from '../types';
import { Webhook, Play, Check, Copy, Database, Shield, Terminal, Server, RefreshCw, Key, ExternalLink, AlertCircle, Sparkles } from 'lucide-react';

interface AdminSettingsProps {
  onRefresh: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onRefresh }) => {
  const [settings, setSettings] = useState<AppSettings>(Storage.getSettings());
  const [logs, setLogs] = useState<WebhookLog[]>(Storage.getWebhookLogs());
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);

  // Supabase states
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);
  const [supabaseSyncResult, setSupabaseSyncResult] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    Storage.saveSettings(settings);
    setSupabaseConfig(getSupabaseConfig());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    onRefresh();
  };

  const handleTestPing = async () => {
    setIsPinging(true);
    setPingResult(null);

    const res = await dispatchWebhook('test_ping', {
      source_test: 'admin_dashboard_diagnostic',
      admin_time: new Date().toISOString(),
      system: 'Offlo Automations V1 Engine'
    });

    setIsPinging(false);
    setPingResult(res.message);
    setLogs(Storage.getWebhookLogs());
    onRefresh();
  };

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);

    const res = await testSupabaseConnection(settings.supabase_url, settings.supabase_anon_key);
    setIsTestingSupabase(false);
    setSupabaseTestResult(res);
  };

  const handleSyncToSupabase = async () => {
    setIsSyncingSupabase(true);
    setSupabaseSyncResult(null);

    try {
      const counts = await Storage.syncAllToSupabase();
      setSupabaseSyncResult(`Synced ${counts.leads} leads, ${counts.requests} custom requests, and ${counts.orders} orders to Supabase!`);
    } catch {
      setSupabaseSyncResult('Sync encountered an issue. Ensure your tables are created with the SQL schema below.');
    } finally {
      setIsSyncingSupabase(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const curlCommand = generateCurlExample(settings.n8n_webhook_url, settings.webhook_secret);

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="pb-5 border-b border-white/[0.08]">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
          System Configuration & Webhook Endpoints
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Configure the n8n webhook bridge, security signatures, and database connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Webhook className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-white">n8n Automation Webhook Bridge</h3>
              </div>
              {savedSuccess && (
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                n8n Webhook URL (Production / Test) *
              </label>
              <input
                type="url"
                required
                value={settings.n8n_webhook_url}
                onChange={e => setSettings({ ...settings, n8n_webhook_url: e.target.value })}
                placeholder="https://your-n8n.instance/webhook/v1/lead"
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors"
              />
              <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                Receives automated POST payloads whenever a lead submits a requirement or orders a workflow.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                Webhook Signing Secret (Header: X-Offlo-Signature)
              </label>
              <input
                type="text"
                value={settings.webhook_secret}
                onChange={e => setSettings({ ...settings, webhook_secret: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Admin Notification Email
                </label>
                <input
                  type="email"
                  value={settings.admin_notification_email}
                  onChange={e => setSettings({ ...settings, admin_notification_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Operations Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={settings.company_phone}
                  onChange={e => setSettings({ ...settings, company_phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/[0.08]">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                <input
                  type="checkbox"
                  checked={settings.enable_webhook_dispatch}
                  onChange={e => setSettings({ ...settings, enable_webhook_dispatch: e.target.checked })}
                  className="accent-white"
                />
                <span className="text-neutral-300">Enable real-time Webhook dispatching</span>
              </label>

              <button
                type="submit"
                className="px-5 py-2 font-mono uppercase text-xs text-black bg-white hover:bg-neutral-200 font-semibold cursor-pointer active:scale-[0.98]"
              >
                Save Settings
              </button>
            </div>
          </form>

          {/* Supabase Cloud API & Database Configuration */}
          <div className="p-6 sm:p-7 border border-white/[0.08] bg-[#0A0B0F] space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
                  Supabase Cloud API & Database Engine
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {supabaseConfig.isConfigured ? (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Connected ({supabaseConfig.source === 'env' ? '.env' : 'Live Settings'})
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" />
                    Pending API Keys
                  </span>
                )}
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Connect your Supabase project to automatically sync inbound leads, custom architecture inquiries, orders, and webhook audit logs in real time.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Supabase Project URL (VITE_SUPABASE_URL) *
                </label>
                <input
                  type="url"
                  value={settings.supabase_url || ''}
                  onChange={e => setSettings({ ...settings, supabase_url: e.target.value })}
                  placeholder="https://your-project-id.supabase.co"
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                  From Supabase Dashboard → Project Settings → API → Project URL
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Supabase Anon Public Key (VITE_SUPABASE_ANON_KEY) *
                </label>
                <input
                  type="text"
                  value={settings.supabase_anon_key || ''}
                  onChange={e => setSettings({ ...settings, supabase_anon_key: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                  From Supabase Dashboard → Project Settings → API → Project API Keys → anon (public)
                </p>
              </div>
            </div>

            {/* Test result message */}
            {supabaseTestResult && (
              <div
                className={`p-3 border text-xs font-mono flex items-start gap-2 ${
                  supabaseTestResult.success
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-red-950/40 border-red-800 text-red-300'
                }`}
              >
                {supabaseTestResult.success ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{supabaseTestResult.message}</span>
              </div>
            )}

            {/* Sync result message */}
            {supabaseSyncResult && (
              <div className="p-3 bg-[#07080B] border border-white/10 text-xs font-mono text-blue-300 flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{supabaseSyncResult}</span>
              </div>
            )}

            {/* Supabase Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={isTestingSupabase}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                <Server className="w-3.5 h-3.5" />
                <span>{isTestingSupabase ? 'Testing Connection...' : 'Test Supabase Connection'}</span>
              </button>

              <button
                type="button"
                onClick={handleSyncToSupabase}
                disabled={isSyncingSupabase || (!settings.supabase_url && !supabaseConfig.url)}
                className="px-3.5 py-2 bg-white/[0.08] hover:bg-white/[0.14] text-white font-mono uppercase text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 active:scale-[0.98]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSupabase ? 'animate-spin' : ''}`} />
                <span>{isSyncingSupabase ? 'Syncing...' : 'Sync Local Data to Supabase'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopySql}
                className="px-3.5 py-2 bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white font-mono uppercase text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSql ? 'SQL Copied!' : 'Copy Supabase SQL Schema'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSqlModal(true)}
                className="px-3.5 py-2 bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white font-mono uppercase text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Schema</span>
              </button>
            </div>
          </div>

          {/* Live Diagnostic Ping Box */}
          <div className="p-6 border border-white/[0.08] bg-[#0A0B0F] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase font-mono tracking-wider text-white">Live n8n Webhook Test Dispatch</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Emit a synthetic test payload to verify endpoint availability and inspect the response.
                </p>
              </div>

              <button
                onClick={handleTestPing}
                disabled={isPinging}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPinging ? 'Pinging...' : 'Trigger Ping'}</span>
              </button>
            </div>

            {pingResult && (
              <div className="p-3 bg-[#07080B] border border-white/10 text-xs font-mono text-emerald-300 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pingResult}</span>
              </div>
            )}
          </div>

          {/* cURL Command Generator */}
          <div className="p-6 border border-white/[0.08] bg-[#0A0B0F] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-neutral-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neutral-400" />
                <span className="text-white font-bold uppercase tracking-wider text-[11px]">n8n Importable cURL Command</span>
              </div>
              <button
                onClick={handleCopyCurl}
                className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-neutral-300 hover:text-white px-2.5 py-1 bg-white/[0.05] border border-white/10 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#07080B] border border-white/[0.06] text-neutral-300 overflow-x-auto text-[11px] leading-relaxed">
              {curlCommand}
            </pre>
          </div>
        </div>

        {/* Database & Architecture Info Sidebar */}
        <div className="space-y-6 text-xs">
          <div className="p-6 border border-white/[0.08] bg-[#0A0B0F] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold uppercase font-mono tracking-wider">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Database Architecture</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Dual-layer persistence engine: writes instantly to resilient client storage while auto-syncing to Supabase PostgreSQL and emitting n8n webhook webhooks.
            </p>
            <div className="p-3.5 bg-black/40 border border-white/[0.06] space-y-2 text-[11px] font-mono text-neutral-300">
              <div className="text-emerald-400">✓ Resilient Storage Active</div>
              {supabaseConfig.isConfigured ? (
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <span>✓ Supabase: Connected</span>
                </div>
              ) : (
                <div className="text-amber-400 flex items-center gap-1.5">
                  <span>○ Supabase: Awaiting API Key</span>
                </div>
              )}
              <div className="text-neutral-400">✓ n8n Webhook Pipe Ready</div>
            </div>
            <div className="pt-1">
              <button
                onClick={() => setShowSqlModal(true)}
                className="w-full py-2 px-3 border border-white/10 hover:border-white/20 bg-white/[0.03] text-neutral-300 hover:text-white font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase SQL Migration</span>
              </button>
            </div>
          </div>

          <div className="p-6 border border-white/[0.08] bg-[#0A0B0F] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold uppercase font-mono tracking-wider">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Security Protocols</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Client secrets, LLM tokens, and credentials are never exposed in frontend bundles. The browser sends webhook payloads to n8n, which securely authenticates to downstream systems.
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Logs History Table */}
      <div className="space-y-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">Recent Webhook Execution Logs</h3>
          <span className="text-xs text-neutral-500 font-mono">{logs.length} logged events</span>
        </div>

        <div className="border border-white/[0.08] bg-[#0A0B0F] overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-xs">
              No webhook events logged yet. Trigger a test ping or submit a contact inquiry to see live event logs.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#07080B] border-b border-white/[0.08] text-neutral-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Event Type</th>
                    <th className="py-2.5 px-4">Status / Code</th>
                    <th className="py-2.5 px-4">Destination URL</th>
                    <th className="py-2.5 px-4">Timestamp</th>
                    <th className="py-2.5 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] font-mono text-[11px]">
                  {logs.slice(0, 10).map(log => (
                    <tr key={log.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-white font-medium">{log.event}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 text-[10px] ${
                          log.status === 'success'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-red-950 text-red-300 border border-red-800'
                        }`}>
                          HTTP {log.response_code || 200}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400 truncate max-w-xs">{log.url}</td>
                      <td className="py-3 px-4 text-neutral-500 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-neutral-400 hover:text-white underline cursor-pointer"
                        >
                          View Payload
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Payload Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#090A0E] border border-white/[0.12] p-6 max-w-xl w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Payload: {selectedLog.event}</h4>
              <button onClick={() => setSelectedLog(null)} className="text-neutral-400 hover:text-white cursor-pointer">✕</button>
            </div>
            <pre className="p-3 bg-[#050608] border border-white/[0.06] text-emerald-300 font-mono text-[11px] overflow-x-auto max-h-96">
              {JSON.stringify(selectedLog.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
      {/* Supabase SQL Migration Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#090A0E] border border-white/[0.12] p-6 max-w-3xl w-full space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Supabase Production SQL Schema
                </h4>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              Run this SQL script in your Supabase Dashboard (<span className="text-white font-mono">SQL Editor → New Query</span>) to create all production tables and Row Level Security (RLS) policies.
            </p>

            <pre className="p-4 bg-[#050608] border border-white/[0.06] text-neutral-300 font-mono text-[11px] overflow-x-auto overflow-y-auto flex-1 leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div className="pt-2 flex items-center justify-between border-t border-white/[0.08]">
              <span className="text-[11px] font-mono text-neutral-500">
                Tables: leads, custom_requests, orders, webhook_logs
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSqlModal(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-mono uppercase text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
