/**
 * @swagger
 * /api/requests:
 *   post:
 *     tags: [Solicitudes]
 *     summary: Crear una solicitud de abastecimiento
 *     description: Disponible para ADMIN y REQUEST_MANAGER.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clinicId, medicineId, warehouseId, quantity]
 *             properties:
 *               clinicId: { type: integer, example: 1 }
 *               medicineId: { type: integer, example: 1 }
 *               warehouseId: { type: integer, example: 1 }
 *               quantity: { type: integer, example: 10 }
 *               requestStatus:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 *                 example: PENDING
 *     responses:
 *       201: { description: Solicitud creada }
 *       400: { description: Datos inválidos }
 *       401: { description: No autenticado }
 *       403: { description: Sin permisos }
 *
 * /api/requests/active:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Consultar solicitudes activas
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de solicitudes activas }
 *
 * /api/requests/history/clinic/{clinicId}:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Consultar historial por clínica
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Historial encontrado }
 *       404: { description: Clínica no encontrada }
 *
 * /api/requests/{id}/status:
 *   patch:
 *     tags: [Solicitudes]
 *     summary: Actualizar el estado de una solicitud
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Estado actualizado }
 *       404: { description: Solicitud no encontrada }
 *
 * /api/requests/{id}:
 *   delete:
 *     tags: [Solicitudes]
 *     summary: Eliminar lógicamente una solicitud
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Solicitud eliminada }
 *       403: { description: Solo ADMIN }
 */
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
