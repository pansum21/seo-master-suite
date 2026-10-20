/**
 * SEOPulse Pro Suite — Internationalization (i18n) Engine
 * Supported Languages: English (en), Hindi (hi), Spanish (es), German (de), French (fr)
 * High-CPC Tier-1 Search Optimization & Multi-Region Guide Translator
 */

const I18N_LANGUAGES = {
  en: { label: 'English', flag: '🇺🇸', code: 'en' },
  hi: { label: 'हिन्दी', flag: '🇮🇳', code: 'hi' },
  es: { label: 'Español', flag: '🇪🇸', code: 'es' },
  de: { label: 'Deutsch', flag: '🇩🇪', code: 'de' },
  fr: { label: 'Français', flag: '🇫🇷', code: 'fr' }
};

const I18N_SECTIONS = {
  en: {
    badge: '📖 USER GUIDE & HOW IT WORKS',
    togglePrompt: 'Read / Hide Guide',
    simpleTitle: '💡 In Simple Words (Definition):',
    stepsTitle: '🚀 How to Use (3 Simple Steps):',
    howTitle: '⚙️ How It Works Behind the Scenes:',
    whyTitle: '🎯 Why Google Cares (Ranking Impact):',
    faqTitle: '❓ Beginner FAQ & Pro Tips:',
    step: 'Step'
  },
  hi: {
    badge: '📖 USER GUIDE & HOW IT WORKS',
    togglePrompt: 'गाइड पढ़ें / छिपाएं',
    simpleTitle: '💡 आसान शब्दों में समझें (सरल परिभाषा):',
    stepsTitle: '🚀 इसे कैसे इस्तेमाल करें (3 आसान स्टेप्स):',
    howTitle: '⚙️ यह टूल पर्दे के पीछे कैसे काम करता है (How It Works):',
    whyTitle: '🎯 गूगल में इसका क्या फायदा है:',
    faqTitle: '❓ अक्सर पूछे जाने वाले सवाल (Beginner FAQ):',
    step: 'Step'
  },
  es: {
    badge: '📖 GUÍA DE USUARIO Y FUNCIONAMIENTO',
    togglePrompt: 'Leer / Ocultar Guía',
    simpleTitle: '💡 En Palabras Simples (Definición):',
    stepsTitle: '🚀 Cómo Usar (3 Pasos Fáciles):',
    howTitle: '⚙️ Cómo Funciona Detrás de Escena:',
    whyTitle: '🎯 Por Qué le Importa a Google (Impacto en Posicionamiento):',
    faqTitle: '❓ Preguntas Frecuentes y Consejos Pro:',
    step: 'Paso'
  },
  de: {
    badge: '📖 BENUTZERHANDBUCH & FUNKTIONSWEISE',
    togglePrompt: 'Anleitung lesen / schließen',
    simpleTitle: '💡 In einfachen Worten (Definition):',
    stepsTitle: '🚀 So verwenden Sie es (3 einfache Schritte):',
    howTitle: '⚙️ So funktioniert es hinter den Kulissen:',
    whyTitle: '🎯 Warum Google darauf achtet (Ranking-Vorteil):',
    faqTitle: '❓ Häufig gestellte Fragen & Profi-Tipps:',
    step: 'Schritt'
  },
  fr: {
    badge: '📖 GUIDE D\'UTILISATION & FONCTIONNEMENT',
    togglePrompt: 'Lire / Réduire le guide',
    simpleTitle: '💡 En Mots Simples (Définition):',
    stepsTitle: '🚀 Comment l\'Utiliser (3 Étapes Simples):',
    howTitle: '⚙️ Comment Cela Fonctionne en Coulisses:',
    whyTitle: '🎯 Pourquoi Google s\'en Soucie (Impact SEO):',
    faqTitle: '❓ FAQ Débutants & Conseils d\'Experts:',
    step: 'Étape'
  }
};

