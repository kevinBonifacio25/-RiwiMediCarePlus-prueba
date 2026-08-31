import { ClinicRepository } from "../repositories/ClinicRepository";
import { CrudService } from "./CrudService";
import Clinic from "../models/Clinic";

import {
  CreateClinicDto,
  UpdateClinicDto
} from "../dtos/clinic.dto";

export class ClinicService extends CrudService<
  Clinic,
  CreateClinicDto,
  UpdateClinicDto
> {
  private readonly clinicRepository: ClinicRepository;

  constructor() {
    const repository = new ClinicRepository();

    super(repository);

    this.clinicRepository = repository;
  }

  async create(
    data: CreateClinicDto
  ): Promise<Clinic> {
    const clinic: Clinic | null =
      await this.clinicRepository.findByNit(data.nit);

    if (clinic) {
      throw new Error(
        "Ya existe una clínica registrada con este NIT"
      );
    }

    return super.create(data);
  }
}