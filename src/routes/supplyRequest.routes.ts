import { Router } from "express";
import { SupplyRequestController } from "../controllers/SupplyRequest.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { UserRole } from "../types/enums.types";

const router = Router();
const controller = new SupplyRequestController();

router.use(authenticate);
router.get("/active", controller.active);
router.get("/history/clinic/:clinicId", controller.history);
router.post("/", authorize(UserRole.ADMIN, UserRole.REQUEST_MANAGER), controller.create);
router.patch("/:id/status", authorize(UserRole.ADMIN, UserRole.REQUEST_MANAGER), controller.updateStatus);
router.delete("/:id", authorize(UserRole.ADMIN), controller.remove);

export default router;
