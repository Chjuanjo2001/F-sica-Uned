# Física UNED · plataforma de estudio

Aplicación web (PWA) para estudiar el Grado en Física de la UNED desde el Mac, el iPad o el móvil.
Funciona sin conexión, se instala como una app más y guarda tu progreso.

Ahora mismo contiene:

- **El mapa del grado** con las 40 asignaturas de los cuatro cursos. Todas aparecen «en construcción» salvo **Análisis Matemático I**, que está abierta.
- **Cálculo I** con sus 14 temas listados y el **Tema 1 · Preliminares** completo: 7 estaciones con laboratorios interactivos, tests y examen de certificación.
- **Repaso espaciado** automático: lo que fallas vuelve a los 1–3 días, lo que dominas se aleja hasta 35 días.
- **Seguimiento**: nivel, experiencia, mapa de actividad, historial de exámenes.
- **Panel de administración** de usuarios, resultados y preguntas más falladas.

---

## 1. Ponerla en marcha (10 minutos, gratis)

> ⚠️ **No abras los archivos haciendo doble clic.** Los navegadores bloquean por seguridad los
> módulos JavaScript abiertos desde el disco (`file://`). Hay que servirla desde una web, y eso
> es gratis y rápido.

### Opción A · Netlify Drop (la más rápida, sin cuenta de GitHub)

1. Entra en **https://app.netlify.com/drop**
2. Arrastra la carpeta `fisica-uned` entera a esa página.
3. En unos segundos tendrás una dirección tipo `https://algo-aleatorio.netlify.app`. Ya funciona.
4. Si te creas una cuenta gratuita (con tu correo o con Google), podrás cambiar ese nombre por
   uno tuyo, por ejemplo `https://fisica-jj.netlify.app`, y la web quedará guardada para siempre.

### Opción B · GitHub + Netlify (recomendada a medio plazo)

Ventaja: cada vez que se añada un tema nuevo, la web se actualiza sola.

1. Crea una cuenta gratuita en **https://github.com**.
2. Crea un repositorio nuevo (por ejemplo `fisica-uned`) y sube ahí el contenido de esta carpeta
   (GitHub permite arrastrar archivos desde el navegador: botón *Add file → Upload files*).
3. Crea una cuenta gratuita en **https://netlify.com** (o Vercel, o Cloudflare Pages).
4. *Add new site → Import an existing project → GitHub* y elige el repositorio.
5. No hay que configurar nada: deja los campos de build vacíos y pulsa *Deploy*.

En ambos casos el coste es **0 €**: son planes gratuitos pensados para proyectos personales.

---

## 2. Instalarla como app en tu iPad y tu Mac

Una vez tengas la dirección web:

- **iPad / iPhone**: ábrela en Safari → botón *Compartir* → **Añadir a pantalla de inicio**.
  Aparecerá con su icono, sin barra de navegador y funcionando sin conexión.
- **Mac**: ábrela en Safari → menú *Archivo* → **Añadir al Dock**.
- **Chrome / Edge**: icono de instalar en la barra de direcciones.

Al estar instalada, el iPad la trata como una aplicación normal: puedes usarla en Split View
junto al PDF de la asignatura, y funciona en el metro o sin cobertura.

---

## 3. Activar las cuentas de usuario (cuando quieras)

Sin este paso, la web ya funciona: guarda tu progreso en cada dispositivo por separado.
Con este paso tendrás **login, sincronización entre iPad y Mac, y panel de administración real**.

1. Crea una cuenta gratuita en **https://supabase.com** y un proyecto nuevo
   (elige la región de Europa, por ejemplo *West EU (Ireland)*).
2. En el menú lateral entra en **SQL Editor → New query**, pega **todo** el contenido del archivo
   `supabase/schema.sql` de esta carpeta y pulsa **Run**. Eso crea las tablas y los permisos.
3. Ve a **Project Settings → API** y copia dos datos:
   - *Project URL* (algo como `https://abcdefgh.supabase.co`)
   - *anon public key* (una clave larga)
