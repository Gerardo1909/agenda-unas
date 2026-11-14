# Agenda de uñas sin código: qué hace el "app de citas en Canva" y alternativas gratis

Fecha de la investigación: 14 de noviembre de 2026.

**Nota sobre fuentes:** las páginas de ayuda oficiales de Canva (canva.com/help y canva.com/design-school) devolvieron error 403 al intentar leerlas. Lo que sigue sobre Canva se basa en fragmentos de búsqueda y en páginas de terceros. Está marcado como **no verificado** cuando corresponde. Los precios y límites de las herramientas de terceros cambian; revisar siempre la página de precios del proveedor antes de decidir.

---

## Qué hace realmente el TikTok

**Resumen:** casi seguro que el calendario y la reserva son decorativos. La página se ve como una app, pero lo que hay es un diseño estático de Canva con botones y un formulario que, en el mejor caso, envía datos a algún lugar que nadie está revisando.

Desglose por elemento:

| Elemento | Qué es probablemente | Evidencia |
|---|---|---|
| Catálogo con fotos y precios | Texto e imágenes en una página de Canva Websites. Funciona bien y no requiere nada más. | Canva Websites es un constructor de sitios estáticos (ver abajo). |
| Selector de forma de uña | Imágenes o botones sin lógica. Se ven interactivos, pero no guardan nada. | Un selector que guarde datos requiere formulario o app. |
| Calendario y horarios disponibles | **Decorativo.** Canva Websites no tiene calendario de reservas nativo. Las apps de reserva que aparecen en el marketplace de Canva son de terceros (Glowful, Calendful, Booking by Glowful, Bookingmood, Common Ninja) y se agregan como widget o embed. **No verificado** en la documentación oficial de Canva. | Búsqueda de "Canva apps booking calendar": todos los resultados son apps o embeds de terceros. |
| Formulario (nombre, teléfono, notas) | Puede ser un **Canva Form** (formulario de Canva, que envía respuestas a Canva Sheets) o un elemento visual sin conexión. **No verificado** si el formulario de un sitio de Canva Websites envía a un destino real sin embed de terceros. | Canva ofrece formularios que guardan respuestas en Sheets (según fragmento de búsqueda de design-school). Un sitio sin embed no se conecta solo a ellos. |
| Link a WhatsApp | Funciona: es un enlace `wa.me/...` normal. | Sin dependencias. |
| "Anticipo obligatorio $100" con datos de pago | Texto. No cobra nada. El cobro real requiere pasarela (Mercado Pago, transferencia, etc.) y confirmación manual. | Sin pasarela, es solo información. |

**Qué pasa cuando una clienta llena el formulario:** en el caso de un diseño decorativo, nada. Si está conectado a un Canva Form, la respuesta llega a una hoja de cálculo que alguien tiene que revisar. Nada bloquea el horario, nada avisa a la profesional por defecto y nada impide que dos clientas reserven el mismo turno.

**Conclusión:** para una manicurista, el TikTok sirve como **catálogo y vitrina con link a WhatsApp**. No sirve como agenda.

### Límites de Canva Websites en plan gratis (fragmentos de búsqueda, no verificados en la página oficial)

- No se puede conectar **dominio propio**. El dominio dentro de Canva es del tipo `*.my.canva.site`.
- Máximo **5 sitios publicados** en el dominio gratis.
- Máximo **10 secciones por página** publicada (20 en edición).
- Aparece el pie "Designed with Canva" y no se puede quitar.
- El plan de pago con dominio propio (Canva Pro, aprox. US$119,99/año según reseñas de terceros) es el que lo habilita. Verificar precio vigente.
- Los formularios y las apps de terceros dependen de cada herramienta; el límite de respuestas de Canva Forms en gratis **no se encontró**.

---

## Alternativas no-code gratis que sí guardan reservas

Criterios: (a) guarda reservas reales, (b) evita doble reserva, (c) notifica a la profesional y a la clienta, (d) la dueña puede editarla sin ayuda.

### 1. Google Calendar "Página de reservas" (appointment schedules) + Google Sheets

- **Qué hace:** la clienta elige un horario libre en una página pública y el evento queda en el calendario de la profesional.
- **Evita doble reserva:** sí. Según Google, la página se actualiza sola cuando se agregan eventos a los calendarios vinculados. **Verificado a nivel de documentación de Google Workspace, pero el texto citado viene de páginas de marketing.**
- **Límite gratis:** una sola página de reservas, con un tipo de cita. Para varias formas de uña con duraciones distintas, el plan gratis queda corto.
- **Precios y fotos:** no tiene catálogo. Se combina con una página de Canva o Carrd que tenga el botón de reserva.
- **Notificaciones:** la profesional recibe el evento en su calendario; la clienta recibe confirmación por correo (si deja su email).
- **Mantenimiento para no técnica:** muy fácil. Cambiar horarios, bloquear días y ver citas se hace desde Google Calendar en el celular.
- **Limitación:** no cobra anticipo y no guarda teléfono/notas de forma ordenada si la clienta no los pide en el formulario de reserva.

