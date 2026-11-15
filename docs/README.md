# Cupedia: probar, mostrar y entregar

Esta guía es para vos (el programador). Tiene tres partes:

1. **Probarlo con tus datos:** tu Gmail, tu Calendar, tu Drive y tu WhatsApp.
2. **Pruebas manuales:** la lista de lo que hay que ver funcionando antes de grabar el video.
3. **Entregárselo a ella:** pasar todo a su cuenta de Google.

Para ella hay una hoja aparte, más corta: [guia-para-ella.md](guia-para-ella.md).

## Cómo funciona

```
Clienta (celular)
   │  abre la página (GitHub Pages, gratis)
   ▼
app/index.html ──fetch──► Apps Script (Web App de la cuenta de Google de la dueña)
                              ├─ lee la Google Sheet: Servicios · Horario · Ajustes
                              ├─ lee y crea eventos en su Google Calendar (= los turnos)
                              └─ le manda mails a ella (Gmail = notificación en el celular)
```

- **La cuenta que despliega el script es la dueña de todo.** El script corre "como yo", o sea, como quien hizo *Implementar*. Los turnos van al Calendar de esa cuenta y los mails salen hacia esa misma cuenta. Por eso, para la prueba despliega tu cuenta y para la entrega despliega la de ella (ver Parte C).
- **La página es la misma para los dos.** Lo único que cambia es la línea `const API_URL = '…'` en `app/index.html`.
- **Sin `API_URL`, la página corre en modo demo:** datos de ejemplo y reservas que no se guardan. Sirve para mostrarla sin tocar nada real.

---

## Parte A: probarlo con tus datos (~30 min)

### A1. Planilla y script

