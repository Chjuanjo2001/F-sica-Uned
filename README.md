# Física UNED · versión sin carpetas

Todos los archivos van sueltos: **cada página lleva dentro su CSS y su JavaScript**.
Así no hay subcarpetas que se puedan perder al subirlos a GitHub o a Netlify.

## Cómo subirla

1. Descomprime este zip. Verás 14 archivos sueltos, sin carpetas.
2. En GitHub: entra en tu repositorio → **Add file → Upload files** → selecciona
   **todos** los archivos (⌘A dentro de la carpeta) y arrástralos.
   Confirma con **Commit changes**.
3. Netlify redespliega solo en un minuto.

Si en tu repositorio hay restos del intento anterior (carpetas `assets`, `temas`, `icons`
a medias), da igual: los archivos nuevos los sustituyen y lo que sobra no molesta.

## Qué archivo es cada cosa

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Portal: mapa del grado y tu sesión de hoy |
| `asignatura.html` | Lista de temas de Cálculo I |
| `tema-am1-01-preliminares.html` | Tema 1 completo, con sus laboratorios |
| `repaso.html` | Sesión de repaso espaciado |
| `perfil.html` | Progreso, actividad y exámenes |
| `admin.html` | Panel de administración |
| `login.html` | Registro y acceso (se activa al configurar Supabase) |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | Para que se instale como app y funcione sin conexión |

## Activar las cuentas de usuario

La configuración de Supabase ahora vive **dentro de cada página**. Para activarla hay que
cambiar dos líneas en **todos** los `.html`: busca `const SUPABASE_URL = "";` y pon ahí tu
URL y tu clave anónima. Es más cómodo que lo haga yo y te pase los archivos ya listos:
dímelo cuando tengas creado el proyecto de Supabase.

## Instalar como app

- **iPad**: Safari → botón compartir → *Añadir a pantalla de inicio*.
- **Mac**: Safari → menú Archivo → *Añadir al Dock*.
