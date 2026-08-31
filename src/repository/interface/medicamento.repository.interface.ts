import { Medicamento } from "../../models/Medicamento";

export interface MedicamentoRepositoryInterface {

  listar(): Promise<Medicamento[]>;

  buscarPorId(
    id: number
  ): Promise<Medicamento | null>;

  crear(
    medicamento: any
  ): Promise<Medicamento>;

}
