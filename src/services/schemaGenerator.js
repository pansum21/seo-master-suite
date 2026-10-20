/**
 * Schema.org JSON-LD & Meta Tag Generator
 * Generates Google-compliant structured data for rich snippets, FAQs, and product cards.
 */

export function generateSchema(type, data) {
  switch (type) {
    case 'Article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': data.headline || 'Your Article Headline',
        'description': data.description || 'Brief description of the article.',
        'image': data.image || 'https://example.com/cover.jpg',
        'author': {
          '@type': 'Person',
          'name': data.authorName || 'Author Name'
        },
        'publisher': {
          '@type': 'Organization',
          'name': data.publisherName || 'Brand Name',
          'logo': {
            '@type': 'ImageObject',
            'url': data.publisherLogo || 'https://example.com/logo.png'
          }
        },
        'datePublished': data.datePublished || new Date().toISOString().split('T')[0],
        'dateModified': new Date().toISOString().split('T')[0]
      };

    case 'FAQPage':
      const questions = data.faqs && data.faqs.length > 0 ? data.faqs : [
        { q: 'How does this work?', a: 'You enter your question and get instant answers.' },
        { q: 'Is this completely free?', a: 'Yes, 100% free with no credit card required.' }
      ];
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': questions.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a
          }
        }))
      };

    case 'Product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': data.name || 'Sample Product',
        'image': data.image || 'https://example.com/product.jpg',
        'description': data.description || 'High quality professional product.',
        'brand': {
          '@type': 'Brand',
          'name': data.brand || 'Acme Brand'
        },
        'offers': {
          '@type': 'Offer',
          'url': data.url || 'https://example.com/product',
          'priceCurrency': data.currency || 'USD',
          'price': data.price || '29.00',
          'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': data.rating || '4.9',
          'reviewCount': data.reviews || '128'
        }
      };

    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': data.name || 'My Local Business',
        'image': data.image || 'https://example.com/store.jpg',
        'telephone': data.phone || '+1-555-0199',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': data.street || '123 Main Street',
          'addressLocality': data.city || 'New York',
          'addressRegion': data.region || 'NY',
          'postalCode': data.zip || '10001',
          'addressCountry': data.country || 'US'
        },
        'openingHours': data.hours || 'Mo-Fr 09:00-18:00',
        'url': data.url || 'https://example.com'
      };

    case 'Organization':
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': data.name || 'Company Name',
        'url': data.url || 'https://example.com',
        'logo': data.logo || 'https://example.com/logo.png',
        'sameAs': data.socialLinks || [
          'https://twitter.com/yourbrand',
          'https://facebook.com/yourbrand',
          'https://instagram.com/yourbrand'
        ]
      };
  }
}

/**
 * Generates standard complete HTML meta tag bundle
 */
export function generateMetaBundle({ title, description, url, imageUrl, brand = 'MyBrand' }) {
  return `<!-- Primary Meta Tags -->
<title>${escapeHtml(title || 'Page Title')}</title>
<meta name="title" content="${escapeHtml(title || 'Page Title')}">
<meta name="description" content="${escapeHtml(description || 'Page description goes here')}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${escapeHtml(url || 'https://example.com')}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(url || 'https://example.com')}">
<meta property="og:title" content="${escapeHtml(title || 'Page Title')}">
<meta property="og:description" content="${escapeHtml(description || 'Page description')}">
<meta property="og:image" content="${escapeHtml(imageUrl || 'https://example.com/og-image.jpg')}">
<meta property="og:site_name" content="${escapeHtml(brand)}">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${escapeHtml(url || 'https://example.com')}">
<meta name="twitter:title" content="${escapeHtml(title || 'Page Title')}">
<meta name="twitter:description" content="${escapeHtml(description || 'Page description')}">
<meta name="twitter:image" content="${escapeHtml(imageUrl || 'https://example.com/og-image.jpg')}">`;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
