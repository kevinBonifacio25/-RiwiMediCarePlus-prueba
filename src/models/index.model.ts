import Clinic from "./clinic.model";
import Warehouse from "./wareHouse.model";
import Medicine from "./medicine.model";
import SupplyRequest from "./supplyRequest.model";

Warehouse.hasMany(Medicine, { foreignKey: "warehouseId" });
Medicine.belongsTo(Warehouse, { foreignKey: "warehouseId" });

Clinic.hasMany(SupplyRequest, { foreignKey: "clinicId" });
SupplyRequest.belongsTo(Clinic, { foreignKey: "clinicId" });

Medicine.hasMany(SupplyRequest, { foreignKey: "medicineId" });
SupplyRequest.belongsTo(Medicine, { foreignKey: "medicineId" });

Warehouse.hasMany(SupplyRequest, { foreignKey: "warehouseId" });
SupplyRequest.belongsTo(Warehouse, { foreignKey: "warehouseId" });

export { Clinic, Warehouse, Medicine, SupplyRequest };
