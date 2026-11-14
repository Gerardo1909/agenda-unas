# 03 - Arquitecturas para la web app de reservas (manicura)

Fecha de la investigación: 2026-11-14. Objetivo: ~$0/mes, mobile-first, la profesional administra todo desde el celular sin tocar código.

> **ACTUALIZACIÓN (datos nuevos del usuario): el país es Venezuela, no Argentina.** Sin Mercado Pago ni Stripe, así que **la seña queda fuera del MVP**. Internet y datos móviles inestables: la página tiene que ser muy liviana. Hoy ella coordina todo por WhatsApp y de memoria. Indispensable: turnos sin superposición y catálogo lindo con fotos. El programador quiere "armar y soltar": **ella lo mantiene sola**, con soporte puntual, y debe poder hacerlo con herramientas que ya sabe usar (Google Calendar, Sheets, WhatsApp).
> **Efecto: la recomendación cambia de B a A (ajustada).** Resumen en la sección 6. El análisis original (secciones 1-5) se escribió suponiendo Argentina y seña; se conserva porque sigue siendo la base de comparación, y lo que ya no aplica está marcado.

## 0. Requisitos que mandan en el diseño

1. Cero doble reserva: debe garantizarlo la base de datos o un lock, no solo el front.
2. ~~Seña con hold y expiración~~ **Fuera del MVP (Venezuela, sin MP/Stripe).** Sin seña no hay estados de pago, ni holds, ni expiración: el turno se confirma al reservar.
3. La profesional edita 4 cosas desde el celular: bloquear días/horas, ver turnos, cambiar precios y cambiar fotos.
4. Notificaciones: aviso instantáneo a la profesional, confirmación inmediata a la clienta y recordatorio 24 h antes.
5. Carga operativa casi nula. Si algo se rompe un sábado, la manicurista no puede arreglarlo, y **ella es quien lo mantiene** (el programador "arma y suelta").
6. **Liviano y tolerante a conexión mala:** pocos KB, fotos chicas, caché local y siempre una salida por WhatsApp si la API no responde.

## 1. Free tiers verificados (noviembre 2026)

Leyenda: [OFICIAL] leído en la página del proveedor en esta sesión. [TERCEROS] solo blogs, que a veces se contradicen. [PREVIO] conocimiento previo, no re-verificado.

| Servicio | Límite free relevante | Confianza |
|---|---|---|
| Supabase Free | 500 MB DB, 1 GB storage, 5 GB egress, 500k invocaciones de Edge Functions/mes, 50k MAU, 2 proyectos activos. **Se pausa tras 1 semana sin actividad.** Edge Function: 2 s de CPU por request, 150 s de wall clock, 256 MB, 100 funciones. `pg_cron` + `pg_net` programan funciones (el ejemplo oficial corre cada minuto) | OFICIAL (pricing, limits, schedule-functions) |
| Cloudflare Workers Free | 100k req/día, 10 ms de CPU por request/cron, 5 Cron Triggers, 50 subrequests | OFICIAL |
| Cloudflare D1 Free | 5M filas leídas/día, 100k escritas/día, 5 GB. **Desde 2026-09-01 las queries fallan al pasar el límite** (antes se toleraba) | TERCEROS + changelog de CF |
| Cloudflare Pages Free | 500 builds/mes; ancho de banda "ilimitado" | build OFICIAL, ancho de banda TERCEROS |
| Google Apps Script (cuenta gmail.com) | **100 destinatarios de mail/día**, triggers 90 min/día en total, 6 min por ejecución, 20 triggers por script, 20k UrlFetch/día, 5k eventos de Calendar creados/día | OFICIAL (developers.google.com/apps-script/quotas) |
| Firebase Spark | Cloud Functions **requiere Blaze** (tarjeta). Cloud Storage también exige billing desde feb 2026 según terceros | TERCEROS + docs oficiales de planes |
| Resend Free | 3.000 mails/mes y **100/día**, 1 dominio verificado, logs de 30 días. Para enviar a terceros hace falta dominio propio verificado | TERCEROS (dominio: PREVIO) |
| Brevo Free | 300 mails/día, la API transaccional está incluida. Comparte cupo con marketing y mete logo de Brevo | TERCEROS |
| Telegram Bot API | Gratis. ~30 msg/s global, ~1 msg/s por chat (suficiente por varios órdenes de magnitud) | TERCEROS |
| WhatsApp Cloud API | Plantilla utility en Argentina ≈ US$0,026-0,030 por mensaje (tarifa de Venezuela no verificada; Meta cobra por país/región). Los mensajes de servicio y los utility dentro de una ventana de 24 h abierta por la clienta son gratis. Un recordatorio a 24 h está fuera de ventana, así que es plantilla paga. Requiere Meta Business y número dedicado | TERCEROS + docs de Meta (tarifa exacta: verificar) |
| Cal.com | En abril 2026 cerró el código del producto. Queda **Cal.diy** (MIT, self-host) sin Teams/Workflows/Insights/SSO/API v1. El plan free hosted es de 1 usuario (las fuentes se contradicen sobre si es permanente). Pagos nativos: Stripe, PayPal, HitPay. **No encontré Mercado Pago** | TERCEROS + blog de Cal.com |
| Calendly Free | 1 tipo de evento y 1 calendario. Un post del foro oficial dice que la Scheduling API y los webhooks están en Free, **pero con tope de 5 reservas por usuario por día**. Otras fuentes dicen que no están disponibles | TERCEROS + foro oficial (contradictorio) |
| Mercado Pago | **No aplica: la usuaria está en Venezuela y no hay MP ni Stripe.** La seña salió del MVP. (Los datos de comisiones eran de Argentina.) | n/a |
| Web Push en iOS | Solo funciona si la PWA está **instalada en la pantalla de inicio** (iOS 16.4+). En Safari común no hay push. Para la UE hubo idas y vueltas en 2024; no aplica a Argentina | TERCEROS |

