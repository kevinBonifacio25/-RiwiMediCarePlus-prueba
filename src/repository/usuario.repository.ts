import { Usuario } from "../models/user.model";

import {
  UsuarioRepositoryInterface
} from "./interface/usuario.repository.interface";

export class UsuarioRepository
  implements UsuarioRepositoryInterface {

  async crear(usuario: any): Promise<Usuario> {

    return await Usuario.create(usuario);
  }

  async buscarPorEmail(
    email: string
  ): Promise<Usuario | null> {

    return await Usuario.findOne({
      where: {
        email: email
      }
    });
  }

  async buscarPorId(
    id: number
  ): Promise<Usuario | null> {

    return await Usuario.findByPk(id);
  }
}
