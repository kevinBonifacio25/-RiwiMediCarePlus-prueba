import { ClinicRepository } from "../repository/clinic.repository";
import { CrudService } from "./crud.service";
import Clinic from "../models/clinic.model";

/**
 * Servicio específico para clínicas con validación adicional del NIT.
 */
export class ClinicService extends CrudService<Clinic, any, any> {
  private readonly clinicRepository: ClinicRepository;
  constructor() {
    const repository = new ClinicRepository();
    super(repository);
    this.clinicRepository = repository;
  }
  /**
   * Evita duplicados por NIT antes de crear una clínica.
   */
  async create(data: any): Promise<Clinic> {
    const clinic = await this.clinicRepository.findByNit(data.nit);
    if (clinic) throw new Error("Clinic NIT already exists");
    return super.create(data);
  }
}
