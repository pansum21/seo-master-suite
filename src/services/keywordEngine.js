/**
 * Keyword Research & LSI Generator Service
 * Generates keyword ideas using transparent heuristics. Search volume, CPC,
 * and keyword difficulty require a licensed data provider and are not guessed.
 */
export async function analyzeKeywords(seedKeyword, geminiApiKey = null) {
  const keyword = seedKeyword.trim();
  if (!keyword) {
    throw new Error('Seed keyword cannot be empty');
  }

  // 1. Detect Search Intent
  const intent = detectSearchIntent(keyword);

  // Suggestions are ideas only, not measured search-demand data.
  const lsiKeywords = generateLsiKeywords(keyword);

  // 4. If Gemini API Key provided, augment with real AI niche ideas
  let aiIdeas = [];
  if (geminiApiKey) {
    try {
      aiIdeas = await fetchGeminiKeywordExpansions(keyword, geminiApiKey);
    } catch (e) {
      console.warn('Gemini keyword expansion fallback:', e.message);
    }
  }

  return {
    success: true,
    keyword,
    query: keyword,
    intent: intent.type,
    intentConfidence: intent.confidence,
    intentDescription: intent.description,
    primaryMetrics: null,
    metricsAvailable: false,
    dataSource: 'Rule-based keyword suggestions; no search-volume provider connected',
    related: lsiKeywords,
    variations: [...lsiKeywords, ...aiIdeas],
    questions: lsiKeywords.filter(k => k.type === 'Question').map(k => k.keyword),
    categories: {
      questions: lsiKeywords.filter(k => k.type === 'Question'),
      longTail: lsiKeywords.filter(k => k.type === 'Long-tail'),
      commercial: lsiKeywords.filter(k => k.type === 'Commercial / Buyer'),
      comparisons: lsiKeywords.filter(k => k.type === 'Comparison / Alternative')
    }
  };
}

/**
 * Search Intent Classifier
 */
function detectSearchIntent(keyword) {
  const kw = keyword.toLowerCase();

  const transactionalWords = ['buy', 'order', 'price', 'cost', 'discount', 'coupon', 'shop', 'cheap', 'purchase', 'sale', 'deal', 'hire'];
  const commercialWords = ['best', 'top', 'review', 'vs', 'comparison', 'alternatives', 'brands', 'guide', 'rated'];
  const informationalWords = ['how', 'what', 'why', 'who', 'where', 'when', 'tutorial', 'tips', 'guide', 'meaning', 'example', 'ideas', 'history'];
  const navigationalWords = ['login', 'sign in', 'official', 'portal', 'website', 'app', 'download', 'contact'];

  if (transactionalWords.some(w => kw.includes(w))) {
    return {
      type: 'Transactional 💰',
      confidence: 'Heuristic',
      description: 'User is searching with clear intent to purchase a product or service.'
    };
  }

  if (commercialWords.some(w => kw.includes(w))) {
    return {
      type: 'Commercial Investigation 🔎',
      confidence: 'Heuristic',
      description: 'User is evaluating options, comparing brands, or reading reviews prior to buying.'
    };
  }

  if (navigationalWords.some(w => kw.includes(w))) {
    return {
      type: 'Navigational 🧭',
      confidence: 'Heuristic',
      description: 'User wants to reach a specific brand, portal, or website.'
    };
  }

  return {
    type: 'Informational 📚',
    confidence: 'Heuristic',
    description: 'User is seeking knowledge, answers, tutorials, or inspiration.'
  };
}

/**
 * Generates rule-based semantic LSI keyword variations
 */
function generateLsiKeywords(seed) {
  const s = seed.trim();
  const variations = [
    // Long-tail
    { keyword: `best ${s} for beginners`, type: 'Long-tail' },
    { keyword: `custom ${s} online free`, type: 'Long-tail' },
    { keyword: `affordable ${s} ideas`, type: 'Long-tail' },
    { keyword: `modern minimalist ${s}`, type: 'Long-tail' },
    { keyword: `${s} step by step guide`, type: 'Long-tail' },

    // Questions
    { keyword: `how to create ${s}`, type: 'Question' },
    { keyword: `what is the best ${s} website`, type: 'Question' },
    { keyword: `why do people use ${s}`, type: 'Question' },
    { keyword: `where to buy authentic ${s}`, type: 'Question' },
    { keyword: `is ${s} worth the money`, type: 'Question' },

    // Commercial
    { keyword: `buy ${s} with instant download`, type: 'Commercial / Buyer' },
    { keyword: `order personalized ${s}`, type: 'Commercial / Buyer' },
    { keyword: `top ${s} stores`, type: 'Commercial / Buyer' },
    { keyword: `discount code for ${s}`, type: 'Commercial / Buyer' },

    // Comparisons
    { keyword: `${s} vs competitors comparison`, type: 'Comparison / Alternative' },
    { keyword: `best alternatives to ${s}`, type: 'Comparison / Alternative' },
    { keyword: `${s} review and rating`, type: 'Comparison / Alternative' }
  ];

  return variations;
}

/**
 * Fetch dynamic AI keyword expansions via Google Gemini API
 */
async function fetchGeminiKeywordExpansions(keyword, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `Act as an expert SEO keyword researcher like Ahrefs / SEMrush.
For the seed topic ${JSON.stringify(keyword)}, provide 6 plausible keyword phrase ideas. Do not estimate or invent search volume, CPC, difficulty, rankings, or traffic.
Format your response ONLY as a JSON array of objects with keys:
[
  { "keyword": "...", "type": "Long-tail" | "Question" | "Commercial / Buyer" }
]
Do not return any markdown ticks or explanation, return raw JSON array only.`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!res.ok) return [];

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  const ideas = JSON.parse(cleanJson);
  if (!Array.isArray(ideas)) return [];
  return ideas.filter(i => typeof i?.keyword === 'string').slice(0, 10).map(i => ({
    keyword: i.keyword.slice(0, 180),
    type: ['Long-tail', 'Question', 'Commercial / Buyer'].includes(i.type) ? i.type : 'Long-tail'
  }));
}
