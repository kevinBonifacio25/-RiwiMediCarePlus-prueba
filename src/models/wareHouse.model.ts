import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { RecordStatus } from "../types/enums.types";

interface WarehouseAttributes { id: number; name: string; location: string; status: RecordStatus; }
interface WarehouseCreationAttributes extends Optional<WarehouseAttributes, "id" | "status"> {}

class Warehouse extends Model<WarehouseAttributes, WarehouseCreationAttributes> implements WarehouseAttributes {
  public id!: number; public name!: string; public location!: string; public status!: RecordStatus;
}

Warehouse.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM(...Object.values(RecordStatus)), defaultValue: RecordStatus.ACTIVE }
}, { sequelize, modelName: "Warehouse", tableName: "warehouses", timestamps: true });

export default Warehouse;
