import Clinic from "../models/clinic.model";
import { BaseRepository } from "./base.repository";

export class ClinicRepository extends BaseRepository<Clinic, any, any> {
  constructor() { super(Clinic); }
  async findByNit(nit: string): Promise<Clinic | null> { return Clinic.findOne({ where: { nit } }); }
}
