# Offlo Automations — Design System & UI Specification (`design.md`)

> **Design Philosophy**: Technical Precision meets Editorial Brutalism.  
> Inspired by high-end engineering studios (Linear, Fluxwork, Teenage Engineering) and architectural typography.

---

## 1. Design Vision & Guiding Principles

Offlo Automations rejects generic corporate "SaaS slop" (floating pastel blobs, generic illustrations, low-contrast gradients, rounded floating cards with giant drop shadows). Instead, it adopts a deterministic, high-trust engineering aesthetic designed for enterprise leaders, founders, and operations directors who demand reliable, production-grade business automation.

### Core Tenets:
1. **Mathematical Structure & Information Density**: Information is laid out with precision gridlines, tabular alignment, and clear visual hierarchies.
2. **Deterministic UI over Fluff**: Real-time state indicators, execution node graphs, telemetry streams, and code-native tokens replace generic stock imagery.
3. **Intentional Rounding Hierarchy**: Sharp mechanical geometry tempered with consistent, organic rounded corners (`rounded-2xl`, `rounded-xl`, `rounded-lg`) that feel polished and modern.
4. **Editorial Typography**: Pairing an assertive, high-personality display typeface with a crisp, geometric sans-serif and an engineer-grade monospace font.
5. **Dual Currency & Tabular Alignment**: Dual currency presentation (₹ INR & $ USD) using monospace or tabular numerals to maintain columnar scanning.

---

## 2. Color System & Surface Hierarchy

The interface operates on an organic monochrome palette featuring warm greys, deep charcoal-black, and surgical borders.

### 2.1 Palette Tokens

| Token Name | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| `Canvas / Background` | `#E4E3E0` | Base atmospheric background for the application canvas. |
| `Surface Default` | `#FFFFFF` | Primary card, modal, and data table surface. |
| `Surface Subdued` | `#F6F5F3` | Table headers, secondary toolbars, filter bars, code blocks, and subtle badges. |
| `Border Muted` | `#CFCFCC` | Standard structural border separating panels, columns, and list items. |
| `Border Strong` | `#0E0E0E` | Active states, hover focus states, and primary framing containers. |
| `Text Primary` | `#0E0E0E` | High-contrast body text, headlines, and primary actions. |
| `Text Muted` | `#6B6B6B` | Secondary descriptions, timestamps, technical subtitles, and inactive labels. |
| `Accent / Jet Black` | `#0E0E0E` | Primary CTAs, active status chips, and header bars. |
| `Accent Hover` | `#222222` | Hover state for dark primary buttons. |

---

## 3. Typography System

The application loads Google Fonts directly in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
```

### 3.1 Font Families

- **Display & Hero Titles**: `Syne, sans-serif` (`font-extrabold`, uppercase tracking tight)
  - Used for large headline banners, page hero statements, and section intros.
  - Characterized by architectural geometric curves and editorial punch.
- **Body & UI Elements**: `Plus Jakarta Sans, sans-serif` (`font-medium`, `font-semibold`, `font-bold`)
  - Used for navigation, product descriptions, modal forms, table data, and metadata.
  - Offers superior legibility at small sizes (10px–13px) with high x-height.
- **Telemetry & Technical Specs**: `JetBrains Mono, monospace`
  - Used for payload schemas, cURL commands, execution runtimes, webhook secrets, and flow sequence steps.

### 3.2 Typographic Hierarchy Scale

| Role | Class Configuration | Typical Usage |
| :--- | :--- | :--- |
| **Eyebrow / Subhead** | `text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6B6B]` | Section categorizations, system statuses. |
| **Hero Title** | `text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#0E0E0E]` | Homepage hero and major landing headers. |
| **Section Title** | `text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0E0E0E]` | Section titles, modal titles. |
| **Card Heading** | `text-base sm:text-lg font-bold uppercase tracking-tight text-[#0E0E0E]` | Workflow card titles, service capability headers. |
| **Body Primary** | `text-sm text-[#0E0E0E] leading-relaxed` | Main paragraphs and explanatory overviews. |
| **Body Secondary** | `text-xs text-[#6B6B6B] leading-relaxed` | Card descriptions, help text, table subtitles. |
| **Micro Caption** | `text-[10px] sm:text-[11px] font-semibold text-[#6B6B6B]` | Flow node labels, price tiers, author tags. |

---

## 4. Geometry & Rounded Corner Hierarchy

To maintain consistency across both the **Public Storefront** and the **Admin Console**, a strict corner radius system is applied across all components:

