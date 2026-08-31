/**
 * DTO utilizado para crear un nuevo almacén.
 *
 * @interface CreateWarehouseDto
 */
export interface CreateWarehouseDto {
  /**
   * Nombre del almacén.
   *
   * @type {string}
   */
  name: string;

  /**
   * Ubicación física del almacén.
   *
   * @type {string}
   */
  location: string;
}

/**
 * DTO utilizado para actualizar la información de un almacén.
 *
 * @interface UpdateWarehouseDto
 */
export interface UpdateWarehouseDto {
  /**
   * Nuevo nombre del almacén.
   *
   * @type {string}
   */
  name?: string;

  /**
   * Nueva ubicación del almacén.
   *
   * @type {string}
   */
  location?: string;
}