# Pages Directory (`/src/pages`)

This directory contains the primary route-level view components of the public-facing Offlo Automations platform.

---

## 📁 Page Inventory

| File | Route | Purpose & Key Sections |
| :--- | :--- | :--- |
| `Home.tsx` | `/` | **High-Conversion Storefront**: Hero with quantifiable proof guarantees, Operational Drain section (6 manual frictions with hours lost), Interactive Flow Visualizer, Featured Workflows, 5-stage Execution Roadmap, Industry highlights, and Final CTA. |
| `Workflows.tsx` | `/workflows` | **Workflow Catalog**: Real-time keyword search, category filter buttons (*All, Sales, Marketing, Operations, Customer Support, AI & Documents, E-Commerce*), tech stack selector, price sorting, and responsive card grid. |
| `WorkflowDetails.tsx` | `/workflows/:slug` | **Individual Product Page**: Inputs/outputs explanation, step-by-step pipeline sequence, connected tech tags, deliverable manifest, three acquisition models breakdown, and direct "Get This Workflow" CTA. |
| `Services.tsx` | `/services` | **Custom Engineering Services**: In-depth capability dossiers covering Lead Qualification Engines, Autonomous Support Agents, Document OCR, Outbound Orchestration, and Bespoke Internal Systems. |
| `Industries.tsx` | `/industries` | **Vertical Solutions**: Concrete before-and-after operational comparisons for Agencies, E-Commerce brands, Sales teams, Legal/Accounting, Real Estate, and Startups. |
| `About.tsx` | `/about` | **Company & Engineering Ethics**: Explains why n8n was chosen over closed-source SaaS, deterministic LLM safeguards, fail-safe error handling, and zero vendor lock-in. |
| `Contact.tsx` | `/contact` | **Lead Intake Engine**: Multi-field requirement form capturing customer process descriptions, tool multi-selector, frequency, and budget allocations. Automatically syncs with storage and fires n8n webhooks. |

---

## 🧭 Navigation & SEO

All pages are synchronized with the browser history stack via `window.history.pushState` in `App.tsx`, supporting standard back/forward navigation and shareable URLs. Page headings and layout structures strictly follow semantic HTML5 hierarchy (`<header>`, `<main>`, `<section>`, `<h1>`, `<h2>`).
