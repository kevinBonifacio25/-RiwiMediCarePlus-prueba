import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { RecordStatus } from "../types/enums.types";

interface ClinicAttributes {
  id: number;
  userId: number;
  name: string;
  nit: string;
  status: RecordStatus;
}
interface ClinicCreationAttributes extends Optional<
  ClinicAttributes,
  "id" | "status"
> {}

class Clinic
  extends Model<ClinicAttributes, ClinicCreationAttributes>
  implements ClinicAttributes
{
  public id!: number;
  public userId!: number;
  public name!: string;
  public nit!: string;
  public status!: RecordStatus;
}

Clinic.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    nit: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: {
      type: DataTypes.ENUM(...Object.values(RecordStatus)),
      defaultValue: RecordStatus.ACTIVE,
    },
  },
  { sequelize, modelName: "Clinic", tableName: "clinics", timestamps: true },
);

export default Clinic;
