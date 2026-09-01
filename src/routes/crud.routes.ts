/**
 * @swagger
 * /api/clinics:
 *   post:
 *     tags: [Clínicas]
 *     summary: Crear una clínica
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201: { description: Registro creado }
 *       401: { description: No autenticado }
 *       403: { description: Sin permisos }
 *   get:
 *     tags: [Clínicas]
 *     summary: Listar clínicas
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de registros }
 *
 * /api/clinics/{id}:
 *   get:
 *     tags: [Clínicas]
 *     summary: Consultar una clínica por ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Registro encontrado }
 *       404: { description: Registro no encontrado }
 *   put:
 *     tags: [Clínicas]
 *     summary: Actualizar una clínica
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Registro actualizado }
 *   delete:
 *     tags: [Clínicas]
 *     summary: Eliminar una clínica
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Registro eliminado }
 *
 * /api/warehouses:
 *   post:
 *     tags: [Almacenes]
 *     summary: Crear un almacén
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Almacén creado }
 *   get:
 *     tags: [Almacenes]
 *     summary: Listar almacenes
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de almacenes }
 *
 * /api/warehouses/{id}:
 *   get:
 *     tags: [Almacenes]
 *     summary: Consultar un almacén por ID
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Almacén encontrado }
 *   put:
 *     tags: [Almacenes]
 *     summary: Actualizar un almacén
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Almacén actualizado }
 *   delete:
 *     tags: [Almacenes]
 *     summary: Eliminar un almacén
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Almacén eliminado }
 *
 * /api/medicines:
 *   post:
 *     tags: [Medicamentos]
 *     summary: Crear un medicamento
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Medicamento creado }
 *   get:
 *     tags: [Medicamentos]
 *     summary: Listar medicamentos
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de medicamentos }
 *
 * /api/medicines/{id}:
 *   get:
 *     tags: [Medicamentos]
 *     summary: Consultar un medicamento por ID
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Medicamento encontrado }
 *   put:
 *     tags: [Medicamentos]
 *     summary: Actualizar un medicamento
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Medicamento actualizado }
 *   delete:
 *     tags: [Medicamentos]
 *     summary: Eliminar un medicamento
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Medicamento eliminado }
 */
import { Router } from "express";
import { CrudController } from "../controllers/crud.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { UserRole } from "../types/enums.types";

export const createCrudRouter = (controller: CrudController): Router => {
  const router = Router();

  router.use(authenticate, authorize(UserRole.ADMIN));

  router.post("/", controller.create);
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
};
