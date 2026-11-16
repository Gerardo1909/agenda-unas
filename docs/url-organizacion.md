# URL limpia: `cupedia.github.io`

Hoy la página vive en `https://gerardo1909.github.io/agenda-unas/`. Con una **organización gratuita de GitHub** queda en **`https://cupedia.github.io`**, sin tu nombre y sin pagar dominio. Vos seguís siendo el dueño.

## Cuándo hacerlo

**Antes** de que ella empiece a compartir el link (bio de Instagram, estados de WhatsApp). GitHub Pages **no redirige** la URL vieja: cualquier link viejo deja de andar.

## Pasos

1. **Crear la organización.** En GitHub: tu foto → *Your organizations* → **New organization** → plan **Free**.
   - Nombre: `cupedia`. Si está tomado, probá `cupedianails` (queda `cupedianails.github.io`, que coincide con su Instagram).
   - "This organization belongs to": *My personal account*.
2. **Transferir el repo.** En `agenda-unas` → *Settings* → *General* → abajo de todo, **Transfer ownership** → elegí la organización.
3. **Renombrar el repo** a `cupedia.github.io` (tiene que ser exactamente `<nombre-org>.github.io`). Es en *Settings* → *General* → *Repository name*.
4. **Activar Pages.** *Settings* → *Pages* → *Source: Deploy from a branch* → `main` / `/ (root)` → *Save*.
5. **Actualizar el remoto local** (GitHub redirige el viejo, pero mejor dejarlo prolijo):
   ```bash
   git remote set-url origin https://github.com/cupedia/cupedia.github.io.git
   ```
6. **Probar** `https://cupedia.github.io` después de 1 o 2 minutos. El `index.html` de la raíz ya redirige a `app/`, no hay que tocar nada.
7. **Reemplazar** la URL vieja en `CLAUDE.md` y `docs/` (buscar `gerardo1909.github.io`).

## Lo que no cambia

- La URL del Apps Script (`…/exec`) y `API_URL` siguen iguales.
- Si más adelante quieren un dominio propio (`cupedia.com`, unos USD 10–15 al año), se agrega en *Settings → Pages → Custom domain*. No hace falta para el MVP.

## Alternativa rápida (sin organización)

Renombrar el repo a `cupedia` → `https://gerardo1909.github.io/cupedia/`. Es un solo paso, pero la URL sigue mostrando tu usuario.
