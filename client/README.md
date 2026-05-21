# Client

Frontend del challenge implementado con React 17, Redux y React Bootstrap.

## Descripción

La app muestra la pantalla de archivos del challenge, consume el backend local
por defecto y deja preparado el flujo para filtrar por `fileName`.

## Stack

- Node.js 16
- React 17
- Redux Toolkit
- React Redux
- React Bootstrap
- Bootstrap CSS
- Jest
- React Testing Library
- StandardJS
- JSDoc

## Requisitos

- Node.js 16.x
- npm

## Configuración

- `client/.env` contiene la URL local del backend por defecto.
- Variables soportadas:
  - `REACT_APP_API_BASE_URL`
  - `HOST` (solo para desarrollo en Docker o para ajustar el host del dev server)
- `client/.env.example` sirve como plantilla.
- `REACT_APP_API_BASE_URL` es opcional y puede sobrescribirse para otro backend.

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

## API

La URL base del backend puede configurarse opcionalmente con
`REACT_APP_API_BASE_URL`. Si no se define, el cliente usa
`http://localhost:3001`.

Endpoints consumidos:

- `GET /files/list`
- `GET /files/data`
- `GET /files/data?fileName=<fileName>`

## Redux

El estado de archivos vive en `src/features/files/filesSlice.js` y expone:

- `files`
- `fileNames`
- `selectedFileName`
- `loading`
- `error`

La pantalla usa thunks para cargar el listado y los datos, y acciones simples
para actualizar o limpiar el filtro.

## Filtro

El selector se alimenta con la respuesta de `GET /files/list`. Al elegir un
archivo, el frontend actualiza `selectedFileName` y vuelve a solicitar
`GET /files/data?fileName=<fileName>`. El botón `Clear` limpia el filtro y
vuelve a cargar todos los archivos.

## Estados

- `loading`: muestra un spinner mientras llegan los datos.
- `error`: muestra una alerta con el mensaje del error.
- `empty`: muestra un estado vacío cuando no hay filas para renderizar.

## Decisiones de UI

- Barra superior roja con el título `React Test App`.
- Container principal limpio y simple.
- Tabla ordenada con las columnas requeridas por el challenge.
- Componentes pequeños para loading, error y empty state.

## Estructura

- `src/App.js`: composición principal de la app.
- `src/components/AppNavbar.js`: barra superior.
- `src/components/LoadingState.js`: spinner de carga.
- `src/components/ErrorAlert.js`: alerta de error.
- `src/components/EmptyState.js`: estado vacío.
- `src/features/files/FilesPage.js`: orquestación de la pantalla.
- `src/features/files/FilesTable.js`: tabla aplanada.
- `src/features/files/FileNameFilter.js`: filtro por archivo.
- `src/features/files/filesSlice.js`: estado y thunks.
- `src/features/files/filesService.js`: cliente HTTP del frontend.
- `src/store/index.js`: store Redux.

## Tests

La suite incluye tests de render de `App` y tests unitarios de la tabla, el
selector y el slice.

## Documentación JSDoc

Generar documentación:

```bash
npm run docs
```

La salida se genera en `client/docs/`.
