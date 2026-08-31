import { Usuario } from "../../models/Usuario";

export interface UsuarioRepositoryInterface {

  crear(usuario: any): Promise<Usuario>;

  buscarPorEmail(
    email: string
  ): Promise<Usuario | null>;

  buscarPorId(
    id: number
  ): Promise<Usuario | null>;

}