```text
┌────────────────────────────────────────────────────────┐
│  Container / Modal / Large Panel: rounded-2xl (16px)   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Interactive Block / Input / Card: rounded-xl    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Button / Filter Pill / Dropdown: rounded-lg│  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │  Status Tag / Badge: rounded-full     │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

1. **`rounded-2xl` (16px)**:
   - Primary data tables (`AdminOrders`, `AdminLeads`, `AdminWorkflows`).
   - Major cards and inspector sidebars (`AdminDashboard` metric cards, `AdminCustomRequests` detail panel).
   - Modal overlay containers (`RequestCustomModal`, `GetWorkflowModal`, `AdminAuthModal`).
   - Storefront showcase cards (`WorkflowCard`, `InteractiveFlowVisualizer`).
2. **`rounded-xl` (12px)**:
   - Form inputs (`<input>`, `<textarea>`, `<select>`).
   - Action buttons with large click targets (`h-11`, `h-12`).
   - Nested sub-cards (Recent leads list items, contact brief boxes, note draft areas).
   - Filter bar containers (holding sub-buttons).
3. **`rounded-lg` (8px)**:
   - Inner filter selection buttons (`All`, `Pending`, `Delivered`).
   - Status toggle controls (e.g. `Draft` / `Published`).
   - Navigation links and header buttons (`Return to Site`, `Sign Out`).
   - Technology stack chips inside detail panels.
4. **`rounded-full` (9999px)**:
   - Status indicators (`New`, `Qualified`, `Delivered`, `Paid`).
   - Notification counter badges on admin tabs (`Leads [2]`, `Requests [1]`).
   - Circular action buttons (Close `X`, Favorite Heart).

---

## 5. Component Patterns & UI Architecture

### 5.1 Public Storefront Navigation (`Navbar.tsx`)
- **Zone 1 (Brand)**: Single bold wordmark `OFFLO.` with subtle monospace badge (`SYS_v1.4`).
- **Zone 2 (Links)**: Clean, unbordered text links (`Workflows`, `Services`, `Industries`, `About`, `Contact`). Hover reveals subtle underlines without jarring height shifts.
- **Zone 3 (Actions)**: Direct CTA button (`+ CUSTOM AUTOMATION`) that opens the interactive requirement intake modal, alongside an unobtrusive `Admin` console access toggle.

### 5.2 Product Presentation (`WorkflowCard.tsx`)
- **Zero-Pill Header**: Unboxed category and ID taxonomy (`SALES // WF-01`).
- **Interactive Flow Preview**: Mini 3-stage visual path showing `01 Trigger` → `02 Logic` → `03 Target` with monospace arrows.
- **Quantified Benefit**: Bordered quote block displaying measurable impact (e.g., *"Eliminates 14 hours/week of manual lead enrichment"*).
- **Dual-Currency Footer**: Primary price in ₹ INR alongside USD reference, with direct "Details" link and quick "Get" button.

### 5.3 Interactive Flow Visualizer (`InteractiveFlowVisualizer.tsx`)
- **5-Node Pipeline Architecture**:
  1. `TRIGGER` (Inbound Webhook / Scheduled Event)
  2. `INGESTION` (Data normalization & payload parsing)
  3. `AI LOGIC` (Deterministic LLM prompt execution & decision tree)
  4. `ACTION` (External API dispatch to CRM / Slack / DB)
  5. `OUTCOME` (Quantified operational time saved)
- **Real-Time Simulation**: Animated pulse tracing the active node with realistic telemetry payload preview in monospace formatting.

### 5.4 Admin Operations Console
- **Cohesive Workspace**: Dark slate top bar with system health diagnostic indicator and rapid return-to-site control.
- **Pill Tab Bar**: Clean horizontal pill navigation featuring real-time unread badges for pending leads and custom requests.
- **Uniform Table Architecture**:
  - `bg-[#F6F5F3]` uppercase headers with `tracking-[0.16em]`.
  - Subtle row hover transitions (`hover:bg-[#F6F5F3]`).
  - Native status dropdowns styled with rounded corners and high-contrast color shifts (`Paid`, `Invoice Sent`, `Pending`).
- **Inspector Panels**: Two-column layout in Leads and Custom Requests featuring instant detail loading, inline note saving, and stage progression controls.

---

## 6. Interaction & Motion Standards

- **Transitions**: Smooth 150ms–200ms ease transitions (`transition-all duration-200`) applied to borders, background colors, and subtle box shadows.
- **Button Micro-States**: Buttons feature active compression (`active:scale-[0.99]`) and high-contrast focus rings for keyboard navigation.
- **Scrollbars**: Ultra-thin custom scrollbars in `index.css` styled to match the warm paper aesthetic (`#CFCFCC` thumb over transparent track).
- **Responsive Fluidity**: All grid layouts transition gracefully from single-column mobile layouts (`grid-cols-1`) to tablet (`sm:grid-cols-2`) and desktop (`lg:grid-cols-3` or `lg:grid-cols-4`).

---

## 7. Accessibility & Engineering Quality

- **Contrast Ratios**: Body text (`#0E0E0E` on `#FFFFFF` / `#E4E3E0`) achieves a contrast ratio $> 11:1$, well above WCAG AAA.
- **Semantic Markup**: All headers utilize strict semantic order (`h1` → `h2` → `h3`), tables use semantic `<thead>` / `<tbody>` structures, and inputs maintain explicit labels.
- **Zero External Fragility**: System utilizes code-driven vector schematics and Lucide SVG icons instead of external CDN images that could fail or load with latency.
