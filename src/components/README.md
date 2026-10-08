# Components Directory (`/src/components`)

This directory houses modular, production-ready React components utilized across both public marketing pages and user workflows.

---

## 📁 Component Inventory

| Component | Responsibility | Architectural Rules Enforced |
| :--- | :--- | :--- |
| `Navbar.tsx` | Top navigation header | **Strict 3-zone contract**: Zone 1 (Single-element brand wordmark), Zone 2 (4–5 clean text links with active indicator), Zone 3 (1–2 primary action buttons). Responsive mobile drawer. |
| `Footer.tsx` | Global site footer | Quiet 5-column editorial footer with catalog shortcuts, company ethics, n8n architecture links, system health indicator, and legal notices. |
| `WorkflowCard.tsx` | Product presentation card | **Zero-Pill discipline**: Unboxed metadata tags separated by `·` and `/`. Displays category, tech stack, quantified business benefit, and price in ₹ INR & $ USD. |
| `InteractiveFlowVisualizer.tsx` | Dynamic architecture animator | Interactive visualizer showcasing the 5-step automation engine (*Trigger → Ingestion → AI Logic → Action → Outcome*). Includes preset switcher and live payload inspector. |
| `GetWorkflowModal.tsx` | Workflow acquisition modal | Enables users to acquire ready-made workflows under 3 delivery models: **Model A (Source JSON)**, **Model C (Hybrid Setup)**, or **Model B (Managed Ops)**. Dispatches inquiries to n8n webhook and records orders. |
| `RequestCustomModal.tsx` | Quick custom automation dialog | Fast-intake modal accessible from any page. Captures process description, selected tools, execution frequency, and budget range. |

---

## 📐 Design System Standards

- **Single-Line Controls**: All action buttons and tabs enforce `whitespace-nowrap` with truncation safety.
- **Micro-Interactions**: Hover and click interactions settle in $\le 200\text{ms}$ using smooth easing transitions.
- **WCAG Accessibility**: Contrast meets WCAG AA standards; all form fields feature semantic labels and visible focus borders.
