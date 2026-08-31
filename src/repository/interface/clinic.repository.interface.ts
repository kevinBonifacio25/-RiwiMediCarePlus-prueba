import Clinic from "../../models/clinic.model";
import { IBaseRepository } from "./base.repository.interface";
import {
  CreateClinicDto,
  UpdateClinicDto
} from "../../dto/clinic.dto";

/**
 * Define las operaciones disponibles
 * para el repositorio de clínicas.
 */
export interface IClinicRepository
  extends IBaseRepository<
    Clinic,
    CreateClinicDto,
    UpdateClinicDto
  > {
  /**
   * Busca una clínica mediante su NIT.
   *
   * @param nit Número de identificación tributaria.
   * @returns Clínica encontrada o null.
   */
  findByNit(nit: string): Promise<Clinic | null>;
}