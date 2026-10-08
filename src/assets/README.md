# Assets Directory (`/src/assets`)

This directory houses static visual media, graphic assets, and generated imagery referenced across the Operon Automations application.

---

## 📁 Subdirectories

- **`images/`**: Contains high-fidelity photographic and architectural visual assets generated specifically for the marketing storefront and workflow showcases.

---

## 🎨 Asset Usage Guidelines

1. **Aspect Ratios**:
   - `16:9` for cinematic hero banners and landscape cards.
   - `4:3` for workflow architecture cards and dashboard previews.
   - `1:1` for square product icons and developer avatars.
2. **Resilience**: Always apply `referrerPolicy="no-referrer"` and descriptive `alt` text to `<img>` tags.
3. **No Fragile External Hosts**: All images are stored locally to prevent broken image frames or CDN rate limits.
