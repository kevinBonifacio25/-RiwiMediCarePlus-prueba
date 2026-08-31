import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  try {
    req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET as string) as any;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
