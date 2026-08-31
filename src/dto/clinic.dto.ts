/**
 * DTO utilizado para crear una nueva clínica.
 *
 * @interface CreateClinicDto
 */
export interface CreateClinicDto {
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

  /**
   * Nombre del responsable de la clínica.
   *
   * @type {string}
   */
  responsibleName: string;

  /**
   * Correo electrónico del responsable de la clínica.
   *
   * @type {string}
   */
  responsibleEmail: string;
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

  /**
   * Nuevo nombre del responsable.
   *
   * @type {string}
   */
  responsibleName?: string;

  /**
   * Nuevo correo electrónico del responsable.
   *
   * @type {string}
   */
  responsibleEmail?: string;
}