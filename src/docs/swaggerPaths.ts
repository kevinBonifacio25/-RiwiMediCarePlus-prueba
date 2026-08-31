/**
 * @swagger
 * tags:
 *   - name: Clínicas
 *     description: Administración de clínicas
 *   - name: Almacenes
 *     description: Administración de almacenes
 *   - name: Medicamentos
 *     description: Administración de medicamentos
 *   - name: Solicitudes
 *     description: Gestión de solicitudes de abastecimiento
 *   - name: Seeders
 *     description: Carga inicial de datos mediante archivos JSON
 */

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
 *             required: [name, nit, responsibleName, responsibleEmail]
 *             properties:
 *               name: { type: string, example: Clínica Norte }
 *               nit: { type: string, example: 900123456-1 }
 *               responsibleName: { type: string, example: Ana Pérez }
 *               responsibleEmail: { type: string, example: ana@clinica.com }
 *     responses:
 *       201: { description: Clínica creada }
 *       400: { description: NIT duplicado o datos inválidos }
 *       401: { description: No autenticado }
 *       403: { description: Sin permisos }
 *   get:
 *     tags: [Clínicas]
 *     summary: Consultar todas las clínicas activas
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de clínicas }
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
 *       200: { description: Clínica encontrada }
 *       404: { description: Clínica no encontrada }
 *   put:
 *     tags: [Clínicas]
 *     summary: Actualizar una clínica
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Clínica Norte Actualizada
 *             responsibleName: Carlos Gómez
 *     responses:
 *       200: { description: Clínica actualizada }
 *       404: { description: Clínica no encontrada }
 *   delete:
 *     tags: [Clínicas]
 *     summary: Eliminar lógicamente una clínica
 *     description: Cambia el estado del registro a DELETED.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Clínica eliminada lógicamente }
 *
 * /api/warehouses:
 *   post:
 *     tags: [Almacenes]
 *     summary: Crear un almacén
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Almacén Central
 *             location: Barranquilla
 *     responses:
 *       201: { description: Almacén creado }
 *   get:
 *     tags: [Almacenes]
 *     summary: Consultar todos los almacenes activos
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de almacenes }
 *
 * /api/warehouses/{id}:
 *   get:
 *     tags: [Almacenes]
 *     summary: Consultar un almacén por ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén encontrado }
 *       404: { description: Almacén no encontrado }
 *   put:
 *     tags: [Almacenes]
 *     summary: Actualizar un almacén
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Almacén Principal
 *             location: Soledad
 *     responses:
 *       200: { description: Almacén actualizado }
 *   delete:
 *     tags: [Almacenes]
 *     summary: Eliminar lógicamente un almacén
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Almacén eliminado lógicamente }
 *
 * /api/medicines:
 *   post:
 *     tags: [Medicamentos]
 *     summary: Crear un medicamento
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Acetaminofén
 *             description: Medicamento de 500 mg
 *             stock: 100
 *             warehouseId: 1
 *     responses:
 *       201: { description: Medicamento creado }
 *   get:
 *     tags: [Medicamentos]
 *     summary: Consultar todos los medicamentos activos
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de medicamentos }
 *
 * /api/medicines/{id}:
 *   get:
 *     tags: [Medicamentos]
 *     summary: Consultar un medicamento por ID
 *     security: [{ bearerAuth: [] }]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento encontrado }
 *       404: { description: Medicamento no encontrado }
 *   put:
 *     tags: [Medicamentos]
 *     summary: Actualizar un medicamento
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             stock: 150
 *             description: Medicamento actualizado
 *     responses:
 *       200: { description: Medicamento actualizado }
 *   delete:
 *     tags: [Medicamentos]
 *     summary: Eliminar lógicamente un medicamento
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Medicamento eliminado lógicamente }
 *
 * /api/requests:
 *   post:
 *     tags: [Solicitudes]
 *     summary: Registrar una solicitud de abastecimiento
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
 *       400: { description: Clínica, medicamento o almacén inválido; inventario insuficiente o cantidad inválida }
 *       401: { description: No autenticado }
 *       403: { description: Sin permisos }
 *
 * /api/requests/active:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Consultar solicitudes activas
 *     description: Disponible para todos los usuarios autenticados.
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Lista de solicitudes activas }
 *
 * /api/requests/history/clinic/{clinicId}:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Consultar historial de solicitudes por clínica
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema: { type: integer }
 *         description: ID de la clínica
 *     responses:
 *       200: { description: Historial de solicitudes }
 *       404: { description: Clínica no encontrada }
 *
 * /api/requests/{id}/status:
 *   patch:
 *     tags: [Solicitudes]
 *     summary: Actualizar el estado de una solicitud
 *     description: Disponible para ADMIN y REQUEST_MANAGER.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [requestStatus]
 *             properties:
 *               requestStatus:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 *                 example: APPROVED
 *     responses:
 *       200: { description: Estado actualizado }
 *       400: { description: Estado inválido }
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
 *       200: { description: Solicitud eliminada lógicamente }
 *       403: { description: Solo ADMIN }
 *
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
 *       200:
 *         description: Datos cargados correctamente
 *       400:
 *         description: Archivo inválido o JSON incorrecto
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Solo ADMIN
 */
/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     tags: [Autenticación]
 *     summary: Obtener todos los usuarios registrados (sin password)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permisos (solo ADMIN)
 */
export {};
