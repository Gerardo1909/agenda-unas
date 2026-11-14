# Turnos de uñas: puesta en marcha (~30 min, costo $0)

Todo se hace con la cuenta de Google de ella, y vos quedás como editor.

1. **Planilla:** ella crea una Google Sheet vacía y te la comparte como editor.
2. **Script:** en la planilla, Extensiones → Apps Script. Pegá `Code.gs`. En Configuración del proyecto activá "Mostrar appsscript.json" y pegá el de acá (zona horaria Caracas).
3. **Instalar:** ejecutá `setup` una vez. Crea las hojas Servicios, Horario y Ajustes con ejemplos, y el resumen diario de las 20 h. Google va a mostrar "app no verificada": Avanzado → Ir. Es normal porque el script es de ella.
4. **Publicar:** Implementar → Nueva implementación → Aplicación web. Ejecutar como: *yo*. Acceso: *cualquier persona*. Copiá la URL.
5. **Página:** pegá esa URL en `API_URL` dentro de `index.html` y subí el archivo a GitHub Pages, Cloudflare Pages o Netlify. Es un solo archivo.
6. **Celular de ella:** notificaciones activadas en Gmail y en Google Calendar.

## Qué hace ella en el día a día
| Quiere… | Hace… |
|---|---|
| Cambiar precio, servicio o foto | Edita la hoja **Servicios**. Las fotos: subir a Drive, compartir "cualquiera con el enlace" y pegar el link |
| Bloquear un día u hora | Crea un evento en Google Calendar (todo el día = día bloqueado) |
| Anotar un turno que le pidieron por WhatsApp | Lo crea en Calendar, y la web ya no ofrece ese horario |
| Cancelar un turno | Borra el evento |
| Cambiar horario de atención | Edita la hoja **Horario** |

**Si cambiás `Code.gs`:** Implementar → Gestionar implementaciones → editar → versión nueva. La URL no cambia.
