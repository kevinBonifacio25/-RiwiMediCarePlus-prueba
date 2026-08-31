import User from "../../models/user.model";
import { IBaseRepository } from "./base.repository.interface";
import { RegisterUserDto } from "../../dto/auth.dto";

/**
 * Define las operaciones disponibles
 * para el repositorio de usuarios.
 */
export interface IUserRepository
  extends IBaseRepository<
    User,
    RegisterUserDto,
    Partial<RegisterUserDto>
  > {
  /**
   * Busca un usuario mediante su correo electrónico.
   *
   * @param email Correo electrónico del usuario.
   * @returns Usuario encontrado o null.
   */
  findByEmail(email: string): Promise<User | null>;
}