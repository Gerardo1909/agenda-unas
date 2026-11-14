# Investigación: SaaS de reserva de turnos con plan gratuito

Para: manicurista independiente (una profesional), Latinoamérica, clientas por celular y WhatsApp.
Fecha de investigación: noviembre 2026.

## Metodología y advertencias

- **Fuente primaria:** páginas oficiales de precios, leídas con WebFetch. Donde la página oficial no respondió o era ambigua, se indica.
- **Fuentes secundarias:** comparativas de terceros (Koalendar, SchedulingKit, CostBench, Toolradar, etc.). Se usan solo como señal y se marcan como "no verificado en oficial".
- **Precios:** varias páginas oficiales muestran precios en moneda local según el país (ARS en Fresha y AgendaPro, EUR en Booksy España). No hay precios USD confiables para LATAM en la mayoría de los casos.
- **Limitación general:** ninguna herramienta gratuita verificada muestra fotos en el catálogo de servicios para el plan gratis. No se pudo confirmar en todos los casos.

## Tabla comparativa

Leyenda: **Sí / No / ? (no verificado)**. "Oficial" = leído en la página oficial. "Terceros" = solo en comparativas de terceros.

| Herramienta | Plan gratis vigente (oficial) | Límites del plan gratis | Fotos en servicios | Campos personalizados | Recordatorios gratis | Cobro de seña / pagos | Mercado Pago | Español / mobile / app profesional | Branding |
|---|---|---|---|---|---|---|---|---|---|
| **Setmore** | Sí, permanente | Hasta 4 usuarios; citas ilimitadas (oficial). Terceros dicen 200 citas/mes, contradicción no resuelta a favor de la oficial | ? | ? | Email sí. SMS no en gratis | Pagos con Square, Stripe, PayPal. **Depósitos no incluidos en gratis** | No | App móvil y para profesional: ? (no verificado en detalle) | Branding Setmore obligatorio en gratis |
| **Cal.com** | Sí, "$0 free forever" (oficial) | 1 usuario; "sin límites de uso" según oficial; "Unlimited links" | No mencionado | ? | Oficial menciona "Email & SMS notifications" sin especificar plan | Stripe y PayPal (oficial, plan no aclarado para gratis) | No | Orientado a desarrolladores/flexibilidad; interfaz en español: ? | Branding removible solo en planes pagos (inferido, no explícito) |
| **Calendly** | Sí (oficial) | 1 tipo de evento; 1 calendario conectado | No | Formulario personalizable: ? | No mencionado en gratis (solo Standard+) | **Stripe/PayPal solo en Standard o superior** | No | Mobile: ? | "Página de reserva personalizable" en gratis |
| **Google Calendar (Appointment schedules)** | Sí, 1 programación de citas (oficial/terceros) | 1 programación; crear la programación solo desde computadora | ? | Limitado | **Recordatorios por email y cobros: requieren Workspace de pago** (terceros) | Cobros con Stripe: requiere Workspace de pago | No | Gratis, sin WhatsApp | Sin branding propio |
| **SimplyBook.me** | Sí (oficial, "Free") | 50 reservas/mes; 1 proveedor (oficial) | No mencionado | ? | SMS no incluido en gratis; email: ? | Pagos y depósitos desde plan Basic (no en gratis) | No | Multilingüe: ? | Sin opción de branding en gratis (oficial) |
| **TidyCal** | Sí, indefinido (oficial en FAQ) | Reservas ilimitadas; 1 calendario conectado | No | ? | No mencionado; email: ? | **Stripe y PayPal en gratis, con 1% de comisión de plataforma** además de Stripe | No | Mobile: ? | Branding de TidyCal en gratis (oficial) |
| **Square Appointments** | Sí (terceros y oficial en sección de Free) | Personal ilimitado y sin tope de reservas según oficial. Koalendar dice 1 ubicación y 1 persona (contradictorio) | ? | ? | Oficial: "appointment reminders" en gratis, **canal no especificado**. Terceros dicen solo email en gratis, SMS en Premium | Procesamiento con Square; **disponibilidad en LATAM no verificada** | No | ? | ? |
| **Reservio** | Sí, "Free plan forever" (oficial) | Límite de reservas: 40/mes (solo terceros, no confirmado en oficial) | ? | ? | **SMS automáticos NO incluidos en gratis** (oficial) | ? | No | ? | ? |
| **Zoho Bookings** | Sí (oficial, free plan) | Clientes y citas ilimitados (oficial). **Cantidad de staff no confirmada**: 1 según terceros, hasta 3 según otro | ? | ? | No verificado en gratis | No verificado en gratis | No | Zoho en español: ? | Branding Zoho: no verificado en gratis |
| **AgendaPro** (Argentina, ARS) | **No hay plan gratis permanente**; solo prueba gratis (oficial/blog) | Prueba gratuita | No mencionado | ? | No gratis; WhatsApp: 50 mensajes/mes incluidos en Individual y Full; email ilimitado | **Integración con Mercado Pago en todos los planes** (oficial). Cobro de señas: add-on Recepcionista IA ARS 15.000/prof. | **Sí** | Español nativo. App móvil gratis (iOS/Android) | No mencionado |
| **Fresha** (Argentina, ARS) | **No, sin plan gratis** (oficial; 7 días de prueba). Terceros con datos viejos decían gratis | Independent: 1 profesional, reservas ilimitadas. Precio **ARS 8.000/mes** | No mencionado | ? | 20 mensajes gratis/mes; WhatsApp ARS 180-375 por mensaje extra | Fresha Payments (sin Mercado Pago). Comisión por cliente nuevo desde marketplace | No | Español, app móvil | Smart Website pago (ARS 15.500/mes) |
| **Booksy** | **No hay plan gratis verificado.** Prueba de 14 días según terceros. Oficial España: 7 días de prueba y **34,99 €/mes + IVA** | No aplica | No mencionado | ? | ? | Pagos con cargo de procesamiento; comisión solo si activa Boost | No verificado para LATAM | App Booksy Biz para profesional | ? |
| **Vagaro** | **No (mayoría de fuentes)**; prueba de 30 días. No verificado en oficial | No aplica | ? | ? | ? | ? | No | ? | ? |

