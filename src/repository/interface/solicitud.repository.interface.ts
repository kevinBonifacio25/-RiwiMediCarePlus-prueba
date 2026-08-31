import { Solicitud } from "../../models/Solicitud";

export interface SolicitudRepositoryInterface {

  crear(
    solicitud: any
  ): Promise<Solicitud>;

  buscarPorId(
    id: number
  ): Promise<Solicitud | null>;

  actualizarEstado(
    id: number,
    estado: string
  ): Promise<Solicitud | null>;

}
