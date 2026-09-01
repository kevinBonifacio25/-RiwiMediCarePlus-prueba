import { Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";

import { RegisterUserDto, LoginDto } from "../dto/auth.dto";

/**
 * Controlador encargado de las operaciones relacionadas con autenticación
 * y gestión básica de usuarios del sistema.
 */
export class AuthController {
  private readonly service: AuthService = new AuthService();

  /**
   * Registra un nuevo usuario con validación de rol y correo.
   * Retorna la información pública del usuario creado.
   */
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

  /**
   * Valida las credenciales del usuario y responde con un JWT.
   */
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

  /**
   * Obtiene la lista de usuarios registrados sin incluir datos sensibles.
   */
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