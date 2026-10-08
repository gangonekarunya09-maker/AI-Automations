# Admin Operations Portal (`/src/admin`)

This directory contains the private administrative interface used by the Operon team to manage products, monitor the sales pipeline, review customer requirements, track workflow orders, and configure webhook integrations.

---

## 📁 Component Breakdown

| File | Purpose | Key Functionality |
| :--- | :--- | :--- |
| `AdminAuthModal.tsx` | Access gate dialog | Enforces passkey authentication (`operon2026`) and provides a 1-click **Quick Reviewer Access** button for instant evaluation. Persists session state in `sessionStorage`. |
| `AdminLayout.tsx` | Master shell layout | Fixed top bar with wordmark, system health pill, return-to-site link, and responsive tab navigation with live badge counts for new leads and pending requests. |
| `AdminDashboard.tsx` | Executive overview | Top-level KPI cards (Total Leads, Custom Requests, Workflow Orders, Realized Revenue in ₹), pipeline stage distribution, and recent activity feeds. |
| `AdminWorkflows.tsx` | Catalog management (CRUD) | Add new workflows, edit metadata (price, tech stack, descriptions), toggle visibility (`published` vs `draft`), feature flag management, and deletion controls. |
| `AdminLeads.tsx` | Inbound pipeline manager | Table and inspector view for inbound inquiries. Supports stage progression (`New` → `Contacted` → `Qualified` → `Proposal` → `Won` / `Lost`) and internal operational notes. |
| `AdminCustomRequests.tsx` | Bespoke requirements queue | In-depth inspector for custom process descriptions, tools selected (Gmail, WhatsApp, Excel, etc.), task frequency, and budget allocations. |
| `AdminOrders.tsx` | Orders & inquiries tracker | Delivery model classification (`workflow_json`, `hybrid`, `managed`), payment status toggles (`Pending`, `Invoice Sent`, `Paid`), and setup fulfillment status. |
| `AdminSettings.tsx` | Configuration & Diagnostics | Configures the target n8n webhook URL, secret signing key, notification email, live **Trigger Test Ping** diagnostic tool, recent execution history, and copyable cURL commands. |

---

## 🔐 Security & Access Control

Admin views are protected by `AdminAuthModal.tsx`:
- Default PIN: `operon2026` or `admin`.
- Session token `operon_admin_authenticated` is stored in browser `sessionStorage` (isolated to current tab session).
- Sensitive API keys are never stored in client code; requests are dispatched via signed webhook payloads (`X-Operon-Signature`) to external n8n instances.
