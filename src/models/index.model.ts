import Clinic from "./Clinic";
import Warehouse from "./Warehouse";
import Medicine from "./Medicine";
import SupplyRequest from "./SupplyRequest";

Warehouse.hasMany(Medicine, { foreignKey: "warehouseId" });
Medicine.belongsTo(Warehouse, { foreignKey: "warehouseId" });

Clinic.hasMany(SupplyRequest, { foreignKey: "clinicId" });
SupplyRequest.belongsTo(Clinic, { foreignKey: "clinicId" });

Medicine.hasMany(SupplyRequest, { foreignKey: "medicineId" });
SupplyRequest.belongsTo(Medicine, { foreignKey: "medicineId" });

Warehouse.hasMany(SupplyRequest, { foreignKey: "warehouseId" });
SupplyRequest.belongsTo(Warehouse, { foreignKey: "warehouseId" });

export { Clinic, Warehouse, Medicine, SupplyRequest };