Otras opciones (solo terceros, no verificadas en oficial):
- **Koalendar**: dice tener plan gratis permanente, pero reservas automáticas por WhatsApp y cobros automáticos están en plan Pro de pago (según su blog).
- **Replan**: calendario gratis; reservas por WhatsApp cuestan 79 €/mes aparte (según Replan, terceros).
- **Agendu**: recordatorios por WhatsApp; 30 días de prueba gratis; sin plan gratis verificado.

## Hallazgos principales

1. **Ningún plan gratis verificado incluye las tres cosas juntas**: fotos en servicios, WhatsApp gratis y Mercado Pago. Las herramientas latinoamericanas con Mercado Pago y WhatsApp (AgendaPro, Fresha) no tienen plan gratis.
2. **Los planes gratis más útiles** para una sola persona son Setmore (4 usuarios, citas ilimitadas, email) y Cal.com (permanente, 1 usuario). Ambos sin WhatsApp.
3. **Calendly, Google Calendar y Reservio** limitan el cobro y los recordatorios a planes pagos, por lo que no sirven para seña en el plan gratis.
4. **Cobro de seña**: solo Setmore, Cal.com y TidyCal tienen Stripe/PayPal en el plan gratis (y TidyCal cobra 1% adicional). No se confirmó ningún plan gratis con Mercado Pago.
5. **Fresha** cambió su modelo: el plan gratis fue eliminado (la oficial lo confirma); varias páginas de terceros siguen mostrando el plan gratis y están desactualizadas.

## Top 3 recomendado (plan gratis)

1. **Setmore**: el plan gratis más generoso verificado en oficial (4 usuarios, citas ilimitadas, email, pagos con Square/Stripe/PayPal). Cubre agenda y recordatorios por email. Límites: sin SMS, sin depósitos en gratis, branding de Setmore, y no se verificó fotos en servicios.
2. **Cal.com**: gratis para siempre (oficial), con pagos Stripe/PayPal y notificaciones por email/SMS. Límite: 1 usuario, orientado a usuarios técnicos; interfaz en español y WhatsApp no verificados.
3. **SimplyBook.me**: 50 reservas/mes en gratis (oficial), un proveedor, con interfaz multilingüe. Límite: sin pagos ni depósitos en gratis, SMS pago.

**Recomendación práctica para Latinoamérica con WhatsApp y Mercado Pago**: si la manicurista acepta pagar, **AgendaPro** (Argentina: plan Individual ARS 7.900/mes, 50 WhatsApp/mes incluidos, Mercado Pago integrado, español nativo) es el mejor ajuste verificado. Está fuera del top 3 gratis porque no tiene plan gratis permanente. Fresha Independent (ARS 8.000/mes) es comparable, pero cobra comisión por clientes nuevos del marketplace y WhatsApp extra a ARS 180-375 por mensaje.

## Datos no verificados (pendientes)

- Fotos en servicios para el plan gratis: no verificado en ninguna herramienta gratis (Setmore, Cal.com, SimplyBook, TidyCal, Square, Zoho).
- WhatsApp en plan gratis: no verificado en ninguna. Ninguna oficial gratis lo confirma.
- Staff de Zoho Bookings en plan gratis: 1 o 3, sin confirmar en oficial.
- Square Appointments: disponibilidad de su plan y de cobros en LATAM, y si los recordatorios gratis son SMS o email. Oficial ambigua; terceros contradictorios.
- Reservio: límite de 40 reservas/mes solo según terceros. Oficial no lo muestra.
- Booksy en LATAM: no se encontró precio oficial de Latinoamérica. Solo se leyeron precios de España.
- Cal.com: si los pagos Stripe/PayPal están en el plan gratis o solo en planes pagos (la página no lo deja claro).
- Setmore: 200 citas/mes (terceros) contra "citas ilimitadas" (oficial). Se tomó la oficial.
- Calendly: si el branding es removible en gratis (página ambigua).
- Google Calendar: lista de planes de Workspace que habilitan cobros/recordatorios (solo terceros).
- Calidad de interfaz móvil y app para la profesional, idioma español, y personalización de colores/logo: no evaluado en detalle para la mayoría; solo se anotó lo que confirmó la página oficial.
- Precios USD de LATAM: no disponibles para la mayoría. Las cifras de Argentina (ARS) son de la página oficial de ese país y no se extrapolaron a otros países.