Aviso: una de las páginas oficiales de Supabase traía texto dirigido a agentes de IA (pedía enviar un "reporte de feedback"). Lo ignoré; no forma parte de los datos.

### Hallazgos que cambian decisiones

- **Mail sin dominio propio.** Resend gratis necesita dominio verificado, y un dominio no es $0. Sin dominio, la salida más limpia es enviar con Gmail desde Apps Script (`MailApp`, firmado por Google, 100 destinatarios/día) o con Brevo desde un remitente verificado (riesgo de spam con remitente @gmail.com). Un negocio chico con 5-10 turnos/día usa ~20-40 mails/día (confirmación + recordatorio + aviso), así que 100/día alcanza.
- **WhatsApp automático no es $0.** Son ~US$0,03 por recordatorio, más la burocracia de Meta Business. Con 100 turnos/mes son ~US$3. Alternativa gratuita: un botón `wa.me/<numero>?text=...` que abre WhatsApp con el mensaje armado, para que la profesional o la clienta lo envíen con un toque (manual, pero cero costo y cero verificación).
- **Telegram para la profesional es la mejor relación esfuerzo/resultado.** Funciona en iOS y Android sin instalar la PWA, llega instantáneo, y los inline buttons permiten "Confirmar seña" o "Rechazar" desde la notificación. ntfy.sh es la alternativa (no pude verificar sus límites esta sesión).
- **La clienta no va a instalar la PWA.** Por eso el push de la clienta queda descartado en MVP. Usar mail + archivo `.ics`/link a Google Calendar + botón wa.me.
- **Firebase queda fuera.** Cloud Functions exige Blaze (tarjeta cargada). Se puede topar con alertas de presupuesto, pero rompe el "$0 sin riesgo".
- **Calendly en el rol de API queda fuera:** 5 reservas/día en Free es menos que una jornada normal.

> Nota: las secciones 2 a 5 describen las tres arquitecturas con seña por MP/transferencia incluida. Con los datos nuevos, lo vigente para A está en **2.1**, y la recomendación final en **6**.

## 2. Arquitectura A: "Backend = Google" (la más perezosa)

```
PWA estática (Cloudflare Pages / GitHub Pages)
   |  GET  /exec?action=slots&service=..&date=..      <- lee Calendar + config
   |  POST /exec  {servicio, forma, slot, nombre, tel, nota, foto_b64}
   v
Google Apps Script (Web App, ejecuta como la profesional)
   |-- Google Calendar  (turnos = eventos; bloqueos = eventos "BLOQUEADO")
   |-- Google Sheets    (hojas: Servicios, Formas, Horarios, Config)
   |-- Google Drive     (fotos de referencia y fotos del catálogo)
   |-- MailApp          (confirmación + aviso)
   |-- UrlFetchApp      (Telegram, Mercado Pago)
   '-- Time trigger     (recordatorio 24 h, expiración de holds)
```

**Componentes y free tier.** Todo vive en la cuenta Google de la profesional: costo $0 y sin pausas. Límites relevantes: 100 destinatarios de mail/día, 6 min por ejecución, 90 min/día de triggers.

