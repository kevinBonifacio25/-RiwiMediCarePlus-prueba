import { Model, ModelStatic } from "sequelize";
import { IBaseRepository } from "./interface/base.repository.interface";

export class BaseRepository<T extends Model, CreateDto, UpdateDto> implements IBaseRepository<T, CreateDto, UpdateDto> {
  constructor(protected readonly model: ModelStatic<T>) {}

  async create(data: CreateDto): Promise<T> 
  { return this.model.create(data as any); }


  async findAll(): Promise<T[]> {   
    return this.model.findAll({ where: { status: "ACTIVE" } as any }); }


  async findById(id: number): Promise<T | null> { 
    return this.model.findOne({ where: { id, status: "ACTIVE" } as any }); }


  async update(id: number, data: UpdateDto): Promise<T | null> {
    const entity: T | null = await this.findById(id);
    if (!entity) return null;
    await entity.update(data as any);
    return entity;
  }

  async softDelete(id: number): Promise<T | null> {
    
    const entity: T | null = await this.findById(id);

    if (!entity) return null;
    await entity.update({ status: "INACTIVE" } as any);
    return entity;
  }
}
