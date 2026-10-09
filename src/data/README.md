# Data Directory (`/src/data`)

This directory is designated for static data dictionaries, CSV/JSON seed fixtures, mock data schemas, and integration schemas.

> **Project References**:
> - 📊 See [`/current-project-state.md`](../../current-project-state.md) for pre-seeded workflow catalog inventory.
> - 📐 See [`/design.md`](../../design.md) for data field presentation standards.

---

## 📁 Architecture Note

In the architecture of Offlo Automations:
- **Core Seed Datasets**: Datasets (including the 8 production workflows, sample inbound leads, customer orders, custom scoping inquiries, and application configuration) are structured in `src/lib/storage.ts` to provide immediate, synchronous local hydration, schema validation, and CRUD operations.
- **Workflow Blueprints & Manifests**: Raw n8n JSON pipeline definitions, downloadable workflow exports, and integration payloads are registered in alignment with the `Workflow` domain model defined in `src/types/index.ts`.
- **Supabase SQL DDL Schema**: The relational database migration script (`SUPABASE_SQL_SCHEMA`) is available in `src/lib/supabase.ts` for instant provisioning and cloud synchronization.

