import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "API de Abastecimiento de Medicamentos",
      version: "1.0.0",
      description:
        "API REST para administrar solicitudes de abastecimiento de medicamentos"
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ]
  },

  apis: ["./src/routes/*.ts"]
};

export const swaggerSpec =
  swaggerJsdoc(options);
