# Offlo Automations — Production Web Application

> **Intelligent Business Process Automation & Workflow Marketplace**  
> Built with React 19, TypeScript, Vite, Tailwind CSS v4, Motion, and Lucide Icons.

---

## 📌 Overview

Offlo Automations is a high-performance, conversion-engineered digital platform for an AI and business automation technology company. It acts simultaneously as:
1. **A professional corporate storefront** communicating high-impact business outcomes (*"Automate Your Business Without Hiring Another Person"*).
2. **A workflow & digital product catalog** with battle-tested n8n templates, transparent dual-currency pricing (₹ INR & $ USD), and three flexible delivery models (Source JSON, Hybrid Setup, Managed Ops).
3. **An inbound lead generation & scoping engine** with multi-attribute questionnaires, instant feedback, and webhook forwarding.
4. **An operations admin portal** with live pipeline management (Leads, Custom Requests, Orders, Catalog CRUD, and n8n Webhook configuration).

---

## 📂 Project Directory Structure

```text
/
├── index.html              # HTML5 entry point with SEO metadata and Google Fonts
├── metadata.json           # Application identity & permission specifications
├── package.json            # Dependencies and build script declarations
├── tsconfig.json           # Strict TypeScript compiler options & path aliases
├── vite.config.ts          # Vite build, React plugin & Tailwind CSS v4 setup
├── README.md               # Root application architecture documentation
│
└── src/                    # Frontend application source code
    ├── admin/              # Private operations portal & administration views
    ├── assets/             # Media and static image assets
    ├── components/         # Reusable UI components, navigation, and modals
    ├── data/               # Seed datasets and data schemas
    ├── lib/                # Storage engine and n8n webhook dispatcher
    ├── pages/              # Public storefront pages and routes
    ├── types/              # TypeScript interfaces and domain models
    ├── App.tsx             # Root router, modal controller, and state bridge
    ├── index.css           # Tailwind CSS v4 theme, font pairings, and scrollbars
    └── main.tsx            # React 19 DOM bootstrap mounting point
```

---

## 🚀 Key Features

- **Anti-AI Slop & Editorial Design Constitution**: Strict adherence to domain-native typography (`Syne` display + `Plus Jakarta Sans` body), zero-pill unboxed metadata, tabular numerals for monetary values, and single-line controls.
- **Interactive Flow Visualizer**: Live architecture animator showcasing deterministic *Trigger → Ingestion → AI Logic → Action → Business Outcome* pipelines with simulated real-time payload inspection.
- **Resilient Persistence**: Client-side storage engine pre-seeded with 8 production-grade automation workflows, sample inbound leads, customer orders, and custom requirements.
- **n8n Webhook Bridge**: Automatic dispatch of signed POST payloads (`X-Offlo-Signature`) to external n8n webhook endpoints with full event logging and test-ping diagnostics.
- **Protected Operations Admin**: Secure administrative console with passkey authentication (`offlo2026`) and one-click evaluator sign-in.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + `@vitejs/plugin-react`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: `motion` (v12)
- **Icons**: `lucide-react`
- **Automation Target**: n8n, OpenAI Whisper, Google Gemini 1.5, Apollo API, Slack, HubSpot, Google Drive
