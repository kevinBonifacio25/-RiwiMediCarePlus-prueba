import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { RecordStatus } from "../types/enums.types";

interface MedicineAttributes { id: number; name: string; description: string; stock: number; warehouseId: number; status: RecordStatus; }
interface MedicineCreationAttributes extends Optional<MedicineAttributes, "id" | "description" | "status"> {}

class Medicine extends Model<MedicineAttributes, MedicineCreationAttributes> implements MedicineAttributes {
  public id!: number; public name!: string; public description!: string; public stock!: number; public warehouseId!: number; public status!: RecordStatus;
}

Medicine.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  stock: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
  warehouseId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM(...Object.values(RecordStatus)), defaultValue: RecordStatus.ACTIVE }
}, { sequelize, modelName: "Medicine", tableName: "medicines", timestamps: true });

export default Medicine;
