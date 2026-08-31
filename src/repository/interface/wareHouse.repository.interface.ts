import Warehouse from "../../models/wareHouse.model";
import { IBaseRepository } from "./base.repository.interface";
import {
  CreateWarehouseDto,
  UpdateWarehouseDto
} from "../../dto/warehouse.dto";

/**
 * Define las operaciones disponibles
 * para el repositorio de almacenes.
 */
export interface IWarehouseRepository
  extends IBaseRepository<
    Warehouse,
    CreateWarehouseDto,
    UpdateWarehouseDto
  > {}