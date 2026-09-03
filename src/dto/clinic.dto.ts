/**
 * DTO utilizado para crear una nueva clínica.
 *
 * @interface CreateClinicDto
 */
export interface CreateClinicDto {
  /**
   * ID del usuario responsable de la clínica.
   *
   * @type {number}
   */
  userId: number;

  /**
   * Nombre de la clínica.
   *
   * @type {string}
   */
  name: string;

  /**
   * Número de identificación tributaria de la clínica.
   * Este valor debe ser único en el sistema.
   *
   * @type {string}
   */
  nit: string;
}

/**
 * DTO utilizado para actualizar la información de una clínica.
 *
 * Todos los campos son opcionales porque se permite
 * actualizar únicamente la información necesaria.
 *
 * @interface UpdateClinicDto
 */
export interface UpdateClinicDto {
  /**
   * Nuevo ID del usuario responsable.
   *
   * @type {number}
   */
  userId?: number;

  /**
   * Nuevo nombre de la clínica.
   *
   * @type {string}
   */
  name?: string;

  /**
   * Nuevo NIT de la clínica.
   *
   * @type {string}
   */
  nit?: string;
}