import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/user.repository";
import { UserRole } from "../types/enums.types";

export class AuthService {
  private readonly userRepository: UserRepository = new UserRepository();

  async register(name: string, email: string, password: string, role: UserRole): Promise<any> {
    if (!Object.values(UserRole).includes(role)) throw new Error("Invalid role");
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already registered");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({ name, email, password: hashedPassword, role });
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

    return jwt.sign(
      { id: user.id, role: user.role },
      jwtSecret,
      { expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"] }
    );
  }

  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.findAll();
    return users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }));
  }
}
