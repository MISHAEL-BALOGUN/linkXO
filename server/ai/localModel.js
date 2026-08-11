import db from '../config/database.js';

const intentPatterns = {
  greeting: {
    patterns: [
      /^(hi|hello|hey|good morning|good afternoon|good evening|hola|bonjour|salut|hallo|ciao|مرحبا|你好|こんにちは|안녕하세요)/i,
    ],
    responses: {
      en: [
        "Hello! I'm your AI support assistant. How can I help you today?",
        "Hi there! Welcome to LinkXO support. What can I assist you with?",
        "Hey! Great to see you. How may I help you today?",
      ],
      es: [
        "¡Hola! Soy tu asistente de soporte de IA. ¿Cómo puedo ayudarte hoy?",
        "¡Bienvenido! Estoy aquí para ayudarte con cualquier pregunta.",
        "¡Hola! ¿En qué puedo asistirte hoy?",
      ],
      fr: [
        "Bonjour! Je suis votre assistant de support IA. Comment puis-je vous aider?",
        "Bienvenue! Je suis là pour répondre à vos questions.",
        "Salut! Comment puis-je vous aider aujourd'hui?",
      ],
      de: [
        "Hallo! Ich bin Ihr KI-Support-Assistent. Wie kann ich Ihnen helfen?",
        "Willkommen! Wie kann ich Ihnen heute helfen?",
        "Guten Tag! Was kann ich für Sie tun?",
      ],
      zh: [
        "你好！我是您的AI支持助手。今天我能帮您什么？",
        "欢迎！请问有什么可以帮助您的？",
        "您好！我很乐意为您服务。",
      ],
      ar: [
        "مرحباً! أنا مساعد الدعم بالذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟",
        "أهلاً وسهلاً! أنا هنا لمساعدتك في أي سؤال.",
        "مرحباً! كيف يمكنني مساعدتك اليوم؟",
      ],
      ja: [
        "こんにちは！AIサポートアシスタントです。今日はどのようにお手伝いできますか？",
        "ようこそ！何かお手伝いできることがあればお聞かせください。",
      ],
      ko: [
        "안녕하세요! AI 지원 어시스턴트입니다. 오늘 무엇을 도와드릴까요?",
        "환영합니다! 무엇이든 도와드리겠습니다.",
      ],
      pt: [
        "Olá! Sou seu assistente de suporte por IA. Como posso ajudá-lo hoje?",
        "Bem-vindo! Estou aqui para ajudar com qualquer pergunta.",
      ],
      hi: [
        "नमस्ते! मैं आपका AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
        "स्वागत है! मैं आपकी सहायता के लिए यहाँ हूँ।",
      ],
    },
  },
  billing: {
    patterns: [
      /bill|payment|pay|refund|invoice|charge|subscription|credit card|debit/i,
    ],
    responses: {
      en: [
        "For billing inquiries, I can help you with:\n\n• Understanding your invoice\n• Updating payment methods\n• Requesting a refund\n• Subscription changes\n\nWhat specific billing question do you have?",
        "I'd be happy to help with billing. We accept credit cards, PayPal, and bank transfers. What's your specific issue?",
        "Our billing team is available 24/7. For immediate help, I can assist with:\n- Payment failures\n- Refund requests\n- Invoice downloads\n- Plan upgrades/downgrades",
      ],
      es: [
        "Para consultas de facturación, puedo ayudarte con:\n\n• Entender tu factura\n• Actualizar métodos de pago\n• Solicitar un reembolso\n• Cambios de suscripción\n\n¿Qué pregunta específica de facturación tienes?",
        "Con gusto te ayudo con facturación. Aceptamos tarjetas de crédito, PayPal y transferencias bancarias.",
      ],
      fr: [
        "Pour les questions de facturation, je peux vous aider avec:\n\n• Comprendre votre facture\n• Modifier vos méthodes de paiement\n• Demander un remboursement\n• Gérer votre abonnement\n\nQuelle est votre question spécifique?",
      ],
    },
  },
  shipping: {
    patterns: [
      /ship|deliver|track|order|package|parcel|courier|dispatch|物流|envío|livraison/i,
    ],
    responses: {
      en: [
        "For shipping questions:\n\n• **Track your order**: Use the tracking link sent to your email\n• **Standard shipping**: 5-7 business days\n• **Express shipping**: 2-3 business days\n• **International**: 7-14 business days\n\nDo you have a specific order you need help with?",
        "I can help you track your order! Please provide your order number and I'll check the status for you.",
        "Our shipping partners include FedEx, DHL, and local carriers. Delivery times may vary based on location.",
      ],
      es: [
        "Para preguntas sobre envíos:\n\n• Rastrea tu pedido usando el enlace enviado a tu correo\n• Envío estándar: 5-7 días hábiles\n• Envío express: 2-3 días hábiles\n\n¿Tienes un pedido específico con el que necesitas ayuda?",
      ],
      fr: [
        "Pour les questions de livraison:\n\n• Suivez votre commande via le lien envoyé par email\n• Livraison standard: 5-7 jours ouvrables\n• Livraison express: 2-3 jours ouvrables\n\nAvez-vous une commande spécifique?",
      ],
    },
  },
  account: {
    patterns: [
      /account|password|login|sign in|register|profile|email|username|forgot|reset|compte|contraseña|mot de passe/i,
    ],
    responses: {
      en: [
        "For account-related issues:\n\n• **Password reset**: Click 'Forgot Password' on the login page\n• **Profile updates**: Go to Settings > Profile\n• **Email change**: Contact support with identity verification\n• **Account deletion**: Email privacy@linkxo.com\n\nWhat account issue are you experiencing?",
        "I can help with your account. Common issues include:\n- Locked accounts\n- Password resets\n- Profile updates\n- Email changes\n\nWhich one applies to you?",
      ],
      es: [
        "Para problemas con la cuenta:\n\n• Restablecer contraseña: Haz clic en 'Olvidé mi contraseña'\n• Actualizar perfil: Ve a Configuración > Perfil\n• Cambio de email: Contacta soporte con verificación de identidad\n\n¿Qué problema de cuenta tienes?",
      ],
    },
  },
  technical: {
    patterns: [
      /bug|error|crash|technical|issue|problem|not working|broken|api|integration|debug/i,
    ],
    responses: {
      en: [
        "For technical support, try these steps first:\n\n1. Clear your browser cache and cookies\n2. Try a different browser or incognito mode\n3. Check your internet connection\n4. Disable browser extensions\n5. Restart the application\n\nIf the issue persists, please describe the error message and I'll help troubleshoot.",
        "I'm sorry you're experiencing technical issues. Can you tell me:\n- What device/browser are you using?\n- What's the exact error message?\n- When did the issue start?\n\nThis will help me resolve it faster.",
      ],
      es: [
        "Para soporte técnico, intenta estos pasos primero:\n\n1. Borra la caché y cookies del navegador\n2. Intenta con otro navegador o modo incógnito\n3. Verifica tu conexión a internet\n4. Desactiva las extensiones del navegador\n\nSi el problema persiste, descríbelo y te ayudaré.",
      ],
    },
  },
  thanks: {
    patterns: [
      /thank|thanks|thx|appreciate|gracias|merci|danke|ありがとう|감사|obrigado|शुक्रिया/i,
    ],
    responses: {
      en: [
        "You're welcome! I'm glad I could help. Is there anything else you need assistance with?",
        "Happy to help! Don't hesitate to reach out if you have more questions.",
        "My pleasure! Let me know if there's anything else I can do for you.",
      ],
      es: [
        "¡De nada! Me alegra haber podido ayudar. ¿Hay algo más en lo que pueda asistirte?",
        "¡Con gusto! No dudes en contactarnos si tienes más preguntas.",
      ],
      fr: [
        "De rien! Je suis content de pouvoir aider. Avez-vous d'autres questions?",
        "Avec plaisir! N'hésitez pas à nous contacter pour d'autres questions.",
      ],
    },
  },
  goodbye: {
    patterns: [
      /bye|goodbye|see you|later|adiós|au revoir|auf wiedersehen|さようなら|안녕|adeus|अलविदा/i,
    ],
    responses: {
      en: [
        "Goodbye! Thank you for contacting LinkXO support. Have a great day!",
        "See you later! Feel free to reach out anytime you need help.",
        "Take care! We're here 24/7 if you need us again.",
      ],
      es: [
        "¡Adiós! Gracias por contactar a LinkXO. ¡Que tengas un gran día!",
        "¡Hasta luego! No dudes en escribirnos cuando necesites ayuda.",
      ],
      fr: [
        "Au revoir! Merci d'avoir contacté LinkXO. Bonne journée!",
        "À bientôt! N'hésitez pas à nous contacter à tout moment.",
      ],
    },
  },
};

const fallbackResponses = {
  en: [
    "I understand you need help. Could you provide more details about your issue so I can assist you better?",
    "Let me help you with that. Can you tell me more about what you're experiencing? You can ask about:\n\n• Billing & Payments\n• Shipping & Delivery\n• Account Settings\n• Technical Issues",
    "I'm here to help! Please describe the issue you're facing. You can also ask about billing, shipping, account, or technical support.",
    "Could you please provide more details? I can help with:\n- Billing questions\n- Shipping inquiries\n- Account issues\n- Technical problems\n\nWhat would you like to know?",
  ],
  es: [
    "Entiendo que necesitas ayuda. ¿Podrías提供更多 detalles sobre tu problema?",
    "Estoy aquí para ayudarte! Puedes preguntar sobre:\n\n• Facturación y pagos\n• Envíos y entregas\n• Configuración de cuenta\n• Problemas técnicos",
  ],
  fr: [
    "Je comprends que vous avez besoin d'aide. Pourriez-vous fournir plus de détails sur votre problème?",
    "Je suis là pour vous aider! Vous pouvez demander:\n\n• Facturation et paiements\n• Expédition et livraison\n• Paramètres du compte\n• Problèmes techniques",
  ],
};

export function detectLanguage(text) {
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';
  if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
  if (/[àâçéèêëîïôùûüÿœæ]/i.test(text)) return 'fr';
  if (/[äöüß]/i.test(text)) return 'de';
  if (/[áéíóúñ¡¿]/i.test(text)) return 'es';
  if (/[àãõ]/i.test(text)) return 'pt';
  if (/[-devanagari]/i.test(text)) return 'hi';
  return 'en';
}

