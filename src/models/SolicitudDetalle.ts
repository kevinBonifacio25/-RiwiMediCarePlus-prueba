import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const SolicitudDetalle = sequelize.define(
  "SolicitudDetalle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    solicitudId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    medicamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "solicitud_detalles",
    timestamps: true
  }
);
