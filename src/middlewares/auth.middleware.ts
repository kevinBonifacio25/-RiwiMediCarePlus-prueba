import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verificarToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Token requerido"
    });
  }

  const token = header.split(" ")[1];

  try {

    const usuario = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    (req as any).usuario = usuario;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token inválido"
    });

  }
};
