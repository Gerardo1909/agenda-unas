# Tu página de turnos: cómo se usa 💅

Tu página: **(acá va el link)**. Ponla en la bio de Instagram y en tu estado de WhatsApp.

Todo se maneja desde dos apps que ya tienes: **Google Sheets** (la planilla *Cupedia – turnos*) y **Google Calendar**, con tu cuenta de Google de Cupedia. No hay contraseñas nuevas.

## Antes de empezar: cómo lo dejamos listo (una sola vez)

Gerardo lo configura todo a distancia **con tu cuenta de Cupedia**, porque los turnos y los avisos tienen que llegarte a ti. Para eso:

1. **Pásale por WhatsApp el correo y la contraseña** de la cuenta de Cupedia. Es solo por un rato.
2. **Ten el celular a mano** mientras él entra. Google va a preguntarte "¿Estás intentando iniciar sesión?" o te va a mandar un código, porque ve un inicio de sesión desde Argentina. Toca **Sí, soy yo** o pásale el código. Si no respondes a tiempo, Google lo bloquea y hay que empezar de nuevo.
3. Si Google te avisa de "una app no verificada" o de un "inicio de sesión nuevo", es normal: es él configurando tu página.
4. Mientras tanto, en tu celular agrega la cuenta de Cupedia en las apps **Gmail** y **Google Calendar**, y activa sus notificaciones. Si no lo haces, no te van a llegar los avisos de reservas.
5. Cuando él te diga "listo", **cambia la contraseña** (Gmail → tu foto → *Gestionar tu cuenta de Google* → *Seguridad* → *Contraseña*). Desde ahí la cuenta queda solo tuya.
6. Hagan juntos una **reserva de prueba** desde la página y fíjate que te llegue el mail y aparezca en tu Calendar. Después borra ese evento.

## Cuando una clienta reserva

- Te llega un **mail** "💅 Nuevo turno…" con su nombre, el servicio, el día y su WhatsApp.
- En el mail hay un botón **Confirmarle por WhatsApp**. Se abre el chat con el mensaje ya escrito y solo tocas enviar.
- El turno aparece solo en tu **Google Calendar**, y **1 hora antes** te suena el celular.
- Todas las noches a las **8 pm** te llega un mail con los turnos de mañana. Cada uno tiene un botón **Recordarle** para mandarle el recordatorio a la clienta.

## Lo que haces tú

| Quiero… | Hago esto |
|---|---|
| **Cambiar un precio** | En la planilla, hoja **Servicios**, columna *Precio*. Pon solo el número: `10` |
| **Quitar un servicio** | En la columna *Activo* pon `FALSE`. Para volver a mostrarlo, pon `TRUE` |
| **Agregar un servicio** | Agrega una fila nueva con nombre, precio, duración en minutos (`60`, `90`) y `TRUE` en *Activo* |
| **Poner o cambiar una foto** | Sube la foto a **Google Drive**, toca ⋮ → *Compartir* → *Cualquier persona con el enlace* → *Copiar enlace*, y pégalo en la columna *Foto* |
| **No trabajar un día** | En **Calendar**, crea un evento **de todo el día** ("Libre", "Viaje"…). Ese día no se puede reservar |
| **Bloquear unas horas** | Crea un evento normal en Calendar a esa hora. Cualquier evento tapa ese horario |
| **Anotar un turno que te pidieron por WhatsApp** | Créalo en Calendar. Así nadie más reserva esa hora. Si quieres que salga en el resumen de las 8 pm, empieza el título con 💅 |
| **Cancelar o mover un turno** | Borra o mueve el evento en Calendar. El horario se libera solo |
| **Cambiar tu horario de atención** | Hoja **Horario**: día, hora que abres, hora que cierras (`09:00`, `18:00`). Para no atender un día de la semana, borra su fila |
| **Cambiar tu número o el nombre** | Hoja **Ajustes** |

Los cambios se ven en la página apenas la recargas.

## Consejos

- **Fotos:** solo sirven links de **Google Drive** compartidos con *Cualquier persona con el enlace*. Los de Instagram o Google Fotos no se ven; si una foto no carga, la página muestra un dibujo de color en su lugar.
- **Bloqueos:** créalos en tu calendario principal (el que tiene tu nombre). Los calendarios de otras personas o suscritos no bloquean.
- **Si un día no aparece en la página**, revisa la hoja **Horario**: que el día esté bien escrito (con o sin tilde da igual) y que las horas sean tipo `9:00` o `9am`.
- **Duración:** en minutos (`90`). También entiende `1h` o `1,5 h`.
- Las horas de la página son **hora de Venezuela**.

## No toques

- Los **títulos** de la primera fila de cada hoja (*Nombre, Precio…*).
- Los **nombres de las hojas** (*Servicios, Horario, Ajustes*).
- Lo que dice **Extensiones → Apps Script**.

Si algo deja de andar, escríbele a Gerardo 🙂
