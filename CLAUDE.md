# Agenda de uñas (negocio: Cupedia)

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

## Estado (2026-11-15)
- **Hecho:**
  - rediseño fucsia del frontend, con fotos de ejemplo en `app/img/` (créditos en `CREDITOS.md`; son de relleno, se reemplazan por las de ella vía Drive);
  - parseo tolerante de la planilla en `Code.gs` (días sin tilde, `9am`, `1h`, `NO` en Activo, números extranjeros);
  - test con asserts: `node tests/code.test.js`.
- **Deploy:** GitHub Pages (repo público Gerardo1909/agenda-unas). La raíz `index.html` redirige a `app/`. Sin CI.
- **Guías:** `docs/README.md` (probar con datos propios, pruebas manuales, entrega) y `docs/guia-para-ella.md`.
- **NO probado todavía:** `Code.gs` en Google real. Las pruebas manuales están listadas en `docs/README.md`, Parte B.
- **Trampa clave:** el script corre como la cuenta que lo implementa. Para entregarlo, tiene que implementarlo la cuenta de ella.

## Fuera del MVP (agregar solo si ella lo pide)
- seña online;
- recordatorio automático a la clienta;
- subir foto desde el formulario;
- varias profesionales: en ese caso migrar a Supabase, ver `investigacion/03`.
