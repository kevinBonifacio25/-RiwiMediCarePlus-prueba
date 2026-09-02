import SupplyRequest from "../models/supplyRequest.model";
import { BaseRepository } from "./base.repository";
import Clinic from "../models/clinic.model";
import Medicine from "../models/medicine.model";
import Warehouse from "../models/wareHouse.model";

/**
 * Repositorio para gestionar solicitudes de abastecimiento y sus relaciones.
 */
export class SupplyRequestRepository extends BaseRepository<SupplyRequest, any, any> {
  /**
   * Inicializa el repositorio con el modelo de solicitudes de abastecimiento.
   */
  constructor() { super(SupplyRequest); }

  /**
   * Obtiene todas las solicitudes activas junto con sus relaciones.
   *
   * @returns Lista de solicitudes con clínicas, medicamentos y almacenes asociados.
   */
  async findAllWithRelations(): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({
      where: { status: "ACTIVE" } as any,
      include: [Clinic, Medicine, Warehouse]
    });
  }

  /**
   * Obtiene las solicitudes activas asociadas a una clínica específica.
   *
   * @param clinicId Identificador de la clínica.
   * @returns Lista de solicitudes de la clínica indicada.
   */
  async findByClinic(clinicId: number): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({
      where: { clinicId, status: "ACTIVE" } as any,
      include: [Clinic, Medicine, Warehouse]
    });
  }
}
