import { describe, expect, it } from 'vitest';
import { translate } from './i18n';
import { describeQualityBadge } from './quality';
import { describeParseStats } from './tvbox-parser';
import type { SubscriptionParseStats } from './types';

const en = (message: string) => translate(message, undefined, 'en');
const zh = (message: string) => translate(message, undefined, 'zh-CN');

describe('generated interface message localization', () => {
  it('localizes the complete quality tooltip without matching the shorter retry label', () => {
    const view = describeQualityBadge({ from: 'probe', error: '探测超时', timestamp: Date.now() });
    expect(view?.title).toBe('本次没测到画质：探测超时。多半是网络抖动或源站响应慢，点击重试');
    expect(en(view!.title)).toBe(
      'Quality was not detected: Check timed out. The network may be unstable or the source slow. Select to retry.'
    );
    expect(zh(en(view!.title))).toBe(view!.title);
  });

  it('localizes the alternate quality advice and preserves diagnostic details', () => {
    const view = describeQualityBadge({ from: 'probe', error: 'HTTP 403', timestamp: Date.now() });
    expect(en(view!.title)).toBe(
      'Quality was not detected: HTTP 403. Select to retry, or play the video to record its actual resolution.'
    );
    expect(en(describeQualityBadge({ height: 1080, from: 'probe', timestamp: Date.now() })!.title))
      .toBe('Quality detected from the playlist (1080P)');
    expect(en(describeQualityBadge({ height: 2160, from: 'play', timestamp: Date.now() })!.title))
      .toBe('Resolution measured during playback (2160P)');
  });

  const stats: SubscriptionParseStats = {
    format: 'tvbox',
    skipped: 3,
    skippedByReason: { spider: 2, xml: 1 },
    skippedSamples: ['中文源甲', '源乙'],
    truncated: 4,
  };

  it('localizes TVBOX counts and multiple reasons while retaining source-name samples', () => {
    const localized = describeParseStats(stats, { localize: en });
    expect(localized).toBe(
      'Skipped 3 unusable entries (Spider engine 2, XML API 1), For example: “中文源甲」「源乙”, Omitted 4 entries beyond the limit'
    );
    expect(describeParseStats(stats, { includeSamples: false, localize: en })).toBe(
      'Skipped 3 unusable entries (Spider engine 2, XML API 1), Omitted 4 entries beyond the limit'
    );
    expect(describeParseStats(stats)).toBe(
      '跳过 3 个不可用条目（Spider 引擎 2、XML 接口 1），如「中文源甲」「源乙」，超出上限截断 4 条'
    );
    expect(stats.skippedSamples).toEqual(['中文源甲', '源乙']);
  });

  it('localizes a nested subscription error with generated import statistics', () => {
    const error = `订阅未导入任何可用源：${describeParseStats(stats, { includeSamples: false })}`;
    expect(en(error)).toBe(
      'The subscription did not import any usable sources: Skipped 3 unusable entries (Spider engine 2, XML API 1), Omitted 4 entries beyond the limit'
    );
  });

  it('localizes nested network and download errors without changing unknown diagnostics', () => {
    expect(en('视频加载失败，播放列表加载失败：网络错误已重试 2 次仍未恢复，请尝试其他视频源')).not.toMatch(/\p{Script=Han}/u);
    expect(en('跳转目标被拒绝: 目标地址解析到私有/保留网络')).toBe(
      'Redirect destination rejected: The destination resolves to a private or reserved network'
    );
    expect(en('播放列表解析失败：m3u8 拉取失败：HTTP 503')).toBe(
      'Could not parse the playlist: Could not fetch the M3U8 playlist: HTTP 503'
    );
    expect(en('分片 7 源站缺失（HTTP 404），该来源无法完整下载，建议更换来源')).toBe(
      'Segment 7 is missing at the source (HTTP 404). This source cannot provide a complete download; try another source.'
    );
    expect(en('source:第三方电影')).toBe('source:第三方电影');
    expect(en('HTTP 503: upstream-custom-code')).toBe('HTTP 503: upstream-custom-code');
  });
});
