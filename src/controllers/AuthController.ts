import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private readonly service = new AuthService();

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.service.register(req.body.name, req.body.email, req.body.password, req.body.role);
      res.status(201).json(user);
    } catch (error) { next(error); }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = await this.service.login(req.body.email, req.body.password);
      res.json({ token });
    } catch (error) { next(error); }
  };
}
