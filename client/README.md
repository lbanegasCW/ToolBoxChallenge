# Client

Frontend base del challenge implementado con React 17.

## Descripción

Esta app React contiene solo el esqueleto visual inicial del challenge.
Todavía no consume el API real ni incorpora Redux.

## Stack

- Node.js 16
- React 17
- React Bootstrap
- Bootstrap CSS
- Jest
- React Testing Library
- StandardJS
- JSDoc

## Requisitos

- Node.js 16.x
- npm

## Instalación

```bash
npm install
```

## Comandos

```bash
npm start
npm test
npm run lint
npm run docs
```

## Layout base

- Barra superior roja con el texto `React Test App`.
- Container principal centrado.
- Espacio reservado para filtro.
- Espacio reservado para tabla.

## Estructura

- `src/App.js`: composición principal de la app.
- `src/components/AppNavbar.js`: barra superior.
- `src/features/files/FilesPage.js`: layout principal de archivos.

## Tests

La suite incluye un test simple de render de `App` con Jest y React Testing Library.

## Documentación JSDoc

Generar documentación:

```bash
npm run docs
```

La salida se genera en `client/docs/`.

## Notas técnicas

- No se consume el API real todavía.
- No se implementa Redux en esta etapa.
- El shell visual está preparado para integrar el listado y el filtro más adelante.
