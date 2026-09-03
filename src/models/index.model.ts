import User from "./user.model";
import Clinic from "./clinic.model";
import Warehouse from "./wareHouse.model";
import Medicine from "./medicine.model";
import SupplyRequest from "./supplyRequest.model";

User.hasMany(Clinic, { foreignKey: "userId" });
Clinic.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Warehouse, { foreignKey: "userId" });
Warehouse.belongsTo(User, { foreignKey: "userId" });

User.hasMany(SupplyRequest, { foreignKey: "userId" });
SupplyRequest.belongsTo(User, { foreignKey: "userId" });

Warehouse.hasMany(Medicine, { foreignKey: "warehouseId" });
Medicine.belongsTo(Warehouse, { foreignKey: "warehouseId" });

Clinic.hasMany(SupplyRequest, { foreignKey: "clinicId" });
SupplyRequest.belongsTo(Clinic, { foreignKey: "clinicId" });

Medicine.hasMany(SupplyRequest, { foreignKey: "medicineId" });
SupplyRequest.belongsTo(Medicine, { foreignKey: "medicineId" });

Warehouse.hasMany(SupplyRequest, { foreignKey: "warehouseId" });
SupplyRequest.belongsTo(Warehouse, { foreignKey: "warehouseId" });



export { User, Clinic, Warehouse, Medicine, SupplyRequest };
