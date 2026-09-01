import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware de autenticación que verifica el token JWT en el header de autorización.
 * Extrae el token del formato "Bearer <token>" y lo valida usando la JWT_SECRET.
 * Si el token es válido, lo adjunta al objeto request. Si no es válido, retorna un error 401.
 * @param req - Objeto de solicitud Express
 * @param res - Objeto de respuesta Express
 * @param next - Función para pasar al siguiente middleware
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Obtener el header de autorización
  const header = req.headers.authorization;
  
  // Validar que el header exista y comience con "Bearer "
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  
  try {
    // Extraer el token (segundo elemento después de dividir por espacio)
    // Verificar y decodificar el token JWT usando la clave secreta
    req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET as string) as any;
    
    // Pasar al siguiente middleware si el token es válido
    next();
  } catch {
    // Retornar error si el token es inválido o expirado
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