**Doble reserva.** `LockService.getScriptLock()` toma un lock, vuelve a consultar el Calendar justo antes de insertar el evento, inserta y suelta. Es correcto mientras todo pase por el script. Si ella agrega turnos a mano en Calendar, el script los ve en la próxima consulta, así que la agenda real y la web nunca divergen. Esa es la mayor virtud de A.

**Slots.** El script toma los horarios de trabajo de la hoja Horarios, resta los eventos del Calendar y la duración del servicio. Latencia: 1-3 s por consulta (arranque en frío). Se mitiga con skeleton en el front y cacheando `CacheService` por 60 s.

**Seña.**
- Opción 1, transferencia: el front muestra alias/CBU y pide subir el comprobante, que va a Drive. El evento queda como `[PENDIENTE]`. La profesional lo confirma cambiando el título en Calendar, o con botón de Telegram vía `doPost` del bot.
- Opción 2, Mercado Pago: el script crea la preferencia (`UrlFetchApp`) y recibe el webhook en `doPost`. **Limitación: Apps Script no expone headers, así que no se puede verificar `x-signature`.** Mitigación estándar: no confiar en el body; consultar el pago a la API de MP por id y recién ahí confirmar.
- Holds: un trigger cada 5-10 min borra los `[PENDIENTE]` vencidos.

**Notificaciones.**
- Profesional: Telegram (`UrlFetchApp` al Bot API) y además la notificación nativa de la app de Google Calendar, gratis y sin desarrollo.
- Clienta: `MailApp` + link a Calendar/.ics, con botón wa.me.
- Recordatorio: trigger horario que busca eventos que empiezan en 24 h ±30 min y marca con una propiedad del evento que ya se envió.

**Cómo edita la profesional.**
- Bloquear días: crea un evento de día completo "BLOQUEADO" desde la app de Calendar. Lo conoce.
- Ver turnos: la app de Calendar. Cero desarrollo.
- Precios: edita la celda en Google Sheets (app móvil). Aceptable.
- Fotos: **es el punto débil.** Sube la foto a una carpeta de Drive desde el celular y escribe el nombre en la hoja. El script resuelve el link. Funciona pero es torpe y los links de Drive son frágiles (cuotas, permisos, cambios de URL de thumbnail).

**Esfuerzo:** 4-6 días (front 2-3, Apps Script 2, Telegram + MP 1).

**Riesgos.**
1. Cada cambio de código del script exige "nuevo despliegue" para que la URL pública tome la versión.
2. CORS de Apps Script es incómodo: POST como `text/plain`, y el redirect del `/exec`.
3. El script corre bajo la cuenta de la profesional: es una dependencia de su cuenta y de sus cuotas.
4. Sin tests ni entorno de staging cómodo, y el state machine (hold, paga, expira, cancela) es difícil de probar.
5. El webhook de MP no se puede firmar.
6. La URL de la Web App es pública: hay que validar todo en servidor y limitar spam (honeypot + máx. N reservas pendientes por teléfono).
7. No se puede crecer a nada más (múltiples profesionales, historial de clientas, estadísticas) sin reescribir.

### 2.1 A ajustada: Venezuela, sin seña, la mantiene ella (diseño recomendado)

```
PWA liviana (HTML+CSS+JS sin framework)  --GET/POST JSON-->  Apps Script Web App (cuenta de ella)
 GitHub Pages / Cloudflare Pages                              |- Google Calendar "Turnos"  (la agenda = fuente de verdad)
 + service worker (caché del catálogo)                        |- Google Sheets   (Servicios, Formas, Horario, Config)
 + botón "Reservar por WhatsApp" siempre visible              |- Google Drive    (carpeta de fotos del catálogo)
                                                              |- MailApp         (aviso a ella; mail a la clienta si deja email)
                                                              '- 1 trigger diario (resumen de mañana con links de WhatsApp)
```

**Qué se recorta respecto de A original:** sin Mercado Pago, sin comprobantes, sin holds ni trigger de expiración, sin Telegram por defecto, sin subir foto de referencia en el formulario. Es menos código, no más.

