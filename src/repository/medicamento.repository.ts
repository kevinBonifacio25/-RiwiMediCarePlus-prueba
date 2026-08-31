import { Medicamento } from "../models/medicine.model";

import {
  MedicamentoRepositoryInterface
} from "./interface/medicine.repository.interface";

export class MedicamentoRepository
  implements MedicamentoRepositoryInterface {

  async listar(): Promise<Medicamento[]> {

    return await Medicamento.findAll();
  }

  async buscarPorId(
    id: number
  ): Promise<Medicamento | null> {

    return await Medicamento.findByPk(id);
  }

  async crear(
    medicamento: any
  ): Promise<Medicamento> {

    return await Medicamento.create(medicamento);
  }
}
