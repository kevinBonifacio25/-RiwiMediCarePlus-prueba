import {
  Request,
  Response,
  NextFunction
} from "express";

import { AuthService } from "../services/AuthService";

import {
  RegisterUserDto,
  LoginDto
} from "../dtos/auth.dto";

export class AuthController {
  private readonly service: AuthService =
    new AuthService();

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: RegisterUserDto = req.body;

      const user = await this.service.register(data);

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

      const token: string =
        await this.service.login(data);

      res.status(200).json({
        token
      });
    } catch (error) {
      next(error);
    }
  };
}