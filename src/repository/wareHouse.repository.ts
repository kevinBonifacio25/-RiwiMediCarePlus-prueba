import Warehouse from "../models/wareHouse.model";
import { BaseRepository } from "./base.repository";
export class WarehouseRepository extends BaseRepository<Warehouse, any, any> { constructor() { super(Warehouse); } }
