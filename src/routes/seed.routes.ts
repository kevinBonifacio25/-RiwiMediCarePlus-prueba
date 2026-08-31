import { Router } from "express";
import multer from "multer";
import { SeedController } from "../controllers/SeedController";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { UserRole } from "../types/enums";

const router = Router();
const upload = multer();
const controller = new SeedController();

router.post("/upload", authenticate, authorize(UserRole.ADMIN), upload.single("file"), controller.upload);
export default router;
