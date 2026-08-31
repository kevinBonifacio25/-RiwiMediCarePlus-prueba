import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { RecordStatus } from "../types/enums.types";

interface ClinicAttributes {
  id: number;
  name: string;
  nit: string;
  responsibleName: string;
  responsibleEmail: string;
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
  public name!: string;
  public nit!: string;
  public responsibleName!: string;
  public responsibleEmail!: string;
  public status!: RecordStatus;
}

Clinic.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    nit: { type: DataTypes.STRING, allowNull: false, unique: true },
    responsibleName: { type: DataTypes.STRING, allowNull: false },
    responsibleEmail: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM(...Object.values(RecordStatus)),
      defaultValue: RecordStatus.ACTIVE,
    },
  },
  { sequelize, modelName: "Clinic", tableName: "clinics", timestamps: true },
);

export default Clinic;
