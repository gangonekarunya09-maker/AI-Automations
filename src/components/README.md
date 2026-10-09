# Components Directory (`/src/components`)

This directory houses modular, production-ready React components utilized across both public marketing pages and user workflows.

> **Design & Style Reference**:
> See [`/design.md`](../../design.md) for complete component geometry and typography specifications. All modals and cards follow the `rounded-2xl` container standard, with inputs and buttons using `rounded-xl` and `rounded-lg`.

---

## 📁 Component Inventory

| Component | Responsibility | Architectural Rules Enforced |
| :--- | :--- | :--- |
| `Navbar.tsx` | Top navigation header | **Strict 3-zone contract**: Zone 1 (Brand wordmark + system status indicator), Zone 2 (5 clean text links with active indicator), Zone 3 (`+ CUSTOM AUTOMATION` action button + Admin link). Responsive mobile drawer. |
| `Footer.tsx` | Global site footer | 5-column editorial footer with catalog shortcuts, company ethics, n8n architecture links, live operational status indicator, and rounded custom inquiry CTA. |
| `WorkflowCard.tsx` | Product presentation card | **Zero-Pill discipline**: Unboxed metadata tags separated by `·` and `/`. Interactive 3-stage mini pipeline diagram, `rounded-2xl` border frame, quantified business benefit, favorite heart toggle, and dual pricing (₹ INR & $ USD). |
| `InteractiveFlowVisualizer.tsx` | Dynamic architecture animator | Interactive visualizer showcasing the 5-step automation engine (*Trigger → Ingestion → AI Logic → Action → Outcome*). Includes 3 workflow preset switchers, live payload inspector, and execution telemetry stream. |
| `GetWorkflowModal.tsx` | Workflow acquisition modal | Enables users to acquire ready-made workflows under 3 delivery models: **Model A (Source JSON)**, **Model C (Hybrid Setup)**, or **Model B (Managed Ops)**. Dispatches inquiries to n8n webhook and records orders. Styled with `rounded-2xl` container and `rounded-xl` input fields. |
| `RequestCustomModal.tsx` | Quick custom automation dialog | Fast-intake modal accessible from any page. Multi-tool selector (Gmail, Sheets, Tally, WhatsApp, HubSpot), execution frequency, and budget brackets. Dispatches leads to n8n and logs inquiries into storage. |

---

## 📐 Design System Standards

- **Uniform Geometry**: Container panels feature `rounded-2xl` (16px), controls feature `rounded-xl` (12px), and minor toggles feature `rounded-lg` (8px).
- **Single-Line Controls**: All action buttons and tabs enforce `whitespace-nowrap` with truncation safety.
- **Micro-Interactions**: Hover and click interactions settle in $\le 200\text{ms}$ using smooth easing transitions (`transition-all duration-200`).
- **WCAG AA Compliance**: High-contrast typography (`#0E0E0E` on `#FFFFFF` / `#E4E3E0`), semantic `<label>` associations, and visible focus rings on inputs.

