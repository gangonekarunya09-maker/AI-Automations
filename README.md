# Offlo Automations — Production Web Application

> **Intelligent Business Process Automation & Workflow Marketplace**  
> Built with React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide Icons, and Supabase.

---

## 📌 Documentation Quick Links

- 📐 **[Design System Specification (`design.md`)](./design.md)**: Color tokens, typography hierarchy, corner-rounding standards (`rounded-2xl`, `rounded-xl`, `rounded-lg`), and interaction rules.
- 📊 **[Current Project State (`current-project-state.md`)](./current-project-state.md)**: Complete feature inventory, verification metrics, and system status as of October 2026.

---

## 📌 Overview

Offlo Automations is a high-performance, conversion-engineered digital platform for an AI and business automation technology company. It acts simultaneously as:
1. **A professional corporate storefront** communicating high-impact business outcomes (*"Automate Your Business Without Hiring Another Person"*).
2. **A workflow & digital product catalog** with battle-tested n8n templates, transparent dual-currency pricing (₹ INR & $ USD), and three flexible delivery models (Source JSON, Hybrid Setup, Managed Ops).
3. **An inbound lead generation & scoping engine** with multi-attribute questionnaires, instant feedback, and webhook forwarding.
4. **An operations admin portal** with live pipeline management (Leads, Custom Requests, Orders, Catalog CRUD, n8n Webhook configuration, and Supabase database connection).

---

## 📂 Project Directory Structure

```text
/
├── index.html              # HTML5 entry point with SEO metadata and Google Fonts
├── metadata.json           # Application identity & permission specifications
├── package.json            # Dependencies and build script declarations
├── tsconfig.json           # Strict TypeScript compiler options & path aliases
├── vite.config.ts          # Vite build, React plugin & Tailwind CSS v4 setup
├── design.md               # Design system, typography & rounded geometry spec
├── current-project-state.md # Current state, feature inventory & health metrics
├── README.md               # Root application architecture documentation
│
└── src/                    # Frontend application source code
    ├── admin/              # Private operations portal & administration views
    ├── assets/             # Media and static image assets
    ├── components/         # Reusable UI components, navigation, and modals
    ├── data/               # Seed datasets and data schemas
    ├── lib/                # Storage engine, webhook dispatcher & Supabase client
    ├── pages/              # Public storefront pages and routes
    ├── types/              # TypeScript interfaces and domain models
    ├── App.tsx             # Root router, modal controller, and state bridge
    ├── index.css           # Tailwind CSS v4 theme, font pairings, and scrollbars
    └── main.tsx            # React 19 DOM bootstrap mounting point
```

---

## 🚀 Key Features

- **Anti-AI Slop & Editorial Design Constitution**: Strict adherence to domain-native typography (`Syne` display + `Plus Jakarta Sans` body + `JetBrains Mono`), unboxed metadata, tabular numerals for monetary values, and uniform rounded corners (`rounded-2xl`, `rounded-xl`, `rounded-lg`).
- **Interactive Flow Visualizer**: Live architecture animator showcasing deterministic *Trigger → Ingestion → AI Logic → Action → Business Outcome* pipelines with simulated real-time payload inspection.
- **Resilient Persistence**: Client-side storage engine pre-seeded with 8 production-grade automation workflows, sample inbound leads, customer orders, and custom requirements.
- **n8n Webhook Bridge**: Automatic dispatch of signed POST payloads (`X-Offlo-Signature`) to external n8n webhook endpoints with full event logging and test-ping diagnostics.
- **Supabase Cloud Sync**: Live PostgreSQL integration via `@supabase/supabase-js`, environment variable support, interactive connection testing, and migration SQL scripts.
- **Protected Operations Admin**: Secure administrative console with passkey authentication (`offlo2026`) and one-click evaluator sign-in.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + `@vitejs/plugin-react`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: `motion` (v12)
- **Icons**: `lucide-react`
- **Database / Backend**: Supabase Cloud (`@supabase/supabase-js`) + LocalStorage fallback
- **Automation Target**: n8n, OpenAI Whisper, Google Gemini 1.5, Apollo API, Slack, HubSpot, Google Drive

---

## 🗺️ Application Routes

- `/` — Homepage: Architectural Display, Capabilities, Interactive Flow Visualizer, Catalog Grid, Protocol
- `/workflows` — Workflow Catalog: Filter by Category & Tech, Price/Popularity Sorting, Keyword Search
- `/workflows/:slug` — Workflow Detail: Inputs, Execution Sequence, Deliverables, Commercial License
- `/services` — Engineering Services: Capability Dossiers, Execution Flows, Deliverables, Delivery Tiers
- `/industries` — Vertical Solutions: Operational Comparisons for Agencies, E-Com, Sales, Legal, Real Estate
- `/about` — Studio Philosophy: Mission, n8n Open Stack Rationale, Fail-Safe Architecture
- `/contact` — Consultation & Intake: Process Scoping, Multi-Tool Selector, Budget Allocation
- `/terms` — Terms and Conditions: Commercial Licensing, Client Prerequisites, Disclaimers, Inquiries
- `/privacy` — Privacy Policy: Data Practices, Absence of Tracking Cookies, Local Storage, Rights
- `/admin` — Protected Operations Portal: Dashboard, Workflows CRUD, Leads Pipeline, Orders, Settings

