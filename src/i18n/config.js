/**
 * i18next Configuration
 * Manages internationalization for the entire application
 * Supports: English, Portuguese, Spanish, French, German, Arabic
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources for all supported languages
const resources = {
  en: {
    translation: {
      // Navigation menu
      nav: {
        home: "Home",
        translate: "Translate",
        grammar: "Grammar",
        features: "Features",
        about: "About"
      },
      // Home Page
      home: {
        title: "Go Beyond Translation",
        titleHighlight: "Cultural",
        titleEnd: "Context",
        subtitle: "Translate texts, slang, and idioms with cultural notes, usage examples, and pronunciation tips. Perfect for chat, work, and study—without losing meaning.",
        cta: "Get Started"
      },
      // Translate Page
      translate: {
        title: "Translation with Cultural Context",
        subtitle: "Write your text, choose languages, and receive translation + cultural notes.",
        chips: {
          contextAware: "Context-Aware",
          idioms: "Idioms • Slang",
          pronunciation: "Pronunciation"
        },
        from: "From",
        to: "To",
        placeholder: "Write your text here...",
        detected: "Detected",
        source: "Source",
        translateBtn: "Translate",
        translating: "Translating...",
        copy: "Copy",
        clear: "Clear",
        swap: "Swap languages",
        toastInput: "Text copied!",
        toastOutput: "Translation copied!",
        charLimit: "characters",
        culturalNotes: "Cultural Notes",
        history: "Recent Translations",
        emptyHistory: "No translations yet. Start translating!",
        backendOffline: "Backend Offline",
        backendOfflineMsg: "Start the Flask server for AI-powered smart translations."
      },
      // Chat Widget
      chat: {
        title: "Cultural Assistant",
        welcome: "👋 Hello! I'm your translation assistant.",
        askAbout: "Ask about:",
        slang: "Slang and expressions",
        cultural: "Cultural context",
        pronunciation: "Pronunciation tips",
        regional: "Regional differences",
        placeholder: "Write your question...",
        send: "Send",
        errorMsg: "Sorry, there was an error. Please check if the backend is running.",
        connectionError: "Couldn't connect to server. Start the Flask backend first!"
      },
      // Languages
      languages: {
        auto: "Auto-detect",
        en: "English",
        pt: "Portuguese",
        es: "Spanish",
        fr: "French",
        de: "German",
        ar: "Arabic"
      },
      grammar: {
        title: "Grammar & Word Usage",
        subtitle: "Learn how to use words correctly with examples, definitions, and cultural context.",
        tabs: {
          search: "Search Word",
          tips: "Grammar Tips"
        },
        searchLabel: "Enter a word or phrase",
        searchPlaceholder: "Type a word to learn...",
        searchBtn: "Analyze",
        searching: "Searching...",
        analyzing: "Analyzing grammar...",
        definition: "Definition",
        examples: "Examples",
        usage: "Usage",
        conjugation: "Conjugation",
        notes: "Grammar Notes",
        quickRef: "Quick Reference",
        errorMsg: "Could not analyze this word. Try another.",
        connectionError: "Connection error. Check if the backend is running.",
        tips: {
          wordTypes: "Word Types",
          wordTypesDesc: "Understand nouns, verbs, adjectives, and more to build better sentences.",
          conjugation: "Conjugation",
          conjugationDesc: "Learn how verbs change with tense, person, and mood.",
          usage: "Correct Usage",
          usageDesc: "See real examples of how words are used in context.",
          context: "Cultural Context",
          contextDesc: "Understand cultural nuances and when to use formal vs informal language."
        },
        ref: {
          noun: "Nouns",
          nounDesc: "Person, place, thing, or idea. Example: book, city, happiness",
          verb: "Verbs",
          verbDesc: "Action or state. Example: run, think, be",
          adjective: "Adjectives",
          adjectiveDesc: "Describes nouns. Example: beautiful, fast, blue",
          adverb: "Adverbs",
          adverbDesc: "Modifies verbs, adjectives, or other adverbs. Example: quickly, very, well"
        }
      },
      // Features Page
      features: {
        pageTitle: "Powerful Features for",
        pageTitleHighlight: "Better Translation",
        pageSubtitle: "Discover all the tools and features that make this translator unique and powerful.",
        smartTranslation: {
          title: "Smart Translation Engine",
          description: "AI-powered translations that understand context, tone, and cultural nuances.",
          highlight1: "Auto-detect source language",
          highlight2: "Natural, contextually accurate translations",
          highlight3: "Support for 6+ languages"
        },
        culturalContext: {
          title: "Cultural Context Analysis",
          description: "Go beyond words with AI-generated cultural insights and explanations.",
          highlight1: "Idioms and expressions explained",
          highlight2: "Formal vs informal usage tips",
          highlight3: "Regional variations highlighted"
        },
        tts: {
          title: "Text-to-Speech",
          description: "Listen to pronunciations in multiple languages with native voices.",
          highlight1: "Multi-language voice support",
          highlight2: "Hear both source and translation",
          highlight3: "Perfect for language learning"
        },
        aiChat: {
          title: "AI Chat Assistant",
          description: "Get instant help with grammar, usage, and cultural questions.",
          highlight1: "Interactive language help",
          highlight2: "Contextual assistance",
          highlight3: "Available in all interface languages"
        },
        grammar: {
          title: "Grammar Learning",
          description: "Master grammar rules with interactive examples and AI-powered explanations.",
          highlight1: "Grammar tips and rules",
          highlight2: "Real-world usage examples",
          highlight3: "Structured by difficulty"
        },
        multilingual: {
          title: "Multilingual Interface",
          description: "Use the app in your preferred language with full UI translation.",
          highlight1: "6+ interface languages",
          highlight2: "Auto-detect browser language",
          highlight3: "Persistent language preference"
        },
        ctaTitle: "Ready to Start Translating?",
        ctaSubtitle: "Try all features for free with no account required.",
        ctaButton: "Start Translating Now"
      },
      // About Page
      about: {
        pageTitle: "About Our",
        pageTitleHighlight: "Translation Platform",
        pageSubtitle: "We're on a mission to break language barriers with intelligent translation that preserves meaning, context, and cultural nuances.",
        stats: {
          languages: "Languages",
          powered: "Powered",
          free: "Free",
          translations: "Translations"
        },
        mission: {
          title: "Our Mission",
          text1: "Translation shouldn't just convert words from one language to another—it should preserve meaning, context, and cultural nuances. That's why we built this platform.",
          text2: "Using cutting-edge AI technology, we provide translations that understand idioms, slang, formality levels, and regional variations. Whether you're chatting with friends, studying a new language, or working on professional documents, we help you communicate naturally and accurately."
        },
        vision: {
          title: "Our Vision",
          text: "We envision a world where language is never a barrier to communication, education, or opportunity.",
          card1: {
            title: "Break Barriers",
            description: "Make communication effortless across languages and cultures."
          },
          card2: {
            title: "Empower Learning",
            description: "Help people learn languages naturally with context and culture."
          },
          card3: {
            title: "Build Bridges",
            description: "Connect people worldwide through accurate, meaningful translation."
          }
        },
        technology: {
          title: "Technology Stack",
          text: "Built with modern, reliable technologies to provide the best translation experience."
        },
        team: {
          title: "What Powers This Project",
          ai: {
            role: "AI Translation",
            description: "OpenAI GPT-4o via GitHub Models for intelligent, context-aware translations."
          },
          design: {
            role: "Modern Design",
            description: "Clean, responsive interface with smooth animations and glassmorphism effects."
          },
          dev: {
            role: "Full-Stack Development",
            description: "React frontend with Python Flask backend and SQLite database."
          },
          community: {
            role: "Open Source",
            description: "Community-driven development with contributions welcome from everyone."
          }
        },
        cta: {
          title: "Join Us on This Journey",
          text: "Start using our translator today or contribute to making it even better.",
          button1: "Try the Translator",
          button2: "View on GitHub"
        }
      }
    }
  },
  pt: {
    translation: {
      nav: {
        home: "Início",
        translate: "Traduzir",
        grammar: "Gramática",
        features: "Recursos",
        about: "Sobre"
      },
      home: {
        title: "Vai Além da Tradução",
        titleHighlight: "Cultural",
        titleEnd: "Real",
        subtitle: "Traduz textos, gírias e expressões com notas culturais, exemplos de uso e dicas de pronúncia. Perfeito para chat, trabalho e estudo—sem perder o sentido.",
        cta: "Começar"
      },
      translate: {
        title: "Tradução com Contexto Cultural",
        subtitle: "Escreve o texto, escolhe os idiomas e recebe tradução + notas culturais.",
        chips: {
          contextAware: "Contextual",
          idioms: "Expressões • Gírias",
          pronunciation: "Pronúncia"
        },
        from: "De",
        to: "Para",
        placeholder: "Escreve o texto aqui...",
        detected: "Detetado",
        source: "Origem",
        translateBtn: "Traduzir",
        translating: "A traduzir…",
        copy: "Copiar",
        clear: "Limpar",
        swap: "Trocar idiomas",
        toastInput: "Texto copiado!",
        toastOutput: "Tradução copiada!",
        charLimit: "caracteres",
        culturalNotes: "Notas Culturais",
        history: "Traduções Recentes",
        emptyHistory: "Ainda sem traduções. Começa a traduzir!",
        backendOffline: "Backend Offline",
        backendOfflineMsg: "Inicia o servidor Flask para traduções inteligentes com IA."
      },
      // Chat Widget
      chat: {
        title: "Assistente Cultural",
        welcome: "👋 Olá! Sou o teu assistente de tradução.",
        askAbout: "Pergunta sobre:",
        slang: "Gírias e expressões",
        cultural: "Contexto cultural",
        pronunciation: "Dicas de pronúncia",
        regional: "Diferenças regionais",
        placeholder: "Escreve a tua pergunta...",
        send: "Enviar",
        errorMsg: "Desculpe, houve um erro. Verifica se o backend está a funcionar.",
        connectionError: "Não consegui conectar ao servidor. Inicia o backend Flask primeiro!",
        online: "Online",
        close: "Fechar",
        suggestions: "Sugestões",
        suggestSlang: "Como uso expressões informais?",
        suggestCultural: "Qual o contexto cultural?",
        suggestPronunciation: "Como pronuncio isto?"
      },
      languages: {
        auto: "Auto-detetar",
        en: "Inglês",
        pt: "Português",
        es: "Espanhol",
        fr: "Francês",
        de: "Alemão",
        ar: "Árabe"
      },
      grammar: {
        title: "Gramática & Uso de Palavras",
        subtitle: "Aprende como usar palavras corretamente com exemplos, definições e contexto cultural.",
        tabs: {
          search: "Pesquisar Palavra",
          tips: "Dicas de Gramática"
        },
        searchLabel: "Escreve uma palavra ou frase",
        searchPlaceholder: "Escreve uma palavra para aprender...",
        searchBtn: "Analisar",
        searching: "A pesquisar...",
        analyzing: "A analisar gramática...",
        definition: "Definição",
        examples: "Exemplos",
        usage: "Uso",
        conjugation: "Conjugação",
        notes: "Notas Gramaticais",
        quickRef: "Referência Rápida",
        errorMsg: "Não foi possível analisar esta palavra. Tenta outra.",
        connectionError: "Erro de conexão. Verifica se o backend está a funcionar.",
        tips: {
          wordTypes: "Tipos de Palavras",
          wordTypesDesc: "Compreende substantivos, verbos, adjetivos e mais para construir melhores frases.",
          conjugation: "Conjugação",
          conjugationDesc: "Aprende como os verbos mudam com o tempo, pessoa e modo.",
          usage: "Uso Correto",
          usageDesc: "Vê exemplos reais de como as palavras são usadas em contexto.",
          context: "Contexto Cultural",
          contextDesc: "Compreende nuances culturais e quando usar linguagem formal vs informal."
        },
        ref: {
          noun: "Substantivos",
          nounDesc: "Pessoa, lugar, coisa ou ideia. Exemplo: livro, cidade, felicidade",
          verb: "Verbos",
          verbDesc: "Ação ou estado. Exemplo: correr, pensar, ser",
          adjective: "Adjetivos",
          adjectiveDesc: "Descreve substantivos. Exemplo: bonito, rápido, azul",
          adverb: "Advérbios",
          adverbDesc: "Modifica verbos, adjetivos ou outros advérbios. Exemplo: rapidamente, muito, bem"
        }
      },
      // Features Page
      features: {
        pageTitle: "Recursos Poderosos para",
        pageTitleHighlight: "Melhor Tradução",
        pageSubtitle: "Descobre todas as ferramentas e recursos que tornam este tradutor único e poderoso.",
        smartTranslation: {
          title: "Motor de Tradução Inteligente",
          description: "Traduções com IA que compreendem contexto, tom e nuances culturais.",
          highlight1: "Deteção automática do idioma de origem",
          highlight2: "Traduções naturais e contextualmente precisas",
          highlight3: "Suporte para mais de 6 idiomas"
        },
        culturalContext: {
          title: "Análise de Contexto Cultural",
          description: "Vai além das palavras com insights culturais gerados por IA.",
          highlight1: "Expressões e idiomas explicados",
          highlight2: "Dicas de uso formal vs informal",
          highlight3: "Variações regionais destacadas"
        },
        tts: {
          title: "Texto para Voz",
          description: "Ouve pronúncias em vários idiomas com vozes nativas.",
          highlight1: "Suporte de voz multilíngue",
          highlight2: "Ouve origem e tradução",
          highlight3: "Perfeito para aprender idiomas"
        },
        aiChat: {
          title: "Assistente de Chat IA",
          description: "Obtém ajuda instantânea com gramática, uso e questões culturais.",
          highlight1: "Ajuda interativa de idiomas",
          highlight2: "Assistência contextual",
          highlight3: "Disponível em todos os idiomas da interface"
        },
        grammar: {
          title: "Aprendizagem de Gramática",
          description: "Domina regras gramaticais com exemplos interativos e explicações com IA.",
          highlight1: "Dicas e regras de gramática",
          highlight2: "Exemplos de uso real",
          highlight3: "Estruturado por dificuldade"
        },
        multilingual: {
          title: "Interface Multilíngue",
          description: "Usa a aplicação no teu idioma preferido com tradução completa da interface.",
          highlight1: "Mais de 6 idiomas de interface",
          highlight2: "Deteção automática do idioma do navegador",
          highlight3: "Preferência de idioma persistente"
        },
        ctaTitle: "Pronto para Começar a Traduzir?",
        ctaSubtitle: "Experimenta todos os recursos gratuitamente sem precisar de conta.",
        ctaButton: "Começar a Traduzir Agora"
      },
      // About Page
      about: {
        pageTitle: "Sobre a Nossa",
        pageTitleHighlight: "Plataforma de Tradução",
        pageSubtitle: "Estamos em missão para quebrar barreiras linguísticas com tradução inteligente que preserva significado, contexto e nuances culturais.",
        stats: {
          languages: "Idiomas",
          powered: "Powered",
          free: "Grátis",
          translations: "Traduções"
        },
        mission: {
          title: "A Nossa Missão",
          text1: "A tradução não deve apenas converter palavras de um idioma para outro—deve preservar significado, contexto e nuances culturais. É por isso que construímos esta plataforma.",
          text2: "Usando tecnologia de IA de ponta, fornecemos traduções que compreendem expressões idiomáticas, gírias, níveis de formalidade e variações regionais. Seja a conversar com amigos, estudar um novo idioma ou trabalhar em documentos profissionais, ajudamos-te a comunicar de forma natural e precisa."
        },
        vision: {
          title: "A Nossa Visão",
          text: "Imaginamos um mundo onde o idioma nunca é uma barreira à comunicação, educação ou oportunidade.",
          card1: {
            title: "Quebrar Barreiras",
            description: "Tornar a comunicação fácil entre idiomas e culturas."
          },
          card2: {
            title: "Capacitar Aprendizagem",
            description: "Ajudar as pessoas a aprender idiomas naturalmente com contexto e cultura."
          },
          card3: {
            title: "Construir Pontes",
            description: "Conectar pessoas em todo o mundo através de tradução precisa e significativa."
          }
        },
        technology: {
          title: "Stack Tecnológico",
          text: "Construído com tecnologias modernas e confiáveis para proporcionar a melhor experiência de tradução."
        },
        team: {
          title: "O Que Alimenta Este Projeto",
          ai: {
            role: "Tradução com IA",
            description: "OpenAI GPT-4o via GitHub Models para traduções inteligentes e contextuais."
          },
          design: {
            role: "Design Moderno",
            description: "Interface limpa e responsiva com animações suaves e efeitos glassmórficos."
          },
          dev: {
            role: "Desenvolvimento Full-Stack",
            description: "Frontend React com backend Python Flask e base de dados SQLite."
          },
          community: {
            role: "Código Aberto",
            description: "Desenvolvimento orientado pela comunidade com contribuições bem-vindas de todos."
          }
        },
        cta: {
          title: "Junta-te a Nós Nesta Jornada",
          text: "Começa a usar o nosso tradutor hoje ou contribui para torná-lo ainda melhor.",
          button1: "Experimentar o Tradutor",
          button2: "Ver no GitHub"
        }
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        translate: "Traducir",
        features: "Características",
        about: "Acerca de"
      },
      home: {
        title: "Más Allá de la Traducción",
        titleHighlight: "Cultural",
        titleEnd: "Real",
        subtitle: "Traduce textos, jerga y expresiones con notas culturales, ejemplos de uso y consejos de pronunciación. Perfecto para chat, trabajo y estudio—sin perder el significado.",
        cta: "Empezar"
      },
      translate: {
        title: "Traducción con Contexto Cultural",
        subtitle: "Escribe el texto, elige los idiomas y recibe traducción + notas culturales.",
        chips: {
          contextAware: "Contextual",
          idioms: "Modismos • Jerga",
          pronunciation: "Pronunciación"
        },
        from: "De",
        to: "A",
        placeholder: "Escribe tu texto aquí...",
        detected: "Detectado",
        source: "Origen",
        translateBtn: "Traducir",
        translating: "Traduciendo...",
        copy: "Copiar",
        clear: "Limpiar",
        swap: "Intercambiar idiomas",
        toastInput: "¡Texto copiado!",
        toastOutput: "¡Traducción copiada!",
        charLimit: "caracteres",
        culturalNotes: "Notas Culturales",
        history: "Traducciones Recientes",
        emptyHistory: "Aún no hay traducciones. ¡Empieza a traducir!",
        backendOffline: "Backend Desconectado",
        backendOfflineMsg: "Inicia el servidor Flask para traducciones inteligentes con IA."
      },
      chat: {
        title: "Asistente Cultural",
        welcome: "👋 ¡Hola! Soy tu asistente de traducción.",
        askAbout: "Pregunta sobre:",
        slang: "Jerga y expresiones",
        cultural: "Contexto cultural",
        pronunciation: "Consejos de pronunciación",
        regional: "Diferencias regionales",
        placeholder: "Escribe tu pregunta...",
        send: "Enviar",
        errorMsg: "Lo siento, hubo un error. Verifica si el backend está funcionando.",
        connectionError: "No se pudo conectar al servidor. ¡Inicia el backend Flask primero!"
      },
      languages: {
        auto: "Auto-detectar",
        en: "Inglés",
        pt: "Portugués",
        es: "Español",
        fr: "Francés",
        de: "Alemán",
        ar: "Árabe"
      },
      grammar: {
        title: "Gramática & Uso de Palabras",
        subtitle: "Aprende cómo usar palabras correctamente con ejemplos, definiciones y contexto cultural.",
        tabs: {
          search: "Buscar Palabra",
          tips: "Consejos de Gramática"
        },
        searchLabel: "Escribe una palabra o frase",
        searchPlaceholder: "Escribe una palabra para aprender...",
        searchBtn: "Analizar",
        searching: "Buscando...",
        analyzing: "Analizando gramática...",
        definition: "Definición",
        examples: "Ejemplos",
        usage: "Uso",
        conjugation: "Conjugación",
        notes: "Notas Gramaticales",
        quickRef: "Referencia Rápida",
        errorMsg: "No se pudo analizar esta palabra. Intenta otra.",
        connectionError: "Error de conexión. Verifica si el backend está funcionando.",
        tips: {
          wordTypes: "Tipos de Palabras",
          wordTypesDesc: "Comprende sustantivos, verbos, adjetivos y más para construir mejores frases.",
          conjugation: "Conjugación",
          conjugationDesc: "Aprende cómo los verbos cambian con el tiempo, persona y modo.",
          usage: "Uso Correcto",
          usageDesc: "Ve ejemplos reales de cómo se usan las palabras en contexto.",
          context: "Contexto Cultural",
          contextDesc: "Comprende matices culturales y cuándo usar lenguaje formal vs informal."
        },
        ref: {
          noun: "Sustantivos",
          nounDesc: "Persona, lugar, cosa o idea. Ejemplo: libro, ciudad, felicidad",
          verb: "Verbos",
          verbDesc: "Acción o estado. Ejemplo: correr, pensar, ser",
          adjective: "Adjetivos",
          adjectiveDesc: "Describe sustantivos. Ejemplo: hermoso, rápido, azul",
          adverb: "Adverbios",
          adverbDesc: "Modifica verbos, adjetivos u otros adverbios. Ejemplo: rápidamente, muy, bien"
        }
      },
      // Features Page
      features: {
        pageTitle: "Características Poderosas para",
        pageTitleHighlight: "Mejor Traducción",
        pageSubtitle: "Descubre todas las herramientas y características que hacen único y poderoso este traductor.",
        smartTranslation: {
          title: "Motor de Traducción Inteligente",
          description: "Traducciones con IA que entienden contexto, tono y matices culturales.",
          highlight1: "Detección automática del idioma de origen",
          highlight2: "Traducciones naturales e contextualmente precisas",
          highlight3: "Soporte para más de 6 idiomas"
        },
        culturalContext: {
          title: "Análisis de Contexto Cultural",
          description: "Más allá de las palabras con insights culturales generados por IA.",
          highlight1: "Modismos y expresiones explicados",
          highlight2: "Consejos de uso formal vs informal",
          highlight3: "Variaciones regionales destacadas"
        },
        tts: {
          title: "Texto a Voz",
          description: "Escucha pronunciaciones en varios idiomas con voces nativas.",
          highlight1: "Soporte de voz multilingüe",
          highlight2: "Escucha origen y traducción",
          highlight3: "Perfecto para aprender idiomas"
        },
        aiChat: {
          title: "Asistente de Chat IA",
          description: "Obtén ayuda instantánea con gramática, uso y preguntas culturales.",
          highlight1: "Ayuda interactiva de idiomas",
          highlight2: "Asistencia contextual",
          highlight3: "Disponible en todos los idiomas de la interfaz"
        },
        grammar: {
          title: "Aprendizaje de Gramática",
          description: "Domina reglas gramaticais com exemplos interativos e explicações com IA.",
          highlight1: "Dicas e regras de gramática",
          highlight2: "Exemplos de uso real",
          highlight3: "Estruturado por dificuldade"
        },
        multilingual: {
          title: "Interfaz Multilingüe",
          description: "Usa la aplicación en tu idioma preferido com tradução completa de la interfaz.",
          highlight1: "Más de 6 idiomas de interface",
          highlight2: "Detección automática del idioma del navegador",
          highlight3: "Preferência de idioma persistente"
        },
        ctaTitle: "¿Listo para Empezar a Traducir?",
        ctaSubtitle: "Prueba todas las características gratis sin necesidad de cuenta.",
        ctaButton: "Empezar a Traducir Ahora"
      },
      about: {
        pageTitle: "Sobre Nuestra",
        pageTitleHighlight: "Plataforma de Traducción",
        pageSubtitle: "Estamos en una misión para romper barreras lingüísticas con traducción inteligente que preserva significado, contexto y matices culturales.",
        stats: {
          languages: "Idiomas",
          powered: "Powered",
          free: "Gratis",
          translations: "Traducciones"
        },
        mission: {
          title: "Nuestra Misión",
          text1: "La traducción no debe solo convertir palabras de un idioma a otro—debe preservar significado, contexto y matices culturales. Por eso construimos esta plataforma.",
          text2: "Usando tecnología de IA de vanguardia, proporcionamos traducciones que entienden modismos, jerga, niveles de formalidad y variaciones regionales. Ya sea que estés charlando con amigos, estudiando un nuevo idioma o trabajando en documentos profesionales, te ayudamos a comunicarte de forma natural y precisa."
        },
        vision: {
          title: "Nuestra Visión",
          text: "Imaginamos un mundo donde el idioma nunca sea una barrera para la comunicación, educación u oportunidad.",
          card1: {
            title: "Romper Barreras",
            description: "Hacer la comunicación fácil entre idiomas y culturas."
          },
          card2: {
            title: "Empoderar el Aprendizaje",
            description: "Ayudar a las personas a aprender idiomas naturalmente con contexto y cultura."
          },
          card3: {
            title: "Construir Puentes",
            description: "Conectar personas en todo el mundo a través de traducción precisa y significativa."
          }
        },
        technology: {
          title: "Stack Tecnológico",
          text: "Construido con tecnologías modernas y confiáveis para proporcionar a melhor experiência de tradução."
        },
        team: {
          title: "Lo Que Impulsa Este Proyecto",
          ai: {
            role: "Traducción con IA",
            description: "OpenAI GPT-4o vía GitHub Models para traducciones inteligentes y contextuales."
          },
          design: {
            role: "Diseño Moderno",
            description: "Interfaz limpia y responsiva con animaciones suaves y efectos glassmórficos."
          },
          dev: {
            role: "Desarrollo Full-Stack",
            description: "Frontend React con backend Python Flask y base de datos SQLite."
          },
          community: {
            role: "Código Abierto",
            description: "Desarrollo impulsado por la comunidad con contribuciones bienvenidas de todos."
          }
        },
        cta: {
          title: "Únete a Nosotros en Este Viaje",
          text: "Comienza a usar nuestro traductor hoy o contribuye para hacerlo aún mejor.",
          button1: "Probar el Traductor",
          button2: "Ver en GitHub"
        }
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        translate: "Traduire",
        grammar: "Grammaire",
        features: "Fonctionnalités",
        about: "À propos"
      },
      home: {
        title: "Au-delà de la Traduction",
        titleHighlight: "Culturel",
        titleEnd: "Réel",
        subtitle: "Traduisez des textes, argot et expressions avec des notes culturelles, exemples d'utilisation et conseils de prononciation. Parfait pour le chat, le travail et l'étude—sans perdre le sens.",
        cta: "Commencer"
      },
      translate: {
        title: "Traduction avec Contexte Culturel",
        subtitle: "Écrivez le texte, choisissez les langues et recevez traduction + notes culturelles.",
        chips: {
          contextAware: "Contextuel",
          idioms: "Expressions • Argot",
          pronunciation: "Prononciation"
        },
        from: "De",
        to: "À",
        placeholder: "Écrivez votre texte ici...",
        detected: "Détecté",
        source: "Source",
        translateBtn: "Traduire",
        translating: "Traduction...",
        copy: "Copier",
        clear: "Effacer",
        swap: "Échanger les langues",
        toastInput: "Texte copié!",
        toastOutput: "Traduction copiée!",
        charLimit: "caractères",
        culturalNotes: "Notes Culturelles",
        history: "Traductions Récentes",
        emptyHistory: "Pas encore de traductions. Commencez à traduire!",
        backendOffline: "Backend Hors Ligne",
        backendOfflineMsg: "Démarrez le serveur Flask pour des traductions intelligentes avec IA."
      },
      chat: {
        title: "Assistant Culturel",
        welcome: "👋 Bonjour! Je suis votre assistant de traduction.",
        askAbout: "Demandez à propos de:",
        slang: "Argot et expressions",
        cultural: "Contexte culturel",
        pronunciation: "Conseils de prononciation",
        regional: "Différences régionales",
        placeholder: "Écrivez votre question...",
        send: "Envoyer",
        errorMsg: "Désolé, une erreur s'est produite. Vérifiez si le backend fonctionne.",
        connectionError: "Impossible de se connecter au serveur. Démarrez d'abord le backend Flask!"
      },
      languages: {
        auto: "Auto-détection",
        en: "Anglais",
        pt: "Portugais",
        es: "Espagnol",
        fr: "Français",
        de: "Allemand",
        ar: "Arabe"
      },
      grammar: {
        title: "Grammaire & Usage des Mots",
        subtitle: "Apprenez à utiliser les mots correctement avec des exemples, définitions et contexte culturel.",
        tabs: {
          search: "Rechercher un Mot",
          tips: "Conseils de Grammaire"
        },
        searchLabel: "Entrez un mot ou une phrase",
        searchPlaceholder: "Tapez un mot pour apprendre...",
        searchBtn: "Analyser",
        searching: "Recherche...",
        analyzing: "Analyse de la grammaire...",
        definition: "Définition",
        examples: "Exemples",
        usage: "Usage",
        conjugation: "Conjugaison",
        notes: "Notes de Grammaire",
        quickRef: "Référence Rapide",
        errorMsg: "Impossible d'analyser ce mot. Essayez un autre.",
        connectionError: "Erreur de connexion. Vérifiez si le backend fonctionne.",
        tips: {
          wordTypes: "Types de Mots",
          wordTypesDesc: "Comprenez les noms, verbes, adjectifs et plus pour construire de meilleures phrases.",
          conjugation: "Conjugaison",
          conjugationDesc: "Apprenez comment les verbes changent avec le temps, la personne et le mode.",
          usage: "Usage Correct",
          usageDesc: "Voyez des exemples réels de comment les mots sont utilisés en contexte.",
          context: "Contexte Culturel",
          contextDesc: "Comprenez les nuances culturelles et quand utiliser un langage formel vs informel."
        },
        ref: {
          noun: "Noms",
          nounDesc: "Personne, lieu, chose ou idée. Exemple: livre, ville, bonheur",
          verb: "Verbes",
          verbDesc: "Action ou état. Exemple: courir, penser, être",
          adjective: "Adjectifs",
          adjectiveDesc: "Décrit les noms. Exemple: beau, rapide, bleu",
          adverb: "Adverbes",
          adverbDesc: "Modifie les verbes, adjectifs ou autres adverbes. Exemple: rapidement, très, bien"
        }
      },
      // Features Page
      features: {
        pageTitle: "Caractéristiques Puissantes pour",
        pageTitleHighlight: "Meilleure Traduction",
        pageSubtitle: "Découvrez tous les outils et fonctionnalités qui rendent ce traducteur unique et puissant.",
        smartTranslation: {
          title: "Moteur de Traduction Intelligent",
          description: "Traductions alimentées par IA qui comprennent le contexte, le ton et les nuances culturelles.",
          highlight1: "Détection automatique de la langue source",
          highlight2: "Traductions naturelles et contextuellement précises",
          highlight3: "Support pour plus de 6 langues"
        },
        culturalContext: {
          title: "Analyse du Contexte Culturel",
          description: "Allez au-delà des mots avec des insights et explications culturels générés par IA.",
          highlight1: "Idiomes et expressions expliqués",
          highlight2: "Conseils d'utilisation formelle vs informelle",
          highlight3: "Variations régionales mises en évidence"
        },
        tts: {
          title: "Texte-à-Parole",
          description: "Écoutez les prononciations dans plusieurs langues avec des voix natives.",
          highlight1: "Support vocal multilingue",
          highlight2: "Entendre à la fois la source et la traduction",
          highlight3: "Parfait pour l'apprentissage des langues"
        },
        aiChat: {
          title: "Assistant de Chat IA",
          description: "Obtenez une aide instantanée pour les questions de grammaire, d'utilisation et culturelles.",
          highlight1: "Aide linguistique interactive",
          highlight2: "Assistance contextuelle",
          highlight3: "Disponible dans toutes les langues de l'interface"
        },
        grammar: {
          title: "Apprentissage de la Grammaire",
          description: "Maîtrisez les règles de grammaire avec des exemples interactifs et des explications alimentées par IA.",
          highlight1: "Conseils et règles de grammaire",
          highlight2: "Exemples d'utilisation dans le monde réel",
          highlight3: "Structuré par difficulté"
        },
        multilingual: {
          title: "Interface Multilingue",
          description: "Utilisez l'application dans votre langue préférée avec une traduction complète de l'interface.",
          highlight1: "6+ langues de l'interface",
          highlight2: "Détection automatique de la langue du navigateur",
          highlight3: "Préférence de langue persistante"
        },
        ctaTitle: "Prêt à Commencer à Traduire?",
        ctaSubtitle: "Essayez toutes les fonctionnalités gratuitement sans compte requis.",
        ctaButton: "Commencer à Traduire Maintenant"
      },
      // About Page
      about: {
        pageTitle: "À Propos de Notre",
        pageTitleHighlight: "Plateforme de Traduction",
        pageSubtitle: "Nous avons pour mission de briser les barrières linguistiques avec une traduction intelligente qui préserve le sens, le contexte et les nuances culturelles.",
        stats: {
          languages: "Langues",
          powered: "Alimenté",
          free: "Gratuit",
          translations: "Traductions"
        },
        mission: {
          title: "Notre Mission",
          text1: "La traduction ne devrait pas se contenter de convertir des mots d'une langue à une autre—elle devrait préserver le sens, le contexte et les nuances culturelles. C'est pourquoi nous avons construit cette plateforme.",
          text2: "En utilisant une technologie IA de pointe, nous fournissons des traductions qui comprennent les idiomes, l'argot, les niveaux de formalité et les variations régionales. Que vous discutiez avec des amis, étudiiez une nouvelle langue ou travailliez sur des documents professionnels, nous vous aidons à communiquer de manière naturelle et précise."
        },
        vision: {
          title: "Notre Vision",
          text: "Nous envisionnons un monde où la langue n'est jamais une barrière à la communication, à l'éducation ou à l'opportunité.",
          card1: {
            title: "Briser les Barrières",
            description: "Faciliter la communication à travers les langues et les cultures."
          },
          card2: {
            title: "Autonomiser l'Apprentissage",
            description: "Aider les gens à apprendre les langues naturellement avec le contexte et la culture."
          },
          card3: {
            title: "Construire des Ponts",
            description: "Connecter les gens du monde entier grâce à une traduction précise et significative."
          }
        },
        technology: {
          title: "Technologies Utilisées",
          text: "Construit avec des technologies modernes et fiables pour fournir la meilleure expérience de traduction."
        },
        team: {
          title: "Ce Qui Alimente Ce Projet",
          ai: {
            role: "Traduction IA",
            description: "OpenAI GPT-4o via GitHub Models pour des traductions intelligentes et conscientes du contexte."
          },
          design: {
            role: "Design Moderne",
            description: "Interface propre et réactive avec des animations fluides et des effets de glassmorphisme."
          },
          dev: {
            role: "Développement Full-Stack",
            description: "Frontend React avec backend Python Flask et base de données SQLite."
          },
          community: {
            role: "Open Source",
            description: "Développement dirigé par la communauté avec des contributions bienvenues de tous."
          }
        },
        cta: {
          title: "Rejoignez-Nous dans Cette Aventure",
          text: "Commencez à utiliser notre traducteur dès aujourd'hui ou contribuez à l'améliorer encore.",
          button1: "Essayer le Traducteur",
          button2: "Voir sur GitHub"
        }
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: "Startseite",
        translate: "Übersetzen",
        grammar: "Grammatik",
        features: "Funktionen",
        about: "Über uns"
      },
      home: {
        title: "Über die Übersetzung Hinaus",
        titleHighlight: "Kultureller",
        titleEnd: "Echter",
        subtitle: "Übersetzen Sie Texte, Slang und Ausdrücke mit kulturellen Hinweisen, Verwendungsbeispielen und Aussprache-Tipps. Perfekt für Chat, Arbeit und Studium—ohne Bedeutungsverlust.",
        cta: "Loslegen"
      },
      translate: {
        title: "Übersetzung mit Kulturellem Kontext",
        subtitle: "Schreiben Sie den Text, wählen Sie die Sprachen und erhalten Sie Übersetzung + kulturelle Hinweise.",
        chips: {
          contextAware: "Kontextbewusst",
          idioms: "Redewendungen • Slang",
          pronunciation: "Aussprache"
        },
        from: "Von",
        to: "Nach",
        placeholder: "Schreiben Sie Ihren Text hier...",
        detected: "Erkannt",
        source: "Quelle",
        translateBtn: "Übersetzen",
        translating: "Übersetzen...",
        copy: "Kopieren",
        clear: "Löschen",
        swap: "Sprachen tauschen",
        toastInput: "Text kopiert!",
        toastOutput: "Übersetzung kopiert!",
        charLimit: "Zeichen",
        culturalNotes: "Kulturelle Hinweise",
        history: "Letzte Übersetzungen",
        emptyHistory: "Noch keine Übersetzungen. Beginnen Sie zu übersetzen!",
        backendOffline: "Backend Offline",
        backendOfflineMsg: "Starten Sie den Flask-Server für intelligente KI-Übersetzungen."
      },
      chat: {
        title: "Kulturassistent",
        welcome: "👋 Hallo! Ich bin Ihr Übersetzungsassistent.",
        askAbout: "Fragen Sie nach:",
        slang: "Slang und Ausdrücke",
        cultural: "Kultureller Kontext",
        pronunciation: "Aussprache-Tipps",
        regional: "Regionale Unterschiede",
        placeholder: "Schreiben Sie Ihre Frage...",
        send: "Senden",
        errorMsg: "Entschuldigung, es gab einen Fehler. Überprüfen Sie, ob das Backend läuft.",
        connectionError: "Verbindung zum Server fehlgeschlagen. Starten Sie zuerst das Flask-Backend!"
      },
      languages: {
        auto: "Auto-Erkennung",
        en: "Englisch",
        pt: "Portugiesisch",
        es: "Spanisch",
        fr: "Französisch",
        de: "Deutsch",
        ar: "Arabisch"
      },
      grammar: {
        title: "Grammatik & Wortverwendung",
        subtitle: "Lernen Sie, wie man Wörter richtig verwendet mit Beispielen, Definitionen und kulturellem Kontext.",
        tabs: {
          search: "Wort Suchen",
          tips: "Grammatik-Tipps"
        },
        searchLabel: "Geben Sie ein Wort oder eine Phrase ein",
        searchPlaceholder: "Geben Sie ein Wort zum Lernen ein...",
        searchBtn: "Analysieren",
        searching: "Suche...",
        analyzing: "Grammatik wird analysiert...",
        definition: "Definition",
        examples: "Beispiele",
        usage: "Verwendung",
        conjugation: "Konjugation",
        notes: "Grammatiknotizen",
        quickRef: "Schnellreferenz",
        errorMsg: "Dieses Wort konnte nicht analysiert werden. Versuchen Sie ein anderes.",
        connectionError: "Verbindungsfehler. Überprüfen Sie, ob das Backend läuft.",
        tips: {
          wordTypes: "Wortarten",
          wordTypesDesc: "Verstehen Sie Substantive, Verben, Adjektive und mehr, um bessere Sätze zu bilden.",
          conjugation: "Konjugation",
          conjugationDesc: "Lernen Sie, wie sich Verben mit Zeit, Person und Modus ändern.",
          usage: "Korrekte Verwendung",
          usageDesc: "Sehen Sie echte Beispiele, wie Wörter im Kontext verwendet werden.",
          context: "Kultureller Kontext",
          contextDesc: "Verstehen Sie kulturelle Nuancen und wann formale vs informelle Sprache zu verwenden ist."
        },
        ref: {
          noun: "Substantive",
          nounDesc: "Person, Ort, Sache oder Idee. Beispiel: Buch, Stadt, Glück",
          verb: "Verben",
          verbDesc: "Handlung oder Zustand. Beispiel: laufen, denken, sein",
          adjective: "Adjektive",
          adjectiveDesc: "Beschreibt Substantive. Beispiel: schön, schnell, blau",
          adverb: "Adverbien",
          adverbDesc: "Modifiziert Verben, Adjektive oder andere Adverbien. Beispiel: schnell, sehr, gut"
        }
      },
      // Features Page
      features: {
        pageTitle: "Mächtige Funktionen für",
        pageTitleHighlight: "Bessere Übersetzung",
        pageSubtitle: "Entdecken Sie alle Tools und Funktionen, die diesen Übersetzer einzigartig und leistungsstark machen.",
        smartTranslation: {
          title: "Intelligente Übersetzungsmaschine",
          description: "KI-gestützte Übersetzungen, die Kontext, Ton und kulturelle Nuancen verstehen.",
          highlight1: "Automatische Erkennung der Quellsprache",
          highlight2: "Natürliche, kontextuell genaue Übersetzungen",
          highlight3: "Unterstützung für 6+ Sprachen"
        },
        culturalContext: {
          title: "Analyse des kulturellen Kontexts",
          description: "Gehen Sie über Worte hinaus mit KI-generierten kulturellen Einblicken und Erklärungen.",
          highlight1: "Idiome und Ausdrücke erklärt",
          highlight2: "Tipps zur formellen und informellen Nutzung",
          highlight3: "Regionale Variationen hervorgehoben"
        },
        tts: {
          title: "Text-to-Speech",
          description: "Hören Sie sich die Aussprache in mehreren Sprachen mit nativen Stimmen an.",
          highlight1: "Unterstützung mehrsprachiger Stimmen",
          highlight2: "Hören Sie sowohl die Quelle als auch die Übersetzung",
          highlight3: "Perfekt zum Sprachenlernen"
        },
        aiChat: {
          title: "AI-Chat-Assistent",
          description: "Erhalten Sie sofortige Hilfe bei Grammatik-, Nutzungs- und Kulturfragen.",
          highlight1: "Interaktive Sprachhilfe",
          highlight2: "Kontextuelle Unterstützung",
          highlight3: "Verfügbar in allen Schnittstellensprachen"
        },
        grammar: {
          title: "Grammatik lernen",
          description: "Meistern Sie die Grammatikregeln mit interaktiven Beispielen und KI-gestützten Erklärungen.",
          highlight1: "Grammatik Tipps und Regeln",
          highlight2: "Beispiele aus der Praxis",
          highlight3: "Nach Schwierigkeitsgrad strukturiert"
        },
        multilingual: {
          title: "Mehrsprachige Benutzeroberfläche",
          description: "Verwenden Sie die App in Ihrer bevorzugten Sprache mit vollständiger UI-Übersetzung.",
          highlight1: "6+ Schnittstellensprachen",
          highlight2: "Automatische Erkennung der Browsersprache",
          highlight3: "Persistente Sprachpräferenz"
        },
        ctaTitle: "Bereit zum Übersetzen?",
        ctaSubtitle: "Testen Sie alle Funktionen kostenlos, ohne dass ein Konto erforderlich ist.",
        ctaButton: "Jetzt mit dem Übersetzen beginnen"
      },
      // About Page
      about: {
        pageTitle: "Über Unser",
        pageTitleHighlight: "Übersetzungsplattform",
        pageSubtitle: "Wir haben es uns zur Aufgabe gemacht, Sprachbarrieren mit intelligenter Übersetzung abzubauen, die Bedeutung, Kontext und kulturelle Nuancen bewahrt.",
        stats: {
          languages: "Sprachen",
          powered: "Powered",
          free: "Kostenlos",
          translations: "Übersetzungen"
        },
        mission: {
          title: "Unsere Mission",
          text1: "Übersetzung sollte nicht nur Worte von einer Sprache in eine andere umwandeln - sie sollte Bedeutung, Kontext und kulturelle Nuancen bewahren. Deshalb haben wir diese Plattform entwickelt.",
          text2: "Mit modernster KI-Technologie bieten wir Übersetzungen an, die Redewendungen, Slang, Formalitätsgrade und regionale Varianten verstehen. Egal, ob Sie mit Freunden chatten, eine neue Sprache lernen oder an beruflichen Dokumenten arbeiten, wir helfen Ihnen, natürlich und genau zu kommunizieren."
        },
        vision: {
          title: "Unsere Vision",
          text: "Wir envisionieren eine Welt, in der Sprache niemals eine Barriere für Kommunikation, Bildung oder Gelegenheit ist.",
          card1: {
            title: "Barrieren abbauen",
            description: "Kommunikation über Sprachen und Kulturen hinweg mühelos gestalten."
          },
          card2: {
            title: "Lernen ermöglichen",
            description: "Menschen helfen, Sprachen natürlich mit Kontext und Kultur zu lernen."
          },
          card3: {
            title: "Brücken bauen",
            description: "Menschen weltweit durch genaue, bedeutungsvolle Übersetzung verbinden."
          }
        },
        technology: {
          title: "Technologischer Stack",
          text: "Entwickelt mit modernen, zuverlässigen Technologien, um die beste Übersetzungserfahrung zu bieten."
        },
        team: {
          title: "Was dieses Projekt antreibt",
          ai: {
            role: "KI-Übersetzung",
            description: "OpenAI GPT-4o via GitHub Models für intelligente, kontextbewusste Übersetzungen."
          },
          design: {
            role: "Modernes Design",
            description: "Saubere, responsive Benutzeroberfläche mit sanften Animationen und Glassmorphism-Effekten."
          },
          dev: {
            role: "Full-Stack-Entwicklung",
            description: "React-Frontend mit Python Flask-Backend und SQLite-Datenbank."
          },
          community: {
            role: "Open Source",
            description: "Gemeinschaftsgetriebenes Entwickeln mit Beiträgen von allen willkommen."
          }
        },
        cta: {
          title: "Schließen Sie sich uns auf dieser Reise an",
          text: "Beginnen Sie noch heute mit der Nutzung unseres Übersetzers oder tragen Sie dazu bei, ihn noch besser zu machen.",
          button1: "Übersetzer ausprobieren",
          button2: "Auf GitHub ansehen"
        }
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        translate: "ترجم",
        grammar: "القواعد",
        features: "الميزات",
        about: "حول"
      },
      home: {
        title: "ما وراء الترجمة",
        titleHighlight: "الثقافي",
        titleEnd: "السياق",
        subtitle: "ترجم النصوص والعامية والتعبيرات مع ملاحظات ثقافية وأمثلة استخدام ونصائح نطق. مثالي للدردشة والعمل والدراسة—دون فقدان المعنى.",
        cta: "ابدأ الآن"
      },
      translate: {
        title: "الترجمة مع السياق الثقافي",
        subtitle: "اكتب النص، اختر اللغات، واحصل على الترجمة + الملاحظات الثقافية.",
        chips: {
          contextAware: "مدرك للسياق",
          idioms: "تعبيرات • عامية",
          pronunciation: "النطق"
        },
        from: "من",
        to: "إلى",
        placeholder: "اكتب نصك هنا...",
        detected: "تم الكشف",
        source: "المصدر",
        translateBtn: "ترجم",
        translating: "جاري الترجمة...",
        copy: "نسخ",
        clear: "مسح",
        swap: "تبديل اللغات",
        toastInput: "تم نسخ النص!",
        toastOutput: "تم نسخ الترجمة!",
        charLimit: "حرف",
        culturalNotes: "ملاحظات ثقافية",
        history: "الترجمات الأخيرة",
        emptyHistory: "لا توجد ترجمات بعد. ابدأ الترجمة!",
        backendOffline: "الخادم غير متصل",
        backendOfflineMsg: "قم بتشغيل خادم Flask للحصول على ترجمات ذكية بالذكاء الاصطناعي."
      },
      // Chat Widget
      chat: {
        title: "المساعد الثقافي",
        welcome: "👋 مرحباً! أنا مساعد الترجمة الخاص بك.",
        askAbout: "اسأل عن:",
        slang: "العامية والتعبيرات",
        cultural: "السياق الثقافي",
        pronunciation: "نصائح النطق",
        regional: "الاختلافات الإقليمية",
        placeholder: "اكتب سؤالك...",
        send: "إرسال",
        errorMsg: "عذراً، حدث خطأ. تحقق مما إذا كان الخادم يعمل.",
        connectionError: "تعذر الاتصال بالخادم. قم بتشغيل Flask backend أولاً!",
        online: "Online",
        close: "Fechar",
        suggestions: "Sugestões",
        suggestSlang: "Como uso expressões informais؟",
        suggestCultural: "Qual o contexto cultural؟",
        suggestPronunciation: "Como pronuncio isto؟"
      },
      languages: {
        auto: "كشف تلقائي",
        en: "الإنجليزية",
        pt: "البرتغالية",
        es: "الإسبانية",
        fr: "الفرنسية",
        de: "الألمانية",
        ar: "العربية"
      },
      grammar: {
        title: "القواعد واستخدام الكلمات",
        subtitle: "تعلم كيفية استخدام الكلمات بشكل صحيح مع الأمثلة والتعريفات والسياق الثقافي.",
        tabs: {
          search: "البحث عن كلمة",
          tips: "نصائح القواعد"
        },
        searchLabel: "أدخل كلمة أو عبارة",
        searchPlaceholder: "اكتب كلمة للتعلم...",
        searchBtn: "تحليل",
        searching: "جاري البحث...",
        analyzing: "جاري تحليل القواعد...",
        definition: "التعريف",
        examples: "الأمثلة",
        usage: "الاستخدام",
        conjugation: "التصريف",
        notes: "ملاحظات قواعدية",
        quickRef: "مرجع سريع",
        errorMsg: "تعذر تحليل هذه الكلمة. جرب كلمة أخرى.",
        connectionError: "خطأ في الاتصال. تحقق من تشغيل الخادم.",
        tips: {
          wordTypes: "أنواع الكلمات",
          wordTypesDesc: "افهم الأسماء والأفعال والصفات والمزيد لبناء جمل أفضل.",
          conjugation: "التصريف",
          conjugationDesc: "تعلم كيف تتغير الأفعال مع الزمن والشخص والحالة.",
          usage: "الاستخدام الصحيح",
          usageDesc: "شاهد أمثلة حقيقية لكيفية استخدام الكلمات في السياق.",
          context: "السياق الثقافي",
          contextDesc: "افهم الفروق الثقافية الدقيقة ومتى تستخدم اللغة الرسمية مقابل غير الرسمية."
        },
        ref: {
          noun: "الأسماء",
          nounDesc: "شخص أو مكان أو شيء أو فكرة. مثال: كتاب، مدينة، سعادة",
          verb: "الأفعال",
          verbDesc: "فعل أو حالة. مثال: يجري، يفكر، يكون",
          adjective: "الصفات",
          adjectiveDesc: "تصف الأسماء. مثال: جميل، سريع، أزرق",
          adverb: "الظروف",
          adverbDesc: "تعدل الأفعال أو الصفات أو ظروف أخرى. مثال: بسرعة، جداً، حسناً"
        }
      },
      // Features Page
      features: {
        pageTitle: "ميزات قوية من أجل",
        pageTitleHighlight: "ترجمة أفضل",
        pageSubtitle: "اكتشف جميع الأدوات والميزات التي تجعل من هذا المترجم فريداً وقوياً.",
        smartTranslation: {
          title: "محرك ترجمة ذكي",
          description: "ترجمات مدعومة بالذكاء الاصطناعي تفهم السياق والنغمة والفروق الثقافية.",
          highlight1: "الكشف التلقائي عن لغة المصدر",
          highlight2: "ترجمات طبيعية ودقيقة سياقياً",
          highlight3: "دعم لأكثر من 6 لغات"
        },
        culturalContext: {
          title: "تحليل السياق الثقافي",
          description: "اذهب إلى ما هو أبعد من الكلمات مع رؤى ثقافية وتفسيرات مولدة بالذكاء الاصطناعي.",
          highlight1: "تفسير التعابير والعبارات",
          highlight2: "نصائح للاستخدام الرسمي مقابل غير الرسمي",
          highlight3: "تسليط الضوء على الاختلافات الإقليمية"
        },
        tts: {
          title: "تحويل النص إلى كلام",
          description: "استمع إلى النطق بعدة لغات مع أصوات أصلية.",
          highlight1: "دعم صوتي متعدد اللغات",
          highlight2: "استمع إلى كل من المصدر والترجمة",
          highlight3: "مثالي لتعلم اللغات"
        },
        aiChat: {
          title: "مساعد دردشة ذكي",
          description: "احصل على مساعدة فورية بشأن القواعد والاستخدام والأسئلة الثقافية.",
          highlight1: "مساعدة لغوية تفاعلية",
          highlight2: "مساعدة سياقية",
          highlight3: "متاحة بجميع لغات الواجهة"
        },
        grammar: {
          title: "تعلم القواعد",
          description: "اتقن قواعد اللغة مع أمثلة تفاعلية وتفسيرات مدعومة بالذكاء الاصطناعي.",
          highlight1: "نصائح وقواعد القواعد",
          highlight2: "أمثلة من الاستخدام الواقعي",
          highlight3: "مهيكلة حسب الصعوبة"
        },
        multilingual: {
          title: "واجهة متعددة اللغات",
          description: "استخدم التطبيق بلغتك المفضلة مع ترجمة كاملة لواجهة المستخدم.",
          highlight1: "أكثر من 6 لغات واجهة",
          highlight2: "الكشف التلقائي عن لغة المتصفح",
          highlight3: "تفضيل اللغة المستمر"
        },
        ctaTitle: "هل أنت مستعد لبدء الترجمة؟",
        ctaSubtitle: "جرب جميع الميزات مجانًا دون الحاجة إلى حساب.",
        ctaButton: "ابدأ الترجمة الآن"
      },
      // About Page
      about: {
        pageTitle: "حول منصتنا للترجمة",
        pageTitleHighlight: "نحن في مهمة لكسر الحواجز اللغوية",
        pageSubtitle: "نحن في مهمة لكسر الحواجز اللغوية من خلال الترجمة الذكية التي تحافظ على المعنى والسياق والف��وق الثقافية.",
        stats: {
          languages: "اللغات",
          powered: "مدعوم",
          free: "مجاني",
          translations: "ترجمات"
        },
        mission: {
          title: "مهمتنا",
          text1: "يجب أن لا تقتصر الترجمة على تحويل الكلمات من لغة إلى أخرى - بل يجب أن تحافظ على المعنى والسياق والفروق الثقافية. لهذا السبب أنشأنا هذه المنصة.",
          text2: "باستخدام تكنولوجيا الذكاء الاصطناعي المتطورة، نقدم ترجمات تفهم التعابير والعبارات العامية ومستويات الرسمية والاختلافات الإقليمية. سواء كنت تتحدث مع الأصدقاء أو تدرس لغة جديدة أو تعمل على مستندات احترافية، نحن نساعدك على التواصل بشكل طبيعي ودقيق."
        },
        vision: {
          title: "رؤيتنا",
          text: "نت envision عالماً لا تكون فيه اللغة عائقاً أمام التواصل أو التعليم أو الفرص.",
          card1: {
            title: "كسر الحواجز",
            description: "اجعل التواصل سهلاً عبر اللغات والثقافات."
          },
          card2: {
            title: "تمكين التعلم",
            description: "ساعد الناس على تعلم اللغات بشكل طبيعي مع السياق والثقافة."
          },
          card3: {
            title: "بناء الجسور",
            description: "ربط الناس في جميع أنحاء العالم من خلال الترجمة الدقيقة والمعنوية."
          }
        },
        technology: {
          title: "التكنولوجيا المستخدمة",
          text: "مبني على تقنيات حديثة وموثوقة لتوفير أفضل تجربة ترجمة."
        },
        team: {
          title: "ما الذي يدعم هذا المشروع",
          ai: {
            role: "ترجمة الذكاء الاصطناعي",
            description: "OpenAI GPT-4o عبر نماذج GitHub لترجمات ذكية ومدركة للسياق."
          },
          design: {
            role: "تصميم حديث",
            description: "واجهة نظيفة ومتجاوبة مع رسوم متحركة سلسة وتأثيرات زجاجية."
          },
          dev: {
            role: "تطوير شامل",
            description: "واجهة React مع خلفية Python Flask وقاعدة بيانات SQLite."
          },
          community: {
            role: "مصدر مفتوح",
            description: "تطوير مدفوع من المجتمع مع الترحيب بالمساهمات من الجميع."
          }
        },
        cta: {
          title: "انضم إلينا في هذه الرحلة",
          text: "ابدأ باستخدام مترجمنا اليوم أو ساهم في جعله أفضل.",
          button1: "جرب المترجم",
          button2: "عرض على GitHub"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
