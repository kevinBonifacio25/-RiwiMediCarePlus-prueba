/**
 * @swagger
 * /api/seed/upload:
 *   post:
 *     tags: [Seeders]
 *     summary: Cargar información inicial desde un archivo JSON
 *     description: Permite cargar usuarios, clínicas, almacenes y medicamentos. Solo ADMIN.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo JSON con los datos iniciales
 *     responses:
 *       200: { description: Datos cargados correctamente }
 *       400: { description: Archivo inválido o JSON incorrecto }
 *       401: { description: No autenticado }
 *       403: { description: Solo ADMIN }
 */
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
