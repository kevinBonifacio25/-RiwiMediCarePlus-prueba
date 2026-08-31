import { SupplyRequestRepository } from "../repositories/SupplyRequestRepository";
import { ClinicRepository } from "../repositories/ClinicRepository";
import { MedicineRepository } from "../repositories/MedicineRepository";
import { WarehouseRepository } from "../repositories/WarehouseRepository";

import { RequestStatus } from "../types/enums";

import SupplyRequest from "../models/SupplyRequest";

import {
  CreateSupplyRequestDto,
  UpdateSupplyRequestStatusDto
} from "../dtos/supplyRequest.dto";

export class SupplyRequestService {
  private readonly requestRepository: SupplyRequestRepository =
    new SupplyRequestRepository();

  private readonly clinicRepository: ClinicRepository =
    new ClinicRepository();

  private readonly medicineRepository: MedicineRepository =
    new MedicineRepository();

  private readonly warehouseRepository: WarehouseRepository =
    new WarehouseRepository();

  async create(
    data: CreateSupplyRequestDto
  ): Promise<SupplyRequest> {
    if (data.quantity <= 0) {
      throw new Error(
        "La cantidad debe ser mayor a cero"
      );
    }

    const clinic =
      await this.clinicRepository.findById(
        data.clinicId
      );

    if (!clinic) {
      throw new Error("La clínica no existe");
    }

    const warehouse =
      await this.warehouseRepository.findById(
        data.warehouseId
      );

    if (!warehouse) {
      throw new Error("El almacén no existe");
    }

    const medicine =
      await this.medicineRepository.findAvailable(
        data.medicineId,
        data.warehouseId
      );

    if (!medicine) {
      throw new Error(
        "El medicamento no existe en el almacén asignado"
      );
    }

    if (medicine.stock < data.quantity) {
      throw new Error("Inventario insuficiente");
    }

    return this.requestRepository.create({
      ...data,
      requestStatus:
        data.requestStatus || RequestStatus.PENDING
    });
  }

  async updateStatus(
    id: number,
    data: UpdateSupplyRequestStatusDto
  ): Promise<SupplyRequest> {
    if (
      !Object.values(RequestStatus).includes(
        data.requestStatus
      )
    ) {
      throw new Error(
        "Estado de solicitud no permitido"
      );
    }

    const request =
      await this.requestRepository.update(
        id,
        {
          requestStatus: data.requestStatus
        }
      );

    if (!request) {
      throw new Error("Solicitud no encontrada");
    }

    return request;
  }

  async getActive(): Promise<SupplyRequest[]> {
    return this.requestRepository.findAllWithRelations();
  }

  async getHistoryByClinic(
    clinicId: number
  ): Promise<SupplyRequest[]> {
    const clinic =
      await this.clinicRepository.findById(
        clinicId
      );

    if (!clinic) {
      throw new Error("Clínica no encontrada");
    }

    return this.requestRepository.findByClinic(
      clinicId
    );
  }

  async softDelete(
    id: number
  ): Promise<SupplyRequest> {
    const request =
      await this.requestRepository.update(
        id,
        {
          status: "DELETED"
        }
      );

    if (!request) {
      throw new Error("Solicitud no encontrada");
    }

    return request;
  }
}