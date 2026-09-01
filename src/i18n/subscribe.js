// Newsletter copy for the /newsletter/ page, selected via the ?lang= URL param.
// Extracted verbatim from the original pages/subscribe.html inline script.
export const translations = {
  en: {
    heading:       'Insight you can trust!',
    subheading:    'Subscribe to receive practical perspectives on ethical AI, data governance, and trustworthy digital leadership.',
    card_title:    'Stay informed. Stay ahead.',
    card_sub:      'AI governance insights, policy analysis, and leadership perspectives, delivered to executives, practitioners, and engaged readers.',
    label:         'Email address',
    placeholder:   'Enter your email',
    btn:           'Subscribe',
    loading:       'Subscribing…',
    success:       '✓  Successfully subscribed!',
    fail:          'Subscription failed. Please try again.',
    network_error: 'Could not reach the server. Please try again.',
    disclaimer:    'Your information is used only to send this dispatch and is never shared. Unsubscribe at any time.',
    pillar_1:      'Ethical AI governance frameworks for senior leaders',
    pillar_2:      'Data strategy grounded in real executive experience',
    pillar_3:      'Book updates, speaking events, and new publications',
    pillar_4:      'No noise, delivered only when there is something worth saying',
  },
  fr: {
    heading:       'Des informations de confiance !',
    subheading:    "Abonnez-vous pour recevoir des perspectives pratiques sur l'IA éthique, la gouvernance des données et le leadership numérique.",
    card_title:    "Restez informé. Gardez une longueur d'avance.",
    card_sub:      "Analyses en gouvernance de l'IA, politiques publiques et leadership — transmises aux cadres, praticiens et lecteurs engagés.",
    label:         'Adresse courriel',
    placeholder:   'Entrez votre courriel',
    btn:           "S'abonner",
    loading:       'Abonnement en cours…',
    success:       '✓  Abonnement réussi !',
    fail:          "L'abonnement a échoué. Veuillez réessayer.",
    network_error: "Impossible de joindre le serveur. Veuillez réessayer.",
    disclaimer:    "Vos informations ne sont utilisées qu'à des fins d'envoi et ne sont jamais partagées. Désabonnez-vous en tout temps.",
    pillar_1:      "Cadres de gouvernance IA pour les leaders exécutifs",
    pillar_2:      "Stratégie de données fondée sur une expérience réelle",
    pillar_3:      "Mises à jour des livres, événements et nouvelles publications",
    pillar_4:      "Sans bruit — envoyé uniquement quand cela en vaut la peine",
  },
  es: {
    heading:       '¡Información en la que puedes confiar!',
    subheading:    "Suscríbete para recibir perspectivas prácticas sobre IA ética, gobernanza de datos y liderazgo digital confiable.",
    card_title:    "Mantente informado. Ve un paso adelante.",
    card_sub:      "Perspectivas sobre gobernanza de IA, análisis de políticas y liderazgo — para ejecutivos, profesionales y lectores comprometidos.",
    label:         'Correo electrónico',
    placeholder:   'Ingresa tu correo',
    btn:           'Suscribirse',
    loading:       'Suscribiendo…',
    success:       '✓  ¡Suscripción exitosa!',
    fail:          'Suscripción fallida. Por favor, inténtalo de nuevo.',
    network_error: 'No se pudo conectar al servidor. Por favor, inténtalo de nuevo.',
    disclaimer:    "Tu información sólo se usa para enviar este boletín y nunca se comparte. Cancela en cualquier momento.",
    pillar_1:      "Marcos de gobernanza ética de IA para líderes",
    pillar_2:      "Estrategia de datos basada en experiencia ejecutiva real",
    pillar_3:      'Actualizaciones de libros, eventos y nuevas publicaciones',
    pillar_4:      'Sin ruido — entregado solo cuando hay algo que vale la pena',
  },
  pt: {
    heading:       'Informações em que você pode confiar!',
    subheading:    'Inscreva-se para receber perspectivas práticas sobre IA ética, governança de dados e liderança digital confiável.',
    card_title:    'Mantenha-se informado. Fique à frente.',
    card_sub:      'Perspectivas sobre governança de IA, análise de políticas e liderança — para executivos, profissionais e leitores engajados.',
    label:         'Endereço de e-mail',
    placeholder:   'Digite seu e-mail',
    btn:           'Inscrever-se',
    loading:       'Inscrevendo…',
    success:       '✓  Inscrição realizada com sucesso!',
    fail:          'Falha na inscrição. Por favor, tente novamente.',
    network_error: 'Não foi possível contactar o servidor. Por favor, tente novamente.',
    disclaimer:    'Suas informações são usadas apenas para o envio e nunca compartilhadas. Cancele a qualquer momento.',
    pillar_1:      'Estruturas de governança ética de IA para líderes',
    pillar_2:      'Estratégia de dados baseada em experiência executiva real',
    pillar_3:      'Atualizações de livros, eventos e novas publicações',
    pillar_4:      'Sem ruído — enviado apenas quando há algo que vale a pena',
  }
};

export const DEFAULT_LANG = 'en';

/** Resolve a language code against the available translations. */
export function resolveLang(code) {
  return code && translations[code] ? code : DEFAULT_LANG;
}
