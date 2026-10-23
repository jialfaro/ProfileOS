# IT Architecture Career Agent

Un agente de carrera profesional especializado y un skill reutilizable para actualizar el CV de un arquitecto de TI senior.

## Archivos
- `agent/AGENTS.md`: identidad, reglas, conocimiento del perfil y procedimientos del agente.
- `skills/cv-architect/SKILL.md`: skill invocable para auditorías, actualización y adaptación por vacantes.
- `skills/cv-architect/references/profile.md`: hechos extraídos de CV, fechas y datos que necesitan confirmación.
- `skills/cv-architect/references/quality-checklist.md`: rúbrica y redacción verificable de logros.
- `templates/REQUESTS.md`: prompts listos para usar.

## Uso con Codex
Copiar `agent/AGENTS.md` al archivo `AGENTS.md` en la raíz de un workspace de carrera y copiar `skills/cv-architect` al directorio `.agents/skills/cv-architect` del mismo proyecto (si tu configuración de Codex descubre skills ahí). Luego abrir el workspace y pedir «Usa cv-architect para auditar mi CV».

## Uso con Claude Code
Copiar el skill a `.claude/skills/cv-architect` dentro del proyecto y usar el contenido del archivo `agent/AGENTS.md` como instrucciones de proyecto, por ejemplo en `CLAUDE.md`. Revisar la versión y la configuración de la herramienta antes de instalar.

## Mantenimiento
Mantener el CV original como fuente, actualizar `references/profile.md` solo con hechos confirmados y conservar una copia maestra antes de adaptar cada postulación.

Este paquete son instrucciones y referencias listas para instalar en un agente compatible; por sí solo no ejecuta tareas periódicas ni edita documentos automáticamente.
