import { auditUrl } from './seoAuditor.js';

/**
 * Competitor SEO Side-by-Side Comparison
 * Supports 2-site direct showdown or up to 6-site multi-competitor benchmark matrix.
 */

export async function compareCompetitors(url1, url2) {
  return compareMultiCompetitors(url1, [url2]);
}

/**
 * Multi-Competitor Showdown Engine (Your Site vs Up to 5 Competitors)
 */
export async function compareMultiCompetitors(myUrl, competitorUrls = []) {
  if (!myUrl) throw new Error('Target website URL is required');

  const cleanMyUrl = myUrl.trim();
  const validCompetitors = (Array.isArray(competitorUrls) ? competitorUrls : [competitorUrls])
    .map(u => (u || '').trim())
    .filter(u => u.length > 0 && u !== cleanMyUrl)
    .slice(0, 5);

  const allUrls = [cleanMyUrl, ...validCompetitors];

  // Concurrently audit all URLs
  const auditResults = await Promise.allSettled(allUrls.map(u => auditUrl(u)));

  const sites = [];
  auditResults.forEach((settled, idx) => {
    const rawUrl = allUrls[idx];
    let host = rawUrl;
    try {
      host = new URL(rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl).hostname.replace(/^www\./i, '');
    } catch (_) {}

    if (settled.status === 'fulfilled' && settled.value && settled.value.success) {
      const data = settled.value;
      sites.push({
        id: `site_${idx}`,
        isMySite: idx === 0,
        url: data.url,
        hostname: data.hostname || host,
        title: data.meta?.title || host,
        score: Number(data.metrics?.score) || 0,
        loadTimeMs: Number(data.metrics?.loadTimeMs) || 320,
        wordCount: Number(data.metrics?.wordCount) || 0,
        h1Count: data.headings?.h1?.length || 0,
        imagesMissingAlt: data.images?.missingAlt || 0,
        imagesTotal: data.images?.total || 0,
        isHttps: data.metrics?.isHttps ?? true,
        schemaCount: data.social?.schemas?.length || 0,
        linksTotal: data.links?.total || 0,
        criticalCount: data.checklist?.critical?.length || 0,
        warningsCount: data.checklist?.warnings?.length || 0,
        metaTitleOptimal: (data.meta?.title?.length >= 30 && data.meta?.title?.length <= 65),
        metaDescOptimal: (data.meta?.description?.length >= 120 && data.meta?.description?.length <= 165)
      });
    } else {
      // Keep unreachable sites explicit; never invent metrics for a failed scan.
      sites.push({
        id: `site_${idx}`,
        isMySite: idx === 0,
        url: rawUrl,
        hostname: host,
        title: `${host} (Unreachable during audit)`,
        score: null,
        loadTimeMs: null,
        wordCount: null,
        h1Count: null,
        imagesMissingAlt: null,
        imagesTotal: null,
        isHttps: null,
        schemaCount: null,
        linksTotal: null,
        criticalCount: null,
        warningsCount: null,
        metaTitleOptimal: false,
        metaDescOptimal: false,
        isFallback: true,
        error: 'No metrics available because the URL could not be audited.'
      });
    }
  });

  // Calculate Leaderboard Ranks (sorted by score descending, then fastest speed)
  const ranked = [...sites].sort((a, b) => {
    if (a.score == null) return b.score == null ? 0 : 1;
    if (b.score == null) return -1;
    if (b.score !== a.score) return b.score - a.score;
    return (a.loadTimeMs ?? Infinity) - (b.loadTimeMs ?? Infinity);
  });

  const leaderboard = ranked.map((site, index) => ({
    rank: index + 1,
    ...site
  }));

  const mySiteRanked = leaderboard.find(s => s.isMySite) || leaderboard[0];
  const leaderSite = leaderboard[0];

  // Calculate Average Industry Benchmark
  const measuredSites = sites.filter(s => !s.isFallback);
  const average = (key) => measuredSites.length
    ? Math.round(measuredSites.reduce((acc, site) => acc + (Number(site[key]) || 0), 0) / measuredSites.length)
    : null;
  const avgScore = average('score');
  const avgSpeed = average('loadTimeMs');
  const avgWords = average('wordCount');

  // Strategic Gaps for Antigravity-Style Intelligence Box
  const gaps = [];
  if (mySiteRanked?.isFallback || leaderSite?.isFallback) {
    gaps.push({
      metric: 'Comparison incomplete',
      gapText: 'At least one requested site could not be audited. No scores or competitor advantages were invented.',
      urgency: 'info',
      action: 'Check the site URL, availability, and crawl access, then run the comparison again.'
    });
  } else if (mySiteRanked.rank > 1) {
    const scoreDiff = leaderSite.score - mySiteRanked.score;
    gaps.push({
      metric: 'SEO Health Deficit',
      gapText: `Market Leader (${leaderSite.hostname}) leads by +${scoreDiff}% in technical SEO compliance.`,
      urgency: scoreDiff > 15 ? 'critical' : 'warning',
      action: 'Fix critical on-page issues detected in Tool 01 to close this gap immediately.'
    });

    if (leaderSite.loadTimeMs < mySiteRanked.loadTimeMs) {
      const speedPct = Math.round(((mySiteRanked.loadTimeMs - leaderSite.loadTimeMs) / leaderSite.loadTimeMs) * 100);
      gaps.push({
        metric: 'Latency Gap (Speed)',
        gapText: `Leader responds ${speedPct}% faster (${leaderSite.loadTimeMs}ms vs your ${mySiteRanked.loadTimeMs}ms).`,
        urgency: speedPct > 50 ? 'critical' : 'warning',
        action: 'Enable gzip/brotli compression and convert images to WebP to eliminate this latency deficit.'
      });
    }

    if (leaderSite.wordCount > mySiteRanked.wordCount) {
      const wordPct = Math.round(((leaderSite.wordCount - mySiteRanked.wordCount) / Math.max(1, mySiteRanked.wordCount)) * 100);
      gaps.push({
        metric: 'Content Depth Gap',
        gapText: `Leader has +${wordPct}% more content depth (${leaderSite.wordCount} words vs your ${mySiteRanked.wordCount} words).`,
        urgency: 'warning',
        action: 'Add comprehensive FAQs and subtopics using Tool 03 (LSI Keywords) to match topical authority.'
      });
    }

    if (mySiteRanked.imagesMissingAlt > 0) {
      gaps.push({
        metric: 'Image Alt Coverage',
        gapText: `You have ${mySiteRanked.imagesMissingAlt} images missing alt text, whereas ${leaderSite.hostname} has clean coverage.`,
        urgency: 'info',
        action: 'Use Tool 09 (Image SEO) to auto-generate missing descriptive tags.'
      });
    }
  } else {
    gaps.push({
      metric: 'Market Dominance',
      gapText: `Congratulations! Your website currently holds Rank #1 with ${mySiteRanked.score}/100 SEO health score.`,
      urgency: 'success',
      action: 'Maintain your lead by monitoring Core Web Vitals regularly with Tool 14.'
    });
  }

  return {
    success: true,
    totalCompared: sites.length,
    overallWinner: leaderSite.hostname,
    topLeader: leaderSite,
    mySite: mySiteRanked,
    benchmarks: {
      avgScore,
      avgSpeed,
      avgWords
    },
    leaderboard,
    sites,
    gaps,
    // Backward compatibility for 2-site consumers
    site1: sites[0],
    site2: sites[1] || sites[0]
  };
}
