# Library & Services Directory (`/src/lib`)

This directory contains the central data persistence engine, external webhook bridges, and cloud database integrations for Offlo Automations.

> **Project References**:
> - 📊 See [`/current-project-state.md`](../../current-project-state.md) for current integration states.
> - 📐 See [`/design.md`](../../design.md) for data presentation and telemetry formatting rules.

---

## 📁 Modules

### 1. `storage.ts` — Persistent Data & Local State Engine
- **Responsibility**: Provides deterministic, synchronous client-side persistence backed by `localStorage` with in-memory fail-safe fallbacks for private browsing modes.
- **Seeded Datasets**:
  - `INITIAL_WORKFLOWS`: 8 pre-configured production workflows with complete step architectures, deliverables, and dual-currency pricing.
  - `INITIAL_LEADS`: Realistic inbound pipeline records with diverse qualification statuses.
  - `INITIAL_CUSTOM_REQUESTS`: Detailed business manual bottleneck descriptions.
  - `INITIAL_ORDERS`: Multi-tier order inquiries with fulfillment status tracking.
  - `INITIAL_SETTINGS`: Default webhook endpoints, secrets, and notification addresses.
- **API Methods**:
  - `getWorkflows()`, `saveWorkflows()`, `getWorkflowBySlug(slug)`
  - `getLeads()`, `addLead()`, `updateLeadStatus()`, `deleteLead()`
  - `getCustomRequests()`, `addCustomRequest()`, `updateCustomRequestStatus()`
  - `getOrders()`, `addOrder()`, `updateOrderStatus()`
  - `getSettings()`, `saveSettings()`
  - `getWebhookLogs()`, `logWebhook()`

### 2. `webhook.ts` — n8n Webhook & Notification Bridge
- **Responsibility**: Manages the HTTP dispatch of automation events to external n8n webhook listeners.
- **Events Dispatched**:
  - `lead_created`: Triggered when an inbound sales contact form is submitted.
  - `custom_request_created`: Triggered when a bespoke automation requirement is filed.
  - `order_inquiry`: Triggered when a workflow purchase inquiry is initiated.
  - `test_ping`: Triggered from the Admin Settings diagnostic console.
- **Security & Headers**: Embeds the configured signing secret in `X-Offlo-Signature` (and `X-Operon-Signature`) header and identifies the event via `X-Offlo-Event`.
- **Diagnostic Tool**: Includes `generateCurlExample(url, secret)` which produces ready-to-run shell cURL commands for manual testing or importing into n8n Webhook Nodes.

### 3. `supabase.ts` — Supabase Cloud Database & API Integration
- **Responsibility**: Manages the connection to Supabase PostgreSQL database via `@supabase/supabase-js`.
- **Environment Variables**:
  - `VITE_SUPABASE_URL`: Supabase Project URL (`https://your-project.supabase.co`).
  - `VITE_SUPABASE_ANON_KEY`: Supabase public anonymous API key (`eyJ...`).
- **Dynamic Configuration**: Keys can be supplied either via `.env` OR directly configured and saved live in the Admin Settings panel (`/admin` → Settings).
- **Features**:
  - `getSupabaseConfig()`: Resolves active credentials with fallback support.
  - `getSupabaseClient()`: Singleton client instance with automatic session management.
  - `testSupabaseConnection()`: Verifies connectivity and reports status.
  - Dual-mode synchronization helpers for `leads`, `custom_requests`, `orders`, and `webhook_logs`.
  - `SUPABASE_SQL_SCHEMA`: Production DDL migration script with Row Level Security (RLS) policies and trigger functions.

