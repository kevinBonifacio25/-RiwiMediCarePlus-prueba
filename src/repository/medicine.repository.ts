import Medicine from "../models/medicine.model";
import { BaseRepository } from "./base.repository";

/**
 * Repositorio para gestionar operaciones específicas de medicamentos.
 */
export class MedicineRepository extends BaseRepository<Medicine, any, any> {
  /**
   * Inicializa el repositorio con el modelo de medicamentos.
   */
  constructor() { super(Medicine); }

  /**
   * Busca un medicamento activo disponible en un almacén específico.
   *
   * @param medicineId Identificador del medicamento.
   * @param warehouseId Identificador del almacén.
   * @returns El medicamento encontrado o null si no existe.
   */
  async findAvailable(medicineId: number, warehouseId: number): Promise<Medicine | null> {
    return Medicine.findOne({
       where: 
      { id: medicineId, warehouseId, status: "ACTIVE" } as any });
  }
}
