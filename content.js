window.PORTFOLIO_DATA = {
  cases: [
    {
      id: 'bcp-api-governance',
      category: 'api',
      company: 'TCS Perú · BCP',
      title: 'Gobierno de APIs bancarias',
      period: 'Noviembre 2024 — Actualidad',
      summary: 'Arquitectura y gobierno de integraciones bancarias: APIs, eventos y servicios alineados con la estrategia de nube, seguridad y operación.',
      challenge: 'Definir un modelo consistente para integrar sistemas bancarios mediante APIs, microservicios, eventos y procesos batch, con estándares compartidos de seguridad, versionado, resiliencia y observabilidad.',
      contribution: [
        'Definición de principios, estándares, políticas y procesos para el ciclo de vida de APIs, eventos y servicios.',
        'Gobierno de Apigee y Azure API Management con políticas de seguridad, control de consumo y analítica.',
        'Acompañamiento técnico a squads en patrones de integración, observabilidad y adopción de prácticas DevSecOps.'
      ],
      technologies: ['Apigee', 'Azure API Management', 'OAuth2 / mTLS', 'Dynatrace', 'ELK', 'API First / API Led']
    },
    {
      id: 'mambu-event-architecture',
      category: 'cloud',
      company: 'OM Technology Group',
      title: 'Arquitectura financiera sobre Mambu',
      period: 'Febrero 2024 — Febrero 2025',
      summary: 'Soluciones financieras sobre core Mambu, con dominios de pagos, onboarding y cuentas conectados mediante microservicios, APIs y eventos.',
      challenge: 'Diseñar integraciones síncronas y asíncronas para soluciones financieras sobre Mambu, considerando resiliencia, consistencia transaccional y alta disponibilidad en una arquitectura serverless y distribuida.',
      contribution: [
        'Definición de Bounded Contexts para pagos, onboarding y cuentas mediante Domain-Driven Design.',
        'Implementación de microservicios Java con Spring Boot y arquitectura hexagonal, aplicando patrones de resiliencia.',
        'Diseño de eventos, contratos de integración y versionamiento de APIs, con Kafka, SQS y SNS.'
      ],
      technologies: ['Mambu', 'AWS', 'Java / Spring Boot', 'Kafka', 'SQS / SNS', 'Terraform']
    },
    {
      id: 'rimac-architecture-leadership',
      category: 'leadership',
      company: 'RIMAC Seguros y Reaseguros',
      title: 'Arquitectura y liderazgo técnico',
      period: 'Julio 2023 — Enero 2024',
      summary: 'Gobierno arquitectónico de múltiples squads, con aproximadamente 30 ingenieros, y diseño de servicios desacoplados para sistemas críticos y canales digitales.',
      challenge: 'Coordinar decisiones de arquitectura entre múltiples squads y definir contratos de integración entre sistemas críticos, con resiliencia, trazabilidad y tolerancia a fallos en un entorno regulado.',
      contribution: [
        'Definición de estándares técnicos y revisión de diseños de arquitectura mediante ARB para múltiples squads.',
        'Diseño de microservicios y arquitectura orientada a eventos, con DDD y buses de integración JBoss Fuse.',
        'Implementación del patrón BFF para desacoplar canales digitales y trazabilidad distribuida con Dynatrace.'
      ],
      technologies: ['DDD', 'JBoss Fuse', 'BFF', 'TOGAF', 'Modelo C4', 'Dynatrace']
    },
    {
      id: 'laureate-hybrid-cloud',
      category: 'cloud',
      company: 'Laureate Perú',
      title: 'Integración educativa en cloud',
      period: 'Enero 2022 — Junio 2023',
      summary: 'Arquitectura cloud híbrida AWS y Azure para integrar plataformas educativas mediante APIs, microservicios desacoplados y eventos, con seguridad por diseño.',
      challenge: 'Integrar plataformas educativas en una arquitectura híbrida AWS y Azure, con servicios desacoplados, seguridad por diseño y prácticas de resiliencia para sistemas distribuidos.',
      contribution: [
        'Diseño de arquitectura cloud híbrida y soluciones orientadas a dominio para la integración de plataformas educativas.',
        'Implementación de microservicios y arquitectura orientada a eventos, con APIs RESTful de alto volumen.',
        'Definición de estándares técnicos, revisión de código bajo SOLID y seguridad por diseño con lineamientos OWASP.'
      ],
      technologies: ['AWS', 'Azure', 'DDD', 'APIs RESTful', 'OWASP', 'SOLID']
    }
  ],
  experience: [
    {
      company: 'TCS Perú · Cliente: BCP',
      role: 'Arquitecto Tecnológico / Gobierno de APIs',
      period: 'Noviembre 2024 — Actualidad',
      description: 'Definición de arquitecturas y gobierno de integración bancaria. Estándares para APIs y eventos, administración de API Management y acompañamiento técnico a squads.'
    },
    {
      company: 'OM Technology Group',
      role: 'Arquitecto de Software / Especialista AWS Sr',
      period: 'Febrero 2024 — Febrero 2025',
      description: 'Arquitectura financiera sobre Mambu: dominios de pagos, onboarding y cuentas, microservicios Java, integración por eventos y soluciones serverless con patrones de resiliencia.'
    },
    {
      company: 'RIMAC Seguros y Reaseguros',
      role: 'Arquitecto de Solución Sr · Líder Técnico',
      period: 'Julio 2023 — Enero 2024',
      description: 'Gobierno arquitectónico de múltiples squads, aproximadamente 30 ingenieros. Diseño de microservicios, contratos de integración y BFF para canales digitales, con observabilidad y resiliencia.'
    },
    {
      company: 'Laureate Perú',
      role: 'Arquitecto de Solución Sr',
      period: 'Enero 2022 — Junio 2023',
      description: 'Diseño de arquitectura híbrida AWS y Azure para plataformas educativas. Integración mediante APIs y eventos, seguridad por diseño y estándares técnicos basados en SOLID.'
    },
    {
      company: 'Softnet / Mibanco',
      role: 'Arquitecto de Solución Sr',
      period: 'Mayo 2021 — Diciembre 2021',
      description: 'Arquitectura Azure para monitoreo empresarial bancario. Diseño de microservicios e integraciones con sistemas core, aplicación de DDD, controles OAuth2.0 y RBAC, resiliencia y trazabilidad.'
    },
    {
      company: 'Indra',
      role: 'Líder Técnico',
      period: 'Febrero 2020 — Abril 2021',
      description: 'Arquitectura y desarrollo de soluciones móviles conectadas con plataformas empresariales. Microservicios, APIs, automatización cloud, CI/CD y controles de seguridad bajo estándares OWASP.'
    },
    {
      company: 'Experis · Proyecto API Pagos (RIMAC)',
      role: 'Full Stack Developer',
      period: 'Enero 2019 — Enero 2020',
      description: 'Implementación de API de pagos para cobros recurrentes, pagos en línea y suscripciones. Backend NodeJS y AWS, integración transaccional y servicios desacoplados.'
    }
  ],
  credentials: [
    {
      title: 'Solutions Consultant I Accreditation',
      issuer: 'Mambu',
      year: '2024',
      type: 'Acreditación',
      description: 'Acreditación de consultoría de soluciones de Mambu.'
    },
    {
      title: 'Integration Consultant Accreditation',
      issuer: 'Mambu',
      year: '2024',
      type: 'Acreditación',
      description: 'Acreditación de consultoría de integración de Mambu.'
    },
    {
      title: 'AWS Educate',
      issuer: 'Amazon Web Services',
      year: '2025',
      type: 'Formación',
      description: 'Introduction to Cloud 101 · Getting Started with Compute · Getting Started with Storage · Introduction to Generative AI.'
    },
    {
      title: 'Scrum Fundamentals Certified (SFC)',
      issuer: 'SCRUMstudy',
      year: '2020',
      type: 'Certificación',
      description: 'Certificación en fundamentos de Scrum.'
    },
    {
      title: 'Six Sigma Yellow Belt',
      issuer: '6sigmastudy',
      year: '2024',
      type: 'Certificación',
      description: 'Six Sigma Yellow Belt.'
    },
    {
      title: 'EF SET English Certificate',
      issuer: 'EF SET',
      year: '2025',
      type: 'Certificado de idioma',
      description: 'Inglés B2 Upper Intermediate. Resultado: 56/100.'
    }
  ]
};
