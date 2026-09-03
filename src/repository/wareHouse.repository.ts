import Warehouse from "../models/wareHouse.model";
import { BaseRepository } from "./base.repository";

/**
 * Repositorio para la gestión de almacenes.
 */
export class WarehouseRepository extends BaseRepository<Warehouse, any, any> {
  /**
   * Inicializa el repositorio con el modelo de almacenes.
   */
  constructor() { super(Warehouse); }
}
