# Offlo Automations — Current Project State (`current-project-state.md`)

> **Last Updated**: October 2026  
> **Application Health**: 🟢 Production Ready — Compilation: Passed | Lint: Passed (0 errors)  
> **Core Stack**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion, Lucide Icons, Supabase JS

---

## 1. Executive Summary

**Offlo Automations** is a production-grade digital marketplace and operations engineering platform for business process automation. It provides end-to-end capabilities spanning public customer acquisition, workflow blueprint delivery, custom requirement scoping, and a secure internal operations management console.

All requested features from all previous development iterations have been fully implemented, tested, and verified:
- **Public Storefront**: Complete with 7 high-conversion pages (`Home`, `Workflows`, `WorkflowDetails`, `Services`, `Industries`, `About`, `Contact`).
- **Interactive Automation Visualizer**: 5-step animated pipeline simulation with real-time payload inspection.
- **Acquisition & Intake Modals**: `GetWorkflowModal` (3 delivery tiers), `RequestCustomModal` (multi-tool picker, frequency, budget), and `AdminAuthModal`.
- **Admin Operations Suite**: Complete suite covering `Dashboard`, `Workflows` (CRUD), `Leads` (sales pipeline), `Custom Requests` (intake queue), `Orders` (fulfillment tracker), and `Settings` (n8n webhook dispatch & Supabase cloud sync).
- **Design System Consistency**: Unified corner-rounding hierarchy (`rounded-2xl`, `rounded-xl`, `rounded-lg`, `rounded-full`), warm monochrome palette (`#E4E3E0`, `#0E0E0E`, `#CFCFCC`), and editorial typography (`Syne`, `Plus Jakarta Sans`, `JetBrains Mono`).

---

## 2. Architecture & File Structure

```text
/
├── index.html                   # HTML5 entry point with Google Fonts & SEO tags
├── metadata.json                # Project identity metadata & server-side API capabilities
├── package.json                 # Node dependencies (React 19, Vite, Tailwind v4, Lucide)
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite configuration with React & Tailwind CSS v4 plugins
├── design.md                    # Detailed UI design system & architectural specifications
├── current-project-state.md     # Current state, feature inventory, and health status
├── README.md                    # Root application documentation
│
└── src/
    ├── admin/                   # Operations console views
    │   ├── AdminAuthModal.tsx       # Passkey authentication dialog with 1-click demo access
    │   ├── AdminCustomRequests.tsx  # Bespoke requirements inspector and stage manager
    │   ├── AdminDashboard.tsx       # KPI metrics, revenue stats, and activity feeds
    │   ├── AdminLayout.tsx          # Shell with subheader tabs and live unread badges
    │   ├── AdminLeads.tsx           # Inbound lead qualification pipeline & notes editor
    │   ├── AdminOrders.tsx          # Workflow acquisition tracker and payment toggles
    │   ├── AdminSettings.tsx        # n8n webhook dispatcher & Supabase live integration
    │   ├── AdminWorkflows.tsx       # Workflow catalog CRUD and publishing toggles
    │   └── README.md                # Admin folder documentation
    │
    ├── assets/                  # Static media and graphics
    │   ├── images/                  # Image folder with architecture guidance
    │   │   └── README.md
    │   └── README.md
    │
    ├── components/              # Modular UI components
    │   ├── Footer.tsx               # 5-column editorial footer with status indicator
    │   ├── GetWorkflowModal.tsx     # 3-tier delivery model acquisition modal
    │   ├── InteractiveFlowVisualizer.tsx # 5-node animated pipeline simulator
    │   ├── Navbar.tsx               # 3-zone header with mobile drawer & admin trigger
    │   ├── RequestCustomModal.tsx   # Fast requirement intake modal
    │   ├── WorkflowCard.tsx         # Product card with pipeline preview & dual pricing
    │   └── README.md
    │
    ├── data/                    # Static schemas and data dictionaries
    │   └── README.md
    │
    ├── lib/                     # Persistence & external API integrations
    │   ├── storage.ts               # LocalStorage engine with pre-seeded datasets
    │   ├── supabase.ts              # Supabase cloud PostgreSQL client, test pings & schema
    │   ├── webhook.ts               # Signed n8n webhook dispatching & diagnostic tools
    │   └── README.md
    │
    ├── pages/                   # Storefront routes
    │   ├── About.tsx                # Company philosophy & n8n architecture rationale
    │   ├── Contact.tsx              # Deep lead intake form with multi-tool selector
    │   ├── Home.tsx                 # Main storefront with pain matrix, proof & visualizer
    │   ├── Industries.tsx           # Vertical solutions (Agencies, E-Com, Legal, etc.)
    │   ├── Privacy.tsx              # Complete Privacy Policy grounded in actual data practices
    │   ├── Services.tsx             # Custom automation engineering service lines
    │   ├── Terms.tsx                # Commercial Terms & Conditions with licensing parameters
    │   ├── WorkflowDetails.tsx      # Comprehensive workflow breakdown & deliverable list
    │   ├── Workflows.tsx            # Searchable catalog with filters & tech stack tags
    │   └── README.md
    │
    ├── types/                   # TypeScript interfaces
    │   ├── index.ts                 # Domain contracts (Workflow, Lead, Order, Settings, etc.)
    │   └── README.md
    │
    ├── App.tsx                  # Root router, popstate handler, and global modal bridge
    ├── index.css                # Tailwind CSS v4 setup, scrollbars, and typography rules
    ├── main.tsx                 # React 19 application mounting point
    └── README.md
```