1. Andá a [sheets.new](https://sheets.new) con tu cuenta de Google y ponele de nombre **Cupedia – turnos (prueba)**.
2. Abrí **Extensiones → Apps Script**. Borrá lo que haya y pegá el contenido de `app/Code.gs`. Ponele de nombre al proyecto **Cupedia**.
3. Entrá a ⚙️ **Configuración del proyecto** y tildá *Mostrar el archivo de manifiesto "appsscript.json"*. Volvé al editor, abrí `appsscript.json` y reemplazalo por el de `app/appsscript.json` (deja la zona horaria `America/Caracas`: es la de toda Venezuela, Maracaibo incluida).
4. En el editor elegí la función `setup` y tocá **Ejecutar**. Google te va a pedir permisos:
   - Te va a decir *"Google no verificó esta app"*. Es normal, porque el script es tuyo: **Configuración avanzada → Ir a Cupedia (no seguro) → Permitir**.
   - Pide permisos para la planilla, Calendar, enviar mails y ejecutar cuando no estás. Son exactamente los que usa.
5. Volvé a la planilla. Tienen que aparecer tres hojas nuevas: **Servicios**, **Horario** y **Ajustes**. En **Ajustes** cambiá:
   - `negocio` → `Cupedia`;
   - `whatsapp` → tu número, como lo escribirías en Venezuela (`0414…`) o en internacional. Si no es venezolano, cambiá también `codigo_pais` (por ejemplo `54` para Argentina);
   - `subtitulo` → lo que quieras que salga abajo del nombre.

> **Ojo con tener varias cuentas de Google abiertas en el navegador.** Apps Script a veces se confunde y abre el editor con otra cuenta. Si ves errores raros de permisos, usá una ventana de incógnito con una sola cuenta.

### A2. Publicar el script como Web App

1. En el editor tocá **Implementar → Nueva implementación**. En el engranaje elegí **Aplicación web**.
2. Completá así:
   - **Ejecutar como:** *Yo*;
   - **Quién tiene acceso:** *Cualquier persona*.
3. Tocá **Implementar** y copiá la **URL de la aplicación web**. Termina en `/exec`.
4. Probala en el navegador agregándole `?action=catalog` al final. Tenés que ver un JSON con `"negocio":"Cupedia"` y los servicios.

**Si cambiás `Code.gs` más adelante:** andá a **Implementar → Gestionar implementaciones → ✏️ → Versión: Nueva versión → Implementar**. Así la URL no cambia. Si en cambio hacés *Nueva implementación*, se genera una URL nueva y hay que actualizar `API_URL`.

### A3. Conectar la página

1. En `app/index.html`, pegá la URL en `const API_URL = 'https://script.google.com/macros/s/…/exec';`.
2. Hacé commit y push a `main`. GitHub Pages se actualiza solo en uno o dos minutos.
3. Abrí `https://gerardo1909.github.io/agenda-unas/`. El cartel de "modo demostración" ya no tiene que aparecer.

> La URL `/exec` no es secreta: cualquiera que abra la página la puede ver. No es un problema, porque solo permite leer el catálogo y los horarios libres, y crear reservas validadas.

### A4. Tu celular

- **Gmail:** notificaciones activadas para la bandeja principal. Ojo: si el mail cae en *Promociones* o *Notificaciones*, no suena. Si pasa, abrí el mail y movelo a *Principal*.
- **Google Calendar:** notificaciones activadas. El recordatorio de 1 h antes sale de ahí.

---

## Parte B: pruebas manuales

Hacelas en orden, con la página publicada abierta en el celular. Marcá cada una.

| # | Prueba | Qué hacés | Qué tiene que pasar |
|---|---|---|---|
| 1 | Catálogo | Abrís la página | Aparece Cupedia y los servicios de la hoja **Servicios**, con precio y duración |
| 2 | Reserva | Reservás un turno para mañana con otro nombre y tu número | Pantalla "¡Turno reservado!". El evento `💅 Nombre · Servicio` aparece en tu Calendar |
| 3 | Mail | — | Te llega "💅 Nuevo turno…" y **suena en el celular**. Anotá cuánto tardó |
| 4 | WhatsApp desde el mail | En el mail tocás *Confirmarle por WhatsApp* | Se abre WhatsApp con el chat de la clienta (tu número) y el texto ya escrito. **Lo mandás vos con un toque.** Nada se envía solo |
| 5 | WhatsApp desde la página | Tocás *Consultas por WhatsApp* y, después de reservar, el botón de foto de referencia | Se abre el chat con el número de Ajustes y el texto prellenado |
| 6 | Sin superposición | Recargás la página y elegís el mismo día | El horario reservado (y los que se pisan con su duración) ya no aparecen |
| 7 | Bloquear horas | En Calendar creás un evento cualquiera, por ejemplo "Dentista" de 15 a 16 h | Esas horas desaparecen de la página |
| 8 | Bloquear día | Creás un evento **de día completo** ("Vacaciones") | Ese día queda sin horarios |
| 9 | Cancelar | Borrás el evento de la prueba 2 | El horario vuelve a aparecer |
| 10 | Cambiar precio | En **Servicios** cambiás un precio y recargás la página | El precio nuevo se ve al instante (no hay que reimplementar nada) |
| 11 | Sacar un servicio | Ponés `FALSE` en **Activo** | Desaparece de la página |
| 12 | Agregar un servicio | Agregás una fila nueva con nombre, precio y duración | Aparece. Sin foto muestra un dibujo de color |
| 13 | Foto desde Drive | Subís una foto a Drive, la compartís como *Cualquier persona con el enlace* y pegás el link en **Foto** | La foto se ve en la tarjeta. Si no la compartiste, se ve el dibujo y no un ícono roto |
| 14 | Horario de atención | En **Horario** borrás el sábado | El sábado aparece deshabilitado |
| 15 | Resumen diario | En el editor de Apps Script ejecutás `resumenDiario` a mano (con un turno para mañana) | Te llega "Mañana tenés 1 turno" con un botón *Recordarle* que abre WhatsApp. Lo mismo pasa solo todos los días a las 20 h |
| 16 | Recordatorio 1 h | Reservás un turno para dentro de 2–3 h | 1 h antes te suena Calendar en el celular |
| 17 | Doble reserva | Abrís la página en dos celulares y reservás la misma hora casi a la vez | Uno entra y el otro ve "Ese horario se acaba de ocupar" |
| 18 | Conexión lenta | En Chrome de escritorio: DevTools → Network → *Slow 3G*, y reservás | Tarda, pero no se duplica el turno |

**Para el video:** grabá el celular haciendo la prueba 2, mostrá cómo llega el mail (3) y el botón de WhatsApp (4). Después mostrá la planilla cambiando un precio (10) y el Calendar bloqueando un día (8). Con eso se entiende todo.

**Al terminar:** borrá los eventos de prueba de tu Calendar. Si no vas a seguir usando tu despliegue, en Apps Script entrá a **Activadores** y borrá el de `resumenDiario`, así no te llegan mails a las 20 h.

---

## Parte C: entregárselo a ella

Lo importante: **los pasos de script y despliegue los tiene que hacer su cuenta de Google**, no la tuya. Si vos implementás estando logueado con tu cuenta, aunque la planilla sea de ella, los turnos se crean en *tu* Calendar y los mails te llegan a *vos*.

Lo más simple es hacerlo juntos por videollamada, o con ella prestándote el celular o la compu ya logueada.

### C1. Con la cuenta de ella

1. Ella crea la planilla **Cupedia – turnos** desde su cuenta (o la creás vos en su compu) y te la comparte como **Editor**. Así podés ayudarla después.
2. Se repiten los pasos **A1 y A2 logueados como ella**: pegar `Code.gs`, el manifiesto, ejecutar `setup`, aceptar permisos e implementar. El aviso de "app no verificada" le va a salir a ella; explicale que es normal porque el script es suyo.
3. Completan **Ajustes** (su WhatsApp, el nombre) y **Servicios** con sus precios y fotos reales.

### C2. Apuntar la página a su script

1. Cambiás `API_URL` en `app/index.html` por la URL `/exec` de ella, y hacés commit y push.
2. Hacen una reserva de prueba juntos y verifican que le llegue el mail **a ella**.
3. Borrás tu planilla de prueba (o al menos el activador de `resumenDiario` de tu script).

### C3. ¿Dónde vive la página?

- **Opción simple (recomendada):** sigue en tu GitHub. Ella no necesita tocarlo nunca, porque todo lo que cambia (precios, fotos, horarios, bloqueos) vive en su planilla y su Calendar. Solo vos tocás el repo si hay que cambiar el diseño.
- **Si querés soltarlo del todo:** transferís el repo a una cuenta de GitHub de ella (*Settings → Transfer ownership*) o subís `app/index.html` a Netlify Drop (arrastrar y soltar, gratis). La URL cambia, así que avisale para que actualice el link de su Instagram o WhatsApp.
- **Dominio propio:** opcional y pago. No hace falta.

### C4. Después de entregar

- **Ella puede, sola:** cambiar precios, servicios, fotos, horarios y bloqueos, y anotar turnos que le piden por WhatsApp creándolos en Calendar.
- **Te va a necesitar a vos para:** cambios de diseño en la página o cambios en `Code.gs` (después de un cambio en `Code.gs`: *Gestionar implementaciones → Nueva versión*, logueado como ella o con acceso de editor al script).
- **Si "la página no carga horarios":**
  1. Abrí la URL `/exec?action=catalog`. Si da error, en Apps Script fijate en **Ejecuciones** cuál fue el error.
  2. Lo más común es que Google haya pedido volver a autorizar. Se arregla ejecutando `setup` una vez.
  3. Otra causa común es una fila mal escrita en la planilla.

## Límites de la cuenta gratuita

- **Mails:** unos 100 por día. Alcanza de sobra para avisos de reservas más el resumen diario.
- **Tiempo de respuesta:** Apps Script tarda entre 1 y 3 s por pedido. Es normal; la página muestra "Buscando horarios libres…".
- **Uso:** si algún día tiene varias profesionales o quiere cobrar una seña online, eso ya es otra arquitectura (ver `investigacion/03-arquitectura-custom.md`).
