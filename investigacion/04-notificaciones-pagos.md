# 04 - Notificaciones, seña y privacidad (manicurista independiente, VENEZUELA)

Fecha de la investigación: 2026-11-14. Reemplaza la versión anterior (AR/MX).
Leyenda: **[V]** = confirmado en página oficial o con varias fuentes coincidentes. **[NV]** = no verificado: una sola fuente de terceros, fuentes en conflicto, o dato que no pude abrir. Los precios de Meta cambian por trimestre: confirmar antes de comprometer presupuesto.

---

## 0. Resumen ejecutivo

| Necesidad | Recomendación | Costo |
|---|---|---|
| Aviso a la profesional (nueva reserva) | La clienta toca un link `wa.me` prellenado al terminar la reserva y le escribe a la profesional. Respaldo: Telegram bot o email. | 0 |
| Confirmación + recordatorio a la clienta (MVP) | Panel con botón "Enviar recordatorio" que abre `wa.me/58...?text=...` con el mensaje ya redactado; ella toca enviar desde su WhatsApp Business. | 0 |
| Automático (fase 2, si hace falta) | WhatsApp Cloud API con plantillas *utility*, tarifa "Rest of Latin America". | Aprox. US$2,3 a 2,6 por 200 mensajes [rango NV] |
| Seña (ya no es requisito del MVP) | Pago Móvil / transferencia en Bs., Zelle o USD en efectivo, con captura del comprobante y confirmación manual de un toque. | 0 de la plataforma |
| Privacidad | Aviso corto + casilla de consentimiento + mínimo de datos. Art. 28 de la Constitución (habeas data). | 0 |

Respuesta corta: **WhatsApp es el canal, pero sin API al principio.** Los links `wa.me` y las respuestas automáticas de WhatsApp Business cuestan 0 y llegan por donde ya mira todo el mundo. La API es barata en mensajes pero agrega un paso de cobro en dólares a Meta con tarjeta internacional, que en Venezuela puede ser el cuello de botella (ver 1.1).

---

## 1. Notificaciones

### 1.1 WhatsApp Cloud API (Meta) para Venezuela

**Venezuela (+58) está en el mercado "Rest of Latin America"** de la tarifa de Meta, junto con Bolivia, Costa Rica, Rep. Dominicana, Ecuador, El Salvador, Guatemala, Haití, Honduras, Jamaica, Nicaragua, Panamá, Paraguay, Puerto Rico y Uruguay. No tiene fila propia. [V] https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing

**Modelo de cobro [V]**: desde el 1/jul/2025 Meta cobra por mensaje de plantilla entregado (no por conversación), según categoría y país del destinatario. No cobra lo no entregado ni los mensajes que envía la clienta.

**Cambios del 1/oct/2026 según la página de Meta [V]**
- Cada número de negocio tiene **1.000 mensajes de servicio gratis por mes** (no se acumulan). Desde el 1.001 se cobran. Sin método de pago cargado, Meta entrega solo los gratis. Fuente: la misma página.
- Las plantillas *utility* enviadas **dentro** de una ventana de 24 h abierta **ya se cobran** (eran gratis desde jul/2025). También lo dice https://teramont.net/blog/whatsapp-business-platform-service-message-pricing-2026. Un FAQ de Leadsales dice lo contrario, así que ese punto tiene conflicto [NV].
- Los mensajes libres (no plantilla) solo se pueden mandar dentro de las 24 h posteriores al último mensaje de la clienta.
- Las tarifas del mercado "Rest of Latin America" no aparecen entre los cambios de jul y oct 2026 en la página de Meta, o sea que la tarifa de oct/2025 probablemente sigue [NV, deducción mía].

**Tarifa por mensaje entregado, USD, Rest of Latin America [NV: terceros en conflicto; Meta enlaza un CSV/PDF sin poner el número en la página]**