export function processMessage(userMessage, conversationLanguage = 'en') {
  const startTime = Date.now();
  const language = detectLanguage(userMessage);
  const lang = conversationLanguage || language;

  let matchedIntent = 'fallback';
  let confidence = 0.5;

  for (const [intent, config] of Object.entries(intentPatterns)) {
    for (const pattern of config.patterns) {
      if (pattern.test(userMessage)) {
        matchedIntent = intent;
        confidence = 0.85 + Math.random() * 0.15;
        break;
      }
    }
    if (matchedIntent !== 'fallback') break;
  }

  const intentConfig = intentPatterns[matchedIntent];
  let responses;

  if (intentConfig) {
    responses = intentConfig.responses[lang] || intentConfig.responses['en'];
  } else {
    responses = fallbackResponses[lang] || fallbackResponses['en'];
  }

  const response = responses[Math.floor(Math.random() * responses.length)];
  const responseTime = Date.now() - startTime;

  return {
    response,
    intent: matchedIntent,
    confidence: Math.round(confidence * 100) / 100,
    language: lang,
    responseTime,
  };
}

export function getConversationSuggestions(conversationId) {
  const messages = db.prepare(`
    SELECT text, sender FROM messages
    WHERE conversationId = ?
    ORDER BY createdAt DESC
    LIMIT 5
  `).all(conversationId);

  if (messages.length === 0) {
    return {
      suggestions: ['Track my order', 'Billing help', 'Account support', 'Technical issue'],
      sentiment: 'neutral',
    };
  }

  const lastMessage = messages[0];
  const suggestions = [];
  const sentiment = 'neutral';

  if (lastMessage.text.match(/thank|thanks|gracias|merci/i)) {
    suggestions.push('Is there anything else?', 'Rate this conversation', 'Close chat');
  } else if (lastMessage.text.match(/bill|payment|refund/i)) {
    suggestions.push('View invoice', 'Update payment method', 'Request refund', 'Escalate to agent');
  } else if (lastMessage.text.match(/ship|deliver|track|order/i)) {
    suggestions.push('Track package', 'Report missing item', 'Change delivery address', 'Escalate to agent');
  } else {
    suggestions.push('Track my order', 'Billing help', 'Account support', 'Technical issue');
  }

  return { suggestions, sentiment };
}
