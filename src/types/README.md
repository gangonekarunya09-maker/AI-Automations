# Types Directory (`/src/types`)

This directory contains strict TypeScript interface definitions and domain models used across the entire Operon Automations codebase.

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

### `Lead`
Represents an inbound sales inquiry or workflow request.
- `id`, `name`, `company`, `email`, `phone`: Customer contact details.
- `message`: Original problem description.
- `automation_type`: Identified category or target workflow.
- `budget`: Declared budget bracket.
- `status`: Sales pipeline stage (`'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost'`).
- `notes`: Internal engineering or account executive notes.

### `CustomRequest`
Represents a bespoke process automation inquiry.
- `process_description`: In-depth description of current manual human clicks and tasks.
- `tools_used`: Selected software tools currently involved (e.g. `['Gmail', 'Excel', 'Tally']`).
- `frequency`: How often the task executes (`'Multiple times per day'`, `'Daily'`, etc.).
- `status`: Project progression stage (`'New' | 'Scoping' | 'Proposal' | 'In Development' | 'Completed' | 'Archived'`).

### `Order`
Represents a workflow license acquisition or service engagement.
- `workflow_id`, `workflow_name`: Associated product.
- `delivery_model`: Selected fulfillment model (`'workflow_json' | 'managed' | 'hybrid'`).
- `amount_inr`: Total billed amount in INR.
- `payment_status`: Payment state (`'Pending' | 'Invoice Sent' | 'Paid'`).
- `delivery_status`: Implementation status (`'Awaiting Setup' | 'In Progress' | 'Delivered'`).

### `WebhookLog` & `AppSettings`
Tracks external n8n webhook triggers, HTTP status codes, payloads, and application runtime configuration parameters.