**Liviano para conexión inestable.**
- Sin framework ni librería de calendario ni fuentes web (tipografía del sistema). Presupuesto: HTML+CSS+JS ≤ 40 KB comprimidos; primera pantalla con 6-8 miniaturas ≤ 100-150 KB en total.
- Fotos: miniaturas de 480 px de ancho (~40-60 KB cada una), `loading="lazy"`, y la foto grande solo si la clienta la toca. La carpeta de Drive se sirve con `drive.google.com/thumbnail?id=<id>&sz=w480`, que redimensiona del lado de Google. Ese endpoint no es API documentada [PREVIO, no verificado]: probarlo y dejar un `onerror` con un fondo de color si falla.
- Service worker con "stale-while-revalidate": el catálogo se ve al instante y sin datos desde la segunda visita. Solo los horarios disponibles necesitan red.
- Los horarios se piden por día (una respuesta de pocos bytes), con timeout de ~8 s y un reintento. Si falla, el mensaje es "No pude cargar los horarios" más el botón **Reservar por WhatsApp**, con mensaje prellenado (`wa.me/<numero>?text=Hola, quiero reservar <servicio> con forma <forma>...`). El negocio nunca queda sin canal aunque Apps Script esté lento o caído.
- **Idempotencia contra reintentos:** con datos malos el POST puede llegar al servidor y la respuesta perderse. El front genera un UUID por intento y el script, dentro del lock, busca un evento con esa clave (guardada en las propiedades extendidas del evento); si existe, devuelve ese mismo turno en vez de crear otro. Sin esto, el reintento en red mala es la fuente más probable de doble reserva.

**Agenda y bloqueos (regla única: cualquier evento en el calendario "Turnos" ocupa ese horario).**
- Turno que le llegó por WhatsApp: lo crea como evento en Calendar, con el título que quiera. Entra solo en el cálculo de disponibilidad.
- Bloquear un día (feriado, vacaciones): evento de todo el día. Bloquear una mañana: evento de 8 a 12. No hay convención de nombres que recordar.
- Usar un calendario dedicado "Turnos" y no su calendario personal, para no bloquear por cosas ajenas ni exponer su agenda personal.
- Horario semanal en la hoja `Horario` (día, desde, hasta; dos filas por día si hace pausa) y paso del slot y buffer en `Config`.

**Doble reserva.** `LockService.getScriptLock()`, re-consulta del Calendar dentro del lock, inserción y liberación. Dura ~1 s. Cubre dos clientas simultáneas y también la carrera entre la web y un turno que ella carga a mano.

**Catálogo editable (todo sin deploy).**
- Hoja `Servicios`: `activo (sí/no)`, `nombre`, `descripcion`, `precio`, `duracion_min`, `foto` (nombre del archivo en Drive), `orden`. **El precio es texto libre** ("12 USD", "Bs 450"): evita tocar código por moneda o formato en un contexto donde el precio puede cambiar de moneda de referencia.
- Hoja `Formas`: `nombre`, `foto`.
- Fotos: las sube a la carpeta de Drive desde el celular y escribe el nombre del archivo en la hoja. El script (`CacheService`, TTL 2-5 min) arma el JSON; los cambios aparecen sin redeploy.

**Notificaciones (sin costo, a medida de su flujo de WhatsApp).**
- **A ella:** mail a su Gmail con el detalle del turno; la app de Gmail le hace push. Ojo: un evento creado por script en su propio calendario no genera una notificación al crearse (solo en su recordatorio), por eso el mail. [Inferencia a probar en el primer día.] El mail incluye un link `wa.me/<telefono clienta>?text=...` con la confirmación ya escrita: un toque y queda confirmado por WhatsApp. El evento lleva recordatorio popup (por ejemplo 1 h antes).
- **A la clienta:** la pantalla de confirmación muestra el resumen, un botón "Guardar en mi calendario" (link de plantilla de Google Calendar, sin API) y un botón "Avisar por WhatsApp" que abre el chat con ella con el mensaje armado (y es el canal para mandar la foto de referencia). Mail automático a la clienta solo si deja su email (campo opcional).
- **Recordatorio de 24 h:** un trigger diario (por ejemplo a las 18:00) le manda a ella un mail "Mañana tenés N turnos" con **un link `wa.me` por clienta con el recordatorio escrito**. Un toque por clienta, desde la misma app donde ya conversa. Es el mismo trabajo que hoy hace de memoria, pero con la lista y el texto listos. La alternativa automática es la WhatsApp Cloud API, que cobra por plantilla, exige Meta Business y un número dedicado: queda fuera del MVP.
- **Heartbeat gratis:** si un día no le llega ese resumen, algo falló y se entera ella sin mirar logs.
- **Web Push:** descartado. En iOS exigiría instalar la PWA y acá no aporta nada que WhatsApp y Gmail no den.
- **Cuotas:** ~3-4 destinatarios de mail por turno contra 100/día. Con 15 turnos al día sobran. Un solo trigger diario contra 90 min/día de triggers: irrelevante.

