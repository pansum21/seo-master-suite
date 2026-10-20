/**
 * Computes Flesch Reading Ease, word count, keyword density, and content insights
 * @param {string} text 
 * @param {string} targetKeyword 
 * @returns {Object}
 */
export function analyzeContent(text, targetKeyword = '') {
  if (!text || typeof text !== 'string') {
    return {
      wordCount: 0,
      charCount: 0,
      sentenceCount: 0,
      readingEase: 0,
      gradeLevel: 'N/A',
      readTimeMin: 0,
      keywordDensity: 0,
      keywordCount: 0,
      keywords: [],
      tips: ['Please provide content to analyze.']
    };
  }

  const cleanText = text.trim();
  const charCount = cleanText.length;
  
  // Word extraction
  const words = cleanText.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
  const wordCount = words.length;

  // Sentences extraction
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length || 1;

  // Syllables estimation
  let totalSyllables = 0;
  words.forEach(word => {
    totalSyllables += countSyllables(word);
  });

  // Flesch Reading Ease formula: 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  let readingEase = 0;
  if (wordCount > 0) {
    const avgSentenceLength = wordCount / sentenceCount;
    const avgSyllablesPerWord = totalSyllables / wordCount;
    readingEase = Math.round(206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord));
    readingEase = Math.max(0, Math.min(100, readingEase));
  }

  let gradeLevel = 'Standard';
  let readingLabel = 'Fairly Easy';
  if (readingEase >= 90) { gradeLevel = '5th Grade'; readingLabel = 'Very Easy'; }
  else if (readingEase >= 80) { gradeLevel = '6th Grade'; readingLabel = 'Easy'; }
  else if (readingEase >= 70) { gradeLevel = '7th Grade'; readingLabel = 'Fairly Easy'; }
  else if (readingEase >= 60) { gradeLevel = '8th & 9th Grade'; readingLabel = 'Standard / Plain English'; }
  else if (readingEase >= 50) { gradeLevel = '10th to 12th Grade'; readingLabel = 'Fairly Difficult'; }
  else if (readingEase >= 30) { gradeLevel = 'College Level'; readingLabel = 'Difficult'; }
  else { gradeLevel = 'College Graduate'; readingLabel = 'Very Confusing / Technical'; }

  // Reading time (200 words per minute average reading speed)
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));
  const speakTimeMin = Math.max(1, Math.ceil(wordCount / 130));

  // Keyword frequency & density
  const stopWords = new Set([
    'the','and','a','to','of','in','i','is','that','it','on','you','this','for','but','with','are','have',
    'be','at','or','as','was','so','if','out','not','we','they','by','an','from','up','about','into','over','after'
  ]);

  const freqMap = {};
  words.forEach(w => {
    if (w.length > 2 && !stopWords.has(w)) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: Number(((count / wordCount) * 100).toFixed(2))
    }));

  // Target keyword tracking
  let targetStats = null;
  if (targetKeyword) {
    const tLower = targetKeyword.trim().toLowerCase();
    const tRegex = new RegExp(`\\b${tLower}\\b`, 'gi');
    const matches = cleanText.match(tRegex) || [];
    const count = matches.length;
    const density = wordCount > 0 ? Number(((count / wordCount) * 100).toFixed(2)) : 0;
    
    let status = 'Optimal';
    if (density < 0.5) status = 'Under-optimized';
    else if (density > 2.5) status = 'Over-optimized (Risk of Keyword Stuffing)';

    targetStats = {
      keyword: targetKeyword,
      count,
      density,
      status
    };
  }

  // Actionable tips
  const tips = [];
  if (wordCount < 300) {
    tips.push('Thin content alert: Articles with under 300 words struggle to rank on Google. Aim for at least 800-1,500 words for competitive queries.');
  } else if (wordCount >= 1200) {
    tips.push('Excellent in-depth word count! Comprehensive articles have a 3.5x higher likelihood of earning top-3 Google rankings.');
  }

  if (readingEase < 60) {
    tips.push('Your content is relatively complex to read. Consider breaking long sentences into shorter paragraphs to increase engagement.');
  } else {
    tips.push('Great readability! Your content is clear and easy for general web visitors to digest.');
  }

  if (targetStats && targetStats.density > 2.5) {
    tips.push(`Warning: Target keyword density is ${targetStats.density}%. Google algorithms may penalize this as keyword stuffing. Keep it between 1% and 2%.`);
  }

  return {
    wordCount,
    charCount,
    sentenceCount,
    readingEase,
    gradeLevel,
    readingLabel,
    readTimeMin,
    speakTimeMin,
    targetStats,
    keywords: sortedKeywords,
    tips
  };
}

function countSyllables(word) {
  let w = word.toLowerCase().replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  w = w.replace(/^y/, '');
  const matches = w.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}
