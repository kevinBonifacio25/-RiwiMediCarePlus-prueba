import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { UserRole, RecordStatus } from "../types/enums.types";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: RecordStatus;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "status"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public status!: RecordStatus;
}

User.init({
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
    name: {
       type: DataTypes.STRING, 
       allowNull: false 
  },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
  },
    password: {
       type: DataTypes.STRING, 
       allowNull: false 
  },
    role: {
       type: DataTypes.ENUM(...Object.values(UserRole)), 
       allowNull: false 
  },
    status: {
       type: DataTypes.ENUM(...Object.values(RecordStatus)), 
       defaultValue: RecordStatus.ACTIVE 
      }
}, 
{ sequelize, modelName: "User", 
  tableName: "users", 
  timestamps: true });

export default User;
