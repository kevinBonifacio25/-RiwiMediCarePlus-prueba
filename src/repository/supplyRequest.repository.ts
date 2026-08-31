import SupplyRequest from "../models/supplyRequest.model";
import { BaseRepository } from "./base.repository";
import  Clinic  from "../models/clinic.model";
import  Medicine  from "../models/medicine.model";
import  Warehouse  from "../models/wareHouse.model";

export class SupplyRequestRepository extends BaseRepository<SupplyRequest, any, any> {
  constructor() { super(SupplyRequest); }
  async findAllWithRelations(): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({
      where: { status: "ACTIVE" } as any,
      include: [Clinic, Medicine, Warehouse]
    });
  }
  async findByClinic(clinicId: number): Promise<SupplyRequest[]> {
    return SupplyRequest.findAll({
      where: { clinicId, status: "ACTIVE" } as any,
      include: [Clinic, Medicine, Warehouse]
    });
  }
}
