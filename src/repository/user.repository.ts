import User from "../models/user.model";
import { RecordStatus } from "../types/enums.types";

export class UserRepository {
  async create(data: any): Promise<User> { return User.create(data); }
  async findByEmail(email: string): Promise<User | null> { return User.findOne({ where: { email } }); }
  async findAll(): Promise<User[]> { return User.findAll({ where: { status: RecordStatus.ACTIVE } }); }
}