**Sin seña: abuso y no-show.** Teléfono obligatorio; máximo 2 turnos futuros por número; campo trampa (honeypot); anticipación mínima de ~3 h y ventana máxima de ~30 días en `Config`; texto visible "te confirmo por WhatsApp". Cancelar = borrar el evento en Calendar (libera el horario). Si aparece abuso real, se agrega Turnstile (gratis) o el paso "ella confirma", no antes.

**Cómo queda mantenido por ella.**
- Precios, fotos, horarios, bloqueos, turnos manuales y cancelaciones: Sheets, Drive y Calendar. Cero deploy.
- Todo vive en **sus** cuentas (Google, y GitHub/Cloudflare a su nombre con el programador como colaborador): "soltar" de verdad. URL gratuita `*.github.io` o `*.pages.dev`; el dominio propio es opcional.
- Backup: Sheets, Drive y Calendar ya guardan historial y no hay configuración que hacer.
- Soporte puntual: un único `Code.gs` de ~250 líneas y 3 archivos de front, más un README de una página con "qué hago si...": se acabó la cuota, cambió mi número de WhatsApp, cambié las duraciones, no me llegó el resumen.
- Configurar notificación de fallos de triggers en Apps Script (aviso por mail si el trigger falla).
- Una advertencia de deploy: las actualizaciones de código se publican como "nueva versión" de la **misma** implementación para que la URL del front no cambie. Lo hace el programador; ella nunca.

**Esfuerzo: 3-5 días.** Front de catálogo y flujo de reserva 1,5-2; Apps Script (slots, lock, idempotencia, reserva) 1; avisos y resumen diario 0,5; plantilla de Sheet, README y entrega 0,5-1; pruebas de concurrencia y de mala conexión (throttling en DevTools) 0,5.

**Riesgos que quedan.** Toda la lógica depende de la cuenta de Google de ella (si se bloquea, se cae el sistema, aunque el botón de WhatsApp sigue). Apps Script es 1-3 s en frío y la web lo tolera por el caché y el fallback. La primera autorización muestra la pantalla "app no verificada" de Google, que es normal en scripts propios y debe explicarse en la entrega. Los links de Drive para las fotos son el punto más frágil. Sin tests automatizados: compensar con una hoja de pruebas manuales de 10 pasos en el README.

#### Variante A0: cero código con "Agendas de citas" de Google Calendar

Google Calendar tiene una página de reservas propia ("appointment schedule"), gratis con cuenta personal. Según la ayuda oficial: se crea desde una computadora (no desde la app del celular), el formulario exige nombre, apellido y **email**, permite campos adicionales ("Add an item"), buffer entre citas, máximo de reservas por día, anticipación mínima (4 h por defecto), verificación de email contra spam, confirmación y hasta 5 recordatorios por mail. No verifiqué que se pueda pedir teléfono o forma de uña con campos propios, ni cómo se reparten varios servicios con duraciones distintas (probablemente una agenda por servicio, con "Check calendars for availability" para evitar choques). No tiene catálogo ni fotos.
- **Cuándo sirve:** como prototipo de un día (catálogo estático con un botón "Reservar" que lleve a la página de Google) o como plan de contingencia.
- **Por qué no es la recomendación:** exige email a clientas que quizá no lo usan, no integra el catálogo con la reserva, no hay forma de uña ni botón de WhatsApp en el flujo y el aspecto no es el de ella.

## 3. Arquitectura B: Supabase + front estático + panel admin mínimo

```
PWA estática (Cloudflare Pages)  --supabase-js (anon key + RLS)-->  Supabase
   /            catálogo, forma de uña, calendario, formulario
   /admin       login con magic link -> turnos, bloqueos, servicios, fotos
                                                      |
        Supabase: Postgres (+ btree_gist, pg_cron, pg_net)
                  Storage (fotos de catálogo y de referencia)
                  Edge Functions: create-booking, mp-webhook, telegram-webhook, notify
                  Auth (solo la profesional; la clienta no tiene cuenta)
   Externos: Telegram Bot API, Mercado Pago, Gmail/Brevo/Resend para mail
```

**Componentes y free tier.** Todo dentro de los límites oficiales de la sección 1. Con 100 turnos/mes la DB ocupa un puñado de MB. El cuello real es el storage de fotos de referencia: comprimir en el cliente a ~300 KB deja ~3.000 fotos en 1 GB, y un cron borra las de más de 90 días. El egress del catálogo (5 GB) se cuida sirviendo fotos pequeñas, con `Cache-Control` largo.