### 2. Jotform con campo "Appointment" + Google Calendar (sincronización)

- **Qué hace:** formulario con campo de citas que muestra horarios disponibles, guarda la reserva y la escribe en el calendario.
- **Evita doble reserva:** sí. Jotform indica sincronización de dos vías con Google Calendar y Outlook que bloquea horarios ya ocupados. **Verificado en la página de Jotform Appointments (marketing).**
- **Plan gratis:** el campo de citas y la sincronización aparecen como incluidos en el plan gratis según Jotform. Límites de terceros (no verificados en la página de precios): 5 formularios, 100 envíos por mes, 500 envíos guardados en total.
- **Notificaciones:** Jotform envía email a la profesional y a la clienta al reservar.
- **Mantenimiento:** medio. Cambiar horarios se hace en la configuración del formulario; no es tan intuitivo como Google Calendar.
- **Riesgo:** si se pasa de 100 envíos por mes, el formulario deja de aceptar reservas hasta el mes siguiente o hasta pagar.

### 3. Tally + Google Calendar (o Sheets)

- **Qué hace:** formulario bonito con campos (nombre, teléfono, forma de uña, fecha, hora, notas). Envía las respuestas a Google Sheets o a un email.
- **Evita doble reserva:** **no**, Tally no tiene calendario. Hay que revisar la hoja a mano o usar Zapier/Make para escribir en el calendario, y ahí tampoco hay bloqueo automático de horarios ocupados.
- **Plan gratis:** según varias reseñas de 2026, sin límite fijo de envíos (con cláusula de "uso justo" sin definir). Precio Pro según fuentes: alrededor de US$24-29 por mes. **No verificado** en tally.so/pricing.
- **Notificaciones:** Tally envía email a la profesional y puede enviar confirmación a la clienta.
- **Mantenimiento:** fácil para el formulario; el control de horarios es manual.
- **Uso recomendado:** pedido de turno (solicitud), no reserva confirmada.

### 4. Glide / Softr con base de datos (Airtable o Google Sheets)

- **Qué hace:** app con catálogo, fotos, precios, horarios y reserva que escribe en una base de datos. Se ve como app de verdad en el celular.
- **Evita doble reserva:** sí, si la lógica de reserva lo verifica (se configura con una regla o filtro de disponibilidad). Requiere configuración.
- **Plan gratis:** las fuentes se contradicen.
  - Glide: plan gratis sirve para explorar; **publicar** la app requiere plan pago desde aprox. US$25/mes (fuente de terceros). **No verificado.**
  - Softr: plan gratis descrito con límites de usuarios y registros, y con un número de créditos de IA. Límites no coinciden entre fuentes. **No verificado.**
- **Notificaciones:** depende de la configuración (email o automatización).
- **Mantenimiento:** medio-difícil. Cambiar precios y fotos es fácil dentro de la base; cambiar la lógica de horarios no es trivial. Es la opción más cercana a una "app", pero la más frágil para alguien que no programa.

### 5. Notion (base de datos + formulario de Notion)

- **Qué hace:** formulario de Notion que escribe filas en una base de datos con vista de calendario.
- **Evita doble reserva:** **no**, Notion no bloquea horarios en el formulario.
- **Plan gratis:** Notion es gratis para uso personal con límites de bloques de IA y colaboradores. **No verificado** en la página de precios.
- **Notificaciones:** no hay notificación de nuevo formulario a la clienta; sí a la profesional, por la app de Notion.
- **Uso recomendado:** agenda interna para la profesional, no para clientas.

### 6. Linktree / Beacons / Carrd con booking embebido

- **Qué hace:** página de enlaces o landing con botón de reserva. El booking real lo hace una app externa (Calendly, Google Calendar, Common Ninja).
- **Evita doble reserva:** depende de la app de reserva que se embeba.
- **Plan gratis:** Carrd gratis tiene límite de sitios y sin dominio propio; Linktree/Beacons tienen funciones de booking en planes pagos. **No verificado** en páginas de precios.
- **Mantenimiento:** fácil para la página. La reserva vive en otra herramienta.

### 7. WhatsApp Business (app gratuita) con catálogo, etiquetas y respuestas rápidas

