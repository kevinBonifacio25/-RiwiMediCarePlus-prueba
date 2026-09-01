import { NextFunction, Request, Response } from "express";

/**
 * Middleware para manejar errores en la aplicación
 * @param err - El objeto de error capturado
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Función para pasar al siguiente middleware
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  // Registra el mensaje de error en la consola
  console.error(err.message);
  // Envía una respuesta con estado 400 y el mensaje de error
  res.status(400).json({ message: err.message });
};
