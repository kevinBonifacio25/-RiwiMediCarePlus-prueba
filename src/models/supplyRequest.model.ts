import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { RequestStatus, RecordStatus } from "../types/enums.types";

interface SupplyRequestAttributes {
  id: number;
  userId: number;
  clinicId: number;
  medicineId: number;
  warehouseId: number;
  quantity: number;
  requestStatus: RequestStatus;
  status: RecordStatus;
}
interface SupplyRequestCreationAttributes extends Optional<
  SupplyRequestAttributes,
  "id" | "requestStatus" | "status"
> {}

class SupplyRequest
  extends Model<SupplyRequestAttributes, SupplyRequestCreationAttributes>
  implements SupplyRequestAttributes
{
  public id!: number;
  public userId!: number;
  public clinicId!: number;
  public medicineId!: number;
  public warehouseId!: number;
  public quantity!: number;
  public requestStatus!: RequestStatus;
  public status!: RecordStatus;
}

SupplyRequest.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    clinicId: { type: DataTypes.INTEGER, allowNull: false },
    medicineId: { type: DataTypes.INTEGER, allowNull: false },
    warehouseId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    requestStatus: {
      type: DataTypes.ENUM(...Object.values(RequestStatus)),
      defaultValue: RequestStatus.PENDING,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(RecordStatus)),
      defaultValue: RecordStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "SupplyRequest",
    tableName: "supply_requests",
    timestamps: true,
  },
);

export default SupplyRequest;
