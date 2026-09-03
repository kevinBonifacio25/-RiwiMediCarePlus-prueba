import express from "express";
import swaggerUi from "swagger-ui-express";
let swaggerSpec: any = null;
try {
	if (process.env.NODE_ENV !== 'test') {
		// require at runtime to avoid swagger-jsdoc parsing issues during tests
		// (tests may import app before swagger-jsdoc environment is ready)
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		swaggerSpec = require("./docs/swagger").default;
	}
} catch (e: any) {
	console.warn('Swagger spec not loaded:', e?.message ?? e);
}
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
import "./models";

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
if (swaggerSpec) {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use(errorHandler);
export default app;
