# Fullstack JS Challenge

Monorepo para el challenge full stack con backend Node/Express y frontend React.

## Estructura

- `api/`: backend Node.js 14 + Express
- `client/`: frontend Node.js 16 + React + Redux

## Requisitos

- Node.js 14.x para `api/`
- Node.js 16.x para `client/`
- npm

## Instalación

Instalá cada app por separado:

```bash
cd api
npm install

cd ../client
npm install
```

## Desarrollo

Backend:

```bash
cd api
npm start
```

Frontend:

```bash
cd client
npm start
```

## Tests

Backend:

```bash
cd api
npm test
```

Frontend:

```bash
cd client
npm test
```

## Lint

Backend:

```bash
cd api
npm run lint
```

Frontend:

```bash
cd client
npm run lint
```

## Documentación

Generar documentación JSDoc:

```bash
cd api
npm run docs

cd ../client
npm run docs
```

La documentación generada se escribe en `api/docs/` y `client/docs/`.

## Endpoints

Backend disponible en `http://localhost:3001` por defecto.

- `GET /health`
- `GET /files/list`
- `GET /files/data`
- `GET /files/data?fileName=<fileName>`

## Frontend

El cliente consume el backend local por defecto en `http://localhost:3001`.
Podés sobrescribir la URL con `REACT_APP_API_BASE_URL`.

## Notas

- El backend tolera fallos por archivo individual en `/files/data`.
- El frontend muestra loading, error y empty states de forma explícita.
- El filtro por `fileName` usa la lista devuelta por `/files/list`.
