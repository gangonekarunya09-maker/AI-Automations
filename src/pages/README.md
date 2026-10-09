# Pages Directory (`/src/pages`)

This directory contains the primary route-level view components of the public-facing Offlo Automations platform.

> **Design & Style Reference**:
> See [`/design.md`](../../design.md) for full design standards. All page containers, comparison boxes, filter panels, and intake forms feature the cohesive `rounded-2xl` and `rounded-xl` geometry and editorial typographic hierarchy (`Syne` headers + `Plus Jakarta Sans` body).

---

## 📁 Page Inventory

| File | Route | Purpose & Key Sections |
| :--- | :--- | :--- |
| `Home.tsx` | `/` | **High-Conversion Storefront**: Hero with quantifiable proof guarantees, Operational Drain section (6 manual frictions with hours lost), Interactive Flow Visualizer, Featured Workflows grid, 5-stage Execution Roadmap, Industry highlights, and Final CTA. |
| `Workflows.tsx` | `/workflows` | **Workflow Catalog**: Real-time keyword search, category filter buttons (*All, Sales, Marketing, Operations, Customer Support, AI & Documents, E-Commerce*), tech stack selector, price sorting, and responsive `rounded-2xl` card grid. |
| `WorkflowDetails.tsx` | `/workflows/:slug` | **Individual Product Page**: Inputs/outputs explanation, step-by-step pipeline sequence, connected tech tags, deliverable manifest, three acquisition models breakdown, and direct "Get This Workflow" CTA. |
| `Services.tsx` | `/services` | **Custom Engineering Services**: In-depth capability dossiers covering Lead Qualification Engines, Autonomous Support Agents, Document OCR, Outbound Orchestration, and Bespoke Internal Systems. |
| `Industries.tsx` | `/industries` | **Vertical Solutions**: Concrete before-and-after operational comparisons for Agencies, E-Commerce brands, Sales teams, Legal/Accounting, Real Estate, and Startups. |
| `About.tsx` | `/about` | **Company & Engineering Ethics**: Explains why n8n was chosen over closed-source SaaS, deterministic LLM safeguards, fail-safe error handling, and zero vendor lock-in. |
| `Contact.tsx` | `/contact` | **Lead Intake Engine**: Multi-field requirement form capturing customer process descriptions, tool multi-selector, frequency, and budget allocations. Automatically syncs with storage, fires n8n webhooks, and connects to Supabase. |
| `Terms.tsx` | `/terms` | **Terms and Conditions**: Commercial licensing parameters, digital blueprint ownership rules, client prerequisites, warranty disclaimers, and contact information. |
| `Privacy.tsx` | `/privacy` | **Privacy Policy**: Transparent data practices detailing form information collected, local browser storage usage, absence of tracking cookies, n8n/Supabase integration scope, and user data rights. |

---

## 🧭 Navigation & SEO

- **HTML5 History Routing**: All pages synchronize with the browser history stack via `window.history.pushState` in `App.tsx`, supporting native browser back/forward buttons and direct shareable deep links.
- **Semantic Structure**: Page headings and layout structures strictly follow semantic HTML5 hierarchy (`<header>`, `<main>`, `<section>`, `<h1>`, `<h2>`, `<article>`).
- **Responsive Layout**: Fluid column grids scale from mobile screens up to 4K displays with zero layout shift (CLS = 0).

