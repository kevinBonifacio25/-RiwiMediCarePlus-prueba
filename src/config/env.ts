import dotenv from "dotenv";

dotenv.config();

/**
 * Configuración centralizada de la aplicación.
 *
 * Un único punto de lectura de variables de entorno con valores
 * por defecto compatibles con el entorno local y docker-compose.
 * Las variables de BD y JWT se consumirán en las fases 2 y 3.
 */

export const env = {
  port: Number(process.env.PORT || 3000),

  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    name: process.env.DB_NAME || "medicamentos",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres"
  },

  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  }
};
