import { UserRole } from "../types/enums.types";

/**
 * DTO utilizado para registrar un nuevo usuario en el sistema.
 *
 * @interface RegisterUserDto
 */
export interface RegisterUserDto {
  /**
   * Nombre completo del usuario.
   *
   * @type {string}
   */
  name: string;

  /**
   * Correo electrónico único del usuario.
   *
   * @type {string}
   */
  email: string;

  /**
   * Contraseña del usuario.
   * Esta contraseña será encriptada antes de ser almacenada.
   *
   * @type {string}
   */
  password: string;

  /**
   * Rol asignado al usuario.
   * Puede ser ADMIN o REQUEST_MANAGER.
   *
   * @type {UserRole}
   */
  role: UserRole;
}

/**
 * DTO utilizado para iniciar sesión en el sistema.
 *
 * @interface LoginDto
 */
export interface LoginDto {
  /**
   * Correo electrónico registrado del usuario.
   *
   * @type {string}
   */
  email: string;

  /**
   * Contraseña del usuario.
   *
   * @type {string}
   */
  password: string;
}