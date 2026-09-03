import { RequestStatus } from "../types/enums.types";

/**
 * DTO utilizado para crear una nueva solicitud
 * de abastecimiento.
 *
 * @interface CreateSupplyRequestDto
 */
export interface CreateSupplyRequestDto {
  /**
   * Identificador del usuario que registra la solicitud.
   *
   * @type {number}
   */
  userId: number;

  /**
   * Identificador de la clínica que realiza la solicitud.
   *
   * @type {number}
   */
  clinicId: number;

  /**
   * Identificador del medicamento solicitado.
   *
   * @type {number}
   */
  medicineId: number;

  /**
   * Identificador del almacén asignado
   * para atender la solicitud.
   *
   * @type {number}
   */
  warehouseId: number;

  /**
   * Cantidad de medicamentos solicitados.
   * Debe ser mayor a cero.
   *
   * @type {number}
   */
  quantity: number;

  /**
   * Estado inicial de la solicitud.
   * Si no se proporciona, el sistema utilizará
   * el estado PENDING.
   *
   * @type {RequestStatus}
   */
  requestStatus?: RequestStatus;
}

/**
 * DTO utilizado para modificar únicamente
 * el estado de una solicitud existente.
 *
 * @interface UpdateSupplyRequestStatusDto
 */
export interface UpdateSupplyRequestStatusDto {
  /**
   * Nuevo estado de la solicitud.
   *
   * Valores permitidos:
   * - PENDING
   * - APPROVED
   * - REJECTED
   * - COMPLETED
   *
   * @type {RequestStatus}
   */
  requestStatus: RequestStatus;
}