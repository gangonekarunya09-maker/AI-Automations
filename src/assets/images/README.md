# Asset Directory Architecture (`/src/assets/images`)

Offlo Automations utilizes an entirely **image-free, code-driven visual architecture** inspired by technical studio aesthetics (*Linear*, *Fluxwork*, *Teenage Engineering*).

> **Design & Style Reference**:
> See [`/design.md`](../../../design.md) for complete visual hierarchy, typography pairings, and layout grid guidelines.

---

### 🎨 Design Philosophy
- **Zero Static Raster Images**: No external JPGs, PNGs, or third-party stock photos that introduce network latency or layout shifts.
- **Code-Driven Data Flow Diagrams**: Real-time interactive pipeline topologies (`InteractiveFlowVisualizer.tsx`), mini 3-stage flow schematics (`WorkflowCard.tsx`), live telemetry monitors, and clean monospace metadata badges.
- **Superior Performance & Zero CLS**: Instant rendering with 100% vector precision on high-DPI displays.
- **Deterministic Aesthetics**: System status indicators, live webhook simulation consoles, and mathematical typography gridlines.

---

### 📦 Future Static Asset Ingestion
If bespoke brand collateral (e.g. SVG company trademarks, favicon packages, OG social cards) is added in future iterations:
1. Store assets in SVG format whenever possible.
2. Maintain standard naming conventions (`offlo_wordmark.svg`, `offlo_mark.svg`).
3. For raster preview fallbacks, maintain exact `1200x630` dimensions for OpenGraph cards.


