import { BaseRepository } from "../repository/base.repository";
import { Model } from "sequelize";

export class CrudService<T extends Model, CreateDto, UpdateDto> {
  constructor(private readonly repository: BaseRepository<T, CreateDto, UpdateDto>) {}
  async create(data: CreateDto): Promise<T> { return this.repository.create(data); }
  async getAll(): Promise<T[]> { return this.repository.findAll(); }
  async getById(id: number): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error("Resource not found");
    return entity;
  }
  async update(id: number, data: UpdateDto): Promise<T> {
    const entity = await this.repository.update(id, data);
    if (!entity) throw new Error("Resource not found");
    return entity;
  }
  async softDelete(id: number): Promise<T> { return this.update(id, { status: "DELETED" } as UpdateDto); }
}
