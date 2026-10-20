/**
 * Gemini AI SEO Assistant Service
 * Connects to Google Gemini API to write high-CTR metadata,
 * analyze content gaps, and generate blog outlines.
 * Includes a built-in instant heuristic generator fallback so it ALWAYS works with zero latency.
 */

export async function optimizeWithAi({ type, query, content = '', currentTitle = '', currentDesc = '', lang = 'en', apiKey }) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  const langNames = {
    en: 'English',
    hi: 'Hindi (हिन्दी)',
    es: 'Spanish (Español)',
    de: 'German (Deutsch)',
    fr: 'French (Français)'
  };
  const targetLangName = langNames[lang] || 'English';

  if (key && key !== 'your_gemini_api_key_here') {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      let prompt = getPromptForType(type, query, content, currentTitle, currentDesc, targetLangName, lang);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const response = await fetch(endpoint, {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95
          }
        })
      });

      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
      }
    } catch (err) {
      console.warn(`[AI Optimizer] Gemini call notice: ${err.message}. Using built-in SEO engine.`);
    }
  }

  // Fallback to high-converting rule-based algorithmic response
  return generateAlgorithmicFallback(type, query, currentTitle, currentDesc);
}

function getPromptForType(type, query, content, currentTitle, currentDesc, targetLangName = 'English', lang = 'en') {
  const langRule = lang !== 'en' ? `IMPORTANT: Write all titles, descriptions, recommendations, and outline points in ${targetLangName} language.` : '';

  if (type === 'meta_rewrite') {
    return `You are a world-class SEO copywriter.
Target Keyword / Topic: "${query}"
Current Title: "${currentTitle}"
Current Description: "${currentDesc}"
${langRule}

Generate 3 high-CTR Meta Title & Description pairs.
Titles must be 50-60 chars with power words or year 2026.
Descriptions must be 145-160 chars with clear CTA.
Output raw JSON array of objects with keys: angle, title, titleChars, description, descChars.`;
  }

  if (type === 'content_gap') {
    return `Perform a Content Gap Analysis for target keyword "${query}".
${langRule}
Output raw JSON object with keys: targetKeyword, missingEntities, recommendedHeadings, faqQuestions, targetWordCount, quickTips.`;
  }

  return `Generate an SEO Article Outline for keyword "${query}".
${langRule}
Output raw JSON object with keys: suggestedH1, metaTitle, metaDescription, estimatedReadTime, recommendedWordCount, sections.`;
}

function generateAlgorithmicFallback(type, query, currentTitle, currentDesc) {
  const q = query.trim();
  const titleCaseQuery = q.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  if (type === 'meta_rewrite') {
    return [
      {
        angle: "High CTR / Power Words 🔥",
        title: `${titleCaseQuery}: The Ultimate 2026 Guide & Top Picks`,
        titleChars: `${titleCaseQuery}: The Ultimate 2026 Guide & Top Picks`.length,
        description: `Looking for ${q}? Discover curated styles, expert comparisons, and proven tips to get the best results today. Read our complete guide now!`,
        descChars: `Looking for ${q}? Discover curated styles, expert comparisons, and proven tips to get the best results today. Read our complete guide now!`.length
      },
      {
        angle: "Commercial / Direct Benefit 💰",
        title: `Buy Custom ${titleCaseQuery} Online | Premium Museum Quality`,
        titleChars: `Buy Custom ${titleCaseQuery} Online | Premium Museum Quality`.length,
        description: `Explore customizable ${q} crafted with high-resolution details. Choose your size, custom finish, and enjoy fast instant delivery. Shop now!`,
        descChars: `Explore customizable ${q} crafted with high-resolution details. Choose your size, custom finish, and enjoy fast instant delivery. Shop now!`.length
      },
      {
        angle: "Question / Curiosity Hook ❓",
        title: `Is ${titleCaseQuery} Worth It? Everything You Must Know`,
        titleChars: `Is ${titleCaseQuery} Worth It? Everything You Must Know`.length,
        description: `Wondering if ${q} is right for you? We break down features, pricing, and pros & cons before you decide. Click to uncover the truth!`,
        descChars: `Wondering if ${q} is right for you? We break down features, pricing, and pros & cons before you decide. Click to uncover the truth!`.length
      }
    ];
  }

  if (type === 'content_gap') {
    return {
      targetKeyword: q,
      missingEntities: [
        `${q} cost breakdown`,
        `best practices for ${q}`,
        `step-by-step instructions`,
        `common mistakes to avoid`,
        `expert tips & recommendations`
      ],
      recommendedHeadings: [
        { level: "H2", text: `Why ${titleCaseQuery} Matters in 2026` },
        { level: "H3", text: `Key Features of High-Performing ${titleCaseQuery}` },
        { level: "H2", text: `How to Choose the Right ${titleCaseQuery}` },
        { level: "H3", text: `Pricing & Value Comparison` },
        { level: "H2", text: `Frequently Asked Questions About ${titleCaseQuery}` }
      ],
      faqQuestions: [
        { q: `What is the average cost of ${q}?`, importance: "High (High Search Volume)" },
        { q: `How do I get started with ${q}?`, importance: "High (Featured Snippet Opportunity)" },
        { q: `What are the top alternatives to ${q}?`, importance: "Medium" }
      ],
      targetWordCount: "1,400 - 1,800 words",
      quickTips: [
        "Include your primary keyword in the first 100 words of the introduction.",
        "Add an interactive FAQ section with FAQPage JSON-LD schema.",
        "Use bullet points and bold text to target Google's People Also Ask (PAA) boxes."
      ]
    };
  }

  // Article outline
  return {
    suggestedH1: `The Definitive Guide to ${titleCaseQuery} (2026 Edition)`,
    metaTitle: `${titleCaseQuery} Guide 2026: Tips, Comparison & Review`,
    metaDescription: `Master ${q} with our in-depth 2026 guide. Learn strategies, key features, and expert tips to get the best results. Read the full guide!`,
    estimatedReadTime: "8 min",
    recommendedWordCount: "1,800+ words",
    sections: [
      {
        heading: "H2: Introduction & What You Need to Know",
        purpose: "Hook the reader and establish topical relevance",
        keyPoints: [
          `Clear definition of ${q}`,
          "Who this guide is for and what you will learn"
        ],
        subheadings: [
          `H3: The Core Fundamentals of ${titleCaseQuery}`
        ]
      },
      {
        heading: `H2: Top Benefits of Choosing ${titleCaseQuery}`,
        purpose: "Highlight value propositions and build commercial interest",
        keyPoints: [
          "Time and cost efficiency",
          "High aesthetic and functional appeal"
        ]
      },
      {
        heading: `H2: Step-by-Step Implementation`,
        purpose: "Provide actionable, high-utility instructions",
        keyPoints: [
          "Phase 1: Setup and preparation",
          "Phase 2: Customization and fine-tuning",
          "Phase 3: Launch and evaluation"
        ]
      },
      {
        heading: "H2: Frequently Asked Questions (FAQ)",
        purpose: "Capture Google People Also Ask snippets",
        keyPoints: [
          `Can I customize ${q} for my specific needs?`,
          `How long does it take to see results with ${q}?`
        ]
      }
    ]
  };
}
