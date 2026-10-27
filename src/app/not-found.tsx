'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { SiteFooter } from '@/components/site-footer';
import { useI18n } from '@/components/locale';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-semibold text-content">{t('页面不存在')}</h1>
        <p className="text-sm text-muted">{t('此地址没有对应页面。')}</p>
        <Link href="/" className="btn-ghost">{t('返回首页')}</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