- **Qué hace:** catálogo de productos y servicios (hasta 500 según una fuente), etiquetas para ordenar conversaciones, respuestas rápidas guardadas (hasta 50 según fuentes), mensaje de ausencia programado.
- **Evita doble reserva:** **no**. Las conversaciones no bloquean horarios. Se usa una agenda externa (Google Calendar) para evitarlo.
- **Plan gratis:** la app es gratis. Hay controversia sobre conversaciones gratis al mes; según una fuente hay 1.000 conversaciones gratis mensuales, pero la API oficial tiene costos por volumen. **No verificado** en Meta.
- **Notificaciones:** la profesional recibe mensajes en el celular; la clienta recibe confirmación por chat. Es el canal que ya usan la mayoría de las clientas.
- **Mantenimiento:** muy fácil. Es lo más cercano a lo que ya usa una manicurista.
- **Recomendación de uso:** complemento, no sistema de reservas.

---

## Tabla comparativa

| Opción | Reservas reales | Evita doble reserva | Notifica a profesional y clienta | Catálogo y fotos | Fácil para no técnica | Plan gratis |
|---|---|---|---|---|---|---|
| Canva Websites (TikTok) | No | No | No | Sí | Muy fácil | Sí, con límites (sin dominio propio) |
| Google Calendar (página de reservas) | Sí | Sí | Sí (email y calendario) | No (necesita página aparte) | Muy fácil | Sí, una sola página |
| Jotform + Calendar | Sí | Sí (sync) | Sí | Parcial | Media | Sí, con límite de envíos (terceros) |
| Tally + Sheets | No (solicitud) | No | Sí (email) | No | Fácil | Sí, uso justo (terceros) |
| Glide / Softr + base | Sí | Sí (con configuración) | Sí (con config) | Sí | Media-difícil | Parcial, publicar suele ser de pago (terceros) |
| Notion | No | No | Parcial | No | Media | Sí (no verificado) |
| Carrd / Linktree + booking | Depende de la herramienta | Depende | Depende | Sí | Fácil | Sí, con límites (no verificado) |
| WhatsApp Business | No | No | Sí (chat) | Sí (catálogo) | Muy fácil | Sí (app gratis) |

---

## Recomendación

**Combinación más práctica para una manicurista sin conocimientos técnicos, gratis:**

1. **Google Calendar "Página de reservas"** como sistema de citas. Evita doble reserva, avisa a la profesional y a la clienta, y se edita desde el celular. Limitación: una sola página de reservas.
2. **Página de catálogo** en Canva Websites (o Carrd) con fotos, precios y un botón "Reservar" que apunta a la página de Google Calendar, más un botón de WhatsApp para preguntas. Este es el uso correcto para el TikTok: vitrina, no agenda.
3. **WhatsApp Business** con catálogo, respuestas rápidas (confirmación de cita, recordatorio del anticipo, dirección) y etiquetas ("pagó anticipo", "confirmada", "reprogramar").
4. **Anticipo de $100:** cobrar por transferencia o Mercado Pago con link de pago; confirmar en WhatsApp antes de bloquear el turno en el calendario. Sin pasarela, el anticipo es manual y hay que decirlo claramente.

**Si necesita formulario con datos ordenados** (nombre, teléfono, forma de uña, notas): Jotform con campo de citas (plan gratis, si el volumen cabe en 100 envíos por mes) o Tally con Google Sheets, sabiendo que Tally no bloquea horarios.

**Cuándo pasar a algo más serio:** si se acumulan más de una profesional, más de 100 reservas al mes o necesita cobrar anticipo automático, conviene un sistema de reservas dedicado (Fresha, Booksy, Agenda Pro o similares) que tienen plan gratis para un solo profesional. **No investigado en esta tarea.**

---

## Lo no verificado (resumen)

- Que el calendario del TikTok sea decorativo: inferido, no se pudo abrir el video ni la página de Canva.
- Que Canva Websites no tenga calendario nativo: inferido de que el marketplace ofrece apps de terceros para ese fin. Confirmar en la ayuda oficial de Canva (403 al intentar leerla).
- Límite de respuestas de Canva Forms en plan gratis: no encontrado.
- Límites del plan gratis de Jotform, Tally, Glide, Softr: fuentes de terceros que se contradicen entre sí.
- Precios de Canva Pro, Tally Pro, Glide Basic y Softr: no verificados en las páginas oficiales.
- Conversaciones gratis de WhatsApp Business: fuentes contradictorias; verificar en Meta.
- Funcionamiento exacto del sync de Jotform y Google Calendar con el plan gratis: no probado.
