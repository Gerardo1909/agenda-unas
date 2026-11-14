# Agenda de uñas

Página de turnos para una amiga manicurista en **Venezuela** que no es técnica. Hoy coordina todo por WhatsApp y de memoria. Es un favor del programador (dueño de este repo): la idea es **armar y soltar**, que ella lo mantenga sola con herramientas de Google que ya conoce.

## Decisiones tomadas (no re-discutir sin motivo)
- **Costo $0.** Nada de WhatsApp Cloud API, SMS ni hosting pago.
- **Sin pagos en la app.** Cada servicio muestra su precio en USD ("$10") y el pago se arregla en persona (efectivo, Pago Móvil, etc.). Mercado Pago y Stripe no funcionan en Venezuela.
- **Clienta:** reserva sin email, solo con nombre, WhatsApp y nota. Las clientas allá se manejan por WhatsApp.
- **Avisos solo a ella:**
  - mail por cada reserva nueva (notificación de Gmail en el celular);
  - recordatorio de Google Calendar 1 h antes;
  - resumen diario a las 20 h con botones `wa.me` para recordarle a cada clienta con un toque.
- **Links `wa.me`:** son gratis. Solo abren el chat con texto prellenado; el mensaje lo manda la persona desde su WhatsApp.
- **MVP indispensable:** turnos sin superposición + catálogo lindo con fotos.

## Arquitectura
- `app/index.html`: página pública, un solo archivo sin build. `API_URL` vacío = modo demo con datos de ejemplo.
- `app/Code.gs` + `app/appsscript.json`: backend en Google Apps Script, ligado a una Google Sheet de ella.
  - **Hojas:**
    - `Servicios`: Nombre, Precio, Duración (min), Foto, Detalle, Activo.
    - `Horario`: Día, Abre, Cierra.
    - `Ajustes`: clave/valor (negocio, subtitulo, whatsapp, codigo_pais, formas, dias_maximos, anticipacion_horas).
  - **Turnos:** viven en el Google Calendar por defecto de ella. *Cualquier* evento bloquea ese horario; un evento de día completo bloquea el día.
  - **Reserva:** usa `LockService`, vuelve a verificar que el horario siga libre y usa un `id` por intento para que un reintento no duplique el turno.
  - **Fotos:** link de Drive compartido "cualquiera con el enlace", que se convierte a `drive.google.com/thumbnail?id=…&sz=w600`.
- **Rol dueña = Google Sheet + Calendar** (su panel de admin, protegido con su login). Rol clienta = `index.html`. No hay panel admin propio, a propósito.
- `investigacion/`: informes de los subagentes (SaaS, Canva/no-code, arquitecturas, notificaciones/pagos Venezuela).

## Estado (2026-11-14)
- **Hecho:** prototipo funcionando en modo demo.
  - Artifact privado: https://claude.ai/artifact/1Ex9KzDzQvaM1N45ZxJnbU
  - El usuario dice que cubre ~70% de lo que quiere; faltan ajustes de frontend.
- **Probado:** la lógica de horarios (`freeSlots`, `telWa_`, `min_`), con asserts en node.
- **NO probado:** `Code.gs` en Google real.
- **Pendiente de probar el primer día:**
  - que le llegue la notificación del mail al celular;
  - que las miniaturas de Drive carguen desde Venezuela;
  - la latencia de Apps Script.
- **Falta:**
  - fotos y precios reales, número de WhatsApp y nombre del negocio;
  - deploy (ver `app/README.md`).

## Fuera del MVP (agregar solo si ella lo pide)
- seña online;
- recordatorio automático a la clienta;
- subir foto desde el formulario;
- varias profesionales: en ese caso migrar a Supabase, ver `investigacion/03`.

## Republicar el artifact de demo desde index.html
El artifact no lleva doctype/html/head/body. Se genera con:
```
sed -e '/^<!doctype html>$/d' -e '/^<html lang="es">$/d' -e '/^<\/\?head>$/d' -e '/^<\/\?body>$/d' -e '/^<\/html>$/d' -e '/<meta charset/d' -e '/<meta name="viewport"/d' app/index.html > /tmp/turnos-unas.html
```
Después se publica con la tool Artifact usando `url` = el link de arriba.
