import { Model, ModelStatic } from "sequelize";
import { IBaseRepository } from "./interface/base.repository.interface";

/**
 * Repositorio base que centraliza la lógica común de CRUD
 * para todas las entidades del sistema.
 *
 * @template T Tipo del modelo Sequelize asociado.
 * @template CreateDto Tipo de datos para crear un registro.
 * @template UpdateDto Tipo de datos para actualizar un registro.
 */
export class BaseRepository<T extends Model, CreateDto, UpdateDto> implements IBaseRepository<T, CreateDto, UpdateDto> {
  /**
   * Crea una instancia del repositorio con el modelo de Sequelize asociado.
   *
   * @param model Modelo concreto sobre el cual se ejecutarán las consultas.
   */
  constructor(protected readonly model: ModelStatic<T>) {}

  /**
   * Crea un nuevo registro en la base de datos.
   *
   * @param data Datos del registro a crear.
   * @returns El registro recién creado.
   */
  async create(data: CreateDto): Promise<T> {
    return this.model.create(data as any);
  }

  /**
   * Obtiene todos los registros activos del modelo.
   *
   * @returns Lista de entidades con estado ACTIVE.
   */
  async findAll(): Promise<T[]> {
    return this.model.findAll({ where: { status: "ACTIVE" } as any });
  }

  /**
   * Busca un registro activo por su identificador.
   *
   * @param id Identificador del registro.
   * @returns La entidad encontrada o null si no existe.
   */
  async findById(id: number): Promise<T | null> {
    return this.model.findOne({ where: { id, status: "ACTIVE" } as any });
  }

  /**
   * Actualiza un registro existente por su id.
   *
   * @param id Identificador del registro.
   * @param data Datos a actualizar.
   * @returns El registro actualizado o null si no existe.
   */
  async update(id: number, data: UpdateDto): Promise<T | null> {
    const entity: T | null = await this.findById(id);
    if (!entity) return null;
    await entity.update(data as any);
    return entity;
  }

  /**
   * Elimina lógicamente un registro cambiando su estado a INACTIVE.
   *
   * @param id Identificador del registro.
   * @returns El registro inactivado o null si no existe.
   */
  async softDelete(id: number): Promise<T | null> {
    const entity: T | null = await this.findById(id);

    if (!entity) return null;
    await entity.update({ status: "INACTIVE" } as any);
    return entity;
  }
}
