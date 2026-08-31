import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";

import { RegisterUserDto, LoginDto } from "../dto/auth.dto";

export class AuthController {
  private readonly service: AuthService = new AuthService();

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: RegisterUserDto = req.body;

      const user = await this.service.register(data.name, data.email, data.password, data.role);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: LoginDto = req.body;

      const token: string = await this.service.login(data.email, data.password);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.service.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
}