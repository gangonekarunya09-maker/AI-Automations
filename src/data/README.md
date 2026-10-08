# Data Directory (`/src/data`)

This directory is designated for static data dictionaries, CSV/JSON seed fixtures, and integration schemas.

---

## 📁 Architecture Note

In the V1 architecture of Offlo Automations:
- Core seed datasets (such as `INITIAL_WORKFLOWS`, `INITIAL_LEADS`, `INITIAL_CUSTOM_REQUESTS`, `INITIAL_ORDERS`, and `INITIAL_SETTINGS`) are structured and maintained in `src/lib/storage.ts` to support instant local persistence, schema validation, and CRUD operations.
- As the application scales into V2 (with additional n8n workflow JSON blueprints, raw template exports, and downloadable fixtures), static JSON manifests and pre-packaged workflow bundles are placed in this directory.
