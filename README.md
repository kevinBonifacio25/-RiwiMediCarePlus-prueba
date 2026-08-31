# RiwiMediCare Plus API

API REST para gestionar solicitudes de abastecimiento de medicamentos e insumos médicos para clínicas y centros de atención.

## Coder

Kevin David Bonifacio Trujillo


## Tecnologías utilizadas

* Node.js 18+
* Express
* TypeScript
* PostgreSQL
* Sequelize
* JSON Web Token (JWT)
* Multer
* Swagger
* Docker
* Docker Compose

## Estructura del proyecto

```text
src/
├── config/
├── controllers/
├── docs/
├── dtos/
│   ├── auth.dto.ts
│   ├── clinic.dto.ts
│   ├── warehouse.dto.ts
│   ├── medicine.dto.ts
│   └── supplyRequest.dto.ts
├── middlewares/
├── models/
├── repositories/
│   └── interfaces/
├── routes/
├── services/
├── types/
├── app.ts
└── server.ts
```

## Instalación

```bash
npm install
```

## Ejecutar el proyecto con Docker

No es necesario tener PostgreSQL instalado localmente.

El proyecto utiliza Docker Compose para levantar:

* La API de Node.js.
* PostgreSQL.
* La base de datos `riwi_medicare`.
* Un volumen para persistencia.
* Una red interna.

Ejecutar:

```bash
docker-compose up --build
```

## Swagger

Después de ejecutar Docker:

```text
http://localhost:3000/api-docs
```

Desde Swagger se pueden probar todos los endpoints.

## Flujo recomendado de prueba

1. Registrar un usuario ADMIN.
2. Iniciar sesión.
3. Copiar el token JWT.
4. Presionar el botón Authorize en Swagger.
5. Escribir:

```text
Bearer TU_TOKEN
```

6. Crear un almacén.
7. Crear una clínica.
8. Crear un medicamento.
9. Registrar una solicitud.
10. Consultar solicitudes activas.
11. Consultar historial por clínica.

## Seeder mediante archivo JSON

Endpoint:

```text
POST /api/seed/upload
```

Requiere rol ADMIN.

Enviar un archivo mediante `multipart/form-data` con el campo:

```text
file
```

Ejemplo:

```json
{
  "users": [],
  "clinics": [],
  "warehouses": [],
  "medicines": []
}
```
