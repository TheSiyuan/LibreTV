'use client';

import { useI18n } from './locale';

/** Keep the existing bitmap wordmark; render its slogan as translatable text. */
export function PlayerPoster() {
  const { t } = useI18n();
  return (
    <svg viewBox="0 0 1024 768" className="absolute inset-0 w-full h-full bg-black pointer-events-none" aria-hidden="true">
      <image href="/player-poster.png" width="1024" height="768" />
      <rect x="330" y="445" width="370" height="65" fill="black" />
      <text x="512" y="486" textAnchor="middle" fill="#999" fontSize="28" fontWeight="500" fontFamily="system-ui, sans-serif">
        {t('自由观影，畅想精彩')}
      </text>
    </svg>
  );
}
