import User from "../models/user.model";

export class UserRepository {
  async create(data: any): Promise<User> { return User.create(data); }
  async findByEmail(email: string): Promise<User | null> { return User.findOne({ where: { email } }); }
}
