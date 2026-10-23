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
  specialties: ("API Governance" | "Event-Driven" | "Cloud-Native" | "Core Banking" | "Liderazgo")[];
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
  title: string;
  location: string;
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
  title: "Arquitecto de TI & Soluciones Cloud Senior",
  location: "Lima, Perú",
  verifiedSummary:
    "Arquitecto de TI con más de 7 años de experiencia diseñando y gobernando arquitecturas empresariales, de integración y cloud-native en el sector bancario, financiero y asegurador. Especialista en gobierno del ciclo de vida de APIs (API First/API Led), arquitecturas dirigidas por eventos (EDA), diseño guiado por el dominio (DDD) y microservicios resilientes sobre AWS y Azure. Demostrada capacidad en liderazgo técnico y gobierno arquitectónico de múltiples squads de ingeniería (~30 ingenieros), alineando decisiones con marcos BIAN, TOGAF y modelos C4.",
  coreCompetencies: [
    {
      category: "Gobierno & Arquitectura Empresarial",
      skills: ["API Governance", "API First / API Led", "DDD", "BIAN Framework", "TOGAF", "ArchiMate", "C4 Model", "Event-Driven Architecture (EDA)"]
    },
    {
      category: "Cloud & Contenedores",
      skills: ["AWS (Lambda, SQS/SNS, API Gateway)", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Cloud-Native Architecture"]
    },
    {
      category: "Integración & Seguridad de APIs",
      skills: ["Apigee", "Azure APIM", "Apache Kafka", "OAuth2", "JWT", "mTLS", "JBoss Fuse", "BFF (Backend For Frontend)"]
    },
    {
      category: "Desarrollo & Backend",
      skills: ["Java", "Spring Boot (Hexagonal/Clean Arch)", "Node.js", "Core Banking (Mambu)", "Microservicios Resilientes"]
    },
    {
      category: "Observabilidad & SRE",
      skills: ["Dynatrace", "ELK Stack", "OpenTelemetry", "Resiliencia (Circuit Breaker, Retries)"]
    }
  ],
  experiences: [
    {
      id: "tcs-bcp",
      role: "Arquitecto Tecnológico / Gobierno de APIs",
      company: "TCS Perú",
      client: "BCP (Banco de Crédito del Perú)",
      period: "Noviembre 2024 – Actualidad",
      startDate: "2024-11",
      endDate: "Actualidad",
      location: "Lima, Perú (Híbrido)",
      domain: "Banca & Finanzas",
      specialties: ["API Governance", "Event-Driven", "Cloud-Native"],
      technologies: ["Apigee", "Azure APIM", "Apache Kafka", "OAuth2", "JWT", "mTLS", "Dynatrace", "ELK", "BIAN"],
      summary: "Gobierno transversal del ciclo de vida de APIs y eventos financieros para el banco líder de Perú.",
      bulletPoints: [
        {
          action: "Definí y establecí lineamientos de gobierno",
          scope: "para el ciclo de vida completo de APIs y eventos asíncronos en plataformas Apigee y Azure APIM",
          impact: "estandarizando contratos OpenAPI y políticas corporativas de versionamiento y backward compatibility",
          skills: ["Apigee", "Azure APIM", "API Governance", "OpenAPI"]
        },
        {
          action: "Diseñé esquemas de seguridad de grado bancario",
          scope: "con autenticación y autorización mediante OAuth2, tokens JWT federados y mTLS",
          impact: "asegurando la interoperabilidad con canales internos y ecosistemas de terceros regulados",
          skills: ["OAuth2", "JWT", "mTLS", "Seguridad"]
        },
        {
          action: "Implanté estándares de observabilidad y trazabilidad distribuida",
          scope: "integrando instrumentación con Dynatrace y ELK Stack en pipelines de microservicios y gateways",
          impact: "garantizando visibilidad end-to-end de transacciones financieras críticas y SLA de respuesta",
          skills: ["Dynatrace", "ELK", "Observabilidad"]
        }
      ],
      architectureDecisions: [
        "Adopción de BIAN Service Domains para estandarización de contratos de banca abierta",
        "Implementación de arquitectura zero-trust con validación mTLS en gateways perimetrales",
        "Estrategia de desacoplamiento de canales mediante eventos de dominio en Apache Kafka"
      ]
    },
    {
      id: "om-tech",
      role: "Arquitecto de Software / Especialista AWS Sr",
      company: "OM Technology Group",
      period: "Febrero 2024 – Febrero 2025",
      startDate: "2024-02",
      endDate: "2025-02",
      location: "Lima, Perú",
      domain: "Banca & Finanzas",
      specialties: ["Core Banking", "Cloud-Native", "Event-Driven"],
      technologies: ["AWS", "Mambu", "Java", "Spring Boot", "Apache Kafka", "AWS SQS/SNS", "Terraform", "Docker", "DDD"],
      summary: "Diseño e implementación de arquitectura de integración desacoplada sobre Mambu Core Banking y servicios AWS.",
      bulletPoints: [
        {
          action: "Diseñé la arquitectura de microservicios hexagonal",
          scope: "empleando Java 17 y Spring Boot alineados a principios de Domain-Driven Design (DDD)",
          impact: "para módulos críticos de cuentas, onboarding digital de clientes y pasarela de pagos transaccionales",
          skills: ["Java", "Spring Boot", "DDD", "Arquitectura Hexagonal"]
        },
        {
          action: "Construí el pipeline de sincronización asíncrona",
          scope: "con Apache Kafka y AWS SQS/SNS para procesar eventos emitidos por el core SaaS Mambu",
          impact: "desacoplando el procesamiento transaccional del almacenamiento analítico y notificaciones",
          skills: ["Mambu", "Kafka", "AWS SQS/SNS", "Event-Driven"]
        },
        {
          action: "Automatizó el aprovisionamiento de infraestructura cloud",
          scope: "mediante Terraform y contenedores Docker en AWS",
          impact: "asegurando reproducibilidad de ambientes (Dev, Staging, Prod) y acelerando despliegues CI/CD",
          skills: ["Terraform", "Docker", "AWS", "IaC"]
        }
      ],
      architectureDecisions: [
        "Patrón Outbox transaccional para garantizar consistencia eventual entre microservicios y Mambu",
        "Aislamiento de dominio mediante contextos delimitados (Bounded Contexts) en Spring Boot"
      ]
    },
    {
      id: "rimac-seguros",
      role: "Arquitecto de Solución Sr – Líder Técnico",
      company: "Rímac Seguros y Reaseguros",
      period: "Julio 2023 – Enero 2024",
      startDate: "2023-07",
      endDate: "2024-01",
      location: "Lima, Perú",
      domain: "Seguros",
      specialties: ["Liderazgo", "API Governance", "Cloud-Native"],
      technologies: ["BFF Pattern", "JBoss Fuse", "C4 Model", "TOGAF", "ArchiMate", "AWS", "Microservicios"],
      summary: "Gobierno arquitectónico de múltiples squads (~30 ingenieros) y diseño de capa BFF para canales de aseguramiento.",
      bulletPoints: [
        {
          action: "Ejercí el gobierno y liderazgo arquitectónico",
          scope: "de squads multidisciplinarios sumando ~30 ingenieros de software, analistas y DevOps",
          impact: "guiando la toma de decisiones técnicas, revisiones de diseño (ADRs) y calidad de código",
          skills: ["Liderazgo Técnico", "Gobierno de Squads", "Code Review"]
        },
        {
          action: "Modelé arquitecturas de referencia y diagramas formales",
          scope: "utilizando C4 Model, ArchiMate y TOGAF para sistemas de cotización y emisión de pólizas",
          impact: "estableciendo comunicación clara y homologada entre stakeholders de negocio y equipos de ingeniería",
          skills: ["C4 Model", "ArchiMate", "TOGAF"]
        },
        {
          action: "Diseñé capas Backend-For-Frontend (BFF)",
          scope: "orquestando servicios legados en JBoss Fuse con nuevas APIs REST en la nube",
          impact: "optimizando los tiempos de respuesta y payloads para las aplicaciones web y móviles de clientes",
          skills: ["BFF Pattern", "JBoss Fuse", "Integración Legada"]
        }
      ],
      architectureDecisions: [
        "Implementación del patrón Strangler Fig para migración gradual de monoliths en JBoss hacia microservicios",
        "Estandarización de Architecture Decision Records (ADRs) en repositorios Git corporativos"
      ]
    },
    {
      id: "laureate",
      role: "Arquitecto de Solución Sr",
      company: "Laureate Perú",
      period: "Enero 2022 – Junio 2023",
      startDate: "2022-01",
      endDate: "2023-06",
      location: "Lima, Perú",
      domain: "Educación",
      specialties: ["Cloud-Native", "API Governance"],
      technologies: ["AWS", "Azure", "Microservicios", "REST APIs", "Docker", "Eventos"],
      summary: "Arquitectura híbrida cloud (AWS/Azure) para modernización de servicios académicos y de matriculación.",
      bulletPoints: [
        {
          action: "Diseñé soluciones de integración cloud híbrida",
          scope: "combinando capacidades de cómputo y bases de datos en AWS y Microsoft Azure",
          impact: "para soportar picos estacionales de alta concurrencia durante procesos masivos de matrícula universitaria",
          skills: ["AWS", "Azure", "Cloud Híbrido", "Alta Concurrencia"]
        },
        {
          action: "Definí la arquitectura de microservicios orientada a APIs",
          scope: "desacoplando el sistema de información estudiantil (SIS) de los portales de autoservicio",
          impact: "reduciendo dependencias rígidas y habilitando despliegues independientes por facultad",
          skills: ["Microservicios", "REST APIs", "Modernización"]
        }
      ]
    },
    {
      id: "mibanco",
      role: "Arquitecto de Solución Sr",
      company: "Softnet / Mibanco",
      period: "Mayo 2021 – Diciembre 2021",
      startDate: "2021-05",
      endDate: "2021-12",
      location: "Lima, Perú",
      domain: "Banca & Finanzas",
      specialties: ["Core Banking", "API Governance"],
      technologies: ["Java", "Spring Boot", "Microservicios", "OAuth2", "Docker", "Swagger"],
      summary: "Modernización de servicios bancarios de microfinanzas y préstamos comerciales.",
      bulletPoints: [
        {
          action: "Diseñé servicios de backend para originación de microcréditos",
          scope: "con arquitecturas desacopladas y contratos REST documentados en Swagger/OpenAPI",
          impact: "facilitando la integración ágil de canales de evaluación de riesgo y validación biométrica",
          skills: ["Spring Boot", "Microfinanzas", "OpenAPI"]
        }
      ]
    },
    {
      id: "indra",
      role: "Líder Técnico",
      company: "Indra",
      period: "Febrero 2020 – Abril 2021",
      startDate: "2020-02",
      endDate: "2021-04",
      location: "Lima, Perú",
      domain: "Consultoría",
      specialties: ["Liderazgo", "Cloud-Native"],
      technologies: ["Java", "Spring Boot", "Node.js", "Docker", "CI/CD", "GitLab"],
      summary: "Liderazgo técnico de equipos de entrega para proyectos corporativos de transformación digital.",
      bulletPoints: [
        {
          action: "Coordiné técnicamente el equipo de desarrollo",
          scope: "asegurando la adherencia a estándares de ingeniería, testing automatizado y pipelines CI/CD",
          impact: "cumpliendo cronogramas de entrega con cero defectos críticos en puestas a producción",
          skills: ["Liderazgo", "CI/CD", "Calidad"]
        }
      ]
    },
    {
      id: "experis-rimac",
      role: "Full Stack Developer",
      company: "Experis / Rímac Seguros",
      period: "Enero 2019 – Enero 2020",
      startDate: "2019-01",
      endDate: "2020-01",
      location: "Lima, Perú",
      domain: "Seguros",
      specialties: ["Cloud-Native", "Event-Driven"],
      technologies: ["Node.js", "AWS API Gateway", "AWS Lambda", "AWS SQS", "DynamoDB"],
      summary: "Construcción serverless de la API transaccional de pagos de pólizas y recaudación.",
      bulletPoints: [
        {
          action: "Implementé microservicios serverless en Node.js y AWS Lambda",
          scope: "integrando pasarelas de pago externas con colas AWS SQS para recaudación diferida",
          impact: "asegurando tolerancia a fallos y procesamiento ordenado de transacciones financieras",
          skills: ["Node.js", "AWS Lambda", "AWS SQS", "Serverless"]
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
      name: "EF SET Certificate (English B2 - 56/100)",
      issuer: "EF Standard English Test",
      year: "2025",
      category: "Acreditación"
    },
    {
      name: "Scrum Fundamentals Certified",
      issuer: "SCRUMstudy",
      year: "2024",
      category: "Certificación"
    },
    {
      name: "Six Sigma Yellow Belt",
      issuer: "6SIGMAstudy",
      year: "2024",
      category: "Certificación"
    },
    {
      name: "Mambu Certified Integrator",
      issuer: "Mambu Academy",
      year: "2024",
      category: "Acreditación"
    },
    {
      name: "AWS Architecture & Services (Educate)",
      issuer: "Amazon Web Services",
      year: "2025",
      category: "Curso"
    }
  ],
  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "B2 (Intermedio Avanzado)", score: "56/100 EF SET" }
  ]
};

