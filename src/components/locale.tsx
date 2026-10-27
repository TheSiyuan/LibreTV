'use client';

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { getLocale, LOCALE_STORAGE_KEY, normalizeLocale, restoreLocale, setLocale, subscribeLocale, translate, type MessageParams } from '@/lib/i18n';

export function useI18n() {
  // SSR and the hydration pass always agree. Restore the local preference after mounting.
  const locale = useSyncExternalStore(subscribeLocale, getLocale, () => 'en' as const);
  const t = useCallback((message: string, params?: MessageParams) => translate(message, params, locale), [locale]);
  return { locale, t, setLocale };
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  useEffect(() => {
    restoreLocale();
    const sync = (event: StorageEvent) => {
      if (event.key === LOCALE_STORAGE_KEY || event.key === null) setLocale(normalizeLocale(event.newValue), false);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const title = pathname === '/about' ? `${t('关于 LibreTV')} - LibreTV` : pathname === '/live' ? `${t('直播')} - LibreTV` : t('LibreTV - 免费在线视频搜索与观看平台');
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={t('LibreTV 是一个免费的在线视频搜索平台，无广告、安全，提供来自多个视频源的内容搜索与观看服务，无需注册即可使用。')} />
      {children}
    </>
  );
}

export function LocaleSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <button
      type="button"
      className={`min-h-11 whitespace-nowrap shrink-0 rounded-md px-2 text-xs text-muted hover:text-content hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${className}`}
      onClick={() => setLocale(locale === 'en' ? 'zh-CN' : 'en')}
      aria-label={locale === 'en' ? 'Switch language to Chinese' : '切换语言为英语'}
      title={locale === 'en' ? 'Switch language to Chinese' : '切换语言为英语'}
    >
      <span lang="en" className={locale === 'en' ? 'font-semibold text-content' : ''}>English</span>
      <span aria-hidden="true"> / </span>
      <span lang="zh-CN" className={locale === 'zh-CN' ? 'font-semibold text-content' : ''}>中文</span>
    </button>
  );
}
