import Clinic from "../models/clinic.model";
import { BaseRepository } from "./base.repository";

/**
 * Repositorio para gestionar operaciones específicas de clínicas.
 */
export class ClinicRepository extends BaseRepository<Clinic, any, any> {
  /**
   * Inicializa el repositorio con el modelo de clínicas.
   */
  constructor() { super(Clinic); }

  /**
   * Busca una clínica por su número de NIT.
   *
   * @param nit Número de identificación tributaria.
   * @returns La clínica encontrada o null si no existe.
   */
  async findByNit(nit: string): Promise<Clinic | null> {
    return Clinic.findOne({ where: { nit } });
  }
}
