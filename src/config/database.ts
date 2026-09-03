// Configuración de la conexión a la base de datos usando Sequelize
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carga variables de entorno desde el archivo .env (si existe)
dotenv.config();

// Crea una instancia de Sequelize usando las variables de entorno.
// Variables esperadas: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT
export const sequelize: Sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false // Desactiva logs SQL; cambiar a true para depuración
  }
);

// Export por defecto de la instancia para usar en otros módulos
export default sequelize;