4. Abre `assets/js/config.js` y pégalos:

   ```js
   export const SUPABASE_URL = "https://abcdefgh.supabase.co";
   export const SUPABASE_ANON_KEY = "eyJhbGciOi...";
   export const ADMIN_EMAILS = ["tu@correo.com"];   // tu correo, para ser administrador
   ```

5. Vuelve a subir la carpeta (o haz *push* si usas GitHub) y entra en `/login.html` para
   registrarte. Con tu correo en `ADMIN_EMAILS` entrarás directamente como administrador.
   Si se te olvidó, ejecuta esto en el SQL Editor de Supabase:

   ```sql
   update public.profiles set role = 'admin' where email = 'tu@correo.com';
   ```

> La clave *anon public* está pensada para vivir en el navegador: **no es un secreto**.
> La seguridad real la dan las políticas RLS del `schema.sql`, que impiden que un usuario
> vea o modifique los datos de otro.

**Límites del plan gratuito de Supabase**: 50.000 usuarios activos al mes y 500 MB de base de
datos. Para lo que necesitas sobra ampliamente. Un detalle: si nadie entra durante una semana
el proyecto se «duerme»; se despierta solo al volver a usarlo o entrando a su panel.

---

## 4. Cómo se añade un tema nuevo

Cada tema son **dos archivos**:

1. `assets/js/banco/<asignatura>-<tema>.js` — las preguntas (con ids estables, porque el repaso
   espaciado los usa para recordar qué toca).
2. `temas/<asignatura>-NN-<tema>.html` — la página del tema: explicaciones, laboratorios
   interactivos en canvas y los tests montados con el motor común.

Y **dos líneas** de registro:

- En `assets/js/banco.js`, añade el tema al objeto `REGISTRO`.
- En `assets/js/curriculum.js`, cambia ese tema a `estado: "publicado"` y ponle su `ruta`
   y su número de preguntas.

Para abrir una asignatura entera basta con cambiar su `estado` a `"abierta"` en
`curriculum.js` y darle una entrada en `TEMARIOS`.

---

## 5. Estructura de la carpeta

```
fisica-uned/
├── index.html                  Portal: mapa del grado y "sesión de hoy"
├── asignatura.html             Lista de temas de una asignatura
├── temas/                      Un archivo por tema
│   └── am1-01-preliminares.html
├── repaso.html                 Sesión de repaso espaciado
├── perfil.html                 Progreso, actividad y exámenes
├── admin.html                  Panel de administración
├── login.html                  Registro y acceso
├── assets/
│   ├── css/base.css            Sistema de diseño común
│   ├── css/tema.css            Estilos de estaciones y laboratorios
│   └── js/
│       ├── config.js           ← el único archivo que tocas tú
│       ├── store.js            Sesión, progreso y repaso espaciado
│       ├── curriculum.js       Plan de estudios del grado
│       ├── banco.js            Registro de bancos de preguntas
│       ├── banco/              Preguntas de cada tema
│       ├── quiz.js             Motor de tests y exámenes
│       └── ui.js               Cabecera, anillos de progreso, utilidades
├── supabase/schema.sql         Base de datos y permisos
├── manifest.webmanifest        Datos de la app instalable
├── sw.js                       Funcionamiento sin conexión
└── icons/                      Iconos de la app
```

---

## 6. Decisiones de diseño (por si algún día lo retomas)

- **Sin framework ni compilación.** Es HTML, CSS y JavaScript con módulos nativos: se despliega
  arrastrando la carpeta y seguirá funcionando dentro de diez años sin actualizar dependencias.
- **Funciona antes de configurar nada.** Si no hay claves de Supabase, la app entra en modo local
  y guarda en el propio dispositivo. Nunca se queda en blanco esperando un servidor.
- **La gamificación no castiga.** No hay rachas que se rompan ni contadores que bajen: el progreso
  solo sube. Si desapareces dos semanas, la cola de repaso te espera tal cual.
- **Sesiones cortas por defecto.** Cada pantalla propone una única acción siguiente para no tener
  que decidir nada al sentarse a estudiar.
- **Repaso espaciado (Leitner).** Cinco cajas con intervalos de 1, 3, 7, 16 y 35 días. Es lo que
  convierte el estudio de hoy en material disponible el día del examen.
