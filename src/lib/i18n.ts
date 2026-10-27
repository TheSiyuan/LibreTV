import { commonMessages } from './i18n-common';
import { playerMessages } from './i18n-player';
import { settingsMessages } from './i18n-settings';
import { discoveryMessages } from './i18n-discovery';
import { errorMessages } from './i18n-errors';

export type Locale = 'en' | 'zh-CN';
export type MessageParams = Record<string, string | number>;
export const LOCALE_STORAGE_KEY = 'libretv-locale';
export const englishMessages: Readonly<Record<string, string>> = {
  ...commonMessages, ...playerMessages, ...settingsMessages, ...discoveryMessages, ...errorMessages,
};
export const chineseMessages: Readonly<Record<string, string>> = Object.fromEntries(
  Object.keys(englishMessages).map((message) => [message, message])
);

let currentLocale: Locale = 'en';
const listeners = new Set<() => void>();
export function normalizeLocale(value: unknown): Locale { return value === 'zh-CN' ? 'zh-CN' : 'en'; }
export function getLocale(): Locale { return currentLocale; }
export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function setLocale(locale: Locale, persist = true): void {
  currentLocale = normalizeLocale(locale);
  if (typeof window !== 'undefined' && persist) {
    try { window.localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale); } catch { /* Keep working in memory. */ }
  }
  listeners.forEach((listener) => listener());
}
export function restoreLocale(): void {
  let saved: unknown;
  try { saved = window.localStorage.getItem(LOCALE_STORAGE_KEY); } catch { /* Storage may be blocked. */ }
  setLocale(normalizeLocale(saved), false);
}

function interpolate(message: string, params?: MessageParams): string {
  return message.replace(/\{(\w+)\}/g, (token, key: string) => params?.[key] === undefined ? token : String(params[key]));
}

const englishToChinese = Object.fromEntries(Object.entries(englishMessages).map(([zh, en]) => [en, zh]));
function compileTemplate(template: string) {
  const names: string[] = [];
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escaped = template.split(/(\{\w+\})/).map((part) => {
    if (/^\{\w+\}$/.test(part)) {
      const name = part.slice(1, -1);
      names.push(name);
      if (/^(count|index|total|status|height|size|seconds|volume|rate|attempt|done|videos|results|vod|live|available|current|max|limit|minutes|hours|days)$/.test(name)) return '([\\d.,]+)';
      if (name === 'label' || name === 'segment') {
        const labels = ['片头', '中段', '片尾', '片头结束', '片尾开始', '中段片段', '片段']
          .flatMap((key) => [key, englishMessages[key]]).filter(Boolean).sort((a, b) => b.length - a.length);
        return `(${labels.map(escape).join('|')}|[^，、。:：()（）\\n]+?)`;
      }
      if (/^(code|hint|effect|disabled|format|detail|failures)$/.test(name)) return '(.*?)';
      return '(.+?)';
    }
    return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('');
  return { names, pattern: new RegExp(`^${escaped}$`, 's') };
}
// Legacy helpers and server errors return fully formatted messages. Match only known,
// whole interface messages; leave external content and unknown diagnostics as supplied.
const templates = Object.entries(englishMessages)
  .filter(([zh]) => /\{\w+\}/.test(zh))
  .sort(([a], [b]) => b.replace(/\{\w+\}/g, '').length - a.replace(/\{\w+\}/g, '').length)
  .map(([zh, en]) => ({ zh, en, source: compileTemplate(zh), target: compileTemplate(en) }));

function localizeFormatted(message: string, locale: Locale, depth = 0): string {
  const key = Object.hasOwn(englishMessages, message) ? message : Object.hasOwn(englishToChinese, message) ? englishToChinese[message] : undefined;
  if (key !== undefined) return locale === 'en' ? englishMessages[key] : key;
  if (depth > 8) return message;
  for (const template of templates) {
    const sourceMatch = template.source.pattern.exec(message);
    const match = sourceMatch ?? template.target.pattern.exec(message);
    if (!match) continue;
    const names = sourceMatch ? template.source.names : template.target.names;
    const values = Object.fromEntries(names.map((name, index) => [name,
      /^(error|reason|detail|message|summary|label|segment|effect|hint|disabled|format)$/.test(name)
        ? localizeFormatted(match[index + 1], locale, depth + 1) : match[index + 1],
    ]));
    return interpolate(locale === 'en' ? template.en : template.zh, values);
  }
  for (const separator of ['、', '，']) {
    const fragments = message.split(separator);
    if (fragments.length > 1) {
      const localized = fragments.map((fragment) => localizeFormatted(fragment, locale, depth + 1));
      if (localized.every((fragment, index) => fragment !== fragments[index])) return localized.join(', ');
    }
  }
  // Playback recovery combines a known category with its diagnostic reason.
  const separator = locale === 'en' ? '：' : ': ';
  const colon = message.indexOf(separator);
  if (colon > 0) {
    const prefix = message.slice(0, colon);
    const localized = localizeFormatted(prefix, locale, depth + 1);
    if (localized !== prefix) return `${localized}${locale === 'en' ? ': ' : '：'}${localizeFormatted(message.slice(colon + separator.length), locale, depth + 1)}`;
  }
  return message;
}

/** Translate interface copy only. Never pass media titles or source/channel names. */
export function translate(message: string, params?: MessageParams, locale: Locale = getLocale()): string {
  return interpolate(localizeFormatted(message, locale), params);
}