| Fuente | Utility | Marketing | Service (pasado el gratis) |
|---|---|---|---|
| Leadsales, rate card 1/oct/2026 (https://leadsales.io/en/tools/whatsapp-api-pricing-calculator/) | 0,0113 | 0,0740 | 0,0113 |
| Gupshup, rate card oct/2025 (https://www.gupshup.ai/resources/wp-content/uploads/2025/10/USD_Oct2025.pdf) | 0,0113 | 0,0740 | n/d |
| SleekFlow, 1/oct/2026 (https://help.sleekflow.io/en_US/pricing) | 0,0130 | 0,0851 | 0,0113 |
| Otra guía citada en búsqueda | 0,0119 | 0,0777 | n/d |
| ChatDaddy, "aprox. por conversación" (https://chatdaddy.tech/blog/whatsapp-business-api-venezuela) | 0,02 a 0,04 | 0,05 a 0,07 | aprox. 0,01 |

Dos fuentes que coinciden (Leadsales y Gupshup) dan **utility US$0,0113** y marketing US$0,0740. Lo tomo como referencia y el rango real es **US$0,0113 a 0,0130**. Bajar el PDF oficial de Meta antes de decidir. ChatDaddy está en términos de "conversación", que ya no es el modelo vigente; lo ignoro para el cálculo.

**Cuenta (supuesto: 100 turnos/mes, 2 plantillas utility por turno = 200 mensajes)**
- 200 x 0,0113 a 0,0130 = **US$2,26 a 2,60 por mes**. Más barato que en Argentina y más caro que en México.
- Respuestas libres a la clienta dentro de 24 h: entran en los 1.000 gratis mensuales.
- No usar plantillas *marketing* para recordatorios: cuestan unas 6 veces más (US$0,074 vs 0,0113) y exigen opt-in.

**Requisitos [parcialmente V]**
- Cartera Meta Business, cuenta de developer, cuenta WhatsApp Business (WABA), número de teléfono, token con permisos `whatsapp_business_messaging` y `whatsapp_business_management`, y plantillas aprobadas (https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).
- Una cartera sin verificar parte con tope de **250 contactos únicos iniciados por el negocio cada 24 h**; verificar lo sube (2.000 según la mayoría de las fuentes, otros dicen 1.000 [NV]). Para una independiente 250 sobra: https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits
- ChatDaddy afirma que **no hay restricciones por país** que bloqueen la API a negocios venezolanos y que Meta pide verificación de empresa (dato de un proveedor, [NV]; contradice en parte el punto anterior de que verificar no es obligatorio para empezar, así que preguntar a Meta).
- **Cobro a Meta**: las tarifas se facturan en **dólares** salvo que Meta ofrezca moneda local; para Venezuela no encontré moneda local ni método de pago específico (https://whatsapp.com/legal/FB-terms-whatsapp-business). Meta acepta tarjetas Visa/Mastercard/Amex con cargos internacionales habilitados; PayPal no sirve para la API (guías de proveedores, p. ej. https://wolkvox.helpjuice.com/es_CO/como-cambiar-el-metodo-de-pago-whatsapp-apicloud) [NV]. No encontré nada sobre bloqueos de bancos venezolanos ni sanciones que afecten ese pago: **es el riesgo principal a confirmar** (tarjeta internacional en USD de un banco venezolano, o tarjeta prepago/virtual de otro origen).
- **Coexistence** (app WhatsApp Business y API en el mismo número) existe desde mayo 2025 [NV, solo proveedores; no hay datos de disponibilidad para Venezuela]: https://leadsales.io/blog/whatsapp-coexistence/. Sin ella, la API exige un número que no esté ya registrado en la app.
- Hace falta un backend que dispare los recordatorios programados: costo de armado y mantenimiento, no solo de mensajes.

### 1.2 WhatsApp Business (app gratuita): respuestas automáticas

- Mensaje de bienvenida (a contactos nuevos o tras 14 días de inactividad), mensaje de ausencia con horario, respuestas rápidas (límite citado: 50), etiquetas y catálogo (hasta 500 ítems). Todo gratis y sin API [NV: blogs, p. ej. https://whatsform.com/blog/whatsapp-business-features/ y https://trengo.com/blog/whatsapp-business-features].
- Uso concreto: bienvenida con el link de la agenda ("Reservá acá: ..."), ausencia fuera de horario, respuesta rápida "/direccion" y "/seña", etiqueta "seña pagada", catálogo con servicios y precios.
- **No** dispara mensajes programados desde la agenda, y las respuestas automáticas son solo bienvenida y ausencia (no responden por palabras clave).

### 1.3 Links `wa.me` prellenados (costo 0)

- Formato oficial: `https://wa.me/<número internacional, solo dígitos>?text=<texto con URL-encode>`. Sin ceros, paréntesis ni guiones. Sin número abre la lista de contactos. [V] https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat
- **Número venezolano**: código `58` + número sin el cero inicial. Ej. `0414-1234567` pasa a `584141234567`. Operadoras móviles: 0412, 0414, 0424, 0416, 0426. [NV: es conocimiento general, aplicando la regla oficial de "sin ceros"]. Normalizar al guardar: quitar espacios y guiones, quitar el 0 inicial, anteponer 58.
- Dos usos:
  1. **Aviso a la profesional**: tras reservar, la web muestra "Avisale a [nombre] por WhatsApp" con texto prellenado ("Reservé el sábado 15/11, 3:00 pm, manicure semipermanente. Código ABC123"). Llega a su WhatsApp Business sin costo y abre la ventana de 24 h. Limitación: depende de que la clienta toque el botón.
  2. **Confirmación y recordatorio**: el panel lista los turnos de mañana, cada uno con un botón que abre `wa.me/<clienta>?text=...` con el recordatorio listo. Un toque por turno; es manual.

### 1.4 Email

| Servicio | Cuota gratis | Fuente | Estado |
|---|---|---|---|
| Resend | 100/día y 3.000/mes | https://resend.com/docs/knowledge-base/account-quotas-and-limits | V |
| Brevo | 300/día (aprox. 9.000/mes), con marca | https://www.sequenzy.com/pricing/brevo | NV |
| Gmail / Apps Script | 100 destinatarios/día (gmail.com); 1.500/día (Workspace) | https://developers.google.com/apps-script/guides/services/quotas | V |

Sobran en volumen. Como canal principal sirve poco (la clienta no mira el correo, hay spam y habría que pedir el email, un campo más). Úsalo de respaldo y para avisarle a ella.

### 1.5 Telegram, ntfy, Web Push, SMS

- **Telegram bot**: Bot API gratis, unos 30 mensajes/seg en total y 1 por seg por chat (https://core.telegram.org/bots/faq) [V]. Sirve para avisarle a la profesional (ella abre el bot y toca Start, regla conocida, [NV]). No para clientas.
- **ntfy**: el topic funciona como contraseña; sin registro (https://docs.ntfy.sh/publish/). Límites y app iOS sin confirmar [NV].
- **Web Push**: gratis. En iPhone solo con iOS 16.4 o superior y con el sitio agregado a la pantalla de inicio (https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide) [NV: blogs]. No sirve para clientas.
- **SMS** (Twilio, por segmento): **Venezuela US$0,2257** (https://www.twilio.com/en-us/sms/pricing/ve) [V como precio de lista]. 200 SMS = aprox. US$45, unas **17 a 20 veces** una plantilla de WhatsApp. Descartado.

### 1.6 Comparación y decisión

| Canal | Costo/200 avisos | Llega a la clienta | Esfuerzo | Rol |
|---|---|---|---|---|
| `wa.me` desde el panel | 0 | Alta | Bajo | **MVP, principal** |
| WhatsApp Business app (bienvenida/ausencia) | 0 | Alta | Mínimo | Complemento |
| WhatsApp Cloud API | aprox. US$2,3 a 2,6 | Alta | Alto (Meta + backend + plantillas + cobro en USD) | Fase 2 |
| Email | 0 | Media a baja | Bajo | Respaldo |
| Telegram bot | 0 | Solo profesional | Bajo | Aviso a ella |
| SMS | aprox. US$45 | Alta | Medio | No |

---

## 2. Seña (sección corta; ya no es requisito del MVP)

### 2.1 Qué no aplica

- **Mercado Pago**: no encontré a Venezuela entre los países donde opera. Un artículo reciente lista ocho (Argentina, Brasil, México, Chile, Colombia, Perú, Uruguay, Ecuador) y otro blog dice que no se lanzó en Venezuela; un agregador (aboutpayments) sí lo lista [NV]. La página oficial de países dio error 403. Conclusión práctica: **no contar con él**.
- **Stripe**: no aparece Venezuela en la página de países soportados (https://stripe.com/global, solo vi Brasil y México en LATAM). Varias fuentes de terceros lo ubican entre los países no soportados por regulaciones de EE. UU. y alcance de pagos; ninguna cita la lista oficial completa [NV]. **Contar con que no está disponible.**
- **Zelle**: exige que **emisor y receptor** tengan cuentas bancarias en EE. UU. (https://www.pnc.com/insights/es/personal-finance/spend/what-is-zelle.html , https://info.bankofamerica.com/es/digital-banking/zelle). Solo sirve si la profesional tiene (o un familiar le presta) una cuenta estadounidense [V].

### 2.2 Qué sí: opciones prácticas

| Método | Cómo | Notas |
|---|---|---|
| **Pago Móvil** (Bs.) | La clienta paga desde su app bancaria al teléfono, cédula y banco de la profesional y manda la **referencia** | Comisión mínima Bs. 14 desde el 31/jul/2026 (Gaceta Oficial, el número cambia según la fuente) y topes aprox. 0,30% P2P, 1,5% P2C, hasta 2% C2P [NV: https://finanzasdigital.com/bcv-publica-nuevas-tarifas-bancarias-y-modifica-comisiones-de-pago-movil/ y https://eldiario.com/2026/08/16/comisiones-bancarias-bcv/]. No encontré el límite diario vigente |
| **Transferencia en Bs.** | Datos de cuenta de la profesional | Más lenta de verificar; igual referencia |
| **USDT / Binance Pay** | Monto en USDT | Binance Pay sin comisión citada para comercios no confirmada hoy [NV]; hay también Crixto + Binance Pay en puntos de venta, con dudas sobre el tipo de cambio aplicado (https://lapatilla.com/2025/08/08/crixto-y-binance-pay-cinco-claves-sobre-su-acuerdo-para-pagos-con-usdt-en-venezuela/) |
| **Zelle** | Solo con cuenta en EE. UU. | Ver arriba |
| **USD en efectivo** | Al llegar | Sin verificación previa: no sirve como seña antes de reservar |

### 2.3 Flujo mínimo de confirmación manual

1. La clienta reserva; el turno queda `pendiente_seña` y bloqueado un tiempo (p. ej. 2 horas; ajustar a cómo trabaja ella).
2. La web muestra los datos de pago (Pago Móvil: banco, teléfono, cédula; USDT: dirección/red; Zelle si aplica) y el monto en USD con la equivalencia en Bs. al tipo de cambio BCV del día (la tasa cambia; guardar con qué tasa se calculó).
3. La clienta sube la **captura** y escribe la **referencia** (últimos dígitos). Guardar la imagen y evitar datos de más (la captura trae cédula y saldo).
4. La profesional ve en el panel "pendiente de confirmar", compara con su app bancaria (monto + referencia) y toca **Confirmar**; el estado pasa a `confirmada` y sale el aviso por `wa.me`. Si no confirma antes del vencimiento, el turno se libera.
5. Para evitar reuso, bloquear referencias repetidas.
6. Una captura sola es falsificable: la profesional debe mirar su saldo, no el comprobante.

Dejar escrita la **política de seña** (monto, si se devuelve y con cuántas horas de aviso) visible antes de pagar.

---

## 3. Privacidad mínima (Venezuela)

> No es asesoramiento legal.

Venezuela no tiene ley general de protección de datos personales ni autoridad de control; el marco es el **art. 28 de la Constitución de 1999 (habeas data)**, que da derecho a conocer qué datos se tienen, su finalidad, y a pedir rectificación, actualización o supresión; la Sala Constitucional del TSJ ha dicho que carece de desarrollo legislativo y lo tramita por amparo [NV: fuentes secundarias, no revisé la Gaceta; ejemplo https://vlexvenezuela.com/vid/yanuario-roberto-sousa-guerrero-283386263]. En la práctica: pedir solo nombre y teléfono, una casilla de consentimiento y un aviso de una línea ("usamos tu teléfono solo para confirmar y recordar tu turno; escribinos para que lo borremos"), sin guardar datos de salud ni fotos innecesarias, y panel con contraseña.

---

## 4. Lista de lo no verificado

1. Tarifa exacta de WhatsApp para Venezuela (Rest of Latin America): utility entre 0,0113 y 0,0130, marketing entre 0,0740 y 0,0851; bajar el PDF oficial de Meta.
2. Si las plantillas utility dentro de la ventana de 24 h se cobran desde el 1/oct/2026 (Meta y Teramont dicen que sí, un FAQ de Leadsales dice que no).
3. Cómo paga una venezolana a Meta (tarjeta internacional en USD, bancos locales, tarjetas virtuales) y si hay obstáculos por sanciones; ChatDaddy dice que no hay restricciones por país.
4. Si hace falta verificar la empresa para operar desde Venezuela, y si Coexistence está disponible.
5. Mercado Pago y Stripe en Venezuela: sin lista oficial abierta; dos fuentes conflictivas para Mercado Pago.
6. Comisiones y límites diarios vigentes de Pago Móvil por banco; número exacto de la Gaceta del 31/jul/2026.
7. Binance Pay: comisiones actuales para comercios.
8. Formato `wa.me` para números venezolanos (deducción de la regla oficial).
9. Brevo (300/día), ntfy, Web Push en iOS, Telegram Start, límites de Apps Script como backend.
10. Estado del art. 28 y ausencia de ley: confirmar con un abogado local si el negocio crece.

## 5. Fuentes principales

- Meta, precios (incluye lista de países de Rest of Latin America): https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing
- Meta, Cloud API: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
- Meta, límites: https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits
- Condiciones de Meta (facturación en USD): https://whatsapp.com/legal/FB-terms-whatsapp-business
- WhatsApp, click-to-chat: https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat
- Tarifas WA (terceros): https://leadsales.io/en/tools/whatsapp-api-pricing-calculator/ , https://help.sleekflow.io/en_US/pricing , https://www.gupshup.ai/resources/wp-content/uploads/2025/10/USD_Oct2025.pdf , https://teramont.net/blog/whatsapp-business-platform-service-message-pricing-2026 , https://chatdaddy.tech/blog/whatsapp-business-api-venezuela
- Twilio SMS Venezuela: https://www.twilio.com/en-us/sms/pricing/ve
- Resend: https://resend.com/docs/knowledge-base/account-quotas-and-limits
- Apps Script: https://developers.google.com/apps-script/guides/services/quotas
- Telegram: https://core.telegram.org/bots/faq
- Stripe países: https://stripe.com/global
- Zelle: https://www.pnc.com/insights/es/personal-finance/spend/what-is-zelle.html
- Pago Móvil: https://finanzasdigital.com/bcv-publica-nuevas-tarifas-bancarias-y-modifica-comisiones-de-pago-movil/
- Binance/Crixto: https://lapatilla.com/2025/08/08/crixto-y-binance-pay-cinco-claves-sobre-su-acuerdo-para-pagos-con-usdt-en-venezuela/