const I18N_TOOLS = {
  auditor: {
    en: {
      toolName: 'Site Health Auditor',
      headline: 'How to Use <span class="highlight">Site Health Auditor</span> & How It Works (Beginner Guide)',
      simple: 'Just like a doctor uses a stethoscope to check a patient\'s pulse, temperature, and blood pressure, this tool scans 100 critical areas of your website (titles, headings, images, speed, broken links) in under 1 second and provides an overall health score (Grade A+, A, B, C, F).',
      step1: '<strong>Enter Website URL</strong>: Paste your web address (e.g., <code>https://example.com</code>) into the search bar.',
      step2: '<strong>Run Full Audit</strong>: Click the blue "Run Full Audit ⚡" button. The engine crawls your live HTML immediately.',
      step3: '<strong>Resolve Issues</strong>: Review <strong>Critical Issues (Red)</strong> and <strong>Warnings (Yellow)</strong> below and update your website accordingly.',
      how: 'Our backend connects directly to your site like a search engine crawler. It parses the DOM for title tags, H1-H6 hierarchy, image alt text, technical files (robots, sitemap), and TTFB latency against 20+ algorithmic SEO rules.',
      why: 'When your site has zero structural or technical errors, search engines perceive it as reliable, high-quality, and indexable, boosting your rankings in search results.',
      q1: 'Q: What if my audit score is below 60?',
      a1: 'A: Don\'t worry! It simply means search engines are having trouble understanding parts of your site. Fixing the Critical Issues will quickly push your score above 85+.',
      q2: 'Q: What is considered a great SEO score?',
      a2: 'A: An overall score of 80+ is Grade A, while 90+ indicates an exceptional, search-ready website.'
    },
    hi: {
      toolName: 'Site Health Auditor',
      headline: 'How to Use <span class="highlight">Site Health Auditor</span> & How It Works (आसान यूजर गाइड)',
      simple: 'जैसे डॉक्टर स्टेथोस्कोप लगाकर मरीज़ की धड़कन, बुखार और ब्लड प्रेशर चेक करता है, वैसे ही यह टूल आपकी वेबसाइट की 100 ज़रूरी चीज़ें (टाइटल, हेडिंग्स, तस्वीरें, स्पीड, टूटी कड़ियाँ) सिर्फ 1 सेकंड में चेक करके 100 में से ओवरऑल स्कोर और ग्रेड (Grade A+, A, B, C, F) दे देता है।',
      step1: '<strong>वेबसाइट लिंक डालें</strong>: सर्च बॉक्स में अपनी वेबसाइट का पूरा URL डालें (जैसे <code>https://mywebsite.com</code>)।',
      step2: '<strong>स्कैन बटन दबाएं</strong>: नीले रंग का "Run Full Audit ⚡" बटन दबाएं। टूल 1 सेकंड में लाइव वेबसाइट का पूरा कोड स्कैन कर लेगा।',
      step3: '<strong>कमियां ठीक करें</strong>: नीचे Critical Issues (लाल बत्ती) और Warnings (पीली बत्ती) देखें। जो-जो कमी दिखे, उसे अपनी वेबसाइट में जाकर ठीक करें।',
      how: 'हमारा बैकएंड सर्वर सीधे आपकी वेबसाइट को एक रोबोट की तरह लोड करता है। यह HTML कोड में से Meta Tags, H1-H6 हेडिंग्स, इमेज के alt एट्रिब्यूट्स, और सर्वर लेटेंसी को नापता है और 20 से अधिक SEO नियमों के आधार पर आपका हेल्थ स्कोर कैलकुलेट करता है।',
      why: 'जब आपकी वेबसाइट पर कोई तकनीकी गलती (जैसे खाली टाइटल या टूटी इमेज) नहीं होती, तो गूगल का सर्च बॉट आपकी साइट को भरोसेमंद और हाई-क्वालिटी मानकर सर्च रिजल्ट्स में ऊपर रैंक करता है।',
      q1: 'Q: अगर मेरा स्कोर 60 से कम आए तो क्या वेबसाइट बंद हो जाएगी?',
      a1: 'A: बिल्कुल नहीं! इसका बस यह मतलब है कि गूगल को आपकी वेबसाइट समझने में परेशानी हो रही है। आप "Critical Issues" में दिए गए सुझाव ठीक करेंगे तो स्कोर तुरंत 85+ हो जाएगा।',
      q2: 'Q: अच्छा SEO स्कोर कितना माना जाता है?',
      a2: 'A: 80 से ऊपर का स्कोर बहुत अच्छा (Grade A) माना जाता है। 90+ स्कोर पर आपकी वेबसाइट गूगल के टॉप पेजों पर आने के लिए पूरी तरह तैयार है।'
    },
    es: {
      toolName: 'Auditor de Salud Web',
      headline: 'Cómo Usar el <span class="highlight">Auditor de Salud Web</span> y Cómo Funciona (Guía para Principiantes)',
      simple: 'Tal como un médico ausculta el corazón y la temperatura de un paciente, esta herramienta analiza más de 100 factores esenciales de tu web (títulos, encabezados, fotos, velocidad, enlaces rotos) en menos de 1 segundo para otorgar una calificación global (Grado A+, A, B, C, F).',
      step1: '<strong>Introduce tu URL</strong>: Pega la dirección de tu página (ej. <code>https://misitio.com</code>) en la caja de búsqueda.',
      step2: '<strong>Ejecutar Auditoría</strong>: Haz clic en "Run Full Audit ⚡". El motor rastreará el código HTML al instante.',
      step3: '<strong>Corrige los Errores</strong>: Revisa los <strong>Problemas Críticos (Rojo)</strong> y <strong>Advertencias (Amarillo)</strong> y aplícalos en tu web.',
      how: 'El servidor descarga la página como si fuera Googlebot. Mide etiquetas meta, jerarquía H1-H6, atributos alt y tiempo de respuesta para calcular un puntaje basado en más de 20 reglas oficiales de SEO.',
      why: 'Los sitios web limpios y libres de errores técnicos obtienen la máxima confianza de Google, lo que se traduce en mejores posiciones orgánicas y mayor tráfico.',
      q1: 'Q: ¿Qué pasa si mi puntaje es inferior a 60?',
      a1: 'A: No te preocupes. Significa que Google tiene dificultades para interpretar tu sitio. Al corregir los problemas críticos tu puntuación subirá a 85+ rápidamente.',
      q2: 'Q: ¿Cuál es un puntaje excelente?',
      a2: 'A: 80 o más es Grado A, y más de 90 significa que tu sitio está totalmente optimizado para competir en los primeros resultados.'
    },
    de: {
      toolName: 'Website-Gesundheitsprüfer',
      headline: 'Verwendung von <span class="highlight">Site Health Auditor</span> & Funktionsweise (Einsteiger-Guide)',
      simple: 'Wie ein Arzt mit einem Stethoskop untersucht dieses Tool in unter einer Sekunde über 100 kritische Faktoren Ihrer Website (Titel, Überschriften, Bilder, Ladezeiten, defekte Links) und berechnet eine transparente Gesamtnote (A+, A, B, C, F).',
      step1: '<strong>URL eingeben</strong>: Fügen Sie Ihre Webadresse (z. B. <code>https://beispiel.de</code>) in das Suchfeld ein.',
      step2: '<strong>Audit starten</strong>: Klicken Sie auf "Run Full Audit ⚡", um den Quellcode live zu analysieren.',
      step3: '<strong>Fehler beheben</strong>: Überprüfen Sie kritische Fehler (Rot) und Warnungen (Gelb), um gezielt nachzubessern.',
      how: 'Der Server lädt die Seite wie ein Suchmaschinen-Crawler herunter und prüft DOM-Struktur, Überschriftenhierarchie, Alt-Tags und Serverlatenz anhand von über 20 SEO-Kriterien.',
      why: 'Fehlerfreie Webseiten werden von Suchmaschinen als vertrauenswürdig eingestuft und erhalten deutliche Rankingvorteile in den Suchergebnissen.',
      q1: 'Q: Was bedeutet eine Punktzahl unter 60?',
      a1: 'A: Es bedeutet lediglich, dass Google Probleme beim Auslesen hat. Das Beheben der roten Fehler bringt Sie schnell auf über 85 Punkte.',
      q2: 'Q: Was ist ein idealer SEO-Score?',
      a2: 'A: Ab 80 Punkten erhalten Sie die Note A; ab 90 Punkten ist Ihre Website technisch herausragend optimiert.'
    },
    fr: {
      toolName: 'Auditeur de Santé Web',
      headline: 'Comment Utiliser l\'<span class="highlight">Auditeur de Santé Web</span> (Guide Débutant)',
      simple: 'Comme un médecin examinant un patient, cet outil inspecte 100 critères vitaux de votre site (balises titres, en-têtes, images, vitesse, liens brisés) en moins d\'une seconde et génère une note globale (Note A+, A, B, C, F).',
      step1: '<strong>Entrez l\'URL</strong>: Saisissez l\'adresse de votre site (ex: <code>https://monsite.fr</code>) dans la barre de recherche.',
      step2: '<strong>Lancer l\'audit</strong>: Cliquez sur "Run Full Audit ⚡". Le moteur analyse le code source en direct.',
      step3: '<strong>Corriger les anomalies</strong>: Consultez les <strong>Erreurs Critiques (Rouge)</strong> et avertissements pour optimiser vos pages.',
      how: 'Le moteur interroge votre serveur comme un robot Googlebot. Il analyse le DOM, l\'arborescence H1-H6, les balises alt et la latence selon plus de 20 règles algorithmiques.',
      why: 'Google privilégie les sites sans erreurs techniques. Un code sain améliore l\'indexation et propulse vos pages en tête des résultats.',
      q1: 'Q: Que faire si mon score est inférieur à 60?',
      a1: 'A: Pas de panique! Cela indique simplement des lacunes de balisage. Corrigez les alertes rouges pour dépasser rapidement 85.',
      q2: 'Q: Quel est le score idéal?',
      a2: 'A: Un score de 80+ est classé Grade A, et 90+ garantit une conformité optimale pour les moteurs de recherche.'
    }
  },

  serp: {
    en: {
      toolName: 'Google SERP Simulator',
      headline: 'How to Use <span class="highlight">Google SERP Simulator</span> & How It Works (Beginner Guide)',
      simple: 'Like a billboard outside a store that attracts customers, your Google search snippet (blue title and 2-line description) is what searchers see first. This simulator previews your exact snippet on both mobile and desktop before you publish.',
      step1: '<strong>Fill Title & Description</strong>: Enter your page title and meta description, or click "Import from Audit ⚡" to pull them automatically.',
      step2: '<strong>Prevent Truncation</strong>: Watch the live pixel preview. Green bars mean optimal length. Red indicates text is too long and will be cut off with (...).',
      step3: '<strong>Check Mobile vs Desktop</strong>: Toggle between Mobile and Desktop tabs to verify appearance across all screen sizes.',
      how: 'Google measures titles in exact pixel width (~600px on desktop, ~680px on mobile). Our simulator renders using Google\'s exact font family (Arial) and pixel scaling to mimic real search results.',
      why: 'A compelling, well-fitted title dramatically increases your Click-Through Rate (CTR). High CTR signals to Google that searchers love your page, boosting your rank.',
      q1: 'Q: What is the recommended character length?',
      a1: 'A: 50-60 characters for the Page Title, and 140-160 characters for the Meta Description.',
      q2: 'Q: How do star ratings appear in search snippets?',
      a2: 'A: Use Tool 04 (Schema Markup Generator) to inject JSON-LD Product or Review schema onto your page.'
    },
    hi: {
      toolName: 'Google SERP Simulator',
      headline: 'How to Use <span class="highlight">Google SERP Simulator</span> & How It Works (आसान यूजर गाइड)',
      simple: 'जैसे बाज़ार में किसी दुकान के बाहर लगा साइनबोर्ड देखकर ग्राहक तय करते हैं कि अंदर जाना है या नहीं, वैसे ही जब कोई गूगल पर कुछ सर्च करता है, तो उसे आपकी वेबसाइट का नीला टाइटल और दो लाइन का डिस्क्रिप्शन दिखता है। यह टूल आपको पहले ही दिखा देता है कि गूगल में आपकी वेबसाइट कैसी दिखेगी।',
      step1: '<strong>टाइटल और डिस्क्रिप्शन भरें</strong>: ऊपर बॉक्स में अपना टेक्स्ट लिखें, या "Import from Audit ⚡" दबाकर ऑटोमैटिक ले आएं।',
      step2: '<strong>कटे हुए शब्दों से बचें</strong>: लाइव प्रीव्यू देखें। अगर प्रोग्रेस बार हरा है तो सही है, लाल है तो मतलब टेक्स्ट बहुत लंबा है और गूगल में कट जाएगा।',
      step3: '<strong>मोबाइल और डेस्कटॉप दोनों जांचें</strong>: Mobile और Desktop टैब पर क्लिक करके दोनों स्क्रीन पर प्रीव्यू चेक करें।',
      how: 'गूगल स्क्रीन के पिक्सल (Pixel Width) नापता है। यह सिम्युलेटर गूगल के आधिकारिक फॉन्ट और असली पिक्सल विड्थ के आधार पर लाइव रेंडर करता है।',
      why: 'एक आकर्षक टाइटल होने से लोग आपके लिंक पर बिना सोचे तुरंत क्लिक करते हैं (हाई CTR), जिससे गूगल आपकी रैंकिंग और बढ़ा देता है।',
      q1: 'Q: टाइटल और डिस्क्रिप्शन की सही लंबाई क्या है?',
      a1: 'A: Title लगभग 50-60 अक्षरों का और Meta Description 140-160 अक्षरों का सबसे बेस्ट होता है।',
      q2: 'Q: स्टार रेटिंग (⭐⭐⭐⭐⭐) कैसे लाएं?',
      a2: 'A: इसके लिए Tool 04 (Schema Markup) का इस्तेमाल करके कोड अपनी साइट में जोड़ें।'
    },
    es: {
      toolName: 'Simulador Google SERP',
      headline: 'Cómo Usar el <span class="highlight">Simulador Google SERP</span> y Cómo Funciona',
      simple: 'Como el letrero de una tienda física que atrae a los transeúntes, el fragmento de Google (título azul y descripción) es la primera impresión de tu web. Esta herramienta te permite previsualizarlo en escritorio y móvil.',
      step1: '<strong>Rellena Título y Descripción</strong>: Escribe tu contenido o haz clic en "Import from Audit ⚡" para cargar los datos actuales.',
      step2: '<strong>Evita Textos Cortados</strong>: Verifica los medidores en tiempo real. La barra verde indica longitud perfecta; la roja significa que Google cortará tu texto con (...).',
      step3: '<strong>Revisa Móvil y Escritorio</strong>: Alterna entre pestañas para asegurar que luce perfecto en smartphones y pantallas grandes.',
      how: 'Google calcula el ancho en píxeles (~600px en PC, ~680px en móvil). El simulador utiliza las fuentes y márgenes oficiales de Google para replicar el resultado exacto.',
      why: 'Un título irresistible dispara tu porcentaje de clics (CTR). Cuantas más personas eligen tu enlace frente a la competencia, más alto te posiciona Google.',
      q1: 'Q: ¿Cuál es la longitud recomendada?',
      a1: 'A: Entre 50 y 60 caracteres para el título, y entre 140 y 160 caracteres para la meta descripción.',
      q2: 'Q: ¿Cómo consigo estrellas de calificación en Google?',
      a2: 'A: Utiliza la Herramienta 04 (Generador de Schema JSON-LD) para añadir datos estructurados de Producto o Reseña.'
    },
    de: {
      toolName: 'Google SERP Simulator',
      headline: 'Verwendung des <span class="highlight">Google SERP Simulators</span> & Funktionsweise',
      simple: 'Wie ein Ladenschild, das Passanten anzieht, entscheidet Ihr Google-Snippet (blauer Titel und Beschreibung) darüber, ob Suchende klicken. Dieser Simulator zeigt Ihnen das Live-Suchergebnis auf Smartphone und PC.',
      step1: '<strong>Titel & Beschreibung eingeben</strong>: Tragen Sie Ihren Text ein oder importieren Sie ihn via "Import from Audit ⚡".',
      step2: '<strong>Abschneiden verhindern</strong>: Grüne Balken signalisieren optimale Länge. Rot zeigt an, dass Google den Text mit (...) kürzen wird.',
      step3: '<strong>Mobil & Desktop prüfen</strong>: Wechseln Sie zwischen den Ansichten, um die Lesbarkeit auf allen Endgeräten sicherzustellen.',
      how: 'Google berechnet Textbreiten in Pixeln (~600px Desktop, ~680px Mobil). Der Simulator nutzt die exakten Google-Schriftarten für eine 100% realistische Vorschau.',
      why: 'Aussagekräftige Titel steigern die Klickrate (CTR). Höhere Klickraten signalisieren Google Relevanz und führen zu besseren Rankings.',
      q1: 'Q: Wie lang sollte ein Meta-Titel sein?',
      a1: 'A: Optimal sind 50–60 Zeichen für den Titel und 140–160 Zeichen für die Meta-Beschreibung.',
      q2: 'Q: Wie erhalte ich Bewertungssterne in Google?',
      a2: 'A: Nutzen Sie Tool 04 (Schema Markup Generator), um strukturierte Daten einzubinden.'
    },
    fr: {
      toolName: 'Simulateur SERP Google',
      headline: 'Comment Utiliser le <span class="highlight">Simulateur SERP Google</span>',
      simple: 'Comme l\'enseigne d\'un magasin, votre extrait Google (titre bleu et description) attire les visiteurs. Ce simulateur affiche le rendu exact avant même la publication.',
      step1: '<strong>Renseignez Titre & Description</strong>: Écrivez votre texte ou cliquez sur "Import from Audit ⚡" pour récupérer les balises actuelles.',
      step2: '<strong>Évitez la troncature</strong>: Surveillez les barres de progression. Le vert indique une longueur idéale; le rouge signifie que Google tronquera votre texte (...).',
      step3: '<strong>Vérifiez Mobile et Bureau</strong>: Basculez entre les onglets pour tester l\'affichage sur smartphones et ordinateurs.',
      how: 'Google mesure la largeur en pixels (~600px sur PC, ~680px sur mobile). Notre simulateur reproduit fidèlement la typographie officielle de Google.',
      why: 'Un extrait percutant maximise votre taux de clic (CTR), incitant l\'algorithme Google à faire remonter votre page vers la première position.',
      q1: 'Q: Quelle est la longueur recommandée?',
      a1: 'A: 50 à 60 caractères pour le Titre et 140 à 160 caractères pour la Meta Description.',
      q2: 'Q: Comment faire apparaître les étoiles d\'avis?',
      a2: 'A: Utilisez l\'Outil 04 (Générateur de Schema) pour intégrer du balisage JSON-LD.'
    }
  },

  keywords: {
    en: {
      toolName: 'Keyword & LSI Explorer',
      headline: 'How to Use <span class="highlight">Keyword & LSI Explorer</span> & How It Works (Beginner Guide)',
      simple: 'Like a smart retailer who stocks what customers actively ask for, a website creator must use the exact terms people type into Google. This tool discovers those magic keywords, their search intent, and related questions.',
      step1: '<strong>Type a Topic</strong>: Enter a seed query (e.g., "digital marketing", "running shoes") into the search box.',
      step2: '<strong>Explore Keywords</strong>: Click "Explore Keywords 🎯". The engine evaluates intent, search difficulty, and variations.',
      step3: '<strong>Select Buyer & Question Keywords</strong>: Pick high-intent questions and long-tail keywords to use in your headings and FAQs.',
      how: 'The engine classifies user intent (informational, transactional, commercial) and leverages Google Gemini AI to uncover semantically related LSI phrases and real user questions.',
      why: 'Stuffing the same keyword repeatedly causes Google penalties. Using rich, semantic LSI keywords shows Google you have comprehensive topical authority.',
      q1: 'Q: What are LSI Keywords?',
      a1: 'A: Latent Semantic Indexing keywords are terms naturally related to your main topic (e.g., for "tea": "milk", "sugar", "herbal", "brew").',
      q2: 'Q: What does Keyword Difficulty (KD%) mean?',
      a2: 'A: KD indicates competition. New creators should prioritize low-KD terms (0-35) for easy first-page rankings.'
    },
    hi: {
      toolName: 'Keyword & LSI Explorer',
      headline: 'How to Use <span class="highlight">Keyword & LSI Explorer</span> & How It Works (आसान यूजर गाइड)',
      simple: 'जैसे दुकानदार वही सामान रखता है जिसे ग्राहक सबसे ज्यादा मांगते हैं, वैसे ही आपको वो शब्द लिखने चाहिए जो लोग गूगल पर सर्च करते हैं। यह टूल आपको वो कीवर्ड्स, सर्च इंटेंट और लोगों के सवाल ढूंढ कर देता है।',
      step1: '<strong>एक मुख्य शब्द लिखें</strong>: बॉक्स में अपनी पसंद का कोई भी विषय डालें (जैसे: "shoes", "digital marketing")।',
      step2: '<strong>एक्सप्लोर बटन दबाएं</strong>: "Explore Keywords 🎯" दबाएं। टूल तुरंत सर्च इंटेंट और LSI कीवर्ड्स तैयार कर देगा।',
      step3: '<strong>सवालों को चुनें</strong>: Questions और Long-tail लिस्ट में से अच्छे शब्द चुनकर अपने ब्लॉग में हेडिंग बनाएं।',
      how: 'यह शब्द के पीछे की मंशा (Intent) पहचानता है और Gemini AI की मदद से 20+ मिलते-जुलते LSI शब्द ढूंढता है।',
      why: 'एक ही शब्द बार-बार लिखने से पेनल्टी लगती है। LSI शब्द इस्तेमाल करने से गूगल समझता है कि आप असली एक्सपर्ट हैं।',
      q1: 'Q: LSI कीवर्ड क्या होते हैं?',
      a1: 'A: वो शब्द जो मुख्य विषय से जुड़े होते हैं (जैसे क्रिकेट के लिए बल्ला, गेंद, पिच)।',
      q2: 'Q: KD% का क्या मतलब है?',
      a2: 'A: यह कॉम्पिटिशन का स्तर है। नए ब्लॉगर्स को 0-35 KD वाले आसान कीवर्ड्स चुनने चाहिए।'
    },
    es: {
      toolName: 'Explorador de Palabras Clave y LSI',
      headline: 'Cómo Usar el <span class="highlight">Explorador de Palabras Clave y LSI</span>',
      simple: 'Un comerciante inteligente ofrece lo que sus clientes piden. En la web debes usar las palabras exactas que la gente busca en Google. Esta herramienta encuentra esas palabras clave de alto valor.',
      step1: '<strong>Introduce una Palabra Clave</strong>: Escribe un tema semilla (ej. "diseño web", "zapatillas deportivas").',
      step2: '<strong>Explorar Términos</strong>: Haz clic en "Explore Keywords 🎯" para clasificar la intención y generar variantes.',
      step3: '<strong>Selecciona Preguntas y Long-Tail</strong>: Utiliza las preguntas de los usuarios y términos comerciales para redactar tus artículos.',
      how: 'Clasifica la intención de búsqueda (informativa, transaccional) y emplea IA Gemini para sugerir términos semánticos LSI.',
      why: 'Repetir la misma palabra genera penalizaciones por sobreoptimización. La riqueza semántica LSI demuestra autoridad temática ante Google.',
      q1: 'Q: ¿Qué son palabras clave LSI?',
      a1: 'A: Son términos estrechamente vinculados al tema central (ej. para "café": "grano", "taza", "espresso", "aroma").',
      q2: 'Q: ¿Qué significa KD% (Dificultad)?',
      a2: 'A: Mide la competencia. Los sitios nuevos deben apuntar a un KD bajo (0-35) para posicionar rápido.'
    },
    de: {
      toolName: 'Keyword & LSI Explorer',
      headline: 'Verwendung des <span class="highlight">Keyword & LSI Explorers</span> & Funktionsweise',
      simple: 'Ein erfolgreicher Händler führt, was Kunden suchen. Auf Ihrer Website müssen Sie genau die Begriffe nutzen, die Suchende bei Google eingeben. Dieses Tool liefert profitable Keywords samt Suchabsicht.',
      step1: '<strong>Suchbegriff eingeben</strong>: Tragen Sie ein Hauptthema (z. B. "Online Marketing", "Laufschuhe") ein.',
      step2: '<strong>Keywords analysieren</strong>: Klicken Sie auf "Explore Keywords 🎯", um LSI-Begriffe und Suchabsichten zu ermitteln.',
      step3: '<strong>Fragen auswählen</strong>: Nutzen Sie die Fragen der Nutzer als Überschriften in Ihren Ratgeber-Artikeln.',
      how: 'Das Tool analysiert die Suchabsicht (Information, Kauf) und nutzt Gemini KI für semantische Keyword-Clustering-Vorschläge.',
      why: 'Keyword-Stuffing wird von Google abgestraft. Vielfältige LSI-Begriffe belegen thematische Tiefe und sichern Spitzenpositionen.',
      q1: 'Q: Was sind LSI-Keywords?',
      a1: 'A: Wörter, die im thematischen Kontext stehen (z. B. bei "Tee": "Zitronengras", "Aufguss", "Koffein").',
      q2: 'Q: Was bedeutet KD% (Keyword Difficulty)?',
      a2: 'A: Es zeigt den Wettbewerb an. Neue Websites sollten Keywords mit einem KD unter 35 anvisieren.'
    },
    fr: {
      toolName: 'Explorateur de Mots-Clés LSI',
      headline: 'Comment Utiliser l\'<span class="highlight">Explorateur de Mots-Clés LSI</span>',
      simple: 'Comme un commerçant qui vend ce que ses clients réclament, vous devez employer les termes exacts recherchés sur Google. Cet outil révèle ces requêtes stratégiques.',
      step1: '<strong>Entrez un Mot-Clé</strong>: Saisissez une thématique (ex: "création de site", "chaussures de sport").',
      step2: '<strong>Explorer les Requêtes</strong>: Cliquez sur "Explore Keywords 🎯" pour identifier l\'intention et les volumes estimés.',
      step3: '<strong>Exploitez les Questions</strong>: Intégrez les questions fréquentes des internautes dans vos sous-titres H2 et H3.',
      how: 'Le système identifie l\'intention (informationnelle, transactionnelle) et mobilise l\'IA Gemini pour générer des variantes sémantiques LSI.',
      why: 'Répéter le même mot-clé est pénalisé par Google. Utiliser un champ sémantique riche prouve votre expertise thématique.',
      q1: 'Q: Que signifie mot-clé LSI?',
      a1: 'A: Ce sont des termes sémantiquement liés au sujet (ex: pour "voiture": "moteur", "vitesse", "pneus").',
      q2: 'Q: Qu\'indique le KD% (Difficulté)?',
      a2: 'A: Le niveau de concurrence. Privilégiez des mots-clés sous 35% pour vous classer rapidement en première page.'
    }
  },

  schema: {
    en: {
      toolName: 'Schema Markup Generator',
      headline: 'How to Use <span class="highlight">Schema Markup Generator</span> & How It Works (Beginner Guide)',
      simple: 'Google is a computer program, not a human. To help it understand what products, recipes, or FAQs are on your page, you provide a structured code note called "JSON-LD Schema". This earns you star ratings (⭐⭐⭐⭐⭐) directly in Google search.',
      step1: '<strong>Choose Category</strong>: Select Article, Product, FAQPage, or Organization from the dropdown.',
      step2: '<strong>Fill Properties</strong>: Enter your title, author, price, or questions. The valid code builds on the right.',
      step3: '<strong>Paste into Website</strong>: Click "Copy JSON-LD" and paste it inside the <code>&lt;head&gt;</code> of your webpage.',
      how: 'It structures metadata according to official Schema.org standards so search engine crawlers parse your entities without errors.',
      why: 'Rich snippets (star ratings, prices, FAQs) make your listing stand out, increasing search clicks by up to 30%.',
      q1: 'Q: Do I need to know coding?',
      a1: 'A: Not at all! Fill in the simple form, and the generator writes the code automatically.',
      q2: 'Q: Does it work on WordPress or Shopify?',
      a2: 'A: Yes, JSON-LD works seamlessly on WordPress, Shopify, Next.js, and static HTML.'
    },
    hi: {
      toolName: 'Schema Markup Generator',
      headline: 'How to Use <span class="highlight">Schema Markup Generator</span> & How It Works (आसान यूजर गाइड)',
      simple: 'गूगल एक रोबोट है। उसे साफ-साफ समझाने के लिए कि आपकी वेबसाइट पर कौन-सा सामान है या सवाल-जवाब हैं, हम उसे एक पर्ची (कोड) बनाकर देते हैं जिसे "Schema Markup" कहते हैं। इससे सर्च में स्टार रेटिंग (⭐⭐⭐⭐⭐) दिखने लगती है।',
      step1: '<strong>कैटिगरी चुनें</strong>: Article, Product, FAQPage, या Organization में से चुनें।',
      step2: '<strong>जानकारी भरें</strong>: शीर्षक, लेखक का नाम या सवाल-जवाब टाइप करें। दाईं तरफ कोड खुद बनता जाएगा।',
      step3: '<strong>कोड पेस्ट करें</strong>: "Copy JSON-LD" दबाएं और कोड को अपने वेब पेज के <code>&lt;head&gt;</code> में डाल दें।',
      how: 'यह आपकी जानकारी को Schema.org और Google के नियमों के अनुसार फॉर्मेट करता है ताकि बॉट तुरंत समझ सके।',
      why: 'स्टार रेटिंग और सवाल-जवाब दिखने से लोग आपके लिंक पर 30% ज्यादा क्लिक करते हैं।',
      q1: 'Q: क्या कोडिंग आनी चाहिए?',
      a1: 'A: बिल्कुल नहीं! सिर्फ फॉर्म भरें, कोड यह टूल खुद 1 सेकंड में बना देता है।',
      q2: 'Q: क्या यह वर्डप्रेस पर काम करेगा?',
      a2: 'A: हाँ, यह WordPress, Shopify, HTML सभी पर आराम से काम करता है।'
    },
    es: {
      toolName: 'Generador de Marcado Schema',
      headline: 'Cómo Usar el <span class="highlight">Generador de Marcado Schema</span>',
      simple: 'Google es un robot informático. Para explicarle qué vendes o qué preguntas respondes, le entregas una nota codificada llamada "Schema JSON-LD". Esto activa estrellas de reseña (⭐⭐⭐⭐⭐) en Google.',
      step1: '<strong>Selecciona el Tipo</strong>: Elige Artículo, Producto, FAQPage o Negocio Local.',
      step2: '<strong>Completa los Datos</strong>: Escribe título, autor, precio o preguntas. El código se genera a la derecha.',
      step3: '<strong>Copia e Inserta</strong>: Haz clic en "Copy JSON-LD" y pégalo dentro de la etiqueta <code>&lt;head&gt;</code>.',
      how: 'Estructura tus datos bajo los estándares de Schema.org reconocidos por Google, Bing y Yahoo.',
      why: 'Los resultados enriquecidos captan la atención visual y disparan el CTR hasta un 30% frente a enlaces planos.',
      q1: 'Q: ¿Necesito saber programar?',
      a1: 'A: ¡Para nada! Solo llena los campos y la herramienta escribe todo el código automáticamente.',
      q2: 'Q: ¿Funciona en WordPress o Shopify?',
      a2: 'A: Sí, es compatible al 100% con cualquier CMS, WordPress, Shopify o código personalizado.'
    },
    de: {
      toolName: 'Schema Markup Generator',
      headline: 'Verwendung des <span class="highlight">Schema Markup Generators</span>',
      simple: 'Google ist ein Computerprogramm. Um ihm mitzuteilen, welche Produkte, Rezensionen oder FAQs Ihre Seite enthält, übergeben Sie einen strukturierten Code (JSON-LD). So erhalten Sie Sterne-Bewertungen (⭐⭐⭐⭐⭐) in den Suchergebnissen.',
      step1: '<strong>Schema-Typ wählen</strong>: Wählen Sie Artikel, Produkt, FAQPage oder Organisation.',
      step2: '<strong>Felder ausfüllen</strong>: Geben Sie Titel, Autor oder Preise ein. Der Code wird rechts in Echtzeit generiert.',
      step3: '<strong>Code einbinden</strong>: Klicken Sie auf "Copy JSON-LD" und fügen Sie den Code in das <code>&lt;head&gt;</code> Ihrer Seite ein.',
      how: 'Erstellt validen JSON-LD Code gemäß den offiziellen Schema.org-Richtlinien für maximale Kompatibilität.',
      why: 'Rich Snippets steigern die Aufmerksamkeit und erhöhen die Klickrate um bis zu 30 Prozent.',
      q1: 'Q: Benötige ich Programmierkenntnisse?',
      a1: 'A: Nein, Sie füllen lediglich das Formular aus – das Tool schreibt den Code.',
      q2: 'Q: Kompatibel mit WordPress?',
      a2: 'A: Ja, funktioniert auf WordPress, Shopify, Webflow und jeder HTML-Seite.'
    },
    fr: {
      toolName: 'Générateur de Balisage Schema',
      headline: 'Comment Utiliser le <span class="highlight">Générateur de Balisage Schema</span>',
      simple: 'Google est un algorithme. Pour lui indiquer clairement le sujet de votre page (produit, avis, FAQ), vous lui fournissez une fiche descriptive appelée "Schema JSON-LD", affichant des étoiles (⭐⭐⭐⭐⭐) sous votre lien.',
      step1: '<strong>Choisir le Type</strong>: Sélectionnez Article, Produit, FAQPage ou Organisation.',
      step2: '<strong>Compléter les Champs</strong>: Renseignez vos titres, prix ou questions. Le code se génère instantanément.',
      step3: '<strong>Copier le Code</strong>: Cliquez sur "Copy JSON-LD" et collez-le dans la balise <code>&lt;head&gt;</code> de votre site.',
      how: 'Structure vos métadonnées selon les directives Schema.org validées par Google.',
      why: 'Les résultats enrichis attirent le regard et augmentent votre trafic qualifié de près de 30%.',
      q1: 'Q: Faut-il savoir coder?',
      a1: 'A: Aucunement! Le formulaire génère tout le script à votre place.',
      q2: 'Q: Fonctionne-t-il sur WordPress?',
      a2: 'A: Oui, compatible avec WordPress, Shopify, Prestashop et tout site HTML.'
    }
  },

  meta: {
    en: {
      toolName: 'Meta Tag & OpenGraph Forge',
      headline: 'How to Use <span class="highlight">Meta & OpenGraph Forge</span> & How It Works',
      simple: 'When you share a link on WhatsApp, Facebook, or Twitter, a rich card with an image, bold title, and description pops up. This forge creates the HTML code responsible for that visual magic.',
      step1: '<strong>Enter Website Details</strong>: Type your site title, 2-sentence description, and image URL.',
      step2: '<strong>Preview Social Cards</strong>: Review the live card previews for Facebook and Twitter on the right.',
      step3: '<strong>Copy Head Bundle</strong>: Click "Copy Head Meta Bundle" and place it in your page\'s <code>&lt;head&gt;</code>.',
      how: 'Bundles <code>og:title</code>, <code>og:image</code>, and <code>twitter:card</code> tags adhering to Open Graph protocols.',
      why: 'Visual social cards increase link clicks by 10x compared to naked URLs, driving massive viral referral traffic.',
      q1: 'Q: What is the optimal social share image size?',
      a1: 'A: 1200 x 630 pixels is the universal sweet spot for crisp display on WhatsApp and Facebook.',
      q2: 'Q: Does WhatsApp support this?',
      a2: 'A: Yes! WhatsApp uses Open Graph tags (og:image, og:title) to render link preview thumbnails.'
    },
    hi: {
      toolName: 'Meta & OpenGraph Forge',
      headline: 'How to Use <span class="highlight">Meta & OpenGraph Forge</span> & How It Works (आसान यूजर गाइड)',
      simple: 'जब आप WhatsApp या Facebook पर लिंक भेजते हैं, तो जो बड़ी सुंदर फोटो और टाइटल का कार्ड बनकर आता है, उसका कोड यह टूल तैयार करता है।',
      step1: '<strong>जानकारी भरें</strong>: वेबसाइट का नाम, विवरण और फोटो का वेब लिंक (URL) डालें।',
      step2: '<strong>सोशल कार्ड देखें</strong>: दाईं तरफ देखें कि Facebook और Twitter पर कार्ड कैसा दिख रहा है।',
      step3: '<strong>कोड कॉपी करें</strong>: "Copy Head Meta Bundle" दबाएं और कोड को अपने पेज के <code>&lt;head&gt;</code> में पेस्ट कर दें।',
      how: 'यह Facebook के लिए Open Graph और Twitter के लिए Twitter Cards के सभी जरूरी टैग्स एक साथ जोड़ता है।',
      why: 'सुंदर फोटो वाला कार्ड देखते ही लोग तुरंत क्लिक करते हैं, जिससे आपकी साइट पर वायरल सोशल ट्रैफिक आता है।',
      q1: 'Q: इमेज का सही साइज़ क्या है?',
      a1: 'A: 1200 x 630 पिक्सल सबसे सही साइज़ है जो हर जगह एकदम साफ दिखता है।',
      q2: 'Q: क्या यह WhatsApp पर भी काम करेगा?',
      a2: 'A: हाँ, WhatsApp भी इन्हीं टैग्स को पढ़कर लिंक का सुंदर कार्ड बनाता है।'
    },
    es: {
      toolName: 'Forja de Etiquetas Meta & OpenGraph',
      headline: 'Cómo Usar la <span class="highlight">Forja de Etiquetas Meta & OpenGraph</span>',
      simple: 'Cuando compartes un enlace en WhatsApp, Facebook o Twitter, aparece una tarjeta visual atractiva con imagen y título. Esta herramienta genera ese código en 1 segundo.',
      step1: '<strong>Ingresa los Datos</strong>: Escribe el título, descripción y la URL de tu imagen destacada.',
      step2: '<strong>Previsualiza las Tarjetas</strong>: Revisa cómo se verá en redes sociales en el panel lateral.',
      step3: '<strong>Copia el Bloque</strong>: Haz clic en "Copy Head Meta Bundle" e intégralo en tu cabecera HTML.',
      how: 'Escribe las etiquetas <code>og:title</code>, <code>og:image</code> y <code>twitter:card</code> con compatibilidad universal.',
      why: 'Los enlaces con tarjeta visual consiguen hasta 10 veces más clics en redes sociales y apps de mensajería.',
      q1: 'Q: ¿Cuál es el tamaño ideal de la imagen?',
      a1: 'A: 1200 x 630 píxeles es la dimensión recomendada internacionalmente.',
      q2: 'Q: ¿Es compatible con WhatsApp?',
      a2: 'A: Sí, WhatsApp lee directamente las etiquetas Open Graph para armar el cuadro visual.'
    },
    de: {
      toolName: 'Meta Tag & OpenGraph Forge',
      headline: 'Verwendung der <span class="highlight">Meta & OpenGraph Forge</span>',
      simple: 'Beim Teilen eines Links auf WhatsApp, LinkedIn oder X erscheint eine ansprechende Vorschaukarte mit Bild und Teaser. Dieses Tool erzeugt den entsprechenden Quellcode.',
      step1: '<strong>Angaben eintragen</strong>: Tragen Sie Titel, Beschreibung und Ihre Bild-URL ein.',
      step2: '<strong>Vorschau prüfen</strong>: Überprüfen Sie die Darstellung der Social-Cards auf der rechten Seite.',
      step3: '<strong>Code kopieren</strong>: Kopieren Sie das Bundle und fügen Sie es in den <code>&lt;head&gt;</code>-Bereich ein.',
      how: 'Generiert standardisierte OpenGraph- und Twitter-Card-Tags für alle modernen Plattformen.',
      why: 'Grafische Link-Vorschauen erzielen bis zu zehnmal mehr Klicks als einfache Textlinks.',
      q1: 'Q: Optimale Bildgröße für Social Media?',
      a1: 'A: 1200 x 630 Pixel sorgt für gestochen scharfe Vorschauen auf allen Geräten.',
      q2: 'Q: Unterstützt WhatsApp diese Tags?',
      a2: 'A: Ja, WhatsApp übernimmt Titel und Vorschaubild direkt aus den OpenGraph-Metadaten.'
    },
    fr: {
      toolName: 'Créateur de Balises Meta & OpenGraph',
      headline: 'Comment Utiliser le <span class="highlight">Créateur de Balises Meta & OpenGraph</span>',
      simple: 'Lorsque vous partagez un lien sur WhatsApp, Facebook ou Twitter, une carte visuelle élégante s\'affiche. Cet outil génère le code nécessaire instantanément.',
      step1: '<strong>Renseigner les Informations</strong>: Saisissez le titre, la description et l\'URL de votre image.',
      step2: '<strong>Prévisualiser la Carte</strong>: Contrôlez le rendu visuel dans le volet de droite.',
      step3: '<strong>Copier le Bloc</strong>: Cliquez sur "Copy Head Meta Bundle" et insérez-le dans votre <code>&lt;head&gt;</code>.',
      how: 'Intègre les protocoles Open Graph et Twitter Cards pour une conformité multiplateforme.',
      why: 'Une vignette visuelle génère jusqu\'à 10 fois plus de partages et de clics sur les réseaux sociaux.',
      q1: 'Q: Quelle est la taille d\'image recommandée?',
      a1: 'A: 1200 x 630 pixels pour un affichage optimal sur WhatsApp et Facebook.',
      q2: 'Q: Est-ce compatible avec WhatsApp?',
      a2: 'A: Absolument, WhatsApp s\'appuie sur les balises Open Graph pour générer ses aperçus.'
    }
  },

  ai: {
    en: {
      toolName: 'Gemini AI SEO Assistant',
      headline: 'How to Use <span class="highlight">Gemini AI SEO Assistant</span> & How It Works',
      simple: 'Consider this your 24/7 dedicated professional SEO copywriter. You never have to struggle with titles or descriptions—Google Gemini AI writes high-CTR search-ready copy in 2 seconds.',
      step1: '<strong>Choose Mode</strong>: Select Meta Rewrite (High CTR), Content Gap, or Article Outline.',
      step2: '<strong>Input Topic</strong>: Enter your query, keyword, or page URL (e.g., "how to rank faster on google").',
      step3: '<strong>Generate with AI</strong>: Click "Generate with Gemini AI ✨" and paste the high-performing suggestions directly.',
      how: 'Powered by Gemini 3.8 Flash, applying semantic keyword algorithms and Google EEAT quality standards.',
      why: 'High-CTR titles attract immediate clicks. More organic clicks send strong positive behavioral signals to Google algorithms.',
      q1: 'Q: Does Google penalize AI-written content?',
      a1: 'A: No! Google\'s official guidance clarifies that helpful, high-quality content is rewarded regardless of how it is created.',
      q2: 'Q: Is there any usage fee?',
      a2: 'A: No, it is 100% free and integrated into your SEOPulse Pro suite.'
    },
    hi: {
      toolName: 'Gemini AI SEO Assistant',
      headline: 'How to Use <span class="highlight">Gemini AI SEO Assistant</span> & How It Works (आसान यूजर गाइड)',
      simple: 'समझ लीजिए कि एक प्रोफेशनल एसईओ राइटर 24 घंटे आपकी सेवा में बैठा है। यह AI आपके लिए 2 सेकंड में गूगल के हिसाब से सबसे बेस्ट टाइटल और कंटेंट लिखकर तैयार कर देता है।',
      step1: '<strong>मोड चुनें</strong>: Meta Rewrite, Content Gap, या Article Outline में से चुनें।',
      step2: '<strong>विषय लिखें</strong>: बॉक्स में अपना कीवर्ड या टॉपिक लिखें।',
      step3: '<strong>AI से टेक्स्ट पाएं</strong>: "Generate with Gemini AI ✨" दबाएं और आए हुए टेक्स्ट को इस्तेमाल करें।',
      how: 'यह Google के सबसे नए Gemini 3.8 Flash मॉडल और EEAT क्वालिटी गाइडलाइंस पर काम करता है।',
      why: 'आकर्षक टाइटल होने से लोग तुरंत क्लिक करते हैं, जिससे रैंकिंग बहुत तेजी से बढ़ती है।',
      q1: 'Q: क्या AI का लिखा कंटेंट बैन होता है?',
      a1: 'A: नहीं! गूगल की गाइडलाइन कहती है कि अगर कंटेंट मददगार है तो कोई रोक नहीं है।',
      q2: 'Q: क्या इसके पैसे लगते हैं?',
      a2: 'A: बिल्कुल नहीं, यह 100% फ्री और अनलिमिटेड है।'
    },
    es: {
      toolName: 'Asistente SEO con Gemini IA',
      headline: 'Cómo Usar el <span class="highlight">Asistente SEO con Gemini IA</span>',
      simple: 'Es como tener un redactor SEO profesional trabajando las 24 horas para ti. Gemini IA redacta títulos atractivos de alto CTR y esquemas de artículos en 2 segundos.',
      step1: '<strong>Elige el Modo</strong>: Selecciona Reescritura Meta, Análisis de Brechas o Esquema de Artículo.',
      step2: '<strong>Ingresa el Tema</strong>: Escribe tu palabra clave o consulta objetivo.',
      step3: '<strong>Generar con IA</strong>: Haz clic en "Generate with Gemini AI ✨" y aprovecha las sugerencias.',
      how: 'Conectado a Gemini 3.8 Flash para optimizar términos según los criterios de calidad EEAT de Google.',
      why: 'Los títulos persuasivos maximizan los clics orgánicos, indicándole al algoritmo que tu página satisface a los usuarios.',
      q1: 'Q: ¿Google penaliza el contenido con IA?',
      a1: 'A: No. La directiva oficial de Google premia el contenido útil y de calidad, sin importar si fue asistido por IA.',
      q2: 'Q: ¿Tiene algún costo?',
      a2: 'A: Ninguno. Está incluido de manera 100% gratuita y sin límites en tu suite.'
    },
    de: {
      toolName: 'Gemini KI SEO Assistent',
      headline: 'Verwendung des <span class="highlight">Gemini KI SEO Assistenten</span>',
      simple: 'Ihr persönlicher SEO-Texter rund um die Uhr. Die Google Gemini KI generiert klickstarke Meta-Titel und Artikelgliederungen in wenigen Sekunden.',
      step1: '<strong>Modus auswählen</strong>: Wählen Sie Titel-Optimierung, Content-Lücken-Analyse oder Artikel-Gliederung.',
      step2: '<strong>Thema eingeben</strong>: Tragen Sie Ihr Hauptkeyword oder Thema ein.',
      step3: '<strong>KI starten</strong>: Klicken Sie auf "Generate with Gemini AI ✨" und übernehmen Sie die optimierten Texte.',
      how: 'Basiert auf Gemini 3.8 Flash und berücksichtigt Googles Richtlinien für Erfahrung, Fachwissen und Vertrauenswürdigkeit (EEAT).',
      why: 'Klickstarke Titel steigern den organischen Traffic und signalisieren Google hohe Nutzerzufriedenheit.',
      q1: 'Q: Werden KI-Texte von Google abgestraft?',
      a1: 'A: Nein, Google bewertet Inhalte nach Mehrwert und Qualität, unabhängig von der Erstellungsmethode.',
      q2: 'Q: Gibt es versteckte Kosten?',
      a2: 'A: Nein, das Tool ist uneingeschränkt kostenlos nutzbar.'
    },
    fr: {
      toolName: 'Assistant SEO Gemini IA',
      headline: 'Comment Utiliser l\'<span class="highlight">Assistant SEO Gemini IA</span>',
      simple: 'Votre rédacteur web SEO disponible 24h/24. L\'IA Gemini conçoit pour vous des titres percutants à fort taux de clic et des plans d\'articles en 2 secondes.',
      step1: '<strong>Sélectionner le Mode</strong>: Choisissez Réécriture Meta, Analyse de Contenu ou Plan d\'Article.',
      step2: '<strong>Saisir le Sujet</strong>: Indiquez votre mot-clé ou thématique.',
      step3: '<strong>Générer avec l\'IA</strong>: Cliquez sur "Generate with Gemini AI ✨" et appliquez les suggestions.',
      how: 'Propulsé par Gemini 3.8 Flash, intégrant les critères de pertinence et la norme EEAT de Google.',
      why: 'Un titre irrésistible décuple les clics et consolide durablement votre positionnement naturel.',
      q1: 'Q: Google pénalise-t-il les contenus IA?',
      a1: 'A: Non, la règle officielle stipule que la qualité et l\'utilité priment sur le mode de rédaction.',
      q2: 'Q: Ce service est-il payant?',
      a2: 'A: Non, il est accessible gratuitement et en illimité au sein de votre suite.'
    }
  },

  compare: {
    en: {
      toolName: 'Competitor Showdown',
      headline: 'How to Use <span class="highlight">Competitor Showdown</span> & How It Works',
      simple: 'Like a side-by-side sporting match, this tool pits your website against your primary competitor across speed, content depth, headings, and SEO health to declare an instant winner.',
      step1: '<strong>Enter Both URLs</strong>: Paste your site in box 1 and your competitor\'s site in box 2.',
      step2: '<strong>Start Showdown</strong>: Click "Compare Head-to-Head ⚔️" to initiate simultaneous crawls.',
      step3: '<strong>Analyze Scorecard</strong>: Green flags highlight where you lead; red flags show areas where you need improvement.',
      how: 'Audits both sites concurrently, comparing 8 core metrics: Health Score, TTFB Speed, Word Count, H1s, Missing Alt, SSL, Schema, and Links.',
      why: 'To claim rank #1 on Google, you don\'t need to be perfect—you just need to outperform the site currently occupying the top spot.',
      q1: 'Q: What if the competitor has a higher word count?',
      a1: 'A: They covered the topic more thoroughly. Add a comprehensive FAQ section and expert insights to outrank them.',
      q2: 'Q: Does the competitor know I\'m auditing them?',
      a2: 'A: Not at all! The audit is 100% private and discrete.'
    },
    hi: {
      toolName: 'Competitor Showdown',
      headline: 'How to Use <span class="highlight">Competitor Showdown</span> & How It Works (आसान यूजर गाइड)',
      simple: 'जैसे अखाड़े में दो पहलवानों का मुकाबला होता है, वैसे ही यह टूल आपकी वेबसाइट और आपके सबसे बड़े प्रतियोगी की वेबसाइट को एक साथ नापकर विनर घोषित करता है।',
      step1: '<strong>दोनों URL डालें</strong>: पहले डिब्बे में अपनी साइट और दूसरे में प्रतियोगी की साइट का लिंक डालें।',
      step2: '<strong>मुकाबला शुरू करें</strong>: "Compare Head-to-Head ⚔️" दबाएं। दोनों साइट्स एक साथ स्कैन होंगी।',
      step3: '<strong>स्कोरकार्ड देखें</strong>: जहाँ हरा है वहाँ आप आगे हैं, जहाँ लाल है वहाँ आपको सुधार करना है।',
      how: 'यह दोनों साइट्स के कोड को एक साथ डाउनलोड करके 8 पैमानों (स्पीड, हेडिंग्स, कंटेंट, स्कीमा, लिंक्स) पर तुलना करता है।',
      why: 'गूगल में नंबर-1 आने के लिए आपको बस उस व्यक्ति से थोड़ा बेहतर होना है जो आज पहली रैंक पर बैठा है।',
      q1: 'Q: अगर उसका वर्ड काउंट ज्यादा है तो क्या करूँ?',
      a1: 'A: अपने आर्टिकल में कुछ नए सवाल-जवाब जोड़कर कंटेंट की गहराई बढ़ाएं।',
      q2: 'Q: क्या उसे पता चलेगा?',
      a2: 'A: बिल्कुल नहीं, यह 100% प्राइवेट है।'
    },
    es: {
      toolName: 'Duelo de Competidores',
      headline: 'Cómo Usar el <span class="highlight">Duelo de Competidores</span>',
      simple: 'Un enfrentamiento deportivo directo. Compara tu web frente a tu mayor rival en velocidad, profundidad de contenido, etiquetas y salud SEO.',
      step1: '<strong>Introduce Ambas URLs</strong>: Coloca tu web en el campo 1 y la de tu rival en el campo 2.',
      step2: '<strong>Iniciar Duelo</strong>: Haz clic en "Compare Head-to-Head ⚔️" para auditar ambas en paralelo.',
      step3: '<strong>Revisa el Marcador</strong>: Detecta tus puntos fuertes (verde) y las brechas que debes superar (rojo).',
      how: 'Compara 8 métricas simultáneas: puntuación global, velocidad TTFB, recuento de palabras, H1, imágenes y datos estructurados.',
      why: 'Para ser el número 1 en Google no necesitas ser perfecto, solo necesitas superar a quien tiene la primera posición hoy.',
      q1: 'Q: ¿Qué hago si tienen más palabras?',
      a1: 'A: Amplía tu artículo con preguntas frecuentes (FAQ) y ejemplos prácticos para ofrecer mayor valor.',
      q2: 'Q: ¿El competidor se entera de este análisis?',
      a2: 'A: En absoluto. Es un rastreo totalmente anónimo y privado.'
    },
    de: {
      toolName: 'Konkurrenten-Vergleich',
      headline: 'Verwendung des <span class="highlight">Konkurrenten-Vergleichs</span>',
      simple: 'Wie ein sportlicher Direktvergleich stellt dieses Tool Ihre Website und Ihren schärfsten Mitbewerber bei Ladezeit, Inhaltstiefe und On-Page-SEO gegenüber.',
      step1: '<strong>Beide URLs eingeben</strong>: Tragen Sie Ihre eigene Adresse und die des Wettbewerbers ein.',
      step2: '<strong>Vergleich starten</strong>: Klicken Sie auf "Compare Head-to-Head ⚔️" für ein paralleles Audit.',
      step3: '<strong>Scorecard auswerten</strong>: Grün markiert Ihre Stärken, Rot zeigt unmittelbaren Optimierungsbedarf.',
      how: 'Parallele Analyse von 8 Kernmetriken: Gesamtscore, TTFB-Ladezeit, Textumfang, H1-Struktur, Alt-Tags und Schema.',
      why: 'Um auf Platz 1 zu ranken, müssen Sie lediglich besser sein als der aktuelle Spitzenreiter.',
      q1: 'Q: Was tun, wenn der Konkurrent mehr Text hat?',
      a1: 'A: Vertiefen Sie Ihr Thema mit Experten-Tipps und einem FAQ-Bereich.',
      q2: 'Q: Bleibt der Vergleich anonym?',
      a2: 'A: Ja, die Prüfung erfolgt 100% diskret und unbemerkt.'
    },
    fr: {
      toolName: 'Face-à-Face Concurrentiel',
      headline: 'Comment Utiliser le <span class="highlight">Face-à-Face Concurrentiel</span>',
      simple: 'Un duel direct entre votre site et votre concurrent principal pour évaluer la vitesse, la richesse du contenu et la conformité SEO.',
      step1: '<strong>Entrer les Deux URLs</strong>: Renseignez votre adresse et celle de votre concurrent.',
      step2: '<strong>Lancer le Duel</strong>: Cliquez sur "Compare Head-to-Head ⚔️" pour analyser les deux sites.',
      step3: '<strong>Analyser le Bilan</strong>: Identifiez vos points forts et comblez les écarts techniques.',
      how: 'Mesure 8 critères simultanément : score global, temps de réponse TTFB, volume de texte, H1, balises alt et données structurées.',
      why: 'Pour atteindre la première place sur Google, il suffit de surclasser le site actuellement classé devant vous.',
      q1: 'Q: Que faire si leur contenu est plus volumineux?',
      a1: 'A: Enrichissez votre page avec une FAQ ciblée et des cas concrets.',
      q2: 'Q: Mon concurrent est-il averti de cette analyse?',
      a2: 'A: Absolument pas, l\'audit est strictement confidentiel.'
    }
  },

  robots: {
    en: {
      toolName: 'Robots & Sitemap Engine',
      headline: 'How to Use <span class="highlight">Robots & Sitemap Engine</span> & How It Works',
      simple: '<code>robots.txt</code> is the security guard telling Googlebot which private areas are off-limits, while <code>sitemap.xml</code> is the master map listing every page on your site for instant indexing.',
      step1: '<strong>Enter Domain</strong>: Type your site URL (e.g. <code>https://mywebsite.com</code>).',
      step2: '<strong>Generate Directives</strong>: Click "Generate Directives 🤖". The tool validates syntax.',
      step3: '<strong>Save to Server</strong>: Click "Copy" and save as <code>robots.txt</code> in your website\'s root directory.',
      how: 'Generates standardized crawler instructions ensuring sensitive folders (<code>/admin</code>) are protected while pointing to your sitemap.',
      why: 'A missing sitemap causes Google to take weeks to discover new articles. A proper robots file prevents crawler waste.',
      q1: 'Q: What is the most dangerous robots.txt mistake?',
      a1: 'A: Writing <code>Disallow: /</code> blocks your entire website, causing Google to delete it from search results.',
      q2: 'Q: Does every website need a sitemap?',
      a2: 'A: Yes! It ensures search engines discover newly published pages within minutes.'
    },
    hi: {
      toolName: 'Robots & Sitemap Engine',
      headline: 'How to Use <span class="highlight">Robots & Sitemap Engine</span> & How It Works (आसान यूजर गाइड)',
      simple: '<code>robots.txt</code> आपकी वेबसाइट का दरबान है जो गूगल के रोबोट को बताता है कि एडमिन पैनल में मत जाना, और <code>sitemap.xml</code> वेबसाइट का नक्शा है जो सारे नए पेजों की जानकारी देता है।',
      step1: '<strong>डोमेन डालें</strong>: बॉक्स में अपनी वेबसाइट का लिंक डालें।',
      step2: '<strong>जनरेट बटन दबाएं</strong>: "Generate Directives 🤖" पर क्लिक करें।',
      step3: '<strong>फ़ाइल सेव करें</strong>: "Copy" दबाकर अपने सर्वर के मेन फोल्डर में <code>robots.txt</code> फ़ाइल बनाकर सेव कर दें।',
      how: 'यह आधुनिक सर्च इंजन रोबोट प्रोटोकॉल के अनुसार सुरक्षित पाथ्स को ब्लॉक और साइटमैप का लिंक जोड़ता है।',
      why: 'साइटमैप होने पर गूगल चंद मिनटों में आपके नए ब्लॉग पोस्ट को इंडेक्स कर लेता है।',
      q1: 'Q: सबसे बड़ी गलती क्या हो सकती है?',
      a1: 'A: कभी भी <code>Disallow: /</code> न लिखें! इससे आपकी पूरी वेबसाइट गूगल से गायब हो जाएगी।',
      q2: 'Q: क्या साइटमैप जरूरी है?',
      a2: 'A: हाँ, नई वेबसाइटों के लिए साइटमैप अनिवार्य है ताकि सारे पेज जल्दी मिलें।'
    },
    es: {
      toolName: 'Motor Robots.txt & Sitemap',
      headline: 'Cómo Usar el <span class="highlight">Motor Robots.txt & Sitemap</span>',
      simple: '<code>robots.txt</code> es el guardia que impide el paso a zonas privadas (ej. /admin), y <code>sitemap.xml</code> es el mapa que indica a Google todas las páginas existentes.',
      step1: '<strong>Ingresa tu Dominio</strong>: Escribe tu URL en el campo principal.',
      step2: '<strong>Generar Reglas</strong>: Haz clic en "Generate Directives 🤖" para validar el formato.',
      step3: '<strong>Sube el Archivo</strong>: Guarda el texto como <code>robots.txt</code> en la raíz de tu servidor.',
      how: 'Escribe directivas estándar <code>User-agent: *</code> e incluye la ruta de tu mapa de sitio XML.',
      why: 'Un sitemap agiliza la indexación de tus artículos nuevos en minutos en vez de semanas.',
      q1: 'Q: ¿Cuál es el error más grave?',
      a1: 'A: Escribir <code>Disallow: /</code>, lo cual desindexará todo tu sitio de Google.',
      q2: 'Q: ¿Todos los sitios necesitan sitemap?',
      a2: 'A: Sí, es fundamental para facilitar el rastreo orgánico de Googlebot.'
    },
    de: {
      toolName: 'Robots & Sitemap Generator',
      headline: 'Verwendung des <span class="highlight">Robots & Sitemap Generators</span>',
      simple: '<code>robots.txt</code> ist der Pförtner, der sensible Bereiche schützt. Die <code>sitemap.xml</code> ist die Landkarte für Google.',
      step1: '<strong>Domain eingeben</strong>: Tragen Sie Ihre Webadresse ein.',
      step2: '<strong>Richtlinien erstellen</strong>: Klicken Sie auf "Generate Directives 🤖".',
      step3: '<strong>Auf Server ablegen</strong>: Speichern Sie die Datei als <code>robots.txt</code> im Hauptverzeichnis.',
      how: 'Definiert Standard-Crawler-Regeln und verweist auf die XML-Sitemap.',
      why: 'Verhindert die Verschwendung von Crawling-Budget und beschleunigt die Indexierung.',
      q1: 'Q: Größter möglicher Fehler?',
      a1: 'A: Die Zeile <code>Disallow: /</code> sperrt die gesamte Seite aus dem Google-Index.',
      q2: 'Q: Braucht jede Website eine Sitemap?',
      a2: 'A: Ja, insbesondere für neue Seiten ist sie unverzichtbar.'
    },
    fr: {
      toolName: 'Moteur Robots.txt & Plan de Site',
      headline: 'Comment Utiliser le <span class="highlight">Moteur Robots.txt & Plan de Site</span>',
      simple: '<code>robots.txt</code> indique à Googlebot les zones interdites (/admin), tandis que <code>sitemap.xml</code> fournit le plan complet de vos pages.',
      step1: '<strong>Saisir le Domaine</strong>: Renseignez votre adresse web.',
      step2: '<strong>Générer les Directives</strong>: Cliquez sur "Generate Directives 🤖".',
      step3: '<strong>Déployer le Fichier</strong>: Copiez et enregistrez le fichier <code>robots.txt</code> à la racine du serveur.',
      how: 'Génère un protocole d\'exclusion propre avec lien vers votre sitemap XML.',
      why: 'Permet une indexation quasi instantanée de vos nouveaux articles.',
      q1: 'Q: Quelle erreur fatale éviter?',
      a1: 'A: <code>Disallow: /</code> bannit l\'ensemble de votre site des moteurs de recherche.',
      q2: 'Q: Le sitemap est-il obligatoire?',
      a2: 'A: Oui, pour garantir la visibilité de toutes vos publications.'
    }
  },

  images: {
    en: {
      toolName: 'Image SEO & Alt Generator',
      headline: 'How to Use <span class="highlight">Image SEO & Alt Generator</span> & How It Works',
      simple: 'Google cannot visually see photographs—it relies on the <code>alt="..."</code> text to understand image subjects. This tool writes optimized, high-converting descriptive alt tags.',
      step1: '<strong>Enter Subject</strong>: Describe what the photo depicts (e.g. "wireless gaming headset").',
      step2: '<strong>Generate Alt Texts</strong>: Click "Generate SEO Alt Texts 🖼️" for multiple semantic variations.',
      step3: '<strong>Add to HTML</strong>: Paste into your <code>&lt;img src="..." alt="Your text"&gt;</code>.',
      how: 'Balances accessibility for visually impaired screen readers with Google Image search intent.',
      why: 'Google Images drives massive search volume. Proper alt tags rank your photos in visual image carousels.',
      q1: 'Q: What should I avoid in alt tags?',
      a1: 'A: Never write generic labels like "photo1" or stuff a list of 10 keywords. Describe the image naturally.',
      q2: 'Q: Does image format matter?',
      a2: 'A: Yes! Modern WebP and AVIF formats load 3x faster than heavy JPGs and PNGs.'
    },
    hi: {
      toolName: 'Image SEO & Alt Generator',
      headline: 'How to Use <span class="highlight">Image SEO & Alt Generator</span> & How It Works (आसान यूजर गाइड)',
      simple: 'गूगल की आँखें नहीं होतीं। तस्वीर क्या है, यह जानने के लिए वह Alt Tag पढ़ता है। यह टूल तस्वीरों के लिए सबसे सही Alt टेक्स्ट बनाकर देता है।',
      step1: '<strong>फोटो का विषय लिखें</strong>: बताएं कि फोटो किस चीज़ की है।',
      step2: '<strong>ऑल्ट टेक्स्ट बनाएं</strong>: "Generate SEO Alt Texts 🖼️" दबाएं।',
      step3: '<strong>वेबसाइट में जोड़ें</strong>: अपनी पसंद का टेक्स्ट कॉपी करके इमेज टैग में डाल दें।',
      how: 'यह स्क्रीन रीडर और गूगल इमेज एल्गोरिद्म दोनों के हिसाब से नेचुरल टेक्स्ट तैयार करता है।',
      why: 'Google Images से बहुत भारी ट्रैफिक आता है। सही Alt Tag होने पर आपकी तस्वीरें टॉप पर दिखती हैं।',
      q1: 'Q: क्या गलती न करें?',
      a1: 'A: कभी भी सिर्फ "image" या बहुत सारे कीवर्ड न भरें। सच बताएं कि फोटो में क्या है।',
      q2: 'Q: कौन सा फोटो फॉर्मेट सबसे अच्छा है?',
      a2: 'A: WebP या AVIF फॉर्मेट सबसे हल्का और तेज होता है।'
    },
    es: {
      toolName: 'Auditor de Imágenes y Texto Alt',
      headline: 'Cómo Usar el <span class="highlight">Auditor de Imágenes y Texto Alt</span>',
      simple: 'Google no puede ver fotos; depende del texto <code>alt="..."</code> para comprenderlas. Este generador crea etiquetas descriptivas ideales.',
      step1: '<strong>Tema de la Imagen</strong>: Escribe qué muestra la imagen (ej. "auriculares inalámbricos").',
      step2: '<strong>Generar Textos Alt</strong>: Haz clic en "Generate SEO Alt Texts 🖼️".',
      step3: '<strong>Pega en tu Web</strong>: Inserta el resultado en tu etiqueta <code>&lt;img alt="..."&gt;</code>.',
      how: 'Optimiza la accesibilidad para lectores de pantalla y la indexación en Google Imágenes.',
      why: 'Google Imágenes es una fuente gigante de visitas gratuitas para páginas bien optimizadas.',
      q1: 'Q: ¿Qué evitar?',
      a1: 'A: No uses nombres genéricos como "foto1" ni satures con palabras clave.',
      q2: 'Q: ¿Importa el formato?',
      a2: 'A: Sí, formatos como WebP o AVIF cargan mucho más rápido que JPG.'
    },
    de: {
      toolName: 'Bild-SEO & Alt-Text',
      headline: 'Verwendung von <span class="highlight">Bild-SEO & Alt-Text</span>',
      simple: 'Google sieht Bilder nicht direkt, sondern liest das <code>alt="..."</code> Attribut aus. Dieses Tool generiert treffende Alt-Texte.',
      step1: '<strong>Bildmotiv eingeben</strong>: Beschreiben Sie das Motiv kurz.',
      step2: '<strong>Texte generieren</strong>: Klicken Sie auf "Generate SEO Alt Texts 🖼️".',
      step3: '<strong>In HTML einfügen</strong>: Tragen Sie den Text in das <code>alt</code>-Attribut ein.',
      how: 'Kombiniert Barrierefreiheit mit suchmaschinenrelevanten Schlüsselbegriffen.',
      why: 'Google Bilder bringt wertvollen Zusatz-Traffic bei korrekter Beschriftung.',
      q1: 'Q: Was ist verboten?',
      a1: 'A: Kein Keyword-Stuffing oder nichtsagende Dateinamen wie "IMG_001.jpg".',
      q2: 'Q: Welches Dateiformat?',
      a2: 'A: WebP und AVIF sind deutlich schneller als klassische JPEGs.'
    },
    fr: {
      toolName: 'Optimiseur d\'Images & Alt',
      headline: 'Comment Utiliser l\'<span class="highlight">Optimiseur d\'Images & Alt</span>',
      simple: 'Google déchiffre les photos grâce à la balise <code>alt="..."</code>. Cet outil rédige des descriptions précises et performantes.',
      step1: '<strong>Décrire l\'Image</strong>: Indiquez le sujet de l\'illustration.',
      step2: '<strong>Générer les Textes</strong>: Cliquez sur "Generate SEO Alt Texts 🖼️".',
      step3: '<strong>Insérer dans le Code</strong>: Ajoutez le texte dans votre balise <code>&lt;img alt="..."&gt;</code>.',
      how: 'Respecte les normes d\'accessibilité et favorise le référencement naturel.',
      why: 'Google Images génère un trafic hautement qualifié pour les visuels bien renseignés.',
      q1: 'Q: Que faut-il proscrire?',
      a1: 'A: Évitez les termes vagues comme "image" ou l\'accumulation artificielle de mots-clés.',
      q2: 'Q: Quel format privilégier?',
      a2: 'A: Le WebP offre une compression remarquable sans perte de netteté.'
    }
  },

  headers: {
    en: {
      toolName: 'HTTP Headers & Security',
      headline: 'How to Use <span class="highlight">HTTP Headers & Security</span> & How It Works',
      simple: 'Beyond front-door locks, modern websites require security shields (HSTS, CSP, X-Frame) to protect visitors against clickjacking, malware, and data theft.',
      step1: '<strong>Enter Website URL</strong>: Paste your domain into the inspection bar.',
      step2: '<strong>Inspect Headers</strong>: Click "Inspect Headers 🔒" to verify live server response.',
      step3: '<strong>Check Score</strong>: View your Security Score (0-100) and implement missing headers via Cloudflare or Nginx.',
      how: 'Queries HTTP responses to verify SSL encryption, HSTS, Content-Security-Policy, and X-Content-Type-Options.',
      why: 'Google prioritizes user safety. Sites with HTTPS and hardened security headers earn trusted rankings over unhardened sites.',
      q1: 'Q: What is X-Frame-Options?',
      a1: 'A: It stops attackers from embedding your website inside a hidden malicious iframe (Clickjacking).',
      q2: 'Q: Does a missing header break my site?',
      a2: 'A: No, your site will load, but it remains vulnerable to modern web exploits.'
    },
    hi: {
      toolName: 'HTTP Headers & Security',
      headline: 'How to Use <span class="highlight">HTTP Headers & Security</span> & How It Works (आसान यूजर गाइड)',
      simple: 'घर में ताले के साथ-साथ खिड़की में जाली लगाना! वेबसाइट को हैकर्स, वायरस और डेटा चोरी से बचाने के लिए सर्वर पर डिजिटल सुरक्षा कवच चेक करता है।',
      step1: '<strong>वेबसाइट लिंक डालें</strong>: सर्च बॉक्स में अपनी वेबसाइट का URL डालें।',
      step2: '<strong>हेडर चेक करें</strong>: "Inspect Headers 🔒" दबाएं। टूल सर्वर से सीधे बात करेगा।',
      step3: '<strong>सिक्योरिटी स्कोर देखें</strong>: 0 से 100 स्कोर देखें और मिसिंग हेडर्स को Cloudflare में जोड़ें।',
      how: 'यह 5 प्रमुख सुरक्षा हेडर्स (HSTS, CSP, X-Frame-Options) की मौजूदगी की जांच करता है।',
      why: 'गूगल हमेशा सुरक्षित (HTTPS और हाई-सिक्योरिटी) वेबसाइट्स को सर्च में ऊपर प्राथमिकता देता है।',
      q1: 'Q: X-Frame-Options क्या है?',
      a1: 'A: यह किसी भी हैकर को आपकी वेबसाइट को फर्जी फ्रेम में छिपाने से रोकता है।',
      q2: 'Q: अगर हेडर मिसिंग हो तो क्या साइट बंद होगी?',
      a2: 'A: नहीं, लेकिन साइट सुरक्षा के लिहाज़ से कमजोर मानी जाएगी।'
    },
    es: {
      toolName: 'Inspector de Seguridad y Cabeceras HTTP',
      headline: 'Cómo Usar el <span class="highlight">Inspector de Seguridad y Cabeceras HTTP</span>',
      simple: 'Blindaje digital contra ataques. Comprueba cabeceras esenciales (HSTS, CSP, X-Frame) para evitar robo de datos y suplantación.',
      step1: '<strong>Ingresa tu URL</strong>: Pega tu dirección web.',
      step2: '<strong>Inspeccionar</strong>: Haz clic en "Inspect Headers 🔒".',
      step3: '<strong>Evalúa tu Seguridad</strong>: Revisa tu puntaje y añade cabeceras faltantes en Cloudflare.',
      how: 'Examina la respuesta HTTP del servidor para validar cifrado SSL y políticas de seguridad.',
      why: 'Google premia los sitios seguros y penaliza las conexiones vulnerables ante los usuarios.',
      q1: 'Q: ¿Qué es X-Frame-Options?',
      a1: 'A: Impide que piratas informáticos incrusten tu web en iframes maliciosos (Clickjacking).',
      q2: 'Q: ¿Faltar una cabecera rompe la web?',
      a2: 'A: No, la web funcionará, pero quedará expuesta a vulnerabilidades conocidas.'
    },
    de: {
      toolName: 'HTTP Sicherheits-Header',
      headline: 'Verwendung der <span class="highlight">HTTP Sicherheits-Header</span>',
      simple: 'Digitaler Schutzschild gegen Angreifer. Prüft HSTS, CSP und X-Frame-Options zur Absicherung Ihrer Besucher.',
      step1: '<strong>URL eingeben</strong>: Fügen Sie Ihre Adresse ein.',
      step2: '<strong>Header prüfen</strong>: Klicken Sie auf "Inspect Headers 🔒".',
      step3: '<strong>Score analysieren</strong>: Beheben Sie fehlende Header via Cloudflare oder Serverkonfiguration.',
      how: 'Überprüft Serverantworten auf moderne Sicherheitsmechanismen und SSL-Gültigkeit.',
      why: 'Google stuft gehärtete, sichere Webseiten als vertrauenswürdig ein und bevorzugt sie im Ranking.',
      q1: 'Q: Was bewirkt X-Frame-Options?',
      a1: 'A: Verhindert, dass Ihre Website unbemerkt in fremde Frames eingebettet wird (Clickjacking).',
      q2: 'Q: Führt ein Fehlen zum Ausfall?',
      a2: 'A: Nein, die Seite läuft weiter, ist jedoch potenziell angreifbar.'
    },
    fr: {
      toolName: 'En-têtes HTTP & Sécurité',
      headline: 'Comment Utiliser les <span class="highlight">En-têtes HTTP & Sécurité</span>',
      simple: 'Un bouclier de sécurité indispensable pour prémunir vos visiteurs contre les attaques, le vol de cookies et le détournement de clics.',
      step1: '<strong>Indiquer l\'URL</strong>: Saisissez votre domaine.',
      step2: '<strong>Analyser</strong>: Cliquez sur "Inspect Headers 🔒".',
      step3: '<strong>Consulter le Score</strong>: Implémentez les en-têtes manquants via Cloudflare ou Nginx.',
      how: 'Vérifie la présence des directives SSL, HSTS, CSP et X-Frame-Options.',
      why: 'La sécurité est un critère officiel de confiance et de classement pour Google.',
      q1: 'Q: À quoi sert X-Frame-Options?',
      a1: 'A: Il bloque l\'intégration invisible de votre site dans des pages malveillantes (Clickjacking).',
      q2: 'Q: Une absence bloque-t-elle le site?',
      a2: 'A: Non, mais le niveau de protection reste insuffisant.'
    }
  },

  readability: {
    en: {
      toolName: 'Content Quality & Readability',
      headline: 'How to Use <span class="highlight">Content & Readability</span> & How It Works',
      simple: 'If your text is dense and hard to understand, visitors leave within seconds. This tool measures reading ease (Flesch score) to ensure anyone can read your content comfortably.',
      step1: '<strong>Paste Article Text</strong>: Insert your content or import text from Tool 01.',
      step2: '<strong>Analyze Quality</strong>: Click "Analyze Content Quality 📝".',
      step3: '<strong>Optimize Score</strong>: Aim for 60+ (plain, conversational language) by breaking up long sentences.',
      how: 'Calculates the scientific Flesch-Kincaid formula balancing sentence length and syllable counts per word.',
      why: 'Engaging, readable articles keep visitors on your page longer (High Dwell Time), reducing bounce rates and signaling satisfaction to Google.',
      q1: 'Q: What is the ideal Flesch score?',
      a1: 'A: 60 to 75 is ideal for general web audiences (accessible to an 8th-grade reading level).',
      q2: 'Q: Does article length matter?',
      a2: 'A: Depth matters, but long articles must use subheadings and bullet points to stay readable.'
    },
    hi: {
      toolName: 'Content & Readability',
      headline: 'How to Use <span class="highlight">Content & Readability</span> & How It Works (आसान यूजर गाइड)',
      simple: 'अगर आप बहुत कठिन अंग्रेजी या लंबे वाक्य लिखेंगे, तो कोई नहीं पढ़ेगा। यह टूल चेक करता है कि आपका लेख कितना आसान और रोचक है ताकि 7वीं-8वीं का बच्चा भी समझ सके।',
      step1: '<strong>कंटेंट पेस्ट करें</strong>: बॉक्स में अपने आर्टिकल का टेक्स्ट डालें।',
      step2: '<strong>एनालाइज़ दबाएं</strong>: "Analyze Content Quality 📝" पर क्लिक करें।',
      step3: '<strong>स्कोर सुधारें</strong>: Flesch स्कोर 60 से ऊपर रखें और लंबे वाक्यों को छोटा करें।',
      how: 'यह वैज्ञानिक फॉर्मूले (Flesch-Kincaid) से वाक्यों की लंबाई और शब्दों को नापता है।',
      why: 'रोचक भाषा होने पर लोग पूरा आर्टिकल पढ़ते हैं, जिससे बाउंस रेट घटता है और गूगल रैंकिंग बढ़ती है।',
      q1: 'Q: सबसे अच्छा स्कोर क्या है?',
      a1: 'A: 60 से 75 के बीच का स्कोर इंटरनेट के लिए सबसे परफेक्ट होता है।',
      q2: 'Q: क्या लंबा आर्टिकल लिखने से फायदा होता है?',
      a2: 'A: हाँ, लेकिन बुलेट पॉइंट्स और आसान भाषा में होना चाहिए।'
    },
    es: {
      toolName: 'Analizador de Contenido y Legibilidad',
      headline: 'Cómo Usar el <span class="highlight">Analizador de Contenido y Legibilidad</span>',
      simple: 'Textos complicados provocan que el lector huya en 5 segundos. Mide la facilidad de lectura (Flesch) para que tus artículos enganchen al instante.',
      step1: '<strong>Pega tu Texto</strong>: Introduce tu borrador o contenido.',
      step2: '<strong>Analizar</strong>: Haz clic en "Analyze Content Quality 📝".',
      step3: '<strong>Optimiza</strong>: Busca un puntaje de 60+ dividiendo frases largas.',
      how: 'Aplica el algoritmo Flesch-Kincaid contabilizando palabras por frase y sílabas por palabra.',
      why: 'Un contenido legible aumenta el tiempo de permanencia, reduciendo el rebote ante Google.',
      q1: 'Q: ¿Cuál es el puntaje ideal?',
      a1: 'A: Entre 60 y 75 para un público web general.',
      q2: 'Q: ¿Conviene escribir textos muy extensos?',
      a2: 'A: Sí, siempre que utilices subtítulos y listas con viñetas para no aburrir.'
    },
    de: {
      toolName: 'Lesbarkeits-Analyse',
      headline: 'Verwendung der <span class="highlight">Lesbarkeits-Analyse</span>',
      simple: 'Schachtelsätze schrecken Leser ab. Dieses Tool misst die Textverständlichkeit (Flesch-Score) für maximale Lesedauer.',
      step1: '<strong>Text einfügen</strong>: Tragen Sie Ihren Entwurf ein.',
      step2: '<strong>Analysieren</strong>: Klicken Sie auf "Analyze Content Quality 📝".',
      step3: '<strong>Optimieren</strong>: Streben Sie einen Score über 60 an durch kurze, prägnante Sätze.',
      how: 'Berechnet den Flesch-Reading-Ease-Index basierend auf Satzlänge und Silbenanzahl.',
      why: 'Gut lesbare Texte verlängern die Verweildauer (Dwell Time) und verbessern das Ranking.',
      q1: 'Q: Welcher Flesch-Score ist optimal?',
      a1: 'A: 60 bis 75 Punkte gelten als leicht verständlich für das breite Web-Publikum.',
      q2: 'Q: Sind lange Texte immer besser?',
      a2: 'A: Nur wenn sie durch Zwischenüberschriften und Aufzählungen aufgelockert sind.'
    },
    fr: {
      toolName: 'Lisibilité & Qualité de Contenu',
      headline: 'Comment Utiliser la <span class="highlight">Lisibilité & Qualité de Contenu</span>',
      simple: 'Un texte indigeste fait fuir vos visiteurs. Évaluez la clarté de votre plume (score Flesch) pour captiver vos lecteurs.',
      step1: '<strong>Coller le Contenu</strong>: Insérez le corps de votre article.',
      step2: '<strong>Lancer l\'Analyse</strong>: Cliquez sur "Analyze Content Quality 📝".',
      step3: '<strong>Ajuster le Style</strong>: Visez 60+ en raccourcissant vos phrases complexes.',
      how: 'Mobilise la formule Flesch-Kincaid évaluant la longueur des phrases et le nombre de syllabes.',
      why: 'La lisibilité retient les internautes, diminuant le taux de rebond signalé à Google.',
      q1: 'Q: Quel est le score idéal?',
      a1: 'A: 60 à 75 correspond à une lecture fluide pour le grand public.',
      q2: 'Q: Faut-il écrire très long?',
      a2: 'A: Oui si le contenu est riche, mais structurez toujours avec des listes à puces.'
    }
  },

  checklist: {
    en: {
      toolName: 'SEO Launch Checklist',
      headline: 'How to Use <span class="highlight">SEO Launch Checklist</span> & How It Works',
      simple: 'Just like pre-flight safety checks before an airplane takes off, this 25-point interactive checklist ensures zero critical oversights before publishing your site to the world.',
      step1: '<strong>Review 4 Pillars</strong>: Work through Technical, On-Page, Mobile Speed, and Indexing.',
      step2: '<strong>Check Completed Items</strong>: Check off tasks as you finish them on your website.',
      step3: '<strong>Achieve 100%</strong>: Keep completing items until the progress bar reaches 100%.',
      how: 'State is saved locally in your browser\'s LocalStorage so you never lose your progress.',
      why: 'Eliminates fatal blunders (e.g. forgotten noindex tags or broken redirects) that ruin rankings.',
      q1: 'Q: Can I reset for a new client project?',
      a1: 'A: Yes, click "Reset Progress 🔄" anytime to start fresh.',
      q2: 'Q: Does 100% guarantee rank #1?',
      a2: 'A: It guarantees technical perfection, allowing your quality content to rank rapidly.'
    },
    hi: {
      toolName: 'SEO Launch Checklist',
      headline: 'How to Use <span class="highlight">SEO Launch Checklist</span> & How It Works (आसान यूजर गाइड)',
      simple: 'हवाई जहाज़ उड़ाने से पहले पायलट की चेकलिस्ट! वेबसाइट लाइव करने से पहले ये 25 काम पूरे होने चाहिए ताकि कोई बड़ी भूल न छूटे।',
      step1: '<strong>कैटेगरी देखें</strong>: On-Page, Technical, Speed, और Indexing के काम देखें।',
      step2: '<strong>टिक लगाएं</strong>: जो-जो काम पूरा हो चुका है, उस पर टिक (✔) लगाते जाएं।',
      step3: '<strong>100% करें</strong>: जब तक प्रोग्रेस बार 100% न हो जाए, तब तक काम पूरे करें।',
      how: 'यह डेटा आपके ब्राउज़र में सुरक्षित सेव रहता है, रीफ्रेश करने पर भी गायब नहीं होगा।',
      why: 'कोई भी बड़ी भूल (जैसे noindex टैग लगा रह जाना) छूटने से बच जाती है।',
      q1: 'Q: नए प्रोजेक्ट के लिए रीसेट कैसे करें?',
      a1: 'A: "Reset Progress 🔄" बटन दबाकर दोबारा शुरू कर सकते हैं।',
      q2: 'Q: क्या 100% होते ही पहली रैंक मिल जाएगी?',
      a2: 'A: इसका मतलब है कि साइट तकनीकी रूप से परफेक्ट है, अब कंटेंट डालते ही रैंक मिलेगी।'
    },
    es: {
      toolName: 'Lista de Lanzamiento SEO de 25 Puntos',
      headline: 'Cómo Usar la <span class="highlight">Lista de Lanzamiento SEO de 25 Puntos</span>',
      simple: 'La lista de verificación de despegue de un piloto antes de volar. 25 pasos obligatorios antes de publicar tu sitio en internet.',
      step1: '<strong>Revisa los 4 Pilares</strong>: On-Page, Técnico, Velocidad e Indexación.',
      step2: '<strong>Marca Tareas</strong>: Haz clic en las casillas conforme las completes.',
      step3: '<strong>Llega al 100%</strong>: Asegura la barra verde antes de enviar tu web a clientes.',
      how: 'Guarda automáticamente el avance en el LocalStorage de tu navegador.',
      why: 'Evita descuidos críticos (ej. dejar activa la etiqueta noindex) que arruinan proyectos enteros.',
      q1: 'Q: ¿Puedo reiniciar para otro cliente?',
      a1: 'A: Sí, pulsa "Reset Progress 🔄" en cualquier momento.',
      q2: 'Q: ¿El 100% garantiza la posición 1?',
      a2: 'A: Garantiza una base técnica impecable para que tus contenidos escalen con rapidez.'
    },
    de: {
      toolName: '25-Punkte SEO Checkliste',
      headline: 'Verwendung der <span class="highlight">25-Punkte SEO Checkliste</span>',
      simple: 'Wie der Vorflug-Check eines Piloten: 25 wesentliche Prüfpunkte vor dem offiziellen Livegang Ihrer Website.',
      step1: '<strong>Kategorien prüfen</strong>: On-Page, Technik, Ladezeit und Indexierung abarbeiten.',
      step2: '<strong>Häkchen setzen</strong>: Erledigte Aufgaben anklicken und abhaken.',
      step3: '<strong>100% erreichen</strong>: Erst bei vollem Fortschrittsbalken die Seite freigeben.',
      how: 'Speichert den aktuellen Status persistent im lokalen Browserspeicher (LocalStorage).',
      why: 'Verhindert fatale Fehler wie versehentlich gesetzte noindex-Tags oder fehlende Weiterleitungen.',
      q1: 'Q: Zurücksetzen für neue Projekte?',
      a1: 'A: Über "Reset Progress 🔄" starten Sie die Checkliste jederzeit neu.',
      q2: 'Q: Garantiert 100% Platz 1?',
      a2: 'A: Es sichert das technische Fundament, damit Inhalte ungehindert ranken können.'
    },
    fr: {
      toolName: 'Liste de Contrôle SEO 25 Points',
      headline: 'Comment Utiliser la <span class="highlight">Liste de Contrôle SEO 25 Points</span>',
      simple: 'La check-list pré-vol indispensable pour vérifier que votre site est 100% prêt avant son lancement public.',
      step1: '<strong>Passer en Revue</strong>: On-Page, Technique, Vitesse et Indexation.',
      step2: '<strong>Cocher les Tâches</strong>: Validez les points réalisés au fur et à mesure.',
      step3: '<strong>Atteindre 100%</strong>: Complétez tous les critères pour un audit sans faille.',
      how: 'Progression sauvegardée automatiquement dans le LocalStorage de votre navigateur.',
      why: 'Évite les erreurs dramatiques (ex: balise noindex oubliée) détruisant le référencement.',
      q1: 'Q: Peut-on réinitialiser pour un nouveau projet?',
      a1: 'A: Oui, cliquez sur "Reset Progress 🔄" pour repartir de zéro.',
      q2: 'Q: Le 100% garantit-il la première place?',
      a2: 'A: Il assure une base technique parfaite pour maximiser l\'impact de vos textes.'
    }
  },

  'sitemap-crawler': {
    en: {
      toolName: 'Deep Spider Crawler',
      headline: 'How to Use <span class="highlight">Deep Spider Crawler</span> (Screaming Frog Mode)',
      simple: 'Instead of auditing pages one-by-one, this crawler acts like a web spider. It travels from page to page across your domain, catching 404 broken links, missing titles, and architecture flaws in bulk.',
      step1: '<strong>Choose Mode</strong>: Mode A (XML Sitemap) or Mode B (Deep Link Spider without any sitemap).',
      step2: '<strong>Set Max URLs</strong>: Pick 10, 25, or 50 pages and click "Start Deep Crawl 🕷️".',
      step3: '<strong>Fix 404 Errors</strong>: Look for any red 404 rows in the table and repair those broken links immediately.',
      how: 'Uses Breadth-First Search (BFS) concurrency to extract links, strip query hashes, and test response codes.',
      why: 'Dead links trap Google crawlers (Crawl Budget waste) and irritate visitors. Clean architectures maximize indexation.',
      q1: 'Q: What is Screaming Frog mode?',
      a1: 'A: Screaming Frog is a £209/year desktop software. Our tool offers equivalent deep link crawling directly inside your browser for free.',
      q2: 'Q: Does it crawl external domains?',
      a2: 'A: No, it strictly crawls within your own domain for security and speed.'
    },
    hi: {
      toolName: 'Deep Spider Crawler',
      headline: 'How to Use <span class="highlight">Deep Spider Crawler</span> & How It Works (आसान यूजर गाइड)',
      simple: 'एक-एक करके 100 पेज चेक करने के बजाय यह टूल एक मकड़ी की तरह आपकी वेबसाइट के सारे 50-100 पेजों पर खुद जाकर टूटी कड़ियाँ (404 Error) पकड़ लेता है।',
      step1: '<strong>मोड चुनें</strong>: Mode A (साइटमैप) या Mode B (Screaming Frog डीप स्पाइडर)।',
      step2: '<strong>पेज चुनें</strong>: 10, 25 या 50 पेज सेट करें और क्रॉल बटन दबाएं।',
      step3: '<strong>404 ठीक करें</strong>: लाल रंग में लिखे 404 Not Found वाले पेजों की टूटी लिंक्स ठीक करें।',
      how: 'यह BFS अल्गोरिदम से लिंक्स को ढूंढकर हर पेज का स्टेटस कोड और स्पीड नापता है।',
      why: 'टूटी लिंक्स होने पर गूगल का बॉट अटक जाता है। साफ लिंक्स से आपकी पूरी साइट सही से इंडेक्स होती है।',
      q1: 'Q: Screaming Frog मोड क्या है?',
      a1: 'A: Screaming Frog एक ₹22,000/साल का महंगा टूल है। हमारा टूल वही काम ब्राउज़र में फ्री करता है।',
      q2: 'Q: क्या यह बाहरी साइट्स पर जाता है?',
      a2: 'A: नहीं, यह सिर्फ आपकी अपनी वेबसाइट के पेजों को स्कैन करता है।'
    },
    es: {
      toolName: 'Rastreador Spider (Modo Screaming Frog)',
      headline: 'Cómo Usar el <span class="highlight">Rastreador Spider</span>',
      simple: 'Rastrea hasta 50 páginas de tu sitio en bloque como una araña web para detectar enlaces rotos (404) y fallos de arquitectura.',
      step1: '<strong>Selecciona el Modo</strong>: Modo A (Sitemap) o Modo B (Rastreo autónomo sin sitemap).',
      step2: '<strong>Configura el Límite</strong>: Elige 10, 25 o 50 páginas e inicia el rastreo.',
      step3: '<strong>Repara Errores 404</strong>: Localiza las filas rojas y corrige los enlaces caídos.',
      how: 'Utiliza algoritmos BFS paralelos para explorar enlaces internos y registrar códigos HTTP.',
      why: 'Los enlaces rotos desperdician el presupuesto de rastreo de Googlebot y perjudican la experiencia de usuario.',
      q1: 'Q: ¿Qué es el modo Screaming Frog?',
      a1: 'A: Replica el funcionamiento del software líder de escritorio de forma gratuita en tu navegador.',
      q2: 'Q: ¿Rastrea sitios externos?',
      a2: 'A: No, se limita estrictamente a los enlaces internos de tu dominio.'
    },
    de: {
      toolName: 'Deep Spider Crawler',
      headline: 'Verwendung des <span class="highlight">Deep Spider Crawlers</span> (Screaming Frog Modus)',
      simple: 'Durchsucht Ihre gesamte Website automatisiert wie eine Suchmaschinen-Spinne, um 404-Fehler und Architekturprobleme aufzuspüren.',
      step1: '<strong>Modus wählen</strong>: Modus A (Sitemap) oder Modus B (Autonomes Link-Crawling).',
      step2: '<strong>Seitenanzahl festlegen</strong>: 10, 25 oder 50 Seiten wählen und Scan starten.',
      step3: '<strong>404-Fehler beheben</strong>: Rote Zeilen prüfen und defekte Links korrigieren.',
      how: 'Nutzt parallele BFS-Algorithmen zum systematischen Durchsuchen aller internen HTML-Verlinkungen.',
      why: 'Fehlerhafte Verlinkungen verschwenden Crawling-Budget und frustrieren Besucher.',
      q1: 'Q: Was ist der Screaming Frog Modus?',
      a1: 'A: Eine kostenlose, browserbasierte Alternative zur bekannten Desktop-Software.',
      q2: 'Q: Werden externe Links gecrawlt?',
      a2: 'A: Nein, der Crawler bleibt sicher innerhalb Ihrer eigenen Domain.'
    },
    fr: {
      toolName: 'Robot d\'Exploration Spider',
      headline: 'Comment Utiliser le <span class="highlight">Robot d\'Exploration Spider</span>',
      simple: 'Explore l\'ensemble de votre arborescence comme une araignée pour débusquer les liens brisés (404) et les titres manquants.',
      step1: '<strong>Choisir le Mode</strong>: Mode A (Sitemap XML) ou Mode B (Exploration de liens autonome).',
      step2: '<strong>Définir le Volume</strong>: Sélectionnez 10, 25 ou 50 pages et lancez l\'exploration.',
      step3: '<strong>Corriger les 404</strong>: Réparez immédiatement les pages affichant une alerte rouge.',
      how: 'S\'appuie sur la méthode BFS pour parcourir simultanément les liens internes.',
      why: 'Éliminer les liens morts préserve votre budget de crawl auprès de Google.',
      q1: 'Q: Qu\'est-ce que le mode Screaming Frog?',
      a1: 'A: Une alternative gratuite et sans installation au célèbre logiciel d\'audit technique.',
      q2: 'Q: Explore-t-il les sites tiers?',
      a2: 'A: Non, l\'analyse est circonscrite aux pages de votre propre domaine.'
    }
  },

  lighthouse: {
    en: {
      toolName: 'Google Core Web Vitals & Lighthouse',
      headline: 'How to Use <span class="highlight">Core Web Vitals & Lighthouse</span> & How It Works',
      simple: 'This connects directly to Google\'s official speed thermometer. Google opens your site on simulated mobile and desktop devices to measure real page speed, latency, and layout stability.',
      step1: '<strong>Enter Website URL</strong>: Paste your address and select <strong>Mobile (Google Default)</strong>.',
      step2: '<strong>Run Official Test</strong>: Click "Run Lighthouse Audit ⚡" (fetches authentic Google PageSpeed data in 8s).',
      step3: '<strong>Inspect Scores</strong>: Review Performance, Accessibility, SEO, and Core Web Vitals (LCP, TBT, CLS).',
      how: 'Calls Google PageSpeed Insights REST API v5, extracting authentic lab metrics and field data.',
      why: 'Core Web Vitals are a confirmed Google ranking factor. Slow mobile sites lose up to 50% of traffic before the page finishes loading.',
      q1: 'Q: How to improve Largest Contentful Paint (LCP)?',
      a1: 'A: Compress heavy hero images into WebP/AVIF and enable server caching to get under 2.5s.',
      q2: 'Q: What is Cumulative Layout Shift (CLS)?',
      a2: 'A: When buttons or text unexpectedly shift positions during load. It must be below 0.1.'
    },
    hi: {
      toolName: 'Core Web Vitals & Lighthouse',
      headline: 'How to Use <span class="highlight">Core Web Vitals & Lighthouse</span> & How It Works (आसान यूजर गाइड)',
      simple: 'यह सीधे गूगल का अपना ऑफिशियल थर्मामीटर है! गूगल खुद आपकी वेबसाइट को मोबाइल और कंप्यूटर पर खोलकर स्पीड, बटन और स्क्रीन की स्थिरता नापता है।',
      step1: '<strong>URL डालें</strong>: लिंक डालें और Mobile मोड चुनें।',
      step2: '<strong>टेस्ट चलाएं</strong>: "Run Lighthouse Audit ⚡" दबाएं। 5-10 सेकंड में गूगल का असली डेटा आएगा।',
      step3: '<strong>स्कोर देखें</strong>: Performance, Accessibility, Best Practices, और SEO स्कोर चेक करें।',
      how: 'यह गूगल के आधिकारिक Google PageSpeed Insights API से लाइव कनेक्ट होकर LCP, TBT, CLS नापता है।',
      why: 'गूगल ने साफ कहा है कि मोबाइल स्पीड रैंकिंग का सीधा हिस्सा है। स्लो साइट की रैंकिंग गिर जाती है।',
      q1: 'Q: LCP 2.5 सेकंड से कम कैसे करें?',
      a1: 'A: बड़ी फोटो का साइज़ WebP फॉर्मेट में छोटा करें और अच्छी होस्टिंग का उपयोग करें।',
      q2: 'Q: CLS क्या होता है?',
      a2: 'A: लोड होते समय स्क्रीन पर बटन का इधर-उधर हिलना। यह 0.1 से कम होना चाहिए।'
    },
    es: {
      toolName: 'Google Core Web Vitals & Lighthouse',
      headline: 'Cómo Usar <span class="highlight">Core Web Vitals & Lighthouse</span>',
      simple: 'El velocímetro oficial de Google. Mide la velocidad real, la interactividad y la estabilidad visual en teléfonos móviles y computadoras.',
      step1: '<strong>Ingresa tu URL</strong>: Selecciona <strong>Móvil</strong> por defecto de Google.',
      step2: '<strong>Ejecutar Prueba</strong>: Haz clic en "Run Lighthouse Audit ⚡".',
      step3: '<strong>Examina las Métricas</strong>: Analiza Rendimiento, Accesibilidad, SEO, LCP y CLS.',
      how: 'Se conecta a la API oficial de Google PageSpeed Insights v5 para obtener métricas de laboratorio.',
      why: 'Los Core Web Vitals son un factor de posicionamiento oficial. Las páginas lentas pierden clientes.',
      q1: 'Q: ¿Cómo mejorar LCP por debajo de 2.5s?',
      a1: 'A: Comprime imágenes principales a WebP y optimiza el tiempo de respuesta del servidor.',
      q2: 'Q: ¿Qué es CLS?',
      a2: 'A: Movimientos inesperados de botones o bloques mientras carga la página. Debe ser inferior a 0.1.'
    },
    de: {
      toolName: 'Core Web Vitals & Lighthouse',
      headline: 'Verwendung von <span class="highlight">Core Web Vitals & Lighthouse</span>',
      simple: 'Googles offizieller Geschwindigkeitsmesser. Testet reale Ladezeiten, Reaktionsfähigkeit und Layout-Stabilität auf mobilen Endgeräten.',
      step1: '<strong>URL eingeben</strong>: Adresse einfügen und Mobil-Ansicht wählen.',
      step2: '<strong>Audit starten</strong>: Klicken Sie auf "Run Lighthouse Audit ⚡".',
      step3: '<strong>Metriken auswerten</strong>: Performance, LCP, TBT und CLS überprüfen.',
      how: 'Fragt die offizielle Google PageSpeed Insights REST API in Echtzeit ab.',
      why: 'Core Web Vitals sind ein bestätigter Rankingfaktor für Google auf Smartphones.',
      q1: 'Q: LCP unter 2,5 Sekunden bringen?',
      a1: 'A: Titelbilder komprimieren (WebP) und Caching aktivieren.',
      q2: 'Q: Was bedeutet CLS?',
      a2: 'A: Unerwünschtes Verspringen von Elementen beim Laden der Seite (sollte unter 0,1 liegen).'
    },
    fr: {
      toolName: 'Signaux Web Essentiels & Lighthouse',
      headline: 'Comment Utiliser les <span class="highlight">Signaux Web Essentiels & Lighthouse</span>',
      simple: 'Le thermomètre officiel de Google. Évalue la vitesse réelle, la réactivité et la stabilité visuelle sur mobile et bureau.',
      step1: '<strong>Saisir l\'Adresse</strong>: Renseignez votre URL en mode Mobile.',
      step2: '<strong>Lancer le Test</strong>: Cliquez sur "Run Lighthouse Audit ⚡".',
      step3: '<strong>Analyser les Métriques</strong>: Contrôlez la Performance, l\'Accessibilité, le LCP et le CLS.',
      how: 'Interroge directement l\'API Google PageSpeed Insights v5 en laboratoire.',
      why: 'Critère de classement confirmé : un site lent sur smartphone perd la moitié de ses visiteurs.',
      q1: 'Q: Comment optimiser le LCP sous 2.5s?',
      a1: 'A: Compressez vos bannières au format WebP et réduisez le temps de réponse serveur.',
      q2: 'Q: Qu\'est-ce que le CLS?',
      a2: 'A: Le décalage soudain de blocs pendant le chargement (doit être inférieur à 0,1).'
    }
  },

  history: {
    en: {
      toolName: 'Audit History & Backlinks',
      headline: 'How to Use <span class="highlight">Audit History & Backlinks</span> & How It Works',
      simple: 'Like maintaining a patient\'s medical file over time, this tool tracks your SEO health improvements, coupled with Domain Authority (DA / DR) and inbound backlink profile intelligence.',
      step1: '<strong>Check Backlinks & DA</strong>: Enter your domain to inspect authority score and spam index.',
      step2: '<strong>Track Progress</strong>: Observe your historical audit score trajectory across past weeks.',
      step3: '<strong>Export CSV</strong>: Download your audit records into an Excel-ready spreadsheet for clients.',
      how: 'Logs each audit run to our persistent database while calculating algorithmic and OpenPageRank authority metrics.',
      why: 'Demonstrates tangible SEO ROI over time and identifies toxic referring links before they harm rankings.',
      q1: 'Q: What is Domain Authority (DA)?',
      a1: 'A: A 1-100 metric predicting search engine trust. New sites start around 1-10; giants like Wikipedia have 95+.',
      q2: 'Q: Should Spam Score be high or low?',
      a2: 'A: Always as low as possible (1-5%). Scores over 20% indicate dangerous spam backlinks.'
    },
    hi: {
      toolName: 'Audit History & Backlinks',
      headline: 'How to Use <span class="highlight">Audit History & Backlinks</span> & How It Works (आसान यूजर गाइड)',
      simple: 'आपकी वेबसाइट का मेडिकल रिकॉर्ड कि पहले क्या स्कोर था और अब कितना सुधरा, साथ ही इंटरनेट पर आपकी वेबसाइट का कितना रौब (DA) और कितने लिंक हैं।',
      step1: '<strong>बैकलिंक चेक करें</strong>: डोमेन नाम डालें और "Analyze Backlinks 🌐" दबाएं।',
      step2: '<strong>सुधार देखें</strong>: नीचे टेबल में देखें कि गलतियां ठीक करने के बाद आज क्या स्कोर है।',
      step3: '<strong>CSV डाउनलोड करें</strong>: "Export History CSV" दबाकर एक्सेल शीट डाउनलोड करें।',
      how: 'यह हर ऑडिट का रिकॉर्ड सुरक्षित रखता है और डोमेन उम्र व TLD से अथॉरिटी नापता है।',
      why: 'इससे साफ पता चलता है कि आपकी मेहनत रंग ला रही है और अथॉरिटी बढ़ रही है।',
      q1: 'Q: DA क्या होता है?',
      a1: 'A: 1 से 100 तक का नंबर जो बताता है कि साइट कितनी भरोसेमंद है।',
      q2: 'Q: स्पैम स्कोर कैसा होना चाहिए?',
      a2: 'A: हमेशा कम (1% से 5%) होना चाहिए।'
    },
    es: {
      toolName: 'Historial de Auditorías y Backlinks',
      headline: 'Cómo Usar el <span class="highlight">Historial de Auditorías y Backlinks</span>',
      simple: 'Historial clínico de tu sitio web: comprueba tu evolución en el tiempo y mide tu Autoridad de Dominio (DA) y enlaces entrantes.',
      step1: '<strong>Analizar Backlinks</strong>: Consulta tu DA y tasa de spam.',
      step2: '<strong>Revisa la Trayectoria</strong>: Comprueba cómo ha subido tu puntaje tras aplicar mejoras.',
      step3: '<strong>Exportar CSV</strong>: Descarga un reporte completo para clientes en hoja de cálculo.',
      how: 'Almacena cada auditoría y calcula la autoridad con base en OpenPageRank y señales de dominio.',
      why: 'Demuestra el retorno de inversión (ROI) del SEO y ayuda a detectar enlaces tóxicos.',
      q1: 'Q: ¿Qué es la Autoridad de Dominio (DA)?',
      a1: 'A: Escala de 1 a 100 que predice la fuerza de una web en buscadores.',
      q2: 'Q: ¿Cómo debe ser el Spam Score?',
      a2: 'A: Siempre bajo (1% a 5%). Más de 20% exige limpieza de enlaces.'
    },
    de: {
      toolName: 'Audit-Verlauf & Backlinks',
      headline: 'Verwendung von <span class="highlight">Audit-Verlauf & Backlinks</span>',
      simple: 'Die digitale Patientenakte Ihrer Domain: Dokumentiert SEO-Fortschritte und analysiert die Domain-Autorität (DA) sowie Backlinks.',
      step1: '<strong>DA & Links abfragen</strong>: Domain eintragen und prüfen.',
      step2: '<strong>Trends verfolgen</strong>: Verlaufskurve der letzten Audits analysieren.',
      step3: '<strong>CSV exportieren</strong>: Daten für Kundenberichte in Excel herunterladen.',
      how: 'Speichert Audit-Logs persistent und berechnet Metriken via OpenPageRank-Signale.',
      why: 'Belegt den nachhaltigen Erfolg von Optimierungsmaßnahmen über Monate.',
      q1: 'Q: Was ist Domain Authority (DA)?',
      a1: 'A: Ein Score von 1 bis 100 für die prognostizierte Suchmaschinen-Relevanz.',
      q2: 'Q: Idealer Spam-Score?',
      a2: 'A: So niedrig wie möglich (1–5%).'
    },
    fr: {
      toolName: 'Historique & Profil de Liens',
      headline: 'Comment Utiliser l\'<span class="highlight">Historique & Profil de Liens</span>',
      simple: 'Le carnet de santé de votre site : conservez la trace de vos progrès SEO et évaluez votre Autorité de Domaine (DA).',
      step1: '<strong>Inspecter les Liens</strong>: Évaluez votre autorité et votre taux de spam.',
      step2: '<strong>Mesurer la Progression</strong>: Visualisez l\'impact de vos correctifs au fil des semaines.',
      step3: '<strong>Exporter en CSV</strong>: Téléchargez vos rapports pour vos clients.',
      how: 'Enregistre chaque passage et déduit l\'autorité selon les indicateurs OpenPageRank.',
      why: 'Justifie concrètement les gains de visibilité obtenus grâce à vos actions.',
      q1: 'Q: Qu\'est-ce que le Domain Authority (DA)?',
      a1: 'A: Indice de 1 à 100 estimant le poids de votre nom de domaine.',
      q2: 'Q: Quel Spam Score viser?',
      a2: 'A: Moins de 5% pour garantir un profil de liens irréprochable.'
    }
  },

  'gsc-tracker': {
    en: {
      toolName: 'Google Search Console Studio',
      headline: 'How to Use <span class="highlight">Google Search Console Studio</span> & How It Works',
      simple: 'The live surveillance camera inside Google itself! This shows 100% authentic data straight from Google: total search impressions, real clicks, CTR, and keyword rankings over the past 28 days.',
      step1: '<strong>Enter Website URL</strong>: Input your site and click "Fetch Search Telemetry 📈".',
      step2: '<strong>Review Top Queries</strong>: See exact search terms visitors typed to land on your pages.',
      step3: '<strong>Boost Page 2 Keywords</strong>: Find queries sitting at rank 11-20 (page 2) and expand your content to push them onto page 1.',
      how: 'Interfaces with Google Search Console REST APIs to deliver authentic search telemetry.',
      why: 'GSC tells you what users actually search for. Optimizing page 2 keywords generates fast, massive traffic gains.',
      q1: 'Q: What is Average CTR?',
      a1: 'A: Click-Through Rate. If 100 searchers see your snippet and 5 click, your CTR is 5% (healthy range: 3-8%).',
      q2: 'Q: What is Average Position?',
      a2: 'A: Your average rank on Google. Positions 1-10 mean you are on Page 1!'
    },
    hi: {
      toolName: 'Google Search Console Studio',
      headline: 'How to Use <span class="highlight">Google Search Console Studio</span> & How It Works (आसान यूजर गाइड)',
      simple: 'गूगल के अंदर का असली सीसीटीवी कैमरा! गूगल खुद बताता है कि पिछले 28 दिनों में कितने लोगों ने साइट देखी (Impressions), कितनों ने क्लिक किया और क्या रैंक है।',
      step1: '<strong>URL डालें</strong>: अपनी वेबसाइट का लिंक डालें और डेटा फेच करें।',
      step2: '<strong>Top Queries देखें</strong>: देखें कि लोग किन शब्दों को सर्च करके आपकी साइट पर आ रहे हैं।',
      step3: '<strong>पेज 2 वाले कीवर्ड्स सुधारें</strong>: जो कीवर्ड्स 11 से 20 रैंक पर हैं, उन पर थोड़ा काम करके पेज 1 पर लाएं।',
      how: 'यह Google Search Console REST API से असली लाइव डेटा कनेक्ट करता है।',
      why: 'यह 100% असली गूगल डेटा है जिससे पता चलता है कि अगला आर्टिकल किस पर लिखना चाहिए।',
      q1: 'Q: CTR क्या होता है?',
      a1: 'A: Click-Through Rate। 100 में से जितने लोग क्लिक करते हैं। 3-8% बहुत अच्छा होता है।',
      q2: 'Q: Average Position का क्या मतलब है?',
      a2: 'A: गूगल में आपकी औसत रैंक। 1 से 10 मतलब आप पेज 1 पर हैं।'
    },
    es: {
      toolName: 'Google Search Console Studio',
      headline: 'Cómo Usar <span class="highlight">Google Search Console Studio</span>',
      simple: 'Cámara en vivo dentro de Google: datos reales de clics, impresiones, CTR promedio y posiciones de palabras clave de los últimos 28 días.',
      step1: '<strong>Ingresa tu URL</strong>: Haz clic en "Fetch Search Telemetry 📈".',
      step2: '<strong>Revisa Consultas Principales</strong>: Mira qué términos exactos atraen visitas.',
      step3: '<strong>Impulsa la Página 2</strong>: Optimiza términos en posiciones 11-20 para llevarlos al Top 3.',
      how: 'Se conecta con la API REST de Google Search Console para telemetría precisa.',
      why: 'Muestra lo que buscan los usuarios reales, permitiendo optimizar contenidos para captar tráfico inmediato.',
      q1: 'Q: ¿Qué es el CTR promedio?',
      a1: 'A: Porcentaje de clics por impresión. Un 3% a 8% es una tasa saludable.',
      q2: 'Q: ¿Qué significa Posición Promedio?',
      a2: 'A: Tu ranking medio. Del 1 al 10 significa que estás en la primera página.'
    },
    de: {
      toolName: 'Google Search Console Studio',
      headline: 'Verwendung des <span class="highlight">Google Search Console Studios</span>',
      simple: 'Live-Einblick in Googles Originaldaten: echte Klicks, Impressionen, durchschnittliche Klickrate (CTR) und Suchpositionen der letzten 28 Tage.',
      step1: '<strong>URL eingeben</strong>: "Fetch Search Telemetry 📈" ausführen.',
      step2: '<strong>Suchbegriffe analysieren</strong>: Erkennen, mit welchen Anfragen Nutzer Ihre Seite finden.',
      step3: '<strong>Seite-2-Keywords pushen</strong>: Positionen 11–20 gezielt optimieren, um auf Seite 1 aufzusteigen.',
      how: 'Kommuniziert mit den offiziellen Google Search Console REST APIs.',
      why: 'Originaldaten belegen Nutzerinteressen und decken schnelle Traffic-Potenziale auf.',
      q1: 'Q: Was ist die durchschnittliche CTR?',
      a1: 'A: Das Verhältnis von Klicks zu Impressionen (gut sind 3–8%).',
      q2: 'Q: Was bedeutet Durchschnittliche Position?',
      a2: 'A: Ihr Ranking bei Google. Werte von 1 bis 10 bedeuten Seite 1.'
    },
    fr: {
      toolName: 'Studio Google Search Console',
      headline: 'Comment Utiliser le <span class="highlight">Studio Google Search Console</span>',
      simple: 'La caméra de surveillance au cœur de Google : clics réels, impressions, taux de clic moyen (CTR) et positions de mots-clés sur 28 jours.',
      step1: '<strong>Entrer l\'URL</strong>: Cliquez sur "Fetch Search Telemetry 📈".',
      step2: '<strong>Explorer les Requêtes</strong>: Identifiez les mots exacts tapés par vos visiteurs.',
      step3: '<strong>Booster la Page 2</strong>: Retravaillez les requêtes classées entre 11 et 20 pour intégrer le Top 5.',
      how: 'Exploite directement les flux de l\'API REST Google Search Console.',
      why: 'Vous guide sur les attentes concrètes des internautes pour générer du trafic immédiat.',
      q1: 'Q: Qu\'est-ce que le CTR moyen?',
      a1: 'A: Le taux de clic par affichage. Entre 3 et 8% est un excellent score.',
      q2: 'Q: Que signifie Position Moyenne?',
      a2: 'A: Votre rang dans les résultats. Un chiffre entre 1 et 10 signifie la première page.'
    }
  }
};

