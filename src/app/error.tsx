'use client';

import { useI18n, LocaleSwitch } from '@/components/locale';
import { translate as tr } from '@/lib/i18n';

import Link from 'next/link';
import { useEffect } from 'react';
import { ErrorState } from '@/components/states';

/**
 * 路由段级错误边界：捕获页面渲染/数据异常，避免落到 Next 默认英文白屏。
 * 刻意不放 Header——它依赖 zustand store，若异常源正是 store 会二次崩溃。
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useI18n();
  useEffect(() => {
    console.error('[LibreTV] 页面渲染异常:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-end p-2"><LocaleSwitch /></div>
      <main className="flex-1 flex items-center justify-center px-4">
        <ErrorState
          message={tr('页面出了点问题，请重试。若持续失败请返回首页。')}
          onRetry={reset}
          retryLabel={tr('重试')}
        />
      </main>
      <footer className="border-t border-line py-4">
        <p className="text-center text-xs text-faint">
          {tr('问题持续存在？')}{' '}
          <Link href="/" className="hover:text-accent">
            {tr('返回首页')}
          </Link>
        </p>
      </footer>
    </div>
  );
}
