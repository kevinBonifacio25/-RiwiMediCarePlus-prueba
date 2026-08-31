import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";
import authRoutes from "./routes/auth.routes";
import { createCrudRouter } from "./routes/crud.routes";
import supplyRequestRoutes from "./routes/supplyRequest.routes";
import seedRoutes from "./routes/seed.routes";
import { AuthController } from "./controllers/auth.controller";
import { CrudController } from "./controllers/crud.controller";
import { ClinicService } from "./services/clinic.service";
import { CrudService } from "./services/crud.service";
import { WarehouseRepository } from "./repository/wareHouse.repository";
import { MedicineRepository } from "./repository/medicine.repository";
import Warehouse from "./models/wareHouse.model";
import Medicine from "./models/medicine.model";
import { errorHandler } from "./middlewares/error.middleware";
//import "./models";

const app = express();
app.use(express.json());

const warehouseController = new CrudController(new CrudService<Warehouse, any, any>(new WarehouseRepository()));
const medicineController = new CrudController(new CrudService<Medicine, any, any>(new MedicineRepository()));
const clinicController = new CrudController(new ClinicService());

app.use("/api/auth", authRoutes);
app.use("/api/clinics", createCrudRouter(clinicController));
app.use("/api/warehouses", createCrudRouter(warehouseController));
app.use("/api/medicines", createCrudRouter(medicineController));
app.use("/api/requests", supplyRequestRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);
export default app;