---

## 3. Implemented Capabilities & Feature Status

| Module / Feature | Status | Description |
| :--- | :--- | :--- |
| **Storefront Hero & Proof** | ✅ Completed | High-impact typography, quantifiable guarantees, client metrics. |
| **Operational Drain Matrix** | ✅ Completed | 6 manual business frictions with quantified hours wasted. |
| **Interactive Flow Visualizer** | ✅ Completed | Animated 5-step pipeline simulation with payload inspector. |
| **Workflow Catalog (Grid)** | ✅ Completed | Category filtering, search query matching, tech stack selection. |
| **Workflow Details Page** | ✅ Completed | Step-by-step pipeline sequence, deliverable files list, ROI breakdown. |
| **Dual-Currency Engine** | ✅ Completed | Native support for ₹ INR and $ USD across all catalog items. |
| **3 Delivery Models** | ✅ Completed | Model A (Source JSON), Model B (Managed Ops), Model C (Hybrid Setup). |
| **Inbound Lead Intake** | ✅ Completed | Captures company, email, tools, frequency, and budget bracket. |
| **Bespoke Scoping Modal** | ✅ Completed | Quick-trigger modal accessible from navigation and card footers. |
| **Admin Authentication Gate** | ✅ Completed | Passkey verification (`offlo2026`) + 1-click reviewer sign-in. |
| **Admin Dashboard** | ✅ Completed | Real-time counts for Leads, Requests, Orders, and Settled Revenue. |
| **Admin Catalog CRUD** | ✅ Completed | Add/edit workflows, toggle published/draft state, delete records. |
| **Admin Leads Pipeline** | ✅ Completed | Stage progression (`New` → `Contacted` → `Qualified` → `Proposal` → `Won` / `Lost`) + internal notes. |
| **Admin Custom Scopes** | ✅ Completed | Full inquiry inspector with tool tags, frequency, and bottlenecks. |
| **Admin Orders Manager** | ✅ Completed | Payment status toggles (`Pending`, `Invoice Sent`, `Paid`) and delivery tracking. |
| **n8n Webhook Bridge** | ✅ Completed | Signed HTTP POST dispatch (`X-Offlo-Signature`), test ping console, and cURL generator. |
| **Supabase Cloud Sync** | ✅ Completed | Dynamic credentials setup, connection testing, and production DDL migration script. |
| **Unified Round Corners** | ✅ Completed | Cohesive `rounded-2xl`, `rounded-xl`, `rounded-lg`, `rounded-full` hierarchy. |
| **Terms and Conditions** | ✅ Completed | Dedicated `/terms` page matching design conventions, licensing, disclaimers. |
| **Privacy Policy** | ✅ Completed | Dedicated `/privacy` page detailing actual data practices, cookies, storage. |
| **Content Audit** | ✅ Completed | Strict removal of unsupported claims, fake numbers, and exaggerated guarantees while preserving design. |
| **Responsive Mobile Layout** | ✅ Completed | Full support for mobile, tablet, and widescreen desktop displays. |

---

## 4. Data Layer & Integrations

### 4.1 Persistence (`src/lib/storage.ts`)
- Pre-seeded with **8 enterprise-grade workflows**:
  1. *AI Inbound Lead Qualification & CRM Router*
  2. *Automated Invoice Extraction & Tally Sync*
  3. *Autonomous Customer Support Email Triager*
  4. *Multi-Source LinkedIn & Apollo Prospecting Pipeline*
  5. *Shopify Post-Purchase Logistics & WhatsApp Dispatch*
  6. *Meeting Audio Transcription & Action Item Delegator*
  7. *Contract & Agreement OCR Field Extractor*
  8. *Social Media Repurposing & Multi-Channel Publisher*
- Pre-seeded sample leads, custom requirements, and orders for immediate interactive testing.
- Automatic sync to browser `localStorage` on all mutations.

### 4.2 Webhook Dispatcher (`src/lib/webhook.ts`)
- Dispatches signed payloads to external n8n workflows.
- Signature header: `X-Offlo-Signature` (and `X-Operon-Signature`).
- Diagnostic test ping utility available directly in Admin Settings.
- Generates copyable cURL commands for importing into external API tools.

### 4.3 Supabase Integration (`src/lib/supabase.ts`)
- Direct integration with Supabase Cloud PostgreSQL database.
- Supports both environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and live runtime entry in the Admin Settings panel.
- Includes full SQL schema DDL (`SUPABASE_SQL_SCHEMA`) with Row Level Security (RLS) policies.

---

## 5. Build & Quality Verification

- **TypeScript Compilation**: `tsc --noEmit` exits with **0 errors**.
- **Vite Bundle Build**: `npm run build` succeeds cleanly.
- **Dependencies**: React 19, `@vitejs/plugin-react`, `motion` v12, `lucide-react`, `@supabase/supabase-js`, `clsx`, `tailwind-merge`.
- **Runtime Environment**: Vite dev server on port 3000, compatible with embedded iframe preview.

---

## 6. Access Credentials & Quick Reference

- **Admin Access URL**: Click "Admin" in top navigation or navigate to `/admin`.
- **Default Admin Key**: `offlo2026` (or click *"1-Click Demo Reviewer Access"*).
- **Session Duration**: Retained in `sessionStorage` for the active tab session.
