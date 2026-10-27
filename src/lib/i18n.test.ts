import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { chineseMessages, englishMessages, getLocale, LOCALE_STORAGE_KEY, normalizeLocale, restoreLocale, setLocale, subscribeLocale, translate } from './i18n';

afterEach(() => { setLocale('en', false); vi.unstubAllGlobals(); });

describe('interface dictionaries', () => {
  it('covers both locales with matching interpolation parameters', () => {
    expect(Object.keys(englishMessages).length).toBeGreaterThan(600);
    expect(Object.keys(chineseMessages)).toEqual(Object.keys(englishMessages));
    const placeholders = (message: string) => [...new Set(message.match(/\{\w+\}/g) ?? [])].sort();
    for (const [source, english] of Object.entries(englishMessages)) {
      expect(english.trim(), source).not.toBe('');
      expect(english, source).not.toMatch(/\p{Script=Han}/u);
      expect(placeholders(english), source).toEqual(placeholders(source));
    }
  });

  it('covers literal translation calls and leaves no untranslated JSX copy', () => {
    const missing: string[] = [];
    const raw: string[] = [];
    const inspect = (filename: string) => {
      const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const visit = (node: ts.Node) => {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ['t', 'tr', 'translate'].includes(node.expression.text)) {
          const argument = node.arguments[0];
          if (argument && ts.isStringLiteralLike(argument) && /\p{Script=Han}/u.test(argument.text) && englishMessages[argument.text] === undefined) missing.push(`${filename}: ${argument.text}`);
        }
        if (ts.isJsxText(node) && /\p{Script=Han}/u.test(node.text)) raw.push(`${filename}: ${node.text.trim()}`);
        if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer) && /\p{Script=Han}/u.test(node.initializer.text)) raw.push(`${filename}: ${node.initializer.text}`);
        ts.forEachChild(node, visit);
      };
      visit(source);
    };
    const walk = (directory: string) => {
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const filename = path.join(directory, entry.name);
        if (entry.isDirectory()) walk(filename);
        else if (filename.endsWith('.tsx') && !filename.endsWith('locale.tsx')) inspect(filename);
      }
    };
    walk(path.resolve('src/app')); walk(path.resolve('src/components'));
    expect(missing).toEqual([]);
    expect(raw).toEqual([]);
  });

  it('translates formatted helper errors without altering their protocol or data', () => {
    expect(translate('请求失败 (404)')).toBe('Request failed (404)');
    expect(translate('全34集')).toMatch(/34/);
    expect(translate('全34集')).not.toMatch(/\p{Script=Han}/u);
    expect(translate('播放错误（manifestLoadError）')).toContain('manifestLoadError');
    expect(translate('source:第三方电影', undefined, 'en')).toBe('source:第三方电影');
    for (const diagnostic of ['constructor', 'toString', 'hasOwnProperty', '__proto__']) {
      expect(translate(diagnostic)).toBe(diagnostic);
      expect(translate(diagnostic, undefined, 'zh-CN')).toBe(diagnostic);
    }
    expect(translate('{count}分钟前', { count: 5 })).toBe('5 min ago');
    expect(translate('{count}分钟前', { count: 5 }, 'zh-CN')).toBe('5分钟前');
    // Visible toasts/error state can be retranslated after the preference changes.
    expect(translate('Request failed (404)', undefined, 'zh-CN')).toBe('请求失败 (404)');
    const liveError = '直播流加载失败，可能该频道已失效，请尝试其他频道';
    expect(translate(liveError)).not.toMatch(/\p{Script=Han}/u);
    expect(translate(translate(liveError), undefined, 'zh-CN')).toBe(liveError);
    const marked = translate('已记录{label}{hint}', { label: translate('中段片段'), hint: '' });
    expect(translate(marked, undefined, 'zh-CN')).toBe('已记录中段片段');
  });
});

describe('locale preference isolation', () => {
  function browserStorage(initial: Record<string, string> = {}) {
    const values = new Map(Object.entries(initial));
    vi.stubGlobal('window', { localStorage: { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) } });
    return values;
  }
  it('defaults to English and validates stored values', () => {
    browserStorage(); restoreLocale(); expect(getLocale()).toBe('en');
    expect(normalizeLocale('fr')).toBe('en'); expect(normalizeLocale(null)).toBe('en');
    expect(normalizeLocale('zh-CN')).toBe('zh-CN');
  });
  it('persists only language, preserving sources, theme, history and progress', () => {
    const preserved = { 'libretv-storage': '{"sources":["original"],"progress":123}', 'libretv-theme': 'light', 'history': 'unchanged' };
    const values = browserStorage(preserved);
    setLocale('zh-CN'); expect(values.get(LOCALE_STORAGE_KEY)).toBe('zh-CN');
    setLocale('en', false); restoreLocale(); expect(getLocale()).toBe('zh-CN');
    for (const [key, value] of Object.entries(preserved)) expect(values.get(key)).toBe(value);
    expect(values.size).toBe(Object.keys(preserved).length + 1);
  });
  it('notifies subscribers and remains usable when storage is blocked', () => {
    vi.stubGlobal('window', { localStorage: { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } } });
    const listener = vi.fn(); const unsubscribe = subscribeLocale(listener);
    setLocale('zh-CN'); expect(getLocale()).toBe('zh-CN'); expect(listener).toHaveBeenCalledOnce();
    unsubscribe(); restoreLocale(); expect(getLocale()).toBe('en'); expect(listener).toHaveBeenCalledOnce();
  });
});
