import Medicine from "../models/medicine.model";
import { BaseRepository } from "./base.repository";
export class MedicineRepository extends BaseRepository<Medicine, any, any> {
  constructor() { super(Medicine); }
  async findAvailable(medicineId: number, warehouseId: number): Promise<Medicine | null> {
    return Medicine.findOne({ where: { id: medicineId, warehouseId, status: "ACTIVE" } as any });
  }
}
