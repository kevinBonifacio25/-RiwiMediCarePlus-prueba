import { BaseRepository } from "../repository/base.repository";
import { Model } from "sequelize";

/**
 * Servicio genérico que encapsula las operaciones CRUD para cualquier entidad del sistema.
 */
export class CrudService<T extends Model, CreateDto, UpdateDto> {
  constructor(private readonly repository: BaseRepository<T, CreateDto, UpdateDto>) {}
  /**
   * Crea un nuevo registro en la base de datos.
   */
  async create(data: CreateDto): Promise<T> { return this.repository.create(data); }
  /**
   * Devuelve todos los registros disponibles de la entidad.
   */
  async getAll(): Promise<T[]> { return this.repository.findAll(); }
  /**
   * Busca un elemento por su identificador y valida que exista.
   */
  async getById(id: number): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error("Resource not found");
    return entity;
  }
  /**
   * Actualiza un registro existente con los datos recibidos.
   */
  async update(id: number, data: UpdateDto): Promise<T> {
    const entity = await this.repository.update(id, data);
    if (!entity) throw new Error("Resource not found");
    return entity;
  }
  /**
   * Elimina de forma lógica el recurso marcándolo como eliminado.
   */
  async softDelete(id: number): Promise<T> { return this.update(id, { status: "DELETED" } as UpdateDto); }
}
