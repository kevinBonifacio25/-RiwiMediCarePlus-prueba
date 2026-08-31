import Medicine from "../../models/medicine.model";
import { IBaseRepository } from "./base.repository.interface";
import {
  CreateMedicineDto,
  UpdateMedicineDto
} from "../../dto/medicine.dto";

/**
 * Define las operaciones disponibles
 * para el repositorio de medicamentos.
 */
export interface IMedicineRepository
  extends IBaseRepository<
    Medicine,
    CreateMedicineDto,
    UpdateMedicineDto
  > {
  /**
   * Busca un medicamento disponible en un almacén específico.
   *
   * @param medicineId Identificador del medicamento.
   * @param warehouseId Identificador del almacén.
   * @returns Promesa con el medicamento encontrado o null.
   */
  findAvailable(
    medicineId: number,
    warehouseId: number
  ): Promise<Medicine | null>;
}