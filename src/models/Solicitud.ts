import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Solicitud = sequelize.define(
  "Solicitud",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    estado: {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE"
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "solicitudes",
    timestamps: true
  }
);
