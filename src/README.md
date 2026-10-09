# Source Directory (`/src`)

This folder houses the entire client-side application code for **Offlo Automations**.

> **Design & State Reference**:
> - 📐 **Design Constitution**: See [`/design.md`](../design.md) for typography, color tokens, and rounded corner hierarchies.
> - 📊 **Project State**: See [`/current-project-state.md`](../current-project-state.md) for live feature inventory and compilation status.

---

## 📁 Directory Layout

| Directory / File | Description |
| :--- | :--- |
| `admin/` | Private management portal views (Dashboard, Workflows CRUD, Leads pipeline, Orders, Custom Requests, Settings & Webhooks, Supabase config). |
| `assets/` | Static visual assets, code-driven diagram philosophies, and brand graphics. |
| `components/` | Reusable presentational & interactive components (Navbar, Footer, Modals, Workflow Card, Flow Visualizer). |
| `data/` | Initial seed data schemas and static fixtures. |
| `lib/` | Core business logic utilities: local persistence layer (`storage.ts`), webhook integration (`webhook.ts`), and Supabase PostgreSQL client (`supabase.ts`). |
| `pages/` | Public page views (`Home`, `Workflows`, `WorkflowDetails`, `Services`, `Industries`, `About`, `Contact`). |
| `types/` | Domain-wide TypeScript type definitions and data contracts. |
| `App.tsx` | Root application orchestrator: routing state, popstate listener, global modal toggling, and data refresh cycles. |
| `main.tsx` | React 19 DOM bootstrap mounting `App` into `#root`. |
| `index.css` | Global styling, font definitions (`Syne`, `Plus Jakarta Sans`, `JetBrains Mono`), and subtle box-shadow / scrollbar rules via Tailwind CSS v4. |

---

## 🔄 Application Lifecycle & Routing Flow

1. **Bootstrap**: `main.tsx` mounts `App.tsx` into the DOM.
2. **Path & Route Resolution**: `App.tsx` manages a lightweight, SEO-friendly HTML5 History router (`window.location.pathname`).
   - `/`: Renders the high-conversion Homepage (`Home.tsx`).
   - `/workflows`: Renders the product catalog (`Workflows.tsx`).
   - `/workflows/:slug`: Renders dedicated workflow detail pages (`WorkflowDetails.tsx`).
   - `/services`: Renders the custom automation engineering breakdown (`Services.tsx`).
   - `/industries`: Renders industry-tailored use cases (`Industries.tsx`).
   - `/about`: Renders company philosophy and n8n architectural advantages (`About.tsx`).
   - `/contact`: Renders the serious lead generation & requirement intake form (`Contact.tsx`).
   - `/admin/*`: Access-controlled management portal with passkey authentication (`AdminAuthModal.tsx`).
3. **Data Hydration**: Default records (workflows, leads, custom requests, orders) are lazily loaded from `Storage` in `lib/storage.ts` and synced across views. Optional Supabase cloud synchronization runs in parallel.
4. **Modal Layer**: Global modals (`GetWorkflowModal`, `RequestCustomModal`, `AdminAuthModal`) are mounted at the top-level of `App.tsx`, eliminating layout shifts and z-index collisions.

