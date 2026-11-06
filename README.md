# GRUPO ARQSA

Sitio público de arquitectura, construcción e interiorismo en El Salvador.
React + TypeScript + Vite, con HTML prerenderizado y despliegue en Vercel.

## Desarrollo

Node 22 o superior. Producción utiliza Node 24.

```sh
npm ci
npm run dev
```

## Verificación

```sh
npm run lint
npm run build
npm run test:static
npm run preview
```

El build genera la portada, 14 fichas de proyecto, 6 páginas de servicio y el
sitemap desde los archivos de contenido. Las pruebas estáticas requieren ejecutar
el build primero y comprueban metadatos, enlaces, imágenes y ausencia de rutas de
administración.

Revisar también en escritorio y móvil: navegación, filtros del portafolio,
visor con Tab/flechas/Escape, cambio de ancho, resumen editable de contacto y
chat. No enviar consultas reales al probar.

## Contenido

- `src/data/projects.ts`: proyectos, categorías, descripción, servicios e imágenes.
- `src/data/services.ts`: servicios, rutas y alcance.
- `src/lib/constants.ts`: contacto y navegación.
- `public/images/`: imágenes originales y variantes WebP.
- `npm run imagenes`: regenera variantes al agregar fotos.

Las galerías adicionales se muestran cuando hay imágenes distintas de la portada.
No agregar ubicaciones, cifras, testimonios o fotografías sin verificar.

## Contacto

El formulario prepara un mensaje editable y ofrece un enlace a WhatsApp.
El chat es un asistente determinista, no una persona conectada. No se envía ni
guarda ninguna consulta desde este sitio: el visitante confirma el envío en
WhatsApp. El enlace de correo directo sigue disponible.

## Publicación

`master` publica automáticamente en grupoarqsa.com. Usar rama y PR para revisar
cambios visuales en un preview antes de incorporarlos a producción.

`scripts/prerender.mjs` genera archivos HTML por ruta.
`vercel.json` utiliza [cleanUrls](https://vercel.com/docs/project-configuration/vercel-json#cleanurls)
para servirlos sin extensión. No hay rewrite general a la portada: las rutas
desconocidas y `/admin` deben devolver HTTP 404. El comportamiento HTTP 404 debe
comprobarse en Vercel; el fallback de Vite preview no replica las reglas del hosting.

Este repositorio no contiene CRM, autenticación ni base de datos.