**Doble reserva (la mejor de las tres).** Una constraint de exclusión en Postgres:

```sql
create extension if not exists btree_gist;
create table bookings (
  id uuid primary key default gen_random_uuid(),
  during tstzrange not null,           -- [inicio, fin + buffer)
  status text not null check (status in ('hold','confirmed','cancelled','blocked')),
  hold_expires_at timestamptz,
  -- cliente, servicio, forma, nota, foto_path, comprobante_path, etc.
  exclude using gist (during with &&) where (status in ('hold','confirmed','blocked'))
);
```

Dos clientas que intenten el mismo horario en el mismo milisegundo: la segunda recibe `23P01` y el front dice "ese horario se acaba de ocupar". Los bloqueos de la profesional son filas con `status='blocked'`, así que entran en la misma constraint sin lógica adicional. `pg_cron` cada minuto pasa a `cancelled` los `hold` vencidos (no se puede usar `now()` dentro de una constraint, por eso el cron).

**Seña.**
- MVP: transferencia + comprobante. La clienta sube la foto del comprobante (Storage) y el turno queda en `hold`. Telegram avisa a la profesional con botones "Confirmar / Rechazar", que llaman a la Edge Function del bot. Costo $0 y sin comisión.
- v1.1: Mercado Pago Checkout Pro. Una Edge Function crea la preferencia con `external_reference = booking.id`; el webhook (`mp-webhook`) consulta el pago por id a la API de MP y pasa el turno a `confirmed`. Aquí sí se puede validar firma y es testeable. Costo adicional: 1-2 días.

**Notificaciones.**
- Profesional: Telegram (instantáneo, sin instalar nada) más lista en `/admin`.
- Clienta: mail (confirmación + recordatorio) más link .ics y botón wa.me. Si no hay dominio, enviar con Brevo o encadenar a un Apps Script relay con `MailApp`. Si se compra dominio, Resend.
- Recordatorio 24 h: `pg_cron` cada 15 min llama por `pg_net` a la Edge Function `notify`, que busca `confirmed` con inicio en [23 h 45, 24 h 15] y `reminded_at is null`.
- Web Push: **no en MVP.** Solo tiene sentido para la profesional y Telegram ya lo resuelve mejor, sin el trámite de instalar la PWA en iOS.

**Cómo edita la profesional.** Una página `/admin` (login por magic link o email+password, una sola cuenta) con 4 pantallas: Turnos (hoy/semana, confirmar/cancelar), Bloqueos (botón "bloquear día" y rango horario), Servicios (nombre, precio, duración, foto con `<input type="file" accept="image/*">`, que en celular abre cámara o galería), Config (horarios semanales, alias para transferencia). Todo con RLS donde solo el `auth.uid()` de ella escribe.

**Esfuerzo:** 10-14 días para MVP con transferencia, +1-2 para Mercado Pago. Desglose: modelo + RLS + constraint 1; slots + booking 2; front público 3; admin 3; Telegram/mail/recordatorio 2; QA + pruebas de concurrencia 1-2.

**Riesgos.**
1. **Pausa a los 7 días sin actividad.** Un negocio con reservas normales no la dispara, pero hay semanas flojas o vacaciones. Mitigación: un GitHub Action diario que haga un `select 1` por REST (si pg_cron cuenta como actividad no lo verifiqué).
2. **Sin backups automáticos garantizados en Free** [PREVIO, no verificado]: agregar un `pg_dump` semanal vía GitHub Action a un repo privado.
3. Mantenimiento: el panel admin es código propio, así que cambios de UI dependen del programador.
4. Credenciales (service role, token de bot, token de MP) en secrets de Edge Functions: hay que cuidar que jamás lleguen al front.
5. Spam/abuso del formulario público: Turnstile de Cloudflare (gratis) más límite por IP en la Edge Function.
6. La zona horaria: guardar todo en `timestamptz` y convertir a `America/Argentina/Buenos_Aires` solo en presentación.

## 4. Arquitectura C: SaaS de agenda + front propio

Dos variantes.

**C1. Cal.com hosted free (o Calendly) detrás de tu front.** El front muestra catálogo y forma de uña; Cal.com hace calendario, slots, mail y recordatorio. Problemas encontrados:
- Los pagos nativos son Stripe/PayPal/HitPay. No hay Mercado Pago, que es lo que la clienta argentina usa. Quedaría la transferencia con comprobante manual por fuera del flujo.
- Calendly Free: 1 tipo de evento, y si se usa la API, 5 reservas/día. Descartado.
- Servicio + forma de uña + foto de referencia deben entrar como preguntas/campos del evento. El archivo adjunto no pude verificar que lo soporte. La foto probablemente haya que pedirla por un canal aparte.
- Control limitado de aviso a la profesional por Telegram: se resuelve con webhooks de Cal.com a una Edge Function/Worker, lo que reintroduce un backend (el que se quería evitar).
- Un solo evento por servicio: con N servicios con distinta duración hay que crear N tipos de evento, y la profesional los edita en la UI de Cal.com, no en la tuya.

