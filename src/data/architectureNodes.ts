export interface ArchitectureNode {
  id: string;
  name: string;
  subsystem: string;
  organization: string;
  client?: string;
  layer: "Gateway & Governance" | "Core & Event Mesh" | "Squad Leadership" | "Hybrid Cloud" | "Serverless & Payments";
  position: [number, number, number]; // 3D coordinates [x, y, z]
  color: string;
  status: "Production" | "Operational" | "Modernized";
  throughput?: string;
  protocols: string[];
  technologies: string[];
  adrs: {
    title: string;
    decision: string;
    tradeoffs: string;
  }[];
  responsibilities: string[];
  impactSummary: string;
  connections: string[]; // Node IDs this connects to
}

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "bcp-gateway",
    name: "API Governance & Perimeter",
    subsystem: "Apigee / Azure APIM Zero-Trust Mesh",
    organization: "TCS Perú",
    client: "BCP (Banco de Crédito del Perú)",
    layer: "Gateway & Governance",
    position: [-5.5, 1.2, 2.5],
    color: "#38bdf8", // Sky Blue
    status: "Production",
    throughput: "Tier-1 Banking Scale",
    protocols: ["HTTPS", "mTLS", "OAuth2", "JWT", "REST / OpenAPI"],
    technologies: ["Apigee", "Azure APIM", "Apache Kafka", "Dynatrace", "ELK", "BIAN"],
    adrs: [
      {
        title: "ADR-01: BIAN Service Domains for Banking Interoperability",
        decision: "Estandarización de contratos bajo dominios de servicio BIAN para desacoplar canales digitales del core bancario.",
        tradeoffs: "Mayor esfuerzo inicial de modelado formal a cambio de interoperabilidad corporativa y reusabilidad."
      },
      {
        title: "ADR-02: Zero-Trust Perimeter with Mutual TLS (mTLS)",
        decision: "Exigencia de mTLS en todos los gateways perimetrales y certificados de cliente para endpoints de alta criticidad.",
        tradeoffs: "Gestión rigurosa del ciclo de vida de certificados PKI a cambio de seguridad criptográfica bancaria."
      }
    ],
    responsibilities: [
      "Definición y gobierno del ciclo de vida integral de APIs corporativas y eventos asíncronos.",
      "Homologación de contratos OpenAPI y políticas de backward compatibility.",
      "Instrumentación de trazabilidad distribuida con Dynatrace y ELK en todo el mesh de pasarelas."
    ],
    impactSummary: "Estandarización transversal del catálogo de APIs financieras del banco líder del país con gobernanza de contratos y trazabilidad end-to-end.",
    connections: ["mambu-core", "rimac-squads", "laureate-cloud"]
  },
  {
    id: "mambu-core",
    name: "Core Banking & Event Mesh",
    subsystem: "Mambu SaaS & Event-Driven Engine",
    organization: "OM Technology Group",
    layer: "Core & Event Mesh",
    position: [4.8, 0.8, -1.5],
    color: "#f59e0b", // Warm Amber
    status: "Operational",
    throughput: "Real-Time Ledger Sync",
    protocols: ["Kafka Streaming", "AMQP", "REST", "gRPC"],
    technologies: ["Java 17", "Spring Boot", "Apache Kafka", "AWS SQS/SNS", "Terraform", "Docker", "DDD"],
    adrs: [
      {
        title: "ADR-03: Transactional Outbox Pattern with Kafka",
        decision: "Implementación de Transactional Outbox para garantizar consistencia eventual entre microservicios y SaaS Mambu.",
        tradeoffs: "Consumo diferido de eventos a cambio de tolerancia total a fallos transaccionales y cero pérdida de registros."
      },
      {
        title: "ADR-04: Hexagonal Architecture in Spring Boot",
        decision: "Aislamiento de la lógica de dominio financiero respecto a frameworks y adaptadores cloud.",
        tradeoffs: "Mayor cantidad de interfaces y mappers a cambio de testabilidad desacoplada y portabilidad de nube."
      }
    ],
    responsibilities: [
      "Diseño de microservicios hexagonales para módulos de cuentas de ahorro, onboarding y pagos.",
      "Pipeline de streaming asíncrono con Apache Kafka y AWS SQS/SNS para eventos bancarios.",
      "Aprovisionamiento automatizado de infraestructura con Terraform y Docker en AWS."
    ],
    impactSummary: "Integración desacoplada y resiliente de Core Banking Mambu con latencia mínima y cero pérdida transaccional.",
    connections: ["bcp-gateway", "experis-payments"]
  },
  {
    id: "rimac-squads",
    name: "Multi-Squad Architecture Hub",
    subsystem: "Engineering Governance & BFF Layer",
    organization: "Rímac Seguros",
    layer: "Squad Leadership",
    position: [0.5, 4.5, 0],
    color: "#10b981", // Emerald
    status: "Production",
    throughput: "~30 Engineers Governed",
    protocols: ["GraphQL", "REST", "SOAP / JBoss Fuse", "C4 Model"],
    technologies: ["BFF Pattern", "JBoss Fuse", "C4 Model", "ArchiMate", "TOGAF", "AWS", "Microservicios"],
    adrs: [
      {
        title: "ADR-05: Backend-For-Frontend (BFF) Pattern",
        decision: "Creación de capas BFF específicas por canal (Web Asegurados vs App Móvil) para optimizar payloads.",
        tradeoffs: "Mantenimiento de dos servicios BFF a cambio de rendimiento extremo y experiencia móvil optimizada."
      },
      {
        title: "ADR-06: Strangler Fig Pattern for Legacy JBoss Monoliths",
        decision: "Migración gradual de funcionalidades críticas desde JBoss Fuse hacia microservicios en contenedores AWS.",
        tradeoffs: "Coexistencia temporal de dos arquitecturas a cambio de riesgo cero de disrupción operativa."
      }
    ],
    responsibilities: [
      "Gobierno arquitectónico transversal de squads multidisciplinarios sumando ~30 ingenieros.",
      "Modelado de vistas C4 (Contexto, Contenedor, Componente) y diagramas ArchiMate para comités de arquitectura.",
      "Definición y estandarización de Architecture Decision Records (ADRs) en repositorios Git."
    ],
    impactSummary: "Liderazgo técnico de ~30 ingenieros para emisión y cotización digital, acelerando el time-to-market sin deuda técnica.",
    connections: ["bcp-gateway", "laureate-cloud"]
  },
  {
    id: "laureate-cloud",
    name: "Hybrid Cloud Infrastructure",
    subsystem: "AWS & Azure Multi-Cloud Fabric",
    organization: "Laureate Perú",
    layer: "Hybrid Cloud",
    position: [-4.2, -3.2, -1.8],
    color: "#a855f7", // Purple
    status: "Modernized",
    throughput: "High-Concurrency Peaks",
    protocols: ["HTTPS", "VPN IPsec", "REST", "OData"],
    technologies: ["AWS", "Azure", "Microservicios", "Docker", "API Gateway", "SIS Integration"],
    adrs: [
      {
        title: "ADR-07: Elastic Burst Architecture on AWS/Azure",
        decision: "Arquitectura híbrida con auto-escalado horizontal para soportar picos estacionales de matrícula masiva.",
        tradeoffs: "Costos de egreso de datos gestionados mediante caché perimetral distribuida."
      }
    ],
    responsibilities: [
      "Diseño de soluciones cloud híbridas combinando cómputo en AWS y servicios de directorio/bases en Azure.",
      "Desacoplamiento de sistemas estudiantiles heredados (SIS) mediante capas de abstracción REST."
    ],
    impactSummary: "Modernización de servicios académicos con 99.9% de disponibilidad durante picos estacionales de matrícula.",
    connections: ["rimac-squads", "mibanco-microloans"]
  },
  {
    id: "mibanco-microloans",
    name: "Microfinance & Credit Engine",
    subsystem: "Financial Evaluation Services",
    organization: "Softnet / Mibanco",
    layer: "Core & Event Mesh",
    position: [3.8, -3.5, 1.2],
    color: "#ec4899", // Rose Pink
    status: "Production",
    throughput: "Automated Origination",
    protocols: ["REST", "OAuth2", "JSON-RPC"],
    technologies: ["Java", "Spring Boot", "Microservicios", "OAuth2", "Docker", "Swagger/OpenAPI"],
    adrs: [
      {
        title: "ADR-08: Decentralized Credit Scoring Services",
        decision: "Desacoplamiento de motores de scoring y biometría mediante microservicios independientes.",
        tradeoffs: "Orquestación de servicios distribuida compensada con patrones de reintento y circuit breakers."
      }
    ],
    responsibilities: [
      "Diseño de backend para originación de microcréditos con contratos REST estandarizados.",
      "Integración de validaciones biométricas y consultas a centrales de riesgo en tiempo real."
    ],
    impactSummary: "Aceleración del pipeline de aprobación de microfinanzas con arquitectura desacoplada y segura.",
    connections: ["laureate-cloud", "experis-payments"]
  },
  {
    id: "experis-payments",
    name: "Serverless Payment Gateway",
    subsystem: "Event-Driven Premium Collection",
    organization: "Experis / Rímac Seguros",
    layer: "Serverless & Payments",
    position: [0, -1.8, 4.2],
    color: "#14b8a6", // Teal
    status: "Operational",
    throughput: "Fault-Tolerant Collections",
    protocols: ["HTTPS", "Webhook", "AWS SQS Queueing"],
    technologies: ["Node.js", "AWS API Gateway", "AWS Lambda", "AWS SQS", "DynamoDB"],
    adrs: [
      {
        title: "ADR-09: Queue-Based Load Leveling with AWS SQS",
        decision: "Procesamiento asíncrono de transacciones de recaudo mediante colas FIFO para nivelar picos.",
        tradeoffs: "Respuesta diferida al cliente a cambio de tasa de pérdida de transacciones del 0%."
      }
    ],
    responsibilities: [
      "Construcción serverless de pasarelas de pago y recaudo de primas de seguros.",
      "Tolerancia a fallos con colas de mensajes no entregados (Dead Letter Queues - DLQ)."
    ],
    impactSummary: "Procesamiento serverless seguro de recaudación de seguros con cero pérdidas en caídas de pasarela externa.",
    connections: ["mambu-core", "mibanco-microloans"]
  }
];
