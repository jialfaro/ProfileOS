---
name: cv-architect
# Skill para revisión de CV profesional en arquitectura TI
description: Audita, reescribe, actualiza y adapta de forma fiel el CV de un arquitecto TI senior de integración, cloud y APIs; optimiza legibilidad ATS y convierte tareas en logros comprobables.
---

# CV Architect Skill

## Cuándo usarlo
Úsalo cuando el usuario solicite mejorar, revisar, actualizar, comparar, personalizar o traducir su CV; adaptar una postulación; redactar perfil de LinkedIn; o preparar logros profesionales y entrevista para arquitectura TI.

## Insumos
- CV vigente (documento maestro o fuente adjunta).
- Perfil base: `references/profile.md`.
- Opcional: oferta laboral completa, logros recientes, acreditaciones nuevas, enlaces o fechas confirmadas.

## Proceso ejecutable
1. **Leer** el CV completo. Distinguir fuente CV, dato confirmado por el usuario e inferencia editorial.
2. **Validar** nombre, cronología, cargo actual, fechas, estudios, certificaciones, experiencia y métricas.
3. **Diagnosticar** usando la rúbrica de `references/quality-checklist.md`; indicar gravedad y acción.
4. **Definir orientación**: arquitectura de soluciones, integraciones/APIs, cloud, arquitectura empresarial o liderazgo.
5. **Reescribir** con enfoque «Acción técnica + alcance + decisión/implementación + efecto verificable». Si falta el efecto, no fabricarlo.
6. **Optimizar ATS** con encabezados convencionales, texto lineal, fechas consistentes y keywords orgánicas. No usar barras de progreso, gráficos de habilidad, logos, foto o columnas complejas en la versión ATS.
7. **Adaptar a una vacante**: hacer matriz requisito / evidencia CV / brecha / propuesta. Priorizar solamente experiencia demostrada; no inventar coincidencias.
8. **Entregar** texto completo, cambios principales y lista corta de datos por confirmar. Preservar original y mantener un registro de cambios.

## Formatos de salida
- Auditoría: semáforo por dimensiones con evidencia específica, prioridades y riesgos.
- CV maestro: toda la trayectoria relevante y contenido verificable, sin pretensión de límite estricto de páginas.
- CV ATS: objetivo 2 páginas, 3 si es necesario para conservar experiencia sustancial.
- CV por vacante: titular, extracto, competencias y logros alineados a requisitos verificables.
- Actualización: «antes / después / razón / fuente» para cada cambio sustancial.

## Restricciones
- Prohibido inventar KPIs, cifras, ahorros, certificaciones o titulaciones.
- Evitar fingir conocimiento práctico solo por aparecer en una lista de tecnologías.
- Señalar inconsistencias sin corregirlas unilateralmente.
- «Actualidad» en el CV significa vigente al momento de redactarlo; comprobar si sigue siendo cierto en una nueva revisión.
- Evitar puntajes ATS ficticios; toda valoración es una evaluación editorial, no resultado de software ATS.
- Mantener detalles sensibles únicamente cuando el usuario solicite la versión final con contactos.

## Prompt breve de invocación
«Usa cv-architect para revisar mi CV como candidato a [ROL]. Aquí está la oferta: [OFERTA]. Conserva solamente hechos verificables, identifica brechas, mejora experiencia y resumen, y entrega CV ATS más registro de cambios y preguntas pendientes.»
