# Fullstack JS Challenge

Monorepo del ToolBox challenge con backend Express y frontend React.

## Estructura

- `api/`: backend Node.js 14 + Express
- `client/`: frontend Node.js 16 + React + Redux

## Requisitos

- Node.js 14.x para `api/`
- Node.js 16.x para `client/`
- npm

## Instalación

Desde la raíz:

```bash
npm install
```

Ese comando instala también las dependencias de `api/` y `client/`.

## Scripts raíz

`npm start` levanta `api/` y `client/` al mismo tiempo.

```bash
npm start
npm test
npm run lint
npm run docs
```

También podés correr cada paquete desde la raíz:

```bash
npm run start:api
npm run start:client
npm run test:api
npm run test:client
npm run lint:api
npm run lint:client
npm run docs:api
npm run docs:client
```

## Endpoints

Backend en `http://localhost:3001` por defecto.

- `GET /health`
- `GET /files/list`
- `GET /files/data`
- `GET /files/data?fileName=<fileName>`

## Frontend

El frontend consume `http://localhost:3001` por defecto.
Puede sobrescribirse con `REACT_APP_API_BASE_URL`.

## Notas

- El backend tolera fallos por archivo individual en `/files/data`.
- El frontend muestra loading, error y empty states.
- El filtro usa la lista devuelta por `/files/list`.