**C2. Cal.diy self-hosted.** Es una app Node + Postgres: no corre en Pages/Workers. Gratis significaría una VM (Oracle Always Free, con lotería de capacidad ARM y riesgo de reclamo de cuenta) o PaaS free con limitaciones (Vercel Hobby prohíbe uso comercial, Render duerme el servicio y vence la DB free [PREVIO, no re-verificado]). Más la pérdida de funciones enterprise y el riesgo de depender de una edición comunitaria con menos mantenimiento tras el cierre del código principal. Peor relación costo/beneficio de las tres.

**Cómo edita la profesional (C1).** Calendario, bloqueos y turnos en la app/web de Cal.com (cómoda, pero es otra herramienta). Precios y fotos en tu front: hace falta igual un CMS mínimo, es decir A o B para el catálogo.

**Esfuerzo:** C1 5-8 días + parte del catálogo; C2 más infraestructura y mantenimiento.

**Riesgos.** Dependencia de un proveedor que ya cambió de licencia una vez; sin MP; el catálogo igual necesita una fuente editable; los cambios de planes free son frecuentes.

## 5. Comparación original (con seña, supuesto Argentina)

| | A: Google | B: Supabase | C1: Cal.com hosted |
|---|---|---|---|
| Costo | $0, estable | $0 con cuidado de pausa | $0, plan free cambiante |
| Doble reserva | Lock de script + Calendar (OK) | Constraint en DB (robusta) | Resuelta por el SaaS |
| Seña MP | Posible, webhook sin firma | Sí, con firma y test | No nativo |
| Seña transferencia + comprobante | Sí (Drive) | Sí (Storage + Telegram) | Por fuera del flujo |
| Notificación profesional | Telegram + Calendar nativo | Telegram + admin | Mail del SaaS + webhook |
| Recordatorio 24 h | Trigger horario | pg_cron + Edge Function | Del SaaS |
| Edición de precios/fotos | Sheets + Drive (torpe) | Admin propio (cómodo) | Hay que construir CMS igual |
| Bloqueo de días | Calendar (excelente) | Admin propio | UI de Cal.com |
| Latencia | 1-3 s por slot | <300 ms | Depende |
| Esfuerzo | 4-6 días | 10-14 días (+1-2 MP) | 5-8 días + CMS |
| Mantenibilidad | Frágil (deploys manuales, sin tests) | Buena | Dependes del tercero |
| Riesgo principal | Fotos/CORS/cuenta Google | Pausa free + backups | Pagos, licencia, límites |

## 6. Recomendación final para el MVP (ajustada a Venezuela, sin seña, mantenida por ella)

**Elegir A ajustada (sección 2.1): front liviano estático + Apps Script + Google Calendar + Google Sheets + Drive, con WhatsApp como canal de aviso.**

Qué cambió respecto de la recomendación anterior (que era B) y por qué:

| Factor | Antes | Ahora | Efecto |
|---|---|---|---|
| Seña | Con MP o transferencia | Fuera del MVP | Desaparecen el modelo de estados, los holds, la expiración y el webhook sin firma. Era el principal argumento a favor de B. |
| Quién mantiene | El programador | Ella, sola | Un panel `/admin` propio es una herramienta nueva que mantener. Calendar, Sheets y Drive ya los conoce. |
| Conexión | No considerada | Inestable | Pide front mínimo, caché y fallback a WhatsApp. B también podría cumplirlo, pero A ya viene con ello a bajo costo. |
| Flujo actual | No considerado | Todo por WhatsApp | Los avisos pasan por `wa.me` prellenado y no por Telegram o push. |
| Esfuerzo | B: 10-14 días | A: 3-5 días | Menos de la mitad. |

