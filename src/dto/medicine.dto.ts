/**
 * DTO utilizado para registrar un nuevo medicamento.
 *
 * @interface CreateMedicineDto
 */
export interface CreateMedicineDto {
  /**
   * Nombre del medicamento.
   *
   * @type {string}
   */
  name: string;

  /**
   * Descripción adicional del medicamento.
   * Este campo es opcional.
   *
   * @type {string}
   */
  description?: string;

  /**
   * Cantidad disponible del medicamento en inventario.
   *
   * @type {number}
   */
  stock: number;

  /**
   * Identificador del almacén donde se encuentra
   * disponible el medicamento.
   *
   * @type {number}
   */
  warehouseId: number;
}

/**
 * DTO utilizado para actualizar la información
 * de un medicamento.
 *
 * @interface UpdateMedicineDto
 */
export interface UpdateMedicineDto {
  /**
   * Nuevo nombre del medicamento.
   *
   * @type {string}
   */
  name?: string;

  /**
   * Nueva descripción del medicamento.
   *
   * @type {string}
   */
  description?: string;

  /**
   * Nueva cantidad disponible en inventario.
   *
   * @type {number}
   */
  stock?: number;

  /**
   * Identificador del almacén asociado al medicamento.
   *
   * @type {number}
   */
  warehouseId?: number;
}