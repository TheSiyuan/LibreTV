import type Artplayer from 'artplayer';

/** Chinese source keys also define the Simplified Chinese interface catalog. */
export const playerMessages: Record<string, string> = {
  '跳过{segment}': 'Skip {segment}',
  '已撤回跳过': 'Skip undone',
  '已跳过片尾': 'Credits skipped',
  '已从 {time} 继续播放': 'Resumed from {time}',
  '直连失败，改用代理重试...': 'Direct connection failed. Retrying through the proxy...',
  '{reason}（第 {attempt} 次）...': '{reason} (attempt {attempt})...',
  '视频加载失败，{message}，请尝试其他视频源': 'Video could not load: {message}. Try another source.',
  '上一集 (Alt+←)': 'Previous episode (Alt+←)',
  '下一集 (Alt+→)': 'Next episode (Alt+→)',
  '播放异常，正在重试...': 'Playback interrupted. Retrying...',
  '视频播放失败，请尝试其他视频源': 'Video playback failed. Try another source.',
  '已跳过片头': 'Intro skipped',
  '已跳过中段': 'Segment skipped',
  '快退 5s': 'Back 5 seconds',
  '快进 5s': 'Forward 5 seconds',
  '音量 {volume}%': 'Volume {volume}%',
  '播放/暂停': 'Play / pause',
  '片段起点已记录，播放到终点后按 Shift+E': 'Start marked. Play to the end, then press Shift+E.',
  '请先按 Shift+S 记录片段起点': 'Press Shift+S to mark the start first.',
  '3 倍速': '3× speed',
  '{rate} 倍速': '{rate}× speed',
  '跳过片尾': 'Skip credits',
  '跳过片头': 'Skip intro',
  '跳过中段': 'Skip segment',
  '重新加载': 'Reload',
  '已跳过{segment}': 'Skipped {segment}',
  '撤销': 'Undo',
  '自动连播已开启': 'Autoplay next episode enabled',
  '该地址不是可播放的直播流（内容可能是文件或错误提示）': 'This address does not contain a playable live stream.',
  '该频道为 H.265 编码，当前浏览器可能无法解码，建议用 Edge/Safari': 'This channel uses H.265. Try Edge or Safari if it does not play.',
  '直播流解码失败，可能该频道编码不受当前浏览器支持，请尝试其他频道': 'The live stream could not be decoded. Try another channel or browser.',
  'HLS 解析失败，尝试原生播放...': 'HLS parsing failed. Trying native playback...',
  '直播流加载失败{code}，可能该频道已失效，请尝试其他频道': 'Live stream could not load{code}. Try another channel.',
  '直播流中断{code}，该源可能已失效，请尝试其他频道': 'Live stream interrupted{code}. Try another channel.',
  'FLV 播放模块加载失败，请检查网络后重试': 'The FLV player could not load. Check your connection and retry.',
  '当前浏览器不支持 FLV 直播播放': 'This browser does not support FLV live streams.',
  '直播流加载失败（{type}），请尝试其他频道': 'Live stream could not load ({type}). Try another channel.',
  '上一台': 'Previous channel',
  '下一台': 'Next channel',
  '视频播放失败，请尝试其他频道': 'Playback failed. Try another channel.',
  '频道加载超时，可能该源已失效，请尝试其他频道': 'Channel loading timed out. Try another channel.',
  '播放器尚未就绪，请稍后再试': 'The player is not ready. Try again shortly.',
  '，越过起点后自动结束本集': '; playback ends when the credits begin',
  '，命中时将自动跳过': '; this segment will be skipped automatically',
  '，命中时显示「跳过片尾」按钮': '; a Skip credits button will appear',
  '，命中时显示跳过按钮': '; a Skip button will appear',
  '已记录{label} {time}{effect}': 'Marked {label} at {time}{effect}',
  '请先播放到片头结束的位置': 'Play to the end of the intro first.',
  '请先播放到片尾开始的位置': 'Play to the start of the credits first.',
  '片头结束': 'Intro end',
  '片尾开始': 'Credits start',
  '请先播放到片段起点': 'Play to the start of the segment first.',
  '已暂停并记录起点 {time}，播放到终点后点「标记中段终点」': 'Paused and marked the start at {time}. Play to the end, then choose Mark segment end.',
  '终点需晚于起点': 'The end must be after the start.',
  '中段片段': 'Middle segment',
  '已删除{segment}片段': 'Deleted {segment} segment',
  '跳过标记': 'Skip marks',
  '记录（会先暂停在当前画面）': 'Mark position (pauses playback first)',
  '把当前画面记为片头结束位置': 'Mark the current position as the end of the intro',
  '记为片头结束': 'Mark intro end',
  '把当前画面记为片尾开始位置': 'Mark the current position as the start of the credits',
  '记为片尾开始': 'Mark credits start',
  '标记中段起点': 'Mark segment start',
  '标记中段终点（自 {time}）': 'Mark segment end (from {time})',
  '放弃这个起点': 'Discard this start position',
  '取消': 'Cancel',
  '当前': 'Current',
  '· 已暂停': '· Paused',
  '已标记 {count} 段 · 按剧名对本剧各集与同名资源生效': '{count} segments marked · Applies to all episodes and sources with this title',
  '关闭后保留标记但完全不生效': 'Keep these marks but disable skipping',
  '还没有可开关的标记': 'No marks available yet',
  '本剧跳过': 'Skip for this title',
  '尚未标记跳过片段。播放到目标位置后，用下方按钮记录，或使用快捷键： Shift+I 片头结束 / Shift+O 片尾开始 / Shift+S · Shift+E 中段区间。': 'No skip marks yet. Play to the desired position and use the buttons below, or shortcuts: Shift+I for intro end, Shift+O for credits start, Shift+S / Shift+E for a middle segment.',
  '结尾': 'End',
  '跳到片段起点，验证起点是否准确': 'Seek to the start to check this mark',
  '起点': 'Start',
  '跳到终点前 1 秒，验证是否会切掉正片或漏掉一段': 'Seek to one second before the end to check this mark',
  '终点': 'End',
  '边界提前 1 秒': 'Move boundary back one second',
  '边界推后 1 秒': 'Move boundary forward one second',
  '删除（可在提示中撤销）': 'Delete (can be undone in the notification)',
  '删除{label}片段': 'Delete {label} segment',
  '全局 · 自动跳过片段': 'Global · Automatic skipping',
  '已开启': 'Enabled',
  '已关闭': 'Disabled',
  '命中片头/中段自动跳段，片尾结束本集（是否连播看「自动连播」）。': 'Automatically skip intros and middle segments, and end playback at the credits (next episode follows the autoplay setting).',
  '命中片段只显示按钮，不自动跳。': 'Show a Skip button without skipping automatically.',
  '影响所有剧，在「设置 → 偏好设置」修改。': 'Applies to all titles. Change this in Settings → Preferences.',
  '进度条色带：': 'Timeline colors:',
  '跳过时播放器顶部会出现「撤销」，可回退刚跳过的那一次。': 'Choose Undo at the top of the player to reverse the last skip.',
  '片头': 'Intro',
  '中段': 'Middle',
  '片尾': 'Credits',
  '换源搜索失败': 'Source search failed',
  '该源无可用播放资源': 'This source has no playable videos.',
  '换源：{title}': 'Switch source: {title}',
  '正在搜索各资源...': 'Searching sources...',
  '正在测试各资源速率...': 'Testing source speeds...',
  '共 {count} 个来源 · {available} 个可用': '{count} sources · {available} available',
  '画质探测中 {done}/{total}': 'Checking quality {done}/{total}',
  '画质已探到 {known}/{total}': 'Quality found for {known}/{total}',
  '源站未提供画质': 'Source did not provide quality information',
  '关闭': 'Close',
  '搜索各资源中...': 'Searching sources...',
  '测速中...': 'Testing speed...',
  '其他点播源未找到同名资源': 'No matching title found on other sources',
  '选择播放源': 'Select playback source',
  '失败': 'Failed',
  '播放中': 'Playing',
  '速度': 'Speed',
  '不可用': 'Unavailable',
  '集数': 'Episodes',
  '{count} 集': '{count} episodes',
  '无资源': 'No videos',
  '当前正在播放': 'Currently playing',
  '切换到此源': 'Switch to this source',
  '测速未通过，仍可尝试': 'Speed test failed; playback may still work',
  '重测中...': 'Retesting...',
  '重新测速': 'Retest speed',
  '保存位置已失效，请点击「继续」重新选择': 'The save location is no longer available. Choose Resume to select it again.',
  '《{title}》下载完成': 'Download complete: {title}',
  '《{title}》下载失败：{error}': 'Download failed: {title}: {error}',
  '当前环境不支持下载缓存（需通过 HTTPS 访问），无法下载': 'Downloads require cache support. Open the site over HTTPS.',
  '已取消下载': 'Download cancelled',
  '《{title}》已加入下载队列': 'Added to downloads: {title}',
  '已开启下载中转，新任务经服务器转发': 'Download proxy enabled for new tasks',
  '已关闭下载中转，新任务直连源站': 'Download proxy disabled; new tasks connect directly',
  '已取消': 'Cancelled',
  '《{title}》已删除下载记录': 'Download record deleted: {title}',
  '《{title}》已取消下载': 'Download cancelled: {title}',
  '排队中': 'Queued',
  '下载中': 'Downloading',
  '已暂停': 'Paused',
  '已完成': 'Completed',
  '下载管理': 'Downloads',
  '经服务器中转下载': 'Download through server proxy',
  '直连被跨域 / 防盗链 / 混合内容拦下时开启：整集流量（含分片与密钥）经服务器转发， 带宽由部署者承担。仅对之后开始的任务生效。': 'Enable if direct downloads are blocked by CORS, hotlink protection or mixed content. All episode traffic, including segments and keys, uses the server bandwidth. Applies to new tasks.',
  '保存能力：': 'Save method: ',
  '磁盘直写（边下边存）': 'Direct to disk',
  '内存聚合（完成后浏览器下载）': 'In memory (browser download when complete)',
  ' · 支持断点续传': ' · Resume supported',
  ' · 当前环境无断点缓存（需 HTTPS 访问）': ' · Resume cache unavailable (HTTPS required)',
  '同时进行 {running}/{max} 个任务': '{running}/{max} tasks running',
  '暂无下载任务。在播放页点击「下载本集」开始。': 'No downloads yet. Choose Download episode on a watch page to begin.',
  ' · {finished}/{total} 分片': ' · {finished}/{total} segments',
  '暂停': 'Pause',
  '继续': 'Resume',
  '删除下载任务': 'Delete download task',
  '未知视频': 'Unknown video',
  '已记录{label}{hint}': 'Marked {label}{hint}',
  '等待访问验证...': 'Waiting for access verification...',
  '点播源不存在': 'Video source unavailable',
  '该视频来自点播源「{source}」，但它可能已被删除。请在设置中重新添加后重试。': 'This video uses source “{source}”, which may have been removed. Add it again in Settings and retry.',
  '返回首页': 'Back to home',
  ' · 第 {index}/{total} 集': ' · Episode {index}/{total}',
  ' 第{index}集': ' Episode {index}',
  '下载本集': 'Download episode',
  '切换资源': 'Switch source',
  '视频加载失败，请尝试其他资源': 'Video could not load. Try another source.',
  '无可用播放地址': 'No playback URL available',
  '上一集': 'Previous episode',
  '下一集': 'Next episode',
  '本剧已标记 {count} 段{disabled}': '{count} skip marks for this title{disabled}',
  '（本剧跳过已关闭）': ' (skipping disabled)',
  '标记片头 / 中段 / 片尾，供本剧各集自动跳过': 'Mark intros, middle segments and credits to skip across episodes',
  '本剧跳过已关闭': 'Skipping disabled for this title',
  '自动连播': 'Autoplay next',
  '剧集列表': 'Episodes',
  '切换为正序排列': 'Sort episodes ascending',
  '切换为倒序排列': 'Sort episodes descending',
  '调整剧集列表的排列顺序': 'Change episode order',
  '正序排列': 'Ascending',
  '倒序排列': 'Descending',
  '获取剧集失败': 'Episodes could not load',
  '暂无剧集信息': 'No episode information',
  '快捷键：空格 播放/暂停 · ←/→ 快退/快进 5s · ↑/↓ 音量 · F 全屏 · Alt+←/→ 切换集数': 'Shortcuts: Space play/pause · ←/→ back/forward 5s · ↑/↓ volume · F fullscreen · Alt+←/→ change episode',
  '返回': 'Back',
  '回首页': 'Home',
};

/** Artplayer 5 caches some control and menu labels at construction. Refresh only
 * its chrome and cached settings copy; never recreate the video or its engine. */
export function syncArtplayerLocale(art: Artplayer, locale: 'en' | 'zh-CN'): void {
  const keys = Object.keys(art.i18n.languages['zh-cn'] ?? {});
  const previous = new Map(keys.map((key) => [key, art.i18n.get(key)]));
  art.option.lang = locale === 'zh-CN' ? 'zh-cn' : 'en';
  art.i18n.update({});
  const labels = new Map(keys.map((key) => [previous.get(key)!, art.i18n.get(key)]));
  const localize = (value: string): string => {
    const trimmed = value.trim();
    const exact = labels.get(trimmed);
    if (exact !== undefined) return value.replace(trimmed, exact);
    for (const [before, after] of labels) {
      if (trimmed.startsWith(`${before}:`)) return value.replace(before, after);
    }
    return value;
  };
  const roots = [art.template.$controls, art.template.$setting, art.template.$contextmenu, art.template.$info, art.template.$notice];
  for (const root of roots) {
    if (!root) continue;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.textContent) node.textContent = localize(node.textContent);
    }
    for (const el of [root, ...root.querySelectorAll<HTMLElement>('[aria-label], [title]')]) {
      for (const attribute of ['aria-label', 'title']) {
        const value = el.getAttribute(attribute);
        if (value) el.setAttribute(attribute, localize(value));
      }
    }
  }
  const updateSettings = (settings: Artplayer['setting']['option']) => {
    for (const setting of settings) {
      if (typeof setting.html === 'string') setting.html = localize(setting.html);
      if (typeof setting.tooltip === 'string') setting.tooltip = localize(setting.tooltip);
      if (setting.selector) updateSettings(setting.selector as Artplayer['setting']['option']);
    }
  };
  updateSettings(art.setting.option);
}