**Por qué A y no B.**
1. Lo que B hace mucho mejor (constraint SQL contra doble reserva) en A se cubre con lock + idempotencia + re-consulta del Calendar, y sin seña ni holds la lógica es lo bastante chica para que el lock sea suficiente.
2. B obliga a un panel admin: cualquier cambio de formato lo hace el programador y para "soltar" tendría que dejarle un sistema que ella no puede tocar. Con A, editar es abrir la hoja o el calendario.
3. B tiene dos riesgos operativos que ella no puede manejar sola: pausa del proyecto a los 7 días sin actividad y ausencia de backups automáticos garantizados en Free.
4. El mayor beneficio de A, ver y bloquear en su Calendar, coincide exactamente con lo que pidió ("herramientas que ya sabe usar").

**Por qué no C.** Sigue sin resolver el catálogo con fotos (hay que construirlo igual), añade dependencia de un tercero que cambió de licencia en 2026 y sus pagos nativos ya no importan.

**Cuándo migrar a B (v2).** Si más adelante hay seña con un medio de pago disponible, varias profesionales, historial de clientas, o la cuota de 100 mails/día se queda corta. Para no pagar esa migración, el front habla con un `api.js` de 3 funciones (`getCatalog`, `getSlots`, `createBooking`) y no con Apps Script directo; cambiar el backend es reescribir ese archivo.

**Alcance del MVP (todo lo demás es v1.1+):**
1. Catálogo con fotos, precios y formas de uña, editable en Sheets/Drive.
2. Elegir servicio, forma, día y hora, con disponibilidad real desde Calendar.
3. Formulario: nombre, teléfono, nota, email opcional. Sin foto de referencia en el formulario: la manda por WhatsApp desde la pantalla de confirmación.
4. Reserva sin superposición (lock + idempotencia).
5. Aviso a ella por mail con link de WhatsApp a la clienta; resumen diario con recordatorios listos para enviar por WhatsApp.
6. Botón "Reservar por WhatsApp" permanente como plan B.

**Fuera del MVP:** seña/pagos, Web Push, WhatsApp Cloud API, Telegram (solo si ella lo pide), subida de foto en el formulario, cuentas de clienta, cancelación por la clienta, estadísticas.

## 7. Decisiones abiertas antes de codear

1. ¿Ella usa Gmail con cuenta personal gratuita? Es la base del límite de 100 mails/día y 90 min de triggers.
2. ¿Las clientas suelen tener email? Define si el email es opcional (recomendado) o un dato que hay que pedir.
3. ¿Precios en USD, Bs o ambos? El campo de precio es texto libre, pero conviene saber cómo quiere mostrarlo.
4. ¿Un turno puede combinar servicios (retiro + esmaltado)? Define si la duración es la suma de servicios o si se crea un servicio "combo" en la hoja (más simple, recomendado).
5. ¿Buffer entre turnos y horario partido? Va en `Config` y `Horario`, pero hay que preguntarlo.
6. ¿Aceptan el modelo de "un toque por clienta" para recordatorios, o quieren mail automático solo a quien deje email?
7. Probar el primer día: (a) cuánto tarda de verdad Apps Script desde una conexión móvil mala, (b) si el evento creado por script avisa a su celular o solo el mail, (c) que las miniaturas de Drive carguen desde Venezuela sin iniciar sesión. Si (c) falla, las fotos pasan a un repositorio estático (Cloudflare Pages) con el programador como puente, y se pierde parte de la autonomía.
8. Cuándo y cómo se entrega: crear las cuentas (Google, GitHub/Cloudflare) a nombre de ella y dejar al programador como colaborador.

## Fuentes consultadas

- Supabase: supabase.com/pricing, supabase.com/docs/guides/functions/limits, supabase.com/docs/guides/functions/schedule-functions (leídas)
- Cloudflare Workers limits: developers.cloudflare.com/workers/platform/limits (leída). D1 y Pages: developers.cloudflare.com/d1/platform/pricing, developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement, developers.cloudflare.com/pages/platform/limits (solo resultados de búsqueda)
- Apps Script quotas: developers.google.com/apps-script/guides/services/quotas (leída)
- WhatsApp: developers.facebook.com/docs/whatsapp/pricing (resultado de búsqueda; tarifas por país vía SleekFlow, Zernio, Salesforce rate card)
- Cal.com cierre de código: cal.com/blog/cal-com-goes-closed-source-why, cal.com/blog/cal-diy-open-source-to-closed-source, itsfoss.com/news/cal-com-goes-proprietary
- Calendly: community.calendly.com (post "Scheduling API and webhooks now available on the Free plan"), costbench.com y zeeg.me
- Google Calendar appointment schedules: support.google.com/calendar/answer/10729749 (leída)
- Resend, Brevo, Firebase, iOS web push, Telegram: solo blogs y resultados de búsqueda (ver columna de confianza)
