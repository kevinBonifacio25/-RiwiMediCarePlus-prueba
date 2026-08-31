import { Router } from "express";
import multer from "multer";
import { SeedController } from "../controllers/seed.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { UserRole } from "../types/enums.types";

const router = Router();
const upload = multer();
const controller = new SeedController();

router.post("/upload", authenticate, authorize(UserRole.ADMIN), upload.single("file"), controller.upload);
export default router;
