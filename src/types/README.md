# Types Directory (`/src/types`)

This directory contains strict TypeScript interface definitions and domain models used across the entire Offlo Automations codebase.

> **Architecture Reference**:
> - 📊 See [`/current-project-state.md`](../../current-project-state.md) for domain model usage across components.
> - 📐 See [`/design.md`](../../design.md) for how typed values (currencies, timestamps, stages) are rendered.

---

## 📁 Core Data Contracts (`index.ts`)

### `Workflow`
Represents an automation workflow blueprint in the catalog.
- `id`, `name`, `slug`: Unique identifiers and SEO routing keys.
- `category`: Categorization (`'Sales' | 'Marketing' | 'Operations' | 'Customer Support' | 'AI & Documents' | 'E-Commerce'`).
- `price_inr`, `price_usd`: Dual-currency pricing figures.
- `technologies`: Array of connected third-party tools (e.g. `['n8n', 'OpenAI Whisper', 'Slack API']`).
- `features`: Array of delivered assets (e.g. JSON file, environment checklist, test fixtures).
- `architecture_steps`: Sequence of processing steps (`step`, `title`, `tool`, `description`).
- `delivery_models`: Supported delivery tiers (`'workflow_json' | 'managed' | 'hybrid'`).
- `status`: Visibility state (`'published' | 'draft'`).
- `featured`: Optional boolean flag for homepage and catalog highlights.

### `Lead`
Represents an inbound sales inquiry or workflow request.
- `id`, `name`, `company`, `email`, `phone`: Customer contact details.
- `message`: Original problem description.
- `automation_type`: Identified category or target workflow.
- `budget`: Declared budget bracket.
- `status`: Sales pipeline stage (`'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost'`).
- `notes`: Internal engineering or account executive notes.
- `created_at`: ISO timestamp.

### `CustomRequest`
Represents a bespoke process automation inquiry.
- `id`, `name`, `company`, `email`, `phone`: Client details.
- `process_description`: In-depth description of current manual human clicks and tasks.
- `tools_used`: Selected software tools currently involved (e.g. `['Gmail', 'Excel', 'Tally']`).
- `frequency`: How often the task executes (`'Multiple times per day'`, `'Daily'`, etc.).
- `budget`: Client investment expectation.
- `status`: Project progression stage (`'New' | 'Scoping' | 'Proposal' | 'In Development' | 'Completed' | 'Archived'`).
- `created_at`: ISO timestamp.

### `Order`
Represents a workflow license acquisition or service engagement.
- `id`, `workflow_id`, `workflow_name`: Associated product.
- `customer_name`, `customer_email`, `customer_company`: Purchasing entity.
- `delivery_model`: Selected fulfillment model (`'workflow_json' | 'managed' | 'hybrid'`).
- `amount_inr`: Total billed amount in INR.
- `payment_status`: Payment state (`'Pending' | 'Invoice Sent' | 'Paid'`).
- `delivery_status`: Implementation status (`'Awaiting Setup' | 'In Progress' | 'Delivered'`).
- `created_at`: ISO timestamp.

### `AppSettings` & `WebhookLog`
Tracks system runtime configuration and automated telemetry:
- `n8n_webhook_url`: Primary endpoint for automated webhook dispatches.
- `webhook_secret`: Header authentication token (`X-Offlo-Signature`).
- `admin_notification_email`, `company_phone`: Operational communication coordinates.
- `enable_webhook_dispatch`: Master kill-switch for outgoing webhooks.
- `supabase_url`, `supabase_anon_key`: Supabase Cloud connection parameters.
- `enable_supabase_sync`: Master toggle for automated cloud database replication.
- `WebhookLog`: Detailed execution trace storing timestamp, status code, response time, payload, and error diagnostics.

