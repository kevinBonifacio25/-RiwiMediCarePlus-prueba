import { Router } from "express";

import {
  registrar,
  login
} from "../controllers/AuthController";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *           properties:
 *             nombre:
 *               type: string
 *               example: Juan Perez
 *             email:
 *               type: string
 *               example: juan@gmail.com
 *             password:
 *               type: string
 *               example: 123456
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error al crear usuario
 */
router.post("/register", registrar);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login correcto
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

export default router;
