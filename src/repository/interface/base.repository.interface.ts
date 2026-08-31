import { Model } from "sequelize";

/**
 * Define las operaciones CRUD básicas que debe implementar
 * cualquier repositorio del sistema.
 *
 * @template T Tipo de entidad o modelo.
 * @template CreateDto Tipo de datos necesarios para crear un registro.
 * @template UpdateDto Tipo de datos permitidos para actualizar un registro.
 */
export interface IBaseRepository<
  T extends Model,
  CreateDto,
  UpdateDto
> {
  /**
   * Crea un nuevo registro.
   *
   * @param data Datos necesarios para crear el registro.
   * @returns Promesa con el registro creado.
   */
  create(data: CreateDto): Promise<T>;

  /**
   * Obtiene todos los registros activos.
   *
   * @returns Promesa con una lista de registros.
   */
  findAll(): Promise<T[]>;

  /**
   * Busca un registro mediante su identificador.
   *
   * @param id Identificador del registro.
   * @returns Promesa con el registro encontrado o null.
   */
  findById(id: number): Promise<T | null>;

  /**
   * Actualiza un registro existente.
   *
   * @param id Identificador del registro.
   * @param data Datos que serán actualizados.
   * @returns Promesa con el registro actualizado o null.
   */
  update(id: number, data: UpdateDto): Promise<T | null>;

  /**
   * Realiza una eliminación lógica del registro.
   *
   * @param id Identificador del registro.
   * @returns Promesa con el registro eliminado lógicamente o null.
   */
  softDelete(id: number): Promise<T | null>;
}