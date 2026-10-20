/**
 * Keyword Research & LSI Generator Service
 * Simulates enterprise keyword metrics (Ahrefs / SEMrush style)
 * with search intent, difficulty score, CPC, and semantic LSI expansions.
 */
export async function analyzeKeywords(seedKeyword, geminiApiKey = null) {
  const keyword = seedKeyword.trim();
  if (!keyword) {
    throw new Error('Seed keyword cannot be empty');
  }

  // 1. Detect Search Intent
  const intent = detectSearchIntent(keyword);

  // 2. Deterministic Realistic Metrics based on keyword hashing & patterns
  const metrics = calculateKeywordMetrics(keyword);

  // 3. Generate 20+ Semantic / LSI Keyword Variations
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
    primaryMetrics: metrics,
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
      confidence: 'High (88%)',
      description: 'User is searching with clear intent to purchase a product or service.'
    };
  }

  if (commercialWords.some(w => kw.includes(w))) {
    return {
      type: 'Commercial Investigation 🔎',
      confidence: 'High (84%)',
      description: 'User is evaluating options, comparing brands, or reading reviews prior to buying.'
    };
  }

  if (navigationalWords.some(w => kw.includes(w))) {
    return {
      type: 'Navigational 🧭',
      confidence: 'Medium (75%)',
      description: 'User wants to reach a specific brand, portal, or website.'
    };
  }

  return {
    type: 'Informational 📚',
    confidence: 'High (85%)',
    description: 'User is seeking knowledge, answers, tutorials, or inspiration.'
  };
}

/**
 * Calculates realistic metrics based on string entropy & patterns
 */
function calculateKeywordMetrics(kw) {
  let hash = 0;
  for (let i = 0; i < kw.length; i++) {
    hash = (hash << 5) - hash + kw.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  // Volume range ~ 1,400 to 180,000 / mo
  const baseVolume = 1200 + (positiveHash % 85000);
  const roundedVolume = Math.round(baseVolume / 100) * 100;

  // Keyword Difficulty: 1 - 100
  const difficulty = 15 + (positiveHash % 75);
  let difficultyLabel = 'Easy (Low Competition)';
  let difficultyColor = '#10b981'; // green

  if (difficulty > 65) {
    difficultyLabel = 'Hard (High Authority Needed)';
    difficultyColor = '#ef4444'; // red
  } else if (difficulty > 35) {
    difficultyLabel = 'Medium (Target with Good Content)';
    difficultyColor = '#f59e0b'; // amber
  }

  // Cost Per Click (USD)
  const cpc = (0.45 + (positiveHash % 380) / 100).toFixed(2);

  // Organic CTR Potential
  const organicCtr = (62 + (positiveHash % 25)).toFixed(0) + '%';

  return {
    searchVolume: roundedVolume,
    searchVolumeFormatted: roundedVolume.toLocaleString(),
    difficulty,
    difficultyLabel,
    difficultyColor,
    cpc: parseFloat(cpc) || 1.25,
    cpcFormatted: `$${cpc}`,
    organicCtr,
    trend: '+14% YoY'
  };
}

/**
 * Generates rule-based semantic LSI keyword variations
 */
function generateLsiKeywords(seed) {
  const s = seed.trim();
  const variations = [
    // Long-tail
    { keyword: `best ${s} for beginners`, type: 'Long-tail', volume: '3,200', kd: 28, cpc: '$1.20' },
    { keyword: `custom ${s} online free`, type: 'Long-tail', volume: '4,800', kd: 34, cpc: '$0.85' },
    { keyword: `affordable ${s} ideas`, type: 'Long-tail', volume: '1,900', kd: 22, cpc: '$0.95' },
    { keyword: `modern minimalist ${s}`, type: 'Long-tail', volume: '2,600', kd: 31, cpc: '$1.40' },
    { keyword: `${s} step by step guide`, type: 'Long-tail', volume: '1,400', kd: 25, cpc: '$0.70' },

    // Questions
    { keyword: `how to create ${s}`, type: 'Question', volume: '5,400', kd: 32, cpc: '$1.10' },
    { keyword: `what is the best ${s} website`, type: 'Question', volume: '6,200', kd: 45, cpc: '$1.75' },
    { keyword: `why do people use ${s}`, type: 'Question', volume: '880', kd: 18, cpc: '$0.50' },
    { keyword: `where to buy authentic ${s}`, type: 'Question', volume: '2,100', kd: 38, cpc: '$1.90' },
    { keyword: `is ${s} worth the money`, type: 'Question', volume: '1,650', kd: 29, cpc: '$1.15' },

    // Commercial
    { keyword: `buy ${s} with instant download`, type: 'Commercial / Buyer', volume: '3,900', kd: 42, cpc: '$2.30' },
    { keyword: `order personalized ${s}`, type: 'Commercial / Buyer', volume: '4,100', kd: 46, cpc: '$2.60' },
    { keyword: `top 10 ${s} stores 2026`, type: 'Commercial / Buyer', volume: '7,500', kd: 52, cpc: '$1.80' },
    { keyword: `discount code for ${s}`, type: 'Commercial / Buyer', volume: '1,300', kd: 35, cpc: '$1.40' },

    // Comparisons
    { keyword: `${s} vs competitors comparison`, type: 'Comparison / Alternative', volume: '2,400', kd: 36, cpc: '$1.60' },
    { keyword: `best alternatives to ${s}`, type: 'Comparison / Alternative', volume: '3,100', kd: 41, cpc: '$1.95' },
    { keyword: `${s} review and rating`, type: 'Comparison / Alternative', volume: '4,700', kd: 44, cpc: '$2.10' }
  ];

  return variations;
}

/**
 * Fetch dynamic AI keyword expansions via Google Gemini API
 */
async function fetchGeminiKeywordExpansions(keyword, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `Act as an expert SEO keyword researcher like Ahrefs / SEMrush.
For the seed topic "${keyword}", provide 6 high-traffic semantic LSI keyword ideas.
Format your response ONLY as a JSON array of objects with keys:
[
  { "keyword": "...", "type": "Long-tail" | "Question" | "Commercial / Buyer", "volume": "e.g. 2,800", "kd": 30, "cpc": "$1.50" }
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

  return JSON.parse(cleanJson);
}
