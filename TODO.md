# LibreTV work list

Updated: 2026-10-26. Architect owns this list; `2 | Web Dev` owns the assigned application changes.

## Current assignment: English and Chinese interface

Owner request: provide an English version of the site and a button to switch between English and Chinese, then deploy the tested result to <https://streaming.builtplainly.com>.

- [x] Reconcile the application baseline with the deployed v2.21.1 source, commit `29cbeb3d37b4876f909a0354087a3531af0447f6`. Web Dev incorporated its package updates and playback-speed fix without changing Git history. The bilingual build uses version `2.21.1-builtplainly.1`.
- [x] Add a small, maintainable translation system with complete English and Simplified Chinese interface dictionaries. Use English for first-time visitors and remember an explicit language choice locally.
- [x] Add a visible, keyboard-accessible English / 中文 switch before login and throughout the application, including mobile layouts. Switching updates interface text without clearing settings, sources, history or playback progress.
- [x] Translate navigation, login, search, results/details, player controls/messages, live TV, settings/source management, dialogs, empty/loading/error states, notifications and accessibility labels. Source names, media titles, channel names and other upstream content stay as supplied.
- [x] Update document language and relevant interface metadata for the selected language. Persisted Chinese hard reloads pass without observed hydration errors; localized metadata stays unique after navigation.
- [x] Verify both languages, persistence after reload, language switching across routes, keyboard access and longer English labels at 1440, 768 and 390 pixels. Existing routes, theme behavior and browser data are preserved.
- [x] Run focused localization tests, typecheck, lint, existing relevant tests and a production build. The complete local suite passes 553 tests in 39 files, including 11 localization tests. Browser evidence and limits are described in [LOCALIZATION.md](docs/LOCALIZATION.md). Linux image validation and live release acceptance remain below.

## Release to the existing site

- [ ] Review the Web Dev handoff and exact source diff. Record the custom source revision/version and keep upstream v2.21.1 provenance explicit.
- [ ] Build a Linux/amd64 application image outside the shared staging server. GitHub Actions will export a Docker-save archive, archive SHA-256 and immutable image configuration ID; pin that image ID and retain the previously deployed image for rollback. This requires no new registry credentials or package visibility change.
- [ ] Adapt the existing LibreTV deployment manifest, image identity validation and version/health checks for the custom artifact. Reuse the current deployment system; do not use this checkout's generic `docker-compose.yml` against staging.
- [x] Prepare an app-only update and rollback procedure: `scripts/libretv_release.py` and `deploy/libretv/RELEASE.md` in Infrastructure. Seventeen offline tests and independent recovery review pass. The full installation helper can recreate the shared proxy and is unsuitable as an incidental app upgrade; live use remains pending the reviewed artifact and staging ownership assignment.
- [ ] Coordinate with the ERPNext architect and record the bounded staging assignment and sole mutation owner in `../ERPNextInfrastructure/INITIAL_PLAN.md` before remote changes. Release ownership afterward.
- [ ] Preserve the existing hostname, TLS/proxy integration, credentials/signing key, private defaults and source order. Retain 256 MiB RAM / 0.35 CPU limits, network isolation, filesystem hardening and closed public port 8080.
- [ ] Deploy only the reviewed app artifact to the existing LibreTV runtime. Verify HTTPS, authentication/session continuity, exact default hashes, English/Chinese browser behavior, resource limits and unchanged ERP/proxy state. Record a new deployment receipt.

## Takeover follow-up

- [ ] Fix source-update rollback capture: preserve the immediate previous defaults for every run. Current per-run continuity baselines exclude defaults; `defaults.previous.env` is created only once. Add a focused regression check before another source update.
- [x] Provide an acceptance mode that prints sanitized results without overwriting historical local evidence: `libretv_check.py --stdout-only`. Three offline regression tests pass; default behavior remains available.
- [x] Perform fresh acceptance without restarting services. The existing v2.21.1 site passed HTTPS, authentication/session and exact 28 API / 9 IPTV defaults checks on 2026-10-26 during release preparation. No media/source fetching or restart occurred. Repeat acceptance after deployment.
- [ ] Perform representative source/playback checks with finite resource sampling; then assess concurrency and sustained coexistence with ERPNext. Prior acceptance did not qualify these workloads.
- [ ] Rehearse LibreTV recovery with the pinned image and preserved private inputs. Document that browser-local history/preferences require their own export/recovery and are not synchronized by shared defaults.
- [x] Record receiving-architect acknowledgment in the shared handoff record during a coordinated documentation update. The ERPNext architect recorded the receiving architect and local bilingual preparation assignment; staging mutation ownership is not yet assigned.

## Canonical deployment references

- Existing runbook: [deployment procedure](../ERPNextInfrastructure/deploy/libretv/README.md).
- Artifact identity: [manifest](../ERPNextInfrastructure/deploy/libretv/manifest.json) and [deployment receipt](../ERPNextInfrastructure/deploy/libretv/deployed-manifest.json).
- Historical acceptance: [operations](../ERPNextInfrastructure/docs/operations/LIBRETV_STAGING.md) and [independent verification](../ERPNextInfrastructure/docs/operations/LIBRETV_VERIFICATION.md). The latest 17-file/shared-default addenda supersede the initial 13-file/empty-default records.
- Private service records stay in `../ERPNextSecrets/services/libretv-staging/`. Read that repository's `AGENTS.md` before access. Do not put credentials, source URLs, cookies or rendered runtime configuration in this checkout or reports. Defaults are publicly exposed through `/api/status`.

Shared host/proxy dependencies remain coordinated with the ERPNext architect. Application ownership does not grant an additional server mutation owner.
