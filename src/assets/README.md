# Assets Directory (`/src/assets`)

This directory houses static visual media, graphic assets, and architectural diagram resources referenced across the Offlo Automations application.

> **Design & Style Reference**:
> See [`/design.md`](../../design.md) for the complete visual identity system, color tokens, and layout guidelines.

---

## 📁 Subdirectories

- **`images/`**: Contains visual asset guidelines, code-driven diagram philosophies, and documentation regarding raster asset management. See [`images/README.md`](./images/README.md).

---

## 🎨 Asset Philosophy & Usage Guidelines

1. **Code-Driven Over Stock Imagery**:
   - The application prioritizes interactive SVG topologies, animated flow nodes, and live telemetry previews over generic third-party stock photos.
   - Vector-rendered pipeline paths provide 100% sharp clarity on high-DPI retina displays with zero bandwidth latency.
2. **Standard Aspect Ratios** (when raster media is deployed):
   - `16:9` for cinematic hero banners and landscape preview cards.
   - `4:3` for workflow architecture schematics and dashboard previews.
   - `1:1` for square technology logos and developer avatars.
3. **Resilience & Zero CLS**:
   - Always specify explicit aspect ratios and `alt` descriptions to eliminate Cumulative Layout Shift (CLS).
   - Never rely on fragile unauthenticated third-party CDN image URLs.

