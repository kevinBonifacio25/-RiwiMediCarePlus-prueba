import { Solicitud } from "../models/clinic.model";

import {
  SolicitudRepositoryInterface
} from "./interface/solicitud.repository.interface";

export class SolicitudRepository
  implements SolicitudRepositoryInterface {

  async crear(
    solicitud: any
  ): Promise<Solicitud> {

    return await Solicitud.create(
      solicitud
    );
  }

  async buscarPorId(
    id: number
  ): Promise<Solicitud | null> {

    return await Solicitud.findByPk(id);
  }

  async actualizarEstado(
    id: number,
    estado: string
  ): Promise<Solicitud | null> {

    const solicitud =
      await Solicitud.findByPk(id);

    if (!solicitud) {
      return null;
    }

    await solicitud.update({
      estado: estado
    });

    return solicitud;
  }
}