const I18N_HEADER_GUIDE_TEXT = {
  en: 'User Guide for this tab',
  hi: 'इस टूल की गाइड',
  es: 'Guía de esta herramienta',
  de: 'Anleitung für dieses Tool',
  fr: 'Guide pour cet outil'
};

/**
 * Updates all User Guide Boxes, Sidebar Navigation, and Global UI to the selected language
 */
window.setSuiteLanguage = function(lang) {
  if (!I18N_LANGUAGES[lang]) lang = 'en';
  localStorage.setItem('seopulse_lang', lang);

  // Update Navbar Labels & Flags
  const landingLabel = document.getElementById('landing-lang-label');
  const studioLabel = document.getElementById('studio-lang-label');
  if (landingLabel) landingLabel.textContent = I18N_LANGUAGES[lang].label;
  if (studioLabel) studioLabel.textContent = I18N_LANGUAGES[lang].label;

  // Update Header User Guide Button Text
  const headerGuideText = document.getElementById('global-guide-btn-text');
  if (headerGuideText) {
    headerGuideText.textContent = I18N_HEADER_GUIDE_TEXT[lang] || I18N_HEADER_GUIDE_TEXT.en;
  }

  // Update Dropdown Active States
  document.querySelectorAll('.lang-option-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-lang') === lang);
  });

  // Update Sidebar Navigation Tab Labels
  document.querySelectorAll('.nav-tab-btn[data-tool]').forEach(btn => {
    const toolId = btn.getAttribute('data-tool');
    const labelEl = btn.querySelector('.tab-label');
    if (labelEl && I18N_TOOLS[toolId]) {
      const toolData = I18N_TOOLS[toolId][lang] || I18N_TOOLS[toolId].en;
      if (toolData && toolData.toolName) {
        labelEl.textContent = toolData.toolName;
      }
    }
  });

  // Update Active Tool Header Title
  const activeBtn = document.querySelector('.nav-tab-btn.active');
  if (activeBtn) {
    const activeToolId = activeBtn.getAttribute('data-tool');
    const headerTitle = document.getElementById('header-tool-title');
    if (headerTitle && I18N_TOOLS[activeToolId]) {
      const toolData = I18N_TOOLS[activeToolId][lang] || I18N_TOOLS[activeToolId].en;
      if (toolData && toolData.toolName) {
        const icon = activeBtn.querySelector('.tab-icon')?.textContent || '';
        headerTitle.textContent = `${icon} ${toolData.toolName}`;
      }
    }
  }

  const sec = I18N_SECTIONS[lang] || I18N_SECTIONS.en;

  // Update Every User Guide Card
  document.querySelectorAll('.tool-user-guide-box[data-tool]').forEach(box => {
    const toolId = box.getAttribute('data-tool');
    const toolData = (I18N_TOOLS[toolId] && I18N_TOOLS[toolId][lang]) || 
                     (I18N_TOOLS[toolId] && I18N_TOOLS[toolId].en);

    // Update Section Headings inside Guide
    const badge = box.querySelector('.guide-badge-pill');
    const togglePrompt = box.querySelector('.guide-toggle-prompt');
    const headline = box.querySelector('.guide-headline');
    const closeBtn = box.querySelector('.guide-close-pill-btn');
    if (badge) badge.textContent = sec.badge;
    if (togglePrompt) togglePrompt.textContent = sec.togglePrompt;
    if (closeBtn) {
      const closeLabels = { en: '✕ Close', hi: '✕ बंद करें', es: '✕ Cerrar', de: '✕ Schließen', fr: '✕ Fermer' };
      closeBtn.textContent = closeLabels[lang] || closeLabels.en;
    }

    if (toolData) {
      if (headline) headline.innerHTML = toolData.headline;

      // Update Section Titles
      const titles = box.querySelectorAll('.guide-section-title');
      if (titles[0]) titles[0].textContent = sec.simpleTitle;
      if (titles[1]) titles[1].textContent = sec.stepsTitle;
      if (titles[2]) titles[2].textContent = sec.howTitle;
      if (titles[3]) titles[3].textContent = sec.whyTitle;
      if (titles[4]) titles[4].textContent = sec.faqTitle;

      // Update Simple Explanation
      const simpleP = box.querySelector('.guide-section:nth-of-type(1) .guide-text');
      if (simpleP) simpleP.textContent = toolData.simple;

      // Update 3 Steps
      const stepCards = box.querySelectorAll('.guide-step-card');
      if (stepCards[0]) stepCards[0].innerHTML = `<span class="step-num">${sec.step} 1</span>${toolData.step1}`;
      if (stepCards[1]) stepCards[1].innerHTML = `<span class="step-num">${sec.step} 2</span>${toolData.step2}`;
      if (stepCards[2]) stepCards[2].innerHTML = `<span class="step-num">${sec.step} 3</span>${toolData.step3}`;

      // Update Behind the Scenes
      const howP = box.querySelector('.guide-section:nth-of-type(3) .guide-text');
      if (howP) howP.textContent = toolData.how;

      // Update Why Google Cares
      const whyP = box.querySelector('.guide-section:nth-of-type(4) .guide-text');
      if (whyP) whyP.textContent = toolData.why;

      // Update FAQ Items
      const faqItems = box.querySelectorAll('.guide-faq-item');
      if (faqItems[0]) {
        const qEl = faqItems[0].querySelector('strong');
        const aEl = faqItems[0].querySelector('p');
        if (qEl) qEl.textContent = toolData.q1;
        if (aEl) aEl.textContent = toolData.a1;
      }
      if (faqItems[1]) {
        const qEl = faqItems[1].querySelector('strong');
        const aEl = faqItems[1].querySelector('p');
        if (qEl) qEl.textContent = toolData.q2;
        if (aEl) aEl.textContent = toolData.a2;
      }
    }
  });
};

// Initialize Language Switcher Dropdowns & Listeners on Page Load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('seopulse_lang') || 'hi';

  // Toggle Dropdown Menus
  const setupDropdown = (btnId, menuId) => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  };

  setupDropdown('landing-lang-btn', 'landing-lang-menu');
  setupDropdown('studio-lang-btn', 'studio-lang-menu');

  // Dropdown Item Clicks
  document.querySelectorAll('.lang-option-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      if (lang) {
        window.setSuiteLanguage(lang);
        document.querySelectorAll('.lang-dropdown-menu').forEach(m => m.classList.remove('show'));
      }
    });
  });

  // Guide Inline Flag Pills
  document.querySelectorAll('.guide-lang-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = e.currentTarget.getAttribute('data-lang');
      if (lang) window.setSuiteLanguage(lang);
    });
  });

  // Apply Initial Language
  window.setSuiteLanguage(savedLang);
});

