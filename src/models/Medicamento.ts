import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Medicamento = sequelize.define(
  "Medicamento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: "medicamentos",
    timestamps: true
  }
);
