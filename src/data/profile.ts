export interface Experience {
  id: string;
  role: string;
  company: string;
  client?: string;
  period: string;
  startDate: string;
  endDate: string;
  location: string;
  domain: "Banca & Finanzas" | "Seguros" | "Educación" | "Consultoría";
  specialties: ("API Governance" | "Event-Driven" | "Cloud-Native" | "Core Banking" | "Liderazgo" | "Enterprise Architecture")[];
  technologies: string[];
  summary: string;
  bulletPoints: {
    action: string;
    scope: string;
    impact: string;
    skills: string[];
  }[];
  architectureDecisions?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  status: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  category: "Certificación" | "Acreditación" | "Curso";
}

export interface CandidateProfile {
  name: string;
  fullName: string;
  preferredName: string;
  title: string;
  location: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
  };
  avatarUrl: string;
  verifiedSummary: string;
  coreCompetencies: {
    category: string;
    skills: string[];
  }[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: { language: string; level: string; score?: string }[];
}

export const PROFILE_DATA: CandidateProfile = {
  name: "Alexis Alfaro Salazar",
  fullName: "Jaime Ivan Alexis Alfaro Salazar",
  preferredName: "Alexis",
  title: "Arquitecto de Soluciones Sr / Gobierno de APIs & Integración",
  location: "Lima, Perú",
  contact: {
    email: "jaimealfarosalazar@gmail.com",
    phone: "+51 974 221 535",
    linkedin: "https://www.linkedin.com/in/jaime-ivan-alexis-a-2361a1130",
    github: "https://github.com/jialfaro",
    location: "Lima, Perú"
  },
  avatarUrl: "/alexis-avatar.png",
  verifiedSummary:
    "Arquitecto de Soluciones Sr con más de 7 años de experiencia liderando la definición e implementación de arquitecturas de integración empresarial en el sector financiero y bancario. Especialista en diseño de APIs, microservicios, arquitecturas orientadas a eventos (EDA), gobierno de integraciones y plataformas cloud-native (Azure/AWS/GCP). Expertise comprobado en Domain-Driven Design (DDD), patrones de resiliencia (Circuit Breaker, Retry, Bulkhead), seguridad bancaria de APIs (OAuth2/OIDC, mTLS, JWT) y modelos de gobierno API First / API Led. Experiencia en entornos híbridos y multicloud, con marco BIAN v13 para modelado formal de capacidades bancarias. Liderazgo técnico demostrado en acompañamiento de squads de ingeniería (~30 ingenieros) y alineamiento con arquitectura empresarial (TOGAF, C4 Model, ArchiMate), seguridad y cumplimiento regulatorio.",
  coreCompetencies: [
    {
      category: "Gobierno de Integración & Frameworks",
      skills: ["BIAN v13 (Capacidades Bancarias)", "API Governance", "API First / API Led", "TOGAF", "ArchiMate", "Modelo C4", "DDD (Bounded Contexts)"]
    },
    {
      category: "APIs, Servicios & Gestión",
      skills: ["Apigee", "Azure API Management (APIM)", "RESTful APIs", "GraphQL", "OpenAPI / Swagger", "iPaaS", "BFF Pattern"]
    },
    {
      category: "Mensajería, Eventos & Resiliencia",
      skills: ["Apache Kafka", "AWS SQS/SNS", "RabbitMQ", "Event-Driven Architecture (EDA)", "Circuit Breaker", "Bulkhead", "Retry/Timeout", "CQRS / Event Sourcing"]
    },
    {
      category: "Cloud, DevOps & Infraestructura",
      skills: ["AWS", "Azure", "GCP", "Terraform", "Docker", "Kubernetes", "CI/CD (GitLab CI, Azure DevOps, Jenkins)", "Cloud-Native 12-Factor"]
    },
    {
      category: "Seguridad & Zero-Trust",
      skills: ["OAuth2 / OIDC", "mTLS (Mutual TLS)", "JWT", "API Keys", "RBAC / IAM", "OWASP", "Zero Trust", "DevSecOps"]
    },
    {
      category: "Observabilidad, APM & SRE",
      skills: ["Dynatrace", "ELK Stack", "OpenTelemetry", "Prometheus", "Grafana", "AWS CloudWatch", "SLO / SLA Monitoring"]
    },
    {
      category: "Desarrollo, Backend & Core",
      skills: ["Java (Spring Boot / Hexagonal)", "Kotlin", "Node.js", "Python", "Swift", "Core Banking (Mambu)", "Microservicios"]
    },
    {
      category: "Bases de Datos",
      skills: ["PostgreSQL", "Oracle", "SQL Server", "MySQL", "DynamoDB", "Redis", "Cosmos DB"]
    },
    {
      category: "IA Aplicada a Ingeniería",
      skills: ["Azure OpenAI", "AWS Bedrock / SageMaker", "Agentic AI", "Análisis Predictivo de Logs & Troubleshooting"]
    }
  ],
  experiences: [
    {
      id: "tcs-bcp",
      role: "Arquitecto de Soluciones / Arquitecto Tecnológico / Gobierno de APIs",
      company: "TCS Perú",
      client: "BCP (Banco de Crédito del Perú)",
      period: "Septiembre 2024 – Actualidad",
      startDate: "2024-09",
      endDate: "Actualidad",
      location: "Lima, Perú (Híbrido)",
      domain: "Banca & Finanzas",
      specialties: ["API Governance", "Event-Driven", "Cloud-Native", "Enterprise Architecture"],
      technologies: ["BIAN v13", "Apigee", "Azure APIM", "Apache Kafka", "OAuth2/OIDC", "mTLS", "JWT", "Dynatrace", "ELK", "OpenAPI"],
      summary: "Gobierno transversal del modelo de integración, ciclo de vida de APIs y eventos financieros para el banco líder de Perú.",
      bulletPoints: [
        {
          action: "Apliqué el marco BIAN v13",
          scope: "para el diseño, modelado de capacidades de negocio y mapeo de contratos de integración",
          impact: "facilitando la interoperabilidad estandarizada entre el core bancario y los sistemas satélite",
          skills: ["BIAN v13", "Estandarización Bancaria", "OpenAPI"]
        },
        {
          action: "Definí e implementé el modelo de Gobierno de Integración corporativo",
          scope: "estableciendo principios, políticas, modelos de gobierno API First / API Led y ciclo de vida de APIs y eventos (design, build, publish, retire)",
          impact: "asegurando consistencia, reusabilidad de servicios y cumplimiento con la estrategia de nube del banco",
          skills: ["API Governance", "API First / Led", "Ciclo de Vida"]
        },
        {
          action: "Goberné y administré plataformas API Management (Apigee y Azure APIM)",
          scope: "configurando políticas de seguridad bancaria, throttling, monetización, analytics y acceso basado en scopes",
          impact: "protegiendo los activos digitales mediante esquemas OAuth2, JWT federados, mTLS y API Keys",
          skills: ["Apigee", "Azure APIM", "OAuth2", "mTLS", "Seguridad"]
        },
        {
          action: "Diseñé arquitecturas de integración de alta complejidad",
          scope: "en modalidades síncronas, asíncronas, tiempo real, eventos (Kafka) y procesamiento batch/MFT",
          impact: "acompañando técnicamente a squads de desarrollo en la adopción de patrones de resiliencia y prácticas DevSecOps",
          skills: ["Kafka", "EDA", "DevSecOps", "Microservicios"]
        },
        {
          action: "Implanté observabilidad y monitoreo avanzado de APIs",
          scope: "con Dynatrace, ELK Stack y dashboards de negocio para tracking de latencia, errores y volumen de consumo",
          impact: "garantizando visibilidad de transacciones críticas y cumplimiento estricto de SLAs",
          skills: ["Dynatrace", "ELK", "Observabilidad", "SRE"]
        }
      ],
      architectureDecisions: [
        "Adopción de BIAN v13 Service Domains para estandarización de contratos de banca abierta",
        "Implementación de arquitectura Zero-Trust con validación mTLS obligatoria en gateways perimetrales",
        "Estrategia de desacoplamiento de canales mediante eventos de dominio en Apache Kafka"
      ]
    },
    {
      id: "om-tech",
      role: "Arquitecto de Soluciones / Arquitecto de Software / Especialista AWS Sr",
      company: "OM Technology Group",
      period: "Febrero 2024 – Agosto 2024",
      startDate: "2024-02",
      endDate: "2024-08",
      location: "Lima, Perú",
      domain: "Banca & Finanzas",
      specialties: ["Core Banking", "Cloud-Native", "Event-Driven"],
      technologies: ["Mambu", "AWS", "Java 17", "Spring Boot", "Apache Kafka", "AWS SQS/SNS", "Terraform", "Docker", "DDD", "BIAN v13"],
      summary: "Diseño y gobierno de arquitectura de integración desacoplada para soluciones financieras sobre Core Banking SaaS Mambu y AWS.",
      bulletPoints: [
        {
          action: "Diseñé la arquitectura orientada a dominio (DDD) y microservicios hexagonales",
          scope: "empleando Java 17 y Spring Boot, definiendo Bounded Contexts para pagos, onboarding de clientes y cuentas",
          impact: "incorporando patrones de resiliencia (Circuit Breaker, Retry, Timeout, Bulkhead) para alta tolerancia a fallos",
          skills: ["Java 17", "Spring Boot", "DDD", "Arquitectura Hexagonal", "Resiliencia"]
        },
        {
          action: "Diseñé la arquitectura Event-Driven distribuida",
          scope: "utilizando Apache Kafka (pub/sub), AWS SQS y SNS para procesamiento transaccional de alto volumen",
          impact: "garantizando consistencia eventual, cero pérdida de eventos bancarios y desacoplamiento con el core Mambu",
          skills: ["Mambu", "Kafka", "AWS SQS/SNS", "EDA"]
        },
        {
          action: "Alineé servicios bajo marco BIAN v13 y contratos OpenAPI",
          scope: "definiendo el modelo de eventos, versionamiento de APIs RESTful y gobierno a través de Apigee y Azure APIM",
          impact: "homologando contratos de integración y simplificando la conexión con sistemas satélite",
          skills: ["BIAN v13", "OpenAPI", "Apigee", "Azure APIM"]
        },
        {
          action: "Automatizó infraestructura como código (IaC) e incorporó IA",
          scope: "mediante Terraform y Docker en AWS, utilizando IA para análisis predictivo de logs y troubleshooting automatizado",
          impact: "optimizando la detección proactiva de incidencias y reduciendo el tiempo de despliegue de ambientes",
          skills: ["Terraform", "Docker", "AWS", "IA Generativa"]
        }
      ],
      architectureDecisions: [
        "Patrón Transactional Outbox para garantizar consistencia eventual sin bloqueo transaccional hacia Mambu",
        "Aislamiento riguroso de Bounded Contexts en Spring Boot para permitir escalado independiente de módulos de pago"
      ]
    },
    {
      id: "rimac-seguros",
      role: "Arquitecto de Soluciones Sr – Líder Técnico",
      company: "Rímac Seguros y Reaseguros",
      period: "Julio 2023 – Enero 2024",
      startDate: "2023-07",
      endDate: "2024-01",
      location: "Lima, Perú",
      domain: "Seguros",
      specialties: ["Liderazgo", "API Governance", "Cloud-Native", "Enterprise Architecture"],
      technologies: ["BFF Pattern", "JBoss Fuse", "C4 Model", "TOGAF", "ArchiMate", "AWS", "Microservicios", "Dynatrace"],
      summary: "Gobierno arquitectónico de múltiples squads (~30 ingenieros) y diseño de capa BFF para canales de aseguramiento.",
      bulletPoints: [
        {
          action: "Ejercí el gobierno arquitectónico y liderazgo técnico de squads",
          scope: "coordinando a ~30 ingenieros, estableciendo estándares técnicos y liderando comités de revisión arquitectónica (ARB)",
          impact: "asegurando calidad técnica, cumplimiento de lineamientos de seguridad y reducción de deuda técnica en entregables",
          skills: ["Liderazgo Técnico", "ARB", "Gobierno de Squads", "Code Review"]
        },
        {
          action: "Diseñé arquitecturas desacopladas y de alta concurrencia basadas en DDD",
          scope: "estableciendo Bounded Contexts y contratos de integración para sistemas críticos de cotización y emisión de pólizas",
          impact: "optimizando el desacoplamiento entre canales digitales y buses de integración empresarial (JBoss Fuse)",
          skills: ["DDD", "JBoss Fuse", "Integración Empresarial"]
        },
        {
          action: "Implementé el patrón Backend-For-Frontend (BFF)",
          scope: "para optimizar el consumo de servicios por canales web y móviles de asegurados",
          impact: "minimizando la latencia y la sobrecarga de payloads en conexiones móviles",
          skills: ["BFF Pattern", "Optimización de APIs", "Mobile Experience"]
        },
        {
          action: "Modelé arquitecturas empresariales formales",
          scope: "empleando TOGAF, ArchiMate y Modelo C4 (Contexto, Contenedor, Componente)",
          impact: "unificando la comprensión técnica entre stakeholders de negocio, seguridad y equipos de desarrollo",
          skills: ["TOGAF", "ArchiMate", "C4 Model"]
        },
        {
          action: "Implementé monitoreo y trazabilidad distribuida con IA",
          scope: "mediante Dynatrace, incorporando análisis predictivo de fallas para mejorar la observabilidad en ambientes productivos",
          impact: "reduciendo el tiempo medio de resolución (MTTR) de incidentes en producción",
          skills: ["Dynatrace", "Observabilidad", "IA Predictiva"]
        }
      ],
      architectureDecisions: [
        "Adopción del patrón Strangler Fig para migración progresiva de componentes heredados en JBoss hacia microservicios AWS",
        "Estandarización de Architecture Decision Records (ADRs) versionados en Git para trazabilidad de decisiones técnicas"
      ]
    },
    {
      id: "laureate",
      role: "Arquitecto de Soluciones Sr",
      company: "Laureate Perú",
      period: "Enero 2022 – Junio 2023",
      startDate: "2022-01",
      endDate: "2023-06",
      location: "Lima, Perú",
      domain: "Educación",
      specialties: ["Cloud-Native", "API Governance"],
      technologies: ["AWS", "Azure", "Microservicios", "REST APIs", "Docker", "OWASP", "SOLID"],
      summary: "Arquitectura híbrida cloud (AWS + Azure) para modernización de servicios académicos y de matriculación masiva.",
      bulletPoints: [
        {
          action: "Diseñé la arquitectura cloud híbrida AWS + Azure",
          scope: "combinando recursos de cómputo elástico y bases de datos para plataformas de autoservicio y matrícula masiva",
          impact: "soportando picos de alta concurrencia durante procesos semestrales sin degradación de servicio",
          skills: ["AWS", "Azure", "Cloud Híbrido", "Alta Concurrencia"]
        },
        {
          action: "Diseñé soluciones orientadas a dominio (DDD) y microservicios desacoplados",
          scope: "integrando el sistema core de información estudiantil (SIS) mediante APIs RESTful de alto volumen",
          impact: "aplicando seguridad por diseño bajo lineamientos OWASP y patrones de resiliencia (Retry, Timeout)",
          skills: ["Microservicios", "DDD", "OWASP", "Resiliencia"]
        },
        {
          action: "Establecí estándares técnicos y revisión de código",
          scope: "bajo principios SOLID, incorporando IA para automatización de pruebas y optimización de calidad de software",
          impact: "elevando la cobertura de testing y la estabilidad de los releases",
          skills: ["SOLID", "Code Review", "Calidad", "IA"]
        }
      ]
    },
    {
      id: "mibanco",
      role: "Arquitecto de Soluciones Sr",
      company: "Softnet / Mibanco",
      period: "Mayo 2021 – Diciembre 2021",
      startDate: "2021-05",
      endDate: "2021-12",
      location: "Lima, Perú",
      domain: "Banca & Finanzas",
      specialties: ["Core Banking", "API Governance"],
      technologies: ["Azure", "Java", "Spring Boot", "Microservicios", "OAuth2.0", "Docker", "DDD", "Circuit Breaker"],
      summary: "Diseño de arquitectura Azure para plataforma bancaria de monitoreo y servicios de microfinanzas.",
      bulletPoints: [
        {
          action: "Diseñé la arquitectura en Azure para monitoreo empresarial bancario",
          scope: "con microservicios desacoplados y modelado de dominios bancarios bajo Domain-Driven Design (DDD)",
          impact: "habilitando integraciones síncronas y asíncronas entre sistemas core bancarios y plataformas externas",
          skills: ["Azure", "DDD", "Microservicios", "Arquitectura Bancaria"]
        },
        {
          action: "Implementé patrones de resiliencia y seguridad bancaria",
          scope: "incorporando Circuit Breaker, Retry y esquemas de autenticación OAuth2.0 con control de acceso RBAC",
          impact: "asegurando tolerancia a fallos en transacciones críticas y cumplimiento normativo",
          skills: ["OAuth2.0", "RBAC", "Circuit Breaker", "Seguridad"]
        },
        {
          action: "Desplegué trazabilidad centralizada y análisis transaccional con IA",
          scope: "para soporte a la detección de anomalías en el comportamiento de transacciones de microfinanzas",
          impact: "optimizando la supervisión operativa y la detección de cuellos de botella",
          skills: ["Trazabilidad", "IA", "Microfinanzas"]
        }
      ]
    },
    {
      id: "indra",
      role: "Arquitecto de Soluciones / Líder Técnico",
      company: "Indra",
      period: "Febrero 2020 – Abril 2021",
      startDate: "2020-02",
      endDate: "2021-04",
      location: "Lima, Perú",
      domain: "Consultoría",
      specialties: ["Liderazgo", "Cloud-Native"],
      technologies: ["Java", "Spring Boot", "Node.js", "Docker", "CI/CD", "OWASP", "DDD"],
      summary: "Liderazgo técnico y arquitectura de soluciones móviles integradas a plataformas empresariales.",
      bulletPoints: [
        {
          action: "Diseñé la arquitectura modular desacoplada basada en servicios",
          scope: "para aplicaciones móviles integradas a plataformas corporativas mediante consumo de APIs empresariales",
          impact: "estableciendo controles de seguridad OWASP y aplicando principios de modularización DDD",
          skills: ["Soluciones Móviles", "APIs Empresariales", "OWASP", "DDD"]
        },
        {
          action: "Implementé pipelines de integración y despliegue continuo (CI/CD)",
          scope: "automatizando la infraestructura cloud y estandarizando los flujos de entrega",
          impact: "acelerando los ciclos de release con altos estándares de calidad de software",
          skills: ["CI/CD", "Automatización", "Cloud"]
        }
      ]
    },
    {
      id: "experis-rimac",
      role: "Full Stack Developer (Proyecto API Pagos)",
      company: "Experis / Rímac Seguros",
      period: "Enero 2019 – Enero 2020",
      startDate: "2019-01",
      endDate: "2020-01",
      location: "Lima, Perú",
      domain: "Seguros",
      specialties: ["Cloud-Native", "Event-Driven"],
      technologies: ["Node.js", "AWS API Gateway", "AWS Lambda", "AWS SQS", "DynamoDB", "Serverless"],
      summary: "Construcción serverless de la API transaccional de pagos de pólizas, cobros recurrentes y recaudación.",
      bulletPoints: [
        {
          action: "Implementé la API transaccional de pagos y suscripciones",
          scope: "desarrollando servicios backend serverless con Node.js, AWS Lambda y AWS API Gateway",
          impact: "habilitando cobros recurrentes y pagos en línea con alta escalabilidad y disponibilidad",
          skills: ["Node.js", "AWS Lambda", "AWS API Gateway", "Pagos Digitales"]
        },
        {
          action: "Diseñé la integración asíncrona tolerante a fallos",
          scope: "empleando colas AWS SQS para desacoplar el procesamiento transaccional entre pasarelas y sistemas financieros",
          impact: "asegurando cero pérdida de transacciones y autenticación/autorización robusta",
          skills: ["AWS SQS", "Asincronía", "Serverless", "Seguridad"]
        }
      ]
    }
  ],
  education: [
    {
      institution: "Universidad Privada de Tacna",
      degree: "Ingeniería de Sistemas",
      year: "2016",
      status: "Egresado"
    }
  ],
  certifications: [
    {
      name: "Solutions Consultant I Accreditation",
      issuer: "Mambu Academy",
      year: "2024",
      category: "Acreditación"
    },
    {
      name: "Integration Consultant Accreditation",
      issuer: "Mambu Academy",
      year: "2024",
      category: "Acreditación"
    },
    {
      name: "AWS Educate - Introduction to Generative AI",
      issuer: "Amazon Web Services",
      year: "2025",
      category: "Curso"
    },
    {
      name: "AWS Educate - Introduction to Cloud 101",
      issuer: "Amazon Web Services",
      year: "2025",
      category: "Curso"
    },
    {
      name: "AWS Educate - Getting Started with Compute",
      issuer: "Amazon Web Services",
      year: "2025",
      category: "Curso"
    },
    {
      name: "AWS Educate - Getting Started with Storage",
      issuer: "Amazon Web Services",
      year: "2025",
      category: "Curso"
    },
    {
      name: "Curso Completo AWS Certified Cloud Practitioner",
      issuer: "Udemy",
      year: "2022",
      category: "Curso"
    },
    {
      name: "Scrum Fundamentals Certified (SFC)",
      issuer: "SCRUMstudy",
      year: "2020",
      category: "Certificación"
    },
    {
      name: "Six Sigma Yellow Belt",
      issuer: "6SIGMAstudy",
      year: "2024",
      category: "Certificación"
    },
    {
      name: "EF SET English Certificate 56/100 (B2 Upper Intermediate)",
      issuer: "EF Standard English Test",
      year: "2025",
      category: "Acreditación"
    }
  ],
  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "B2 (Upper Intermediate)", score: "56/100 EF SET" }
  ]
};

