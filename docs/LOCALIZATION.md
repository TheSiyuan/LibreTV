# English and Simplified Chinese interface

This custom build is `2.21.1-builtplainly.1`, based on upstream LibreTV v2.21.1,
commit `29cbeb3d37b4876f909a0354087a3531af0447f6`. The takeover checkout was at
`deb72fa` (v2.21.0). The two missing upstream commits were reconciled in the
working application: the package version update and the complete
`video:ratechange` / `defaultPlaybackRate` fix. No upstream history was reset or
pushed by the application implementation.

## Locale behavior

- New visitors receive English. `English / 中文` is available in the main header,
  watch header, login dialog, drawers, and error fallbacks, including mobile.
- An explicit choice is stored in the separate `libretv-locale` localStorage key
  (`en` or `zh-CN`). A storage event updates other tabs. Blocked storage falls
  back to an in-memory preference.
- Locale changes do not clear or migrate application settings, source selections,
  search/watch history, playback progress, downloads, cookies, or URLs.
- The document language follows the preference. React owns the localized title
  and description so route navigation does not accumulate duplicate metadata.
  Server rendering and the install manifest use English; a saved preference is
  restored after mounting, with an English hydration snapshot.
- Titles, source/channel names, groups, descriptions, people and other upstream
  content stay in their original language. Generated interface labels such as
  episode counts and normalized completion status are translated at display.

## Implementation and maintenance

`src/components/locale.tsx` provides `useI18n`, `LocaleProvider`, and
`LocaleSwitch`. It uses an external-store subscription, independently of the
application's persisted Zustand store. Rendering new components should use the
hook's `t`; long-lived imperative callbacks can use `translate` from
`src/lib/i18n.ts` to read the current preference without recreating a media engine.

The message catalogs are `i18n-common.ts`, `i18n-discovery.ts`,
`i18n-settings.ts`, `i18n-player.ts`, and `i18n-errors.ts`. The stable Chinese
source messages form the complete Simplified Chinese dictionary, with matching
English values. Add shared copy to the common catalog and avoid conflicting
translations of an existing key. Use named placeholders, for example:

```tsx
const { t } = useI18n();
return <span>{t('共 {count} 集', { count: episodes.length })}</span>;
```

Pass upstream titles/names as explicit parameters; do not pass them as translation
keys. Keep API query tags, persisted enum values and parser contracts unchanged.

Legacy helpers and server errors still emit their original messages. The
translator recognizes catalogued whole-message templates, numeric parameters,
known UI-only nested parameters and import-statistics fragments. Unknown
diagnostics remain unchanged. Templates are bounded and prototype-safe. Add a
generated-message regression when adding or changing a formatted helper error.

Artplayer's built-in locale and cached control/settings labels are refreshed in
place by `syncArtplayerLocale`; locale changes are excluded from media creation
effects. `PlayerPoster` is inline SVG that retains the existing
`public/player-poster.png` wordmark and overlays the slogan with localized text.
No public bitmap or icon was added, regenerated or modified.

## Application file inventory

- Package identity: `package.json`, `package-lock.json`.
- Routes/metadata under `src/app`: `page.tsx`, `about/page.tsx`, `live/page.tsx`,
  `watch/page.tsx`, `layout.tsx`, `manifest.ts`, `error.tsx`, `global-error.tsx`,
  and new `not-found.tsx`.
- Shared interface under `src/components`: `auth.tsx`, `confirm-dialog.tsx`,
  `detail-modal.tsx`, `douban-section.tsx`, `download-manager.tsx`, `drawer.tsx`,
  `header.tsx`, `history-panel.tsx`, `live-channel-list.tsx`, `live-epg-panel.tsx`,
  `live-player.tsx`, `live-source-manager.tsx`, `player-shell.tsx`, `providers.tsx`,
  `quality-badge.tsx`, `search-history.tsx`, `settings-shared.tsx`, `site-footer.tsx`,
  `skip-mark-panel.tsx`, `source-manager.tsx`, `states.tsx`, `switch-source.tsx`,
  `theme.tsx`, `toast.tsx`, `use-live-probe.ts`, `video-card.tsx`, and new
  `locale.tsx` and `player-poster.tsx`.
- Library presentation helpers: `src/lib/download-saver.ts`, `tvbox-parser.ts`,
  and `utils.ts`; new `i18n.ts` and its five catalogs named above.
- Focused tests: `src/lib/i18n.test.ts`, `i18n-generated.test.ts`.

`TODO.md`, `.gitignore`, the release workflow, Git branch/commit operations and
Infrastructure files are Architect-owned concurrent work, outside this inventory.

## Validation

Local verification used the actual bundled Node.js v24.19.0 runtime and the
existing lockfile (Next.js 15.5.26). No application dependency was added. The
Windows host had no npm shim; a temporary npm 10.9.4 CLI ran the lockfile install.
The sandbox prevented a build-directory write and headless browser launch, so
the authorized local build/browser processes ran outside that sandbox.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run typecheck
npm run lint
npm test -- --testTimeout=20000
npm run build
```

Typecheck and lint pass. The complete suite passes **553 tests in 39 files**,
including 11 focused localization tests. Existing live-probe tests intermittently
exceeded their default five-second timeout on this Windows host; the full suite
passes with the shown twenty-second timeout, without changing test configuration.
The optimized production build passes, including Next's lint/type checks and
static page generation. Linux container builds retain the existing Dockerfile's
`DOCKER_BUILD=1` standalone build requirement.

The browser check uses headless installed Edge against a disposable local
production instance, real local password authentication, and intercepted fixture
APIs. It checks English before login, keyboard activation, a preserved password
field, reload persistence, language changes across routes and open settings,
unchanged source/settings snapshots and IndexedDB history/progress, unique
localized metadata, and persisted Chinese hard reloads on search/live/watch/about.
Browser console hydration errors and page rendering errors are recorded.

The complete production browser pass passed **58 assertions** with 40 route
screenshots and no rendering/hydration errors. Final visual review corrected the
phone watch header's compressed Chinese title, an autoplay badge over the loading
slogan, and a live retry hint over the duplicate channel overlay. After the last
bounded live change, a separate production check passed **16 assertions** and
recaptured all six live views. All final route and inspector screenshots were
visually reviewed, including the settled phone drawers.

Both locales are captured at 1440, 768 and 390 pixels. Drawers are captured after
their entrance transition and checked for settled bounds. The watch check keeps
the same video element, playback rate and current position during switching.
Fixture streams deliberately fail: these checks exercise translated loading and
failure chrome and do not qualify real upstream playback or server capacity.

Local evidence is under the ignored `.taste-skill/` directory:

- `verify-localization.cjs`: reproducible browser harness using bundled Playwright.
- `browser/evidence.json` and the bilingual route screenshots.
- `live-final/evidence.json` and six captures verifying the final live overlay fix.
- `inspect/report.json` and six app-screen inspector captures.

The design direction, palette, fonts, artwork and existing controls were retained;
this was a focused locale feature. The inspector reports zero failures with
explicit allowances for the existing gradient backdrop/wordmark and the login
dialog intentionally covering background content. Its remaining two warnings
are existing small metadata text and the homepage's large brand heading. These
were retained under the instruction to preserve the current visual direction.
Visual review checks title/action hierarchy, equal page margins, wrapped English
labels, honest source/media data, visible language controls and usable phone
navigation. No sample fixture data is bundled with the application.

Deployment, release history, image creation and remote acceptance remain owned
by the Architect. No server, Secrets repository, credentials, generic Compose
startup or remote mutation was used for this application work.
