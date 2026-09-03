import { SupplyRequestRepository } from "../repository/supplyRequest.repository";
import { ClinicRepository } from "../repository/clinic.repository";
import { MedicineRepository } from "../repository/medicine.repository";
import { WarehouseRepository } from "../repository/wareHouse.repository";
import { RequestStatus } from "../types/enums.types";
import SupplyRequest from "../models/supplyRequest.model";

/**
 * Servicio para manejar las solicitudes de abastecimiento con validación de inventario.
 */
export class SupplyRequestService {
  private readonly requestRepository = new SupplyRequestRepository();
  private readonly clinicRepository = new ClinicRepository();
  private readonly medicineRepository = new MedicineRepository();
  private readonly warehouseRepository = new WarehouseRepository();

  /**
   * Crea una solicitud después de validar clínica, almacén, medicamento y stock disponible.
   */
  async create(data: { userId: number; clinicId: number; medicineId: number; warehouseId: number; quantity: number; requestStatus?: RequestStatus }): Promise<SupplyRequest> {
    if (data.quantity <= 0) throw new Error("Quantity must be greater than zero");

    const clinic = await this.clinicRepository.findById(data.clinicId);
    if (!clinic) throw new Error("Clinic not found");

    const warehouse = await this.warehouseRepository.findById(data.warehouseId);
    if (!warehouse) throw new Error("Warehouse not found");

    const medicine = await this.medicineRepository.findAvailable(data.medicineId, data.warehouseId);
    if (!medicine) throw new Error("Medicine not found in assigned warehouse");
    if (medicine.stock < data.quantity) throw new Error("Insufficient inventory");

    return this.requestRepository.create({
      ...data,
      requestStatus: data.requestStatus || RequestStatus.PENDING
    });
  }

  /**
   * Actualiza el estado de una solicitud conforme al flujo del negocio.
   */
  async updateStatus(id: number, requestStatus: RequestStatus): Promise<SupplyRequest> {
    if (!Object.values(RequestStatus).includes(requestStatus)) throw new Error("Invalid request status");
    const request = await this.requestRepository.update(id, { requestStatus });
    if (!request) throw new Error("Request not found");
    return request;
  }

  /**
   * Consulta las solicitudes que aún siguen activas.
   */
  async getActive(): Promise<SupplyRequest[]> { return this.requestRepository.findAllWithRelations(); }
  /**
   * Recupera el historial de solicitudes asociadas a una clínica específica.
   */
  async getHistoryByClinic(clinicId: number): Promise<SupplyRequest[]> {
    const clinic = await this.clinicRepository.findById(clinicId);
    if (!clinic) throw new Error("Clinic not found");
    return this.requestRepository.findByClinic(clinicId);
  }
  /**
   * Elimina lógicamente una solicitud marcada como no activa o cerrada.
   */
  async softDelete(id: number): Promise<SupplyRequest> {
    const request = await this.requestRepository.update(id, { status: "DELETED" });
    if (!request) throw new Error("Request not found");
    return request;
  }
}
