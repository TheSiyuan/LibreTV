# LibreTV work list

Updated: 2026-10-26. Architect owns this list; `2 | Web Dev` owns the assigned application changes.

Owner coordination preference: manage LibreTV staging work in this project. Do not send messages to other projects unless the work affects the production server. Keep the single staging mutation owner recorded and release the record directly when finished.

## Current assignment: English and Chinese interface

Owner request: provide an English version of the site and a button to switch between English and Chinese, then deploy the tested result to <https://streaming.builtplainly.com>.

- [x] Reconcile the application baseline with the deployed v2.21.1 source, commit `29cbeb3d37b4876f909a0354087a3531af0447f6`. Web Dev incorporated its package updates and playback-speed fix without changing Git history. The bilingual build uses version `2.21.1-builtplainly.1`.
- [x] Add a small, maintainable translation system with complete English and Simplified Chinese interface dictionaries. Use English for first-time visitors and remember an explicit language choice locally.
- [x] Add a visible, keyboard-accessible English / 中文 switch before login and throughout the application, including mobile layouts. Switching updates interface text without clearing settings, sources, history or playback progress.
- [x] Translate navigation, login, search, results/details, player controls/messages, live TV, settings/source management, dialogs, empty/loading/error states, notifications and accessibility labels. Source names, media titles, channel names and other upstream content stay as supplied.
- [x] Update document language and relevant interface metadata for the selected language. Persisted Chinese hard reloads pass without observed hydration errors; localized metadata stays unique after navigation.
- [x] Verify both languages, persistence after reload, language switching across routes, keyboard access and longer English labels at 1440, 768 and 390 pixels. Existing routes, theme behavior and browser data are preserved.
- [x] Run focused localization tests, typecheck, lint, existing relevant tests and a production build. The complete local suite passes 553 tests in 39 files, including 11 localization tests. Browser evidence and limits are described in [LOCALIZATION.md](docs/LOCALIZATION.md). Linux image validation and completed live acceptance are recorded below.

## Release to the existing site

- [x] Review the Web Dev handoff and exact source diff. Custom source `887daed6da10263d43293799dbc5044e9a0caff7` is based on deployed upstream v2.21.1; the manifest records both identities.
- [x] Build the Linux/amd64 image outside staging. [GitHub Actions run 40438195562](https://github.com/TheSiyuan/LibreTV/actions/runs/40438195562) passed and exported artifact `12705665411`. Archive SHA-256, original image configuration digest and the cryptographically linked OCI runtime digest are recorded in the canonical manifest. The previous image and private rollback inputs are retained; no registry credentials or package visibility change was needed.
- [x] Adapt the existing manifest, image validation and version/health checks for the custom artifact. The accepted runtime pins the verified OCI manifest digest for the same reviewed configuration and layers; original build metadata is unchanged.
- [x] Prepare and use the app-only update/rollback procedure: `scripts/libretv_release.py` and `deploy/libretv/RELEASE.md` in Infrastructure. Thirty offline tests and independent review pass, including interrupted upload, archive reuse, readiness and rollback failure states. Only LibreTV was recreated.
- [x] Record the bounded staging assignment and sole mutation owner before remote changes, then release that record directly after acceptance. Routine LibreTV work stays in this project; contact the other project only for work affecting production.
- [x] Preserve the hostname, TLS/proxy integration, credentials/signing key, exact defaults and source order. Independent live inspection passed the 256 MiB RAM / 0.35 CPU limits, network isolation, filesystem hardening and closed public port 8080, with no OOM or automatic restart.
- [x] Deploy the reviewed artifact to the existing runtime. Accepted run `20261027T034842Z-9c867ab9f4c6` passed HTTPS/authentication, pre-existing session continuity, exact default hashes, limits and unchanged ERP/proxy state. Eighteen live browser assertions passed: both languages, reload persistence, navigation, mobile layout and settings preservation. Catalogue/media APIs were intercepted for interface verification; no source fetch or playback was performed. The deployment receipt records all 21 public source hashes. See [release evidence](../ERPNextInfrastructure/docs/operations/LIBRETV_BILINGUAL_RELEASE.md).

## Takeover follow-up

- [ ] Fix source-update rollback capture: preserve the immediate previous defaults for every run. Current per-run continuity baselines exclude defaults; `defaults.previous.env` is created only once. Add a focused regression check before another source update.
- [x] Provide an acceptance mode that prints sanitized results without overwriting historical local evidence: `libretv_check.py --stdout-only`. Three offline regression tests pass; default behavior remains available.
- [x] Perform fresh acceptance without restarting services. Both pre-release v2.21.1 and deployed `2.21.1-builtplainly.1` passed HTTPS, authentication/session and exact 28 API / 9 IPTV defaults checks. No media/source fetching or acceptance restart occurred.
- [ ] Perform representative source/playback checks with finite resource sampling; then assess concurrency and sustained coexistence with ERPNext. Prior acceptance did not qualify these workloads.
- [ ] Rehearse LibreTV recovery with the pinned image and preserved private inputs. Document that browser-local history/preferences require their own export/recovery and are not synchronized by shared defaults.
- [x] Record receiving-architect acknowledgment in the shared handoff record. The later staging release assignment superseded the original read-only preparation status; current coordination follows the owner's LibreTV-only messaging preference.

## Canonical deployment references

- Existing runbook: [deployment procedure](../ERPNextInfrastructure/deploy/libretv/README.md).
- Artifact identity: [manifest](../ERPNextInfrastructure/deploy/libretv/manifest.json) and [deployment receipt](../ERPNextInfrastructure/deploy/libretv/deployed-manifest.json).
- Historical acceptance: [operations](../ERPNextInfrastructure/docs/operations/LIBRETV_STAGING.md) and [independent verification](../ERPNextInfrastructure/docs/operations/LIBRETV_VERIFICATION.md). The latest 17-file/shared-default addenda supersede the initial 13-file/empty-default records.
- Private service records stay in `../ERPNextSecrets/services/libretv-staging/`. Read that repository's `AGENTS.md` before access. Do not put credentials, source URLs, cookies or rendered runtime configuration in this checkout or reports. Defaults are publicly exposed through `/api/status`.

Preserve shared host/proxy dependencies and the single staging mutation owner. Handle routine LibreTV staging work here; contact the other project only if production is affected.
