# Para mi Llura bonita — versión HTML/CSS/JS

Tres archivos sueltos, sin frameworks. Funciona abriendo `index.html` en el navegador o subiéndolo a cualquier hosting (Netlify, Vercel, Hostinger, GitHub Pages, etc.).

## Archivos
- `index.html` — estructura
- `styles.css` — estilos (tono oscuro romántico, mismos colores que la web original)
- `app.js`    — render de mosaicos, vídeos, timeline, polaroids, lightbox e intro
- `img/`      — placeholders p1..p8.jpg (sustitúyelos por tus fotos)
- `intro.mp4` — pon aquí tu vídeo de intro (no incluido)

## Cómo personalizar
1. **Vídeo de intro**: copia tu vídeo como `intro.mp4` junto a `index.html`. Al pulsar "Vamos allá" desaparece y aparece toda la web.
2. **Fotos**: sustituye los archivos en `img/` (p1.jpg, p2.jpg…). Puedes añadir más y referenciarlos en `app.js` editando el array `PHOTOS`.
3. **Mensajes bajo las fotos**: edita los arrays `captionsA` y `captionsB` en `app.js`.
4. **Vídeos del grid**: edita el array `VIDEOS` (título y duración) en `app.js`. Para reproducir vídeos reales, en `index.html` y en `renderVideos()` puedes cambiar el bloque `.video-card` por un `<video controls src="...">`.
5. **Timeline / Lugares**: edita los arrays `MILESTONES` y `PLACES` en `app.js`.

## Subirlo
Sube la carpeta entera. No necesita servidor especial — son archivos estáticos.