export const JOB_PRESETS = [
  {
    id: "solutions-architect-sr",
    title: "Arquitecto de Soluciones Senior / Principal",
    description: "Diseño de soluciones empresariales complejas, microservicios resilientes, DDD y modernización cloud en AWS/Azure para entornos de alta escala.",
    keywords: ["Arquitecto de Soluciones", "AWS", "Azure", "Microservicios", "DDD", "BIAN", "C4 Model", "Event-Driven", "Docker", "Kubernetes", "Kafka", "Resiliencia"]
  },
  {
    id: "integration-api-architect",
    title: "Arquitecto de Integración & Gobierno de APIs",
    description: "Especialista en ciclo de vida de APIs (API First/Led), API Management (Apigee / Azure APIM), seguridad bancaria (OAuth2, mTLS, JWT) y EDA.",
    keywords: ["API Governance", "API First", "Apigee", "Azure APIM", "OAuth2", "mTLS", "JWT", "Kafka", "OpenAPI", "Contratos de Integración", "EDA"]
  },
  {
    id: "cloud-native-architect",
    title: "Arquitecto Cloud / Cloud-Native",
    description: "Estrategias de arquitectura en nube pública (AWS, Azure), infraestructura como código con Terraform, contenedores y sistemas distribuidos.",
    keywords: ["AWS", "Azure", "Cloud-Native", "Terraform", "Docker", "Kubernetes", "Lambda", "SQS", "IaC", "Observabilidad", "Dynatrace"]
  },
  {
    id: "tech-lead-squad",
    title: "Technical Lead / Squad Architecture Lead",
    description: "Liderazgo técnico y gobierno de ingeniería en squads multidisciplinarios, definición de ADRs, C4 modeling y code quality.",
    keywords: ["Liderazgo Técnico", "Gobierno de Squads", "C4 Model", "TOGAF", "ArchiMate", "Java", "Spring Boot", "Code Review", "Mentoría"]
  }
];
