# API

Backend del challenge implementado con Node.js 14 y Express.

## Descripción

Este módulo expone un backend HTTP que consulta un API externo, descarga CSVs, filtra datos inválidos y devuelve respuestas JSON normalizadas.

## Stack

- Node.js 14
- Express
- Axios
- Mocha
- Chai
- Supertest
- Nock
- StandardJS
- JSDoc

## Requisitos

- Node.js 14.x
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

## Endpoints

### `GET /health`

Respuesta:

```json
{
  "status": "ok"
}
```

### `GET /files/list`

Devuelve exactamente el objeto del API externo.

Respuesta:

```json
{
  "files": ["test1.csv", "test2.csv"]
}
```

### `GET /files/data`

Agrupa y parsea todos los archivos disponibles.

Respuesta:

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

### `GET /files/data?fileName=<fileName>`

Descarga y parsea solo el archivo solicitado.

Respuesta:

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

## Manejo de errores

- `GET /files/list`: si falla el upstream, el backend responde con error controlado `500`.
- `GET /files/data`: si falla el listado de archivos, el backend responde con error controlado `500`.
- `GET /files/data`: en el modo general, si falla la descarga de un archivo individual, ese archivo se omite y el resto continúa.
- `GET /files/data?fileName=...`: si falla la descarga del archivo solicitado, el backend responde con error controlado `500`.
- `GET /files/data?fileName=` vacío: el backend responde `400`.

Formato de error:

```json
{
  "error": "Unable to retrieve files list"
}
```

El middleware centralizado del backend normaliza cualquier error como JSON y
evita respuestas no estructuradas.

## Decisiones técnicas

- El cliente externo usa `axios` con `baseURL` y `Authorization` configurados por defecto.
- La API key tiene default interno y puede sobrescribirse con `EXTERNAL_API_KEY`.
- La base URL puede sobrescribirse con `EXTERNAL_API_BASE_URL`.
- El parser CSV es estricto y no usa librerías externas.
- El parser ignora header, líneas vacías y filas inválidas.
- El flujo general de `/files/data` tolera fallos por archivo para no perder el resto del resultado.
- El controller mantiene la validación HTTP y el service concentra la lógica de negocio.

## CSV soportado

Columnas estrictas:

```text
file,text,number,hex
```

Reglas:

- `file` no puede estar vacío.
- `text` no puede estar vacío.
- `number` debe convertirse a un número finito.
- `hex` debe tener exactamente 32 caracteres hexadecimales.
- Las filas inválidas se descartan.

## Tests

Los tests usan `nock` para simular el API externo y evitar requests reales a internet.

Ejemplos:

- `/files/list` mockea `GET https://echo-serv.tbxnet.com/v1/secret/files`
- `/files/data` mockea `GET https://echo-serv.tbxnet.com/v1/secret/file/{fileName}`

## Documentación JSDoc

Generar documentación:

```bash
npm run docs
```

La salida se genera en `api/docs/`.
