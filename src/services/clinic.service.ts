import { ClinicRepository } from "../repository/clinic.repository";
import { CrudService } from "./crud.service";
import Clinic from "../models/clinic.model";

export class ClinicService extends CrudService<Clinic, any, any> {
  private readonly clinicRepository: ClinicRepository;
  constructor() {
    const repository = new ClinicRepository();
    super(repository);
    this.clinicRepository = repository;
  }
  async create(data: any): Promise<Clinic> {
    const clinic = await this.clinicRepository.findByNit(data.nit);
    if (clinic) throw new Error("Clinic NIT already exists");
    return super.create(data);
  }
}
