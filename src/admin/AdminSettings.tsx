import React, { useState } from 'react';
import { Storage } from '../lib/storage';
import { dispatchWebhook, generateCurlExample } from '../lib/webhook';
import { getSupabaseConfig, testSupabaseConnection, SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { AppSettings, WebhookLog } from '../types';
import { Webhook, Play, Check, Copy, Database, Shield, Terminal, Server, RefreshCw, Key, ExternalLink, AlertCircle, X } from 'lucide-react';

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
      {/* Page Header */}
      <div className="pb-6 border-b border-[#CFCFCC]">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block mb-1">
          INFRASTRUCTURE // RUNTIMES & CLUSTER CONFIG
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
          SYSTEM CONFIGURATION & CONNECTORS
        </h1>
        <p className="text-xs text-[#6B6B6B] mt-1 max-w-xl">
          Configure the n8n automation webhook bridge, security signatures, and Supabase cloud database credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Form & Config Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. n8n Automation Webhook Bridge Form */}
          <form onSubmit={handleSave} className="p-6 sm:p-8 border border-[#CFCFCC] bg-white space-y-6 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCC]">
              <div className="flex items-center gap-2">
                <Webhook className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0E0E]">n8n Automation Webhook Bridge</h3>
              </div>
              {savedSuccess && (
                <span className="text-[#0E0E0E] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 bg-[#F6F5F3] px-2.5 py-1 border border-[#CFCFCC]">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                n8n Webhook URL (Production / Staging) *
              </label>
              <input
                type="url"
                required
                value={settings.n8n_webhook_url}
                onChange={e => setSettings({ ...settings, n8n_webhook_url: e.target.value })}
                placeholder="https://your-n8n.instance/webhook/v1/lead"
                className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] transition-colors"
              />
              <p className="text-[11px] text-[#6B6B6B] mt-1">
                Receives automated POST payloads whenever a lead submits a requirement or acquires a blueprint.
              </p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                Webhook Signing Secret (Header: X-Offlo-Signature)
              </label>
              <input
                type="text"
                value={settings.webhook_secret}
                onChange={e => setSettings({ ...settings, webhook_secret: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Admin Notification Email
                </label>
                <input
                  type="email"
                  value={settings.admin_notification_email}
                  onChange={e => setSettings({ ...settings, admin_notification_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Operations Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={settings.company_phone}
                  onChange={e => setSettings({ ...settings, company_phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#CFCFCC]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#0E0E0E]">
                <input
                  type="checkbox"
                  checked={settings.enable_webhook_dispatch}
                  onChange={e => setSettings({ ...settings, enable_webhook_dispatch: e.target.checked })}
                  className="w-4 h-4 accent-[#0E0E0E]"
                />
                <span>Enable real-time Webhook dispatching</span>
              </label>

              <button
                type="submit"
                className="btn-primary h-11 text-xs"
              >
                Save Settings
              </button>
            </div>
          </form>

          {/* 2. Supabase Cloud API & Database Configuration */}
          <div className="p-6 sm:p-8 border border-[#CFCFCC] bg-white space-y-6 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCC]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0E0E]">
                  Supabase Cloud API & Database Engine
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {supabaseConfig.isConfigured ? (
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-[#0E0E0E] text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white" />
                    Connected ({supabaseConfig.source === 'env' ? '.env' : 'Live Settings'})
                  </span>
                ) : (
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-[#F6F5F3] text-[#0E0E0E] border border-[#CFCFCC] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Pending API Keys
                  </span>
                )}
              </div>
            </div>

            <p className="text-[#6B6B6B] text-xs leading-relaxed">
              Connect your Supabase project to automatically sync inbound leads, custom architecture inquiries, orders, and webhook audit logs in real time.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Supabase Project URL (VITE_SUPABASE_URL) *
                </label>
                <input
                  type="url"
                  value={settings.supabase_url || ''}
                  onChange={e => setSettings({ ...settings, supabase_url: e.target.value })}
                  placeholder="https://your-project-id.supabase.co"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
                <p className="text-[11px] text-[#6B6B6B] mt-1">
                  From Supabase Dashboard → Project Settings → API → Project URL
                </p>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#0E0E0E] mb-1.5">
                  Supabase Anon Public Key (VITE_SUPABASE_ANON_KEY) *
                </label>
                <input
                  type="text"
                  value={settings.supabase_anon_key || ''}
                  onChange={e => setSettings({ ...settings, supabase_anon_key: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFCFCC] text-[#0E0E0E] text-xs focus:outline-none focus:border-[#0E0E0E] transition-colors"
                />
                <p className="text-[11px] text-[#6B6B6B] mt-1">
                  From Supabase Dashboard → Project Settings → API → Project API Keys → anon (public)
                </p>
              </div>
            </div>

            {/* Test result message */}
            {supabaseTestResult && (
              <div
                className={`p-3.5 border text-xs flex items-start gap-2.5 font-medium ${
                  supabaseTestResult.success
                    ? 'bg-[#F6F5F3] border-[#0E0E0E] text-[#0E0E0E]'
                    : 'bg-[#F6F5F3] border-red-500 text-red-700'
                }`}
              >
                {supabaseTestResult.success ? (
                  <Check className="w-4 h-4 text-[#0E0E0E] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{supabaseTestResult.message}</span>
              </div>
            )}

            {/* Sync result message */}
            {supabaseSyncResult && (
              <div className="p-3.5 bg-[#F6F5F3] border border-[#0E0E0E] text-xs text-[#0E0E0E] flex items-start gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#0E0E0E] shrink-0 mt-0.5" />
                <span>{supabaseSyncResult}</span>
              </div>
            )}

            {/* Supabase Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3 border-t border-[#CFCFCC]">
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={isTestingSupabase}
                className="btn-primary h-10 px-5 text-xs disabled:opacity-50"
              >
                <Server className="w-3.5 h-3.5 mr-2" />
                <span>{isTestingSupabase ? 'Testing...' : 'Test Supabase Connection'}</span>
              </button>

              <button
                type="button"
                onClick={handleSyncToSupabase}
                disabled={isSyncingSupabase || (!settings.supabase_url && !supabaseConfig.url)}
                className="h-10 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#0E0E0E] bg-[#F6F5F3] hover:bg-[#E4E3E0] border border-[#CFCFCC] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSupabase ? 'animate-spin' : ''}`} />
                <span>{isSyncingSupabase ? 'Syncing...' : 'Sync Local Data to Supabase'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopySql}
                className="h-10 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#0E0E0E] bg-white hover:bg-[#F6F5F3] border border-[#CFCFCC] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSqlModal(true)}
                className="h-10 px-4 text-xs uppercase tracking-[0.16em] font-semibold text-[#0E0E0E] bg-white hover:bg-[#F6F5F3] border border-[#CFCFCC] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Schema</span>
              </button>
            </div>
          </div>

          {/* 3. Live Diagnostic Ping Box */}
          <div className="p-6 sm:p-8 border border-[#CFCFCC] bg-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0E0E0E]">Live n8n Webhook Test Dispatch</h4>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Emit a synthetic test payload to verify endpoint availability and inspect the response.
                </p>
              </div>

              <button
                onClick={handleTestPing}
                disabled={isPinging}
                className="btn-primary h-10 px-5 text-xs whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 mr-2 fill-current" />
                <span>{isPinging ? 'Pinging...' : 'Trigger Ping'}</span>
              </button>
            </div>

            {pingResult && (
              <div className="p-3.5 bg-[#F6F5F3] border border-[#0E0E0E] text-xs text-[#0E0E0E] flex items-start gap-2.5 font-medium">
                <Check className="w-4 h-4 text-[#0E0E0E] shrink-0 mt-0.5" />
                <span>{pingResult}</span>
              </div>
            )}
          </div>

          {/* 4. cURL Command Generator */}
          <div className="p-6 sm:p-8 border border-[#CFCFCC] bg-white space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
                <span className="text-[#0E0E0E] font-bold uppercase tracking-wider text-xs">n8n Importable cURL Command</span>
              </div>
              <button
                onClick={handleCopyCurl}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#0E0E0E] px-3 py-1.5 bg-[#F6F5F3] hover:bg-[#E4E3E0] border border-[#CFCFCC] cursor-pointer transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] overflow-x-auto text-[11px] leading-relaxed">
              {curlCommand}
            </pre>
          </div>
        </div>

        {/* Database & Architecture Info Sidebar */}
        <div className="space-y-6 text-xs">
          <div className="p-6 sm:p-7 border border-[#CFCFCC] bg-white space-y-4">
            <div className="flex items-center gap-2 text-[#0E0E0E] font-bold uppercase tracking-wider">
              <Database className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
              <span>Database Architecture</span>
            </div>
            <p className="text-[#6B6B6B] leading-relaxed">
              Dual-layer persistence engine: writes instantly to resilient client storage while auto-syncing to Supabase PostgreSQL and emitting n8n webhook signals.
            </p>
            <div className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] space-y-2 text-[11px] font-semibold text-[#0E0E0E]">
              <div>✓ Resilient Storage Active</div>
              {supabaseConfig.isConfigured ? (
                <div className="flex items-center gap-1.5">
                  <span>✓ Supabase: Connected</span>
                </div>
              ) : (
                <div className="text-[#6B6B6B] flex items-center gap-1.5">
                  <span>○ Supabase: Awaiting API Key</span>
                </div>
              )}
              <div className="text-[#6B6B6B]">✓ n8n Webhook Pipe Ready</div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setShowSqlModal(true)}
                className="w-full py-2.5 px-3 border border-[#CFCFCC] hover:border-[#0E0E0E] bg-[#F6F5F3] hover:bg-[#E4E3E0] text-[#0E0E0E] text-[11px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-[#0E0E0E]" strokeWidth={1.5} />
                <span>Supabase SQL Migration</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-7 border border-[#CFCFCC] bg-white space-y-4">
            <div className="flex items-center gap-2 text-[#0E0E0E] font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#0E0E0E]" strokeWidth={1.5} />
              <span>Security Protocols</span>
            </div>
            <p className="text-[#6B6B6B] leading-relaxed">
              Client secrets, LLM tokens, and credentials are never exposed in frontend bundles. The browser sends signed webhook payloads to n8n, which securely authenticates to downstream systems.
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Logs History Table */}
      <div className="space-y-4 pt-4 border-t border-[#CFCFCC]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B] block">
              DIAGNOSTICS & AUDIT TRAIL
            </span>
            <h3 className="text-xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">Recent Webhook Execution Logs</h3>
          </div>
          <span className="text-xs text-[#6B6B6B] font-semibold uppercase tracking-wider">{logs.length} logged events</span>
        </div>

        <div className="border border-[#CFCFCC] bg-white overflow-hidden">
          {logs.length === 0 ? (
            <div className="p-12 text-center text-[#6B6B6B] text-xs">
              No webhook events logged yet. Trigger a test ping or submit a contact inquiry to see live event logs.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F5F3] border-b border-[#CFCFCC] text-[#6B6B6B] uppercase text-[10px] tracking-[0.16em] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Event Type</th>
                    <th className="py-3 px-4">Status / Code</th>
                    <th className="py-3 px-4">Destination URL</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CFCFCC] text-[11px]">
                  {logs.slice(0, 10).map(log => (
                    <tr key={log.id} className="hover:bg-[#F6F5F3] transition-colors">
                      <td className="py-3.5 px-4 text-[#0E0E0E] font-bold uppercase">{log.event}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold border ${
                          log.status === 'success'
                            ? 'bg-[#0E0E0E] text-white border-[#0E0E0E]'
                            : 'bg-white text-red-600 border-red-300'
                        }`}>
                          HTTP {log.response_code || 200}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6B6B6B] truncate max-w-xs">{log.url}</td>
                      <td className="py-3.5 px-4 text-[#6B6B6B] whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-xs uppercase tracking-wider font-bold text-[#0E0E0E] editorial-link cursor-pointer"
                        >
                          View Payload →
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-white border border-[#0E0E0E] p-8 max-w-xl w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFCFCC]">
              <h4 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">Payload: {selectedLog.event}</h4>
              <button onClick={() => setSelectedLog(null)} className="text-[#0E0E0E] hover:opacity-70 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <pre className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] text-[11px] overflow-x-auto max-h-96 leading-relaxed">
              {JSON.stringify(selectedLog.payload, null, 2)}
            </pre>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="btn-primary h-10 px-5 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supabase SQL Migration Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
          <div className="bg-white border border-[#0E0E0E] p-6 sm:p-8 max-w-3xl w-full space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCC]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#0E0E0E]" strokeWidth={1.5} />
                <h4 className="text-base font-bold text-[#0E0E0E] uppercase tracking-wider">
                  Supabase Production SQL Schema
                </h4>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="text-[#0E0E0E] hover:opacity-70 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Run this SQL script in your Supabase Dashboard (<span className="text-[#0E0E0E] font-semibold">SQL Editor → New Query</span>) to create all production tables and Row Level Security (RLS) policies.
            </p>

            <pre className="p-4 bg-[#F6F5F3] border border-[#CFCFCC] text-[#0E0E0E] text-[11px] overflow-x-auto overflow-y-auto flex-1 leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#CFCFCC]">
              <span className="text-[11px] text-[#6B6B6B] font-semibold">
                Tables: leads, custom_requests, orders, webhook_logs
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="btn-primary h-10 px-5 text-xs flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSqlModal(false)}
                  className="h-10 px-4 text-xs uppercase tracking-wider font-semibold text-[#0E0E0E] bg-[#F6F5F3] hover:bg-[#E4E3E0] border border-[#CFCFCC] cursor-pointer"
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
