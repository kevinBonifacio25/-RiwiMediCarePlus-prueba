import SupplyRequest from "../../models/supplyRequest.model";
import { IBaseRepository } from "./base.repository.interface";
import {
  CreateSupplyRequestDto,
  UpdateSupplyRequestStatusDto
} from "../../dto/supplyRequest.dto";

/**
 * Define las operaciones disponibles
 * para el repositorio de solicitudes de abastecimiento.
 */
export interface ISupplyRequestRepository
  extends IBaseRepository<
    SupplyRequest,
    CreateSupplyRequestDto,
    UpdateSupplyRequestStatusDto
  > {
  /**
   * Obtiene todas las solicitudes activas
   * incluyendo sus relaciones.
   *
   * @returns Promesa con la lista de solicitudes.
   */
  findAllWithRelations(): Promise<SupplyRequest[]>;

  /**
   * Obtiene el historial de solicitudes
   * realizadas por una clínica específica.
   *
   * @param clinicId Identificador de la clínica.
   * @returns Promesa con las solicitudes de la clínica.
   */
  findByClinic(
    clinicId: number
  ): Promise<SupplyRequest[]>;
}