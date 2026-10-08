# Library & Services Directory (`/src/lib`)

This directory contains the central data persistence engine and external integration bridges for Operon Automations.

---

## 📁 Modules

### 1. `storage.ts` — Persistent Data & Local State Engine
- **Responsibility**: Provides deterministic, synchronous client-side persistence backed by `localStorage` with fail-safe fallbacks.
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
- **Security**: Embeds the configured signing secret in the `X-Operon-Signature` header and identifies the event via `X-Operon-Event`.
- **Diagnostic Tool**: Includes `generateCurlExample(url, secret)` which produces ready-to-run shell cURL commands for manual testing or importing into n8n Webhook Nodes.
