import User from "../models/user.model";
import { RecordStatus } from "../types/enums.types";

/**
 * Repositorio para gestionar usuarios del sistema.
 */
export class UserRepository {
  /**
   * Crea un nuevo usuario en la base de datos.
   *
   * @param data Datos del usuario a registrar.
   * @returns El usuario creado.
   */
  async create(data: any): Promise<User> {
    return User.create(data);
  }

  /**
   * Busca un usuario activo por su correo electrónico.
   *
   * @param email Correo electrónico del usuario.
   * @returns El usuario encontrado o null si no existe.
   */
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email }
    });
  }

  /**
   * Obtiene todos los usuarios activos.
   *
   * @returns Lista de usuarios activos.
   */
  async findAll(): Promise<User[]> {
    return User.findAll({
      where: { status: RecordStatus.ACTIVE }
    });
  }
}
