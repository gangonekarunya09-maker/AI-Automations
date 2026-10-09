# Admin Operations Portal (`/src/admin`)

This directory contains the private administrative interface used by the Offlo team to manage products, monitor the sales pipeline, review customer requirements, track workflow orders, configure webhook integrations, and manage Supabase database connections.

> **Design & Style Standard**:
> All admin views adhere strictly to the **Unified Admin UI** standard defined in [`/design.md`](../../design.md):
> - **Containers & Table Wrappers**: `rounded-2xl` with subtle border `#CFCFCC` and `shadow-sm`.
> - **Input Fields & Textareas**: `rounded-xl` with clear focus border `#0E0E0E`.
> - **Primary & Action Buttons**: `rounded-xl` with single-line labels.
> - **Filter Group Buttons & Toggles**: `rounded-lg` inside `rounded-xl` container bars.
> - **Status Tags & Count Badges**: `rounded-full` with high-contrast text.

---

## 📁 Component Breakdown

| File | Purpose | Key Functionality |
| :--- | :--- | :--- |
| `AdminAuthModal.tsx` | Access gate dialog | Enforces passkey authentication (`offlo2026`) and provides a 1-click **Quick Reviewer Access** button for instant evaluation. Persists session state in `sessionStorage`. |
| `AdminLayout.tsx` | Master shell layout | Dark navigation bar with wordmark, system version pill (`V1.4 PROD`), return-to-site link, and responsive pill tab navigation with live badge counts for new leads and pending requests. |
| `AdminDashboard.tsx` | Executive overview | Top-level KPI cards (Total Leads, Custom Requests, Workflow Orders, Realized Revenue in ₹), two-column recent pipeline views, and quick navigation shortcuts. |
| `AdminWorkflows.tsx` | Catalog management (CRUD) | Add new workflows, edit metadata (price, tech stack, descriptions), toggle visibility (`published` vs `draft`), feature flag management, and deletion controls. |
| `AdminLeads.tsx` | Inbound pipeline manager | Table and inspector view for inbound inquiries. Supports stage progression (`New` → `Contacted` → `Qualified` → `Proposal` → `Won` / `Lost`) and internal operational notes. |
| `AdminCustomRequests.tsx` | Bespoke requirements queue | In-depth inspector for custom process descriptions, tools selected (Gmail, WhatsApp, Excel, etc.), task frequency, budget allocations, and stage transitions. |
| `AdminOrders.tsx` | Orders & inquiries tracker | Delivery model classification (`workflow_json`, `hybrid`, `managed`), payment status toggles (`Pending`, `Invoice Sent`, `Paid`), and setup fulfillment status. |
| `AdminSettings.tsx` | Configuration & Diagnostics | Configures target n8n webhook URL, signing key, notification email, test-ping diagnostic utility, copyable cURL commands, and **Supabase Cloud API** connection management. |

---

## 🔐 Security & Access Control

Admin views are protected by `AdminAuthModal.tsx`:
- **Default PIN**: `offlo2026` or `admin`.
- **Session Persistence**: Session token `offlo_admin_authenticated` is stored in browser `sessionStorage` (isolated to current tab session).
- **Zero Exposed Secrets**: Requests to n8n are dispatched via signed webhook payloads (`X-Offlo-Signature`). Supabase API tokens are configured either through Vite environment variables or in-memory settings.

