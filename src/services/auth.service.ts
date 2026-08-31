import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { RegisterUserDto, LoginDto } from "../dtos/auth.dto";
import { UserRole } from "../types/enums";

export class AuthService {
  private readonly userRepository: UserRepository = new UserRepository();

  async register(
    data: RegisterUserDto
  ): Promise<{
    id: number;
    name: string;
    email: string;
    role: UserRole;
  }> {
    if (!Object.values(UserRole).includes(data.role)) {
      throw new Error("Rol inválido");
    }

    const existingUser = await this.userRepository.findByEmail(
      data.email
    );

    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    const hashedPassword: string = await bcrypt.hash(
      data.password,
      10
    );

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async login(data: LoginDto): Promise<string> {
    const user = await this.userRepository.findByEmail(
      data.email
    );

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    const validPassword: boolean = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Credenciales inválidas");
    }

    return jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
      }
    );
  }
}