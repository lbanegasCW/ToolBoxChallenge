# ToolBox Challenge

Repositorio monorepo para un challenge full stack orientado a evaluación técnica.
Incluye una API en Node/Express y un frontend en React con Redux, ambos con
documentación, tests y soporte para Docker.

## Stack

### API

- Node 14
- Express
- Axios
- Mocha
- Chai
- Supertest
- Nock
- StandardJS
- JSDoc

### Frontend

- Node 16
- React
- React Bootstrap
- Redux
- Jest
- React Testing Library
- StandardJS
- JSDoc

### Infraestructura

- Docker Compose

## Opcionales Implementados

- `GET /files/list`
- `GET /files/data?fileName=<fileName>`
- StandardJS
- Redux
- Jest
- Docker Compose

## Estructura Del Proyecto

```text
.
|-- api/
|-- client/
|-- docker-compose.yml
|-- package.json
`-- README.md
```

### `api/`

- `src/app.js`
- `src/server.js`
- `src/routes/`
- `src/controllers/`
- `src/services/`
- `src/clients/`
- `src/utils/`
- `test/`

### `client/`

- `src/App.js`
- `src/components/`
- `src/features/files/`
- `src/store/`
- `public/`

## Docker

```bash
docker-compose up --build
```

Esto levanta la API en `http://localhost:3001` y el frontend en
`http://localhost:3000`.

## Sin Docker

### API

```bash
cd api
npm install
npm start
```

### Client

```bash
cd client
npm install
npm start
```

## Tests

### API

```bash
cd api
npm test
```

### Client

```bash
cd client
npm test
```

## Linters

### API

```bash
cd api
npm run lint
```

### Client

```bash
cd client
npm run lint
```

## Documentación

### API

```bash
cd api
npm run docs
```

### Client

```bash
cd client
npm run docs
```

## Endpoints Disponibles

- `GET /health`
- `GET /files/list`
- `GET /files/data`
- `GET /files/data?fileName=file1.csv`

## Ejemplos De Respuesta JSON

### `GET /health`

```json
{
  "status": "ok"
}
```

### `GET /files/list`

```json
{
  "files": ["test1.csv", "test2.csv"]
}
```

### `GET /files/data`

```json
[
  {
    "file": "test1.csv",
    "lines": [
      {
        "text": "RgTya",
        "number": 64075909,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      }
    ]
  }
]
```

### `GET /files/data?fileName=file1.csv`

```json
[
  {
    "file": "file1.csv",
    "lines": [
      {
        "text": "RgTya",
        "number": 64075909,
        "hex": "70ad29aacf0b690b0467fe2b2767f765"
      }
    ]
  }
]
```

## Decisiones Técnicas

- La API está separada por capas: routes, controllers, services, clients y utils.
- El endpoint `/files/data` tolera fallos por archivo individual para no perder
  el resto del resultado.
- El parser CSV es propio y estricto, sin dependencias externas de CSV.
- Se usó Redux aunque la app sea pequeña porque era parte opcional del challenge
  y ayuda a dejar el flujo preparado para crecimiento.
- Se incluyó Docker para reproducibilidad y entrega consistente.

## Manejo De Errores

- La API normaliza errores en JSON con la forma `{ "error": "..." }`.
- `GET /files/data?fileName=` vacío devuelve `400`.
- En `/files/data` general, si falla un archivo individual, ese archivo se omite.
- Si falla el listado o la descarga del archivo solicitado, se responde con error
  controlado.

## Compatibilidad Node

- API: Node 14.x
- Frontend: Node 16.x

Cada paquete declara su versión requerida en su propio `package.json`.

## Tests Y Red

- Los tests del backend mockean el API externo con `nock`.
- No dependen de internet ni del servicio real.
- Los tests del frontend usan Jest y React Testing Library.

## Configuración Opcional Del Frontend

La URL del API puede sobrescribirse con `REACT_APP_API_BASE_URL`.
Si no se define, el cliente usa `http://localhost:3001`.

## Configuración De Entorno

- `api/.env` y `client/.env` contienen los valores locales por defecto.
- API: `PORT`, `EXTERNAL_API_BASE_URL`, `EXTERNAL_API_KEY`.
- Client: `REACT_APP_API_BASE_URL`, `HOST`.
- `api/.env.example` y `client/.env.example` sirven como plantilla.
- Los defaults siguen en el código, así que los archivos `.env` son opcionales.