export const JOB_PRESETS = [
  {
    id: "solutions-architect-sr",
    title: "Arquitecto de Soluciones Senior / Principal",
    description: "Definición e implementación de arquitecturas de integración empresarial, microservicios resilientes, DDD y modernización cloud en Azure/AWS para entornos bancarios y financieros de alta escala.",
    keywords: ["Arquitecto de Soluciones", "BIAN", "Azure", "AWS", "Microservicios", "DDD", "C4 Model", "Event-Driven", "Kafka", "Resiliencia", "Docker", "Kubernetes"]
  },
  {
    id: "integration-api-architect",
    title: "Arquitecto de Integración & Gobierno de APIs",
    description: "Especialista en ciclo de vida de APIs (API First / API Led), gestión de plataformas (Apigee / Azure APIM), seguridad bancaria (OAuth2/OIDC, mTLS, JWT) y arquitectura basada en eventos (Kafka).",
    keywords: ["API Governance", "API First / Led", "Apigee", "Azure APIM", "OAuth2/OIDC", "mTLS", "JWT", "Kafka", "OpenAPI", "Contratos de Integración", "BIAN v13"]
  },
  {
    id: "cloud-native-architect",
    title: "Arquitecto Cloud / Cloud-Native",
    description: "Estrategias de arquitectura en nube pública (AWS, Azure, GCP), infraestructura como código con Terraform, contenedores Docker/Kubernetes y observabilidad distribuida con Dynatrace y ELK.",
    keywords: ["AWS", "Azure", "GCP", "Cloud-Native", "Terraform", "Docker", "Kubernetes", "Dynatrace", "ELK", "IaC", "Observabilidad", "Zero Trust"]
  },
  {
    id: "tech-lead-squad",
    title: "Technical Lead / Squad Architecture Lead",
    description: "Liderazgo técnico y gobierno de ingeniería en squads multidisciplinarios (~30 ingenieros), conducción de ARB (Architecture Review Board), definición de ADRs y modelado C4/ArchiMate.",
    keywords: ["Liderazgo Técnico", "Gobierno de Squads", "ARB", "C4 Model", "TOGAF", "ArchiMate", "Java", "Spring Boot", "Code Review", "Mentoring"]
  }
];
