# LibreTV project instructions

Read `TODO.md` for current work and `docs/LOCALIZATION.md` for the bilingual interface.

- The LibreTV architect owns this project's coordination and release. The LibreTV `2 | Web Dev` chat owns assigned application changes.
- The owner explicitly requested no messages to other projects unless work affects the production server. Manage LibreTV staging here; do not notify or request acknowledgment from the ERPNext chats for routine LibreTV work.
- Reuse the existing deployment in `../ERPNextInfrastructure/deploy/libretv/` and its `scripts/libretv_*.py`. Do not run this checkout's generic Compose deployment against the shared server.
- Before remote mutations, record the bounded staging assignment and sole mutation owner in `../ERPNextInfrastructure/INITIAL_PLAN.md`. The LibreTV architect manages and releases that staging record directly. Never assume a second agent may mutate the same host concurrently.
- Build application images outside staging. Preserve the pinned artifact, private runtime/defaults, credentials/signing key, 256 MiB / 0.35 CPU limits, network isolation and shared HTTPS integration. App upgrades use the app-only release procedure.
- Keep production, ERP data/volumes, shared certificate storage, host upgrades and hostwide Docker cleanup outside routine LibreTV scope. Shared-file changes need an explicit bounded reason and must preserve unrelated work.
- Read `../ERPNextSecrets/AGENTS.md` before accessing sensitive records. Keep credentials, cookies, source URLs and rendered runtime configuration out of this repository, messages and logs.
- Preserve concurrent changes and stage only reviewed files. Keep English/Chinese switching independent of browser sources, settings, history and playback state.
