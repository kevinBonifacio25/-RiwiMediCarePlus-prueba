import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/enums.types";

/**
 * Middleware de autorización que verifica si el usuario tiene los roles requeridos.
 * @param roles - Roles permitidos para acceder al recurso
 * @returns Middleware que valida el rol del usuario
 */
export const authorize = (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    // Verifica si el usuario existe y si su rol está incluido en los roles permitidos
    if (!req.user || !roles.includes(req.user.role)) {
      // Si no tiene permiso, retorna error 403 (Forbidden)
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    // Si tiene permiso, continúa al siguiente middleware
    next();
  };
