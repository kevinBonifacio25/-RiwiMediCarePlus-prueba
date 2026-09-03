import { AuthService } from "../src/services/auth.service";
import { CrudService } from "../src/services/crud.service";
import { SupplyRequestService } from "../src/services/supplyRequest.service";
import { UserRole, RequestStatus } from "../src/types/enums.types";

import bcrypt from "bcryptjs";

jest.mock("bcryptjs");
jest.mock("../src/repository/user.repository");
jest.mock("../src/repository/clinic.repository");
jest.mock("../src/repository/medicine.repository");
jest.mock("../src/repository/wareHouse.repository");
jest.mock("../src/repository/supplyRequest.repository");

import { UserRepository } from "../src/repository/user.repository";
import { ClinicRepository } from "../src/repository/clinic.repository";
import { MedicineRepository } from "../src/repository/medicine.repository";
import { WarehouseRepository } from "../src/repository/wareHouse.repository";
import { SupplyRequestRepository } from "../src/repository/supplyRequest.repository";

const MockUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;
const MockClinicRepository = ClinicRepository as jest.MockedClass<typeof ClinicRepository>;
const MockMedicineRepository = MedicineRepository as jest.MockedClass<typeof MedicineRepository>;
const MockWarehouseRepository = WarehouseRepository as jest.MockedClass<typeof WarehouseRepository>;
const MockSupplyRequestRepository = SupplyRequestRepository as jest.MockedClass<typeof SupplyRequestRepository>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    (service as any).userRepository = new MockUserRepository();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const mockUser = {
        id: 1, name: "Test", email: "test@test.com",
        password: "hashed", role: UserRole.ADMIN, status: "ACTIVE",
      };
      (service as any).userRepository.findByEmail.mockResolvedValue(null);
      (service as any).userRepository.create.mockResolvedValue(mockUser as any);

      const result = await service.register("Test", "test@test.com", "password123", UserRole.ADMIN);
      expect(result.name).toBe("Test");
      expect(result.email).toBe("test@test.com");
      expect(result).not.toHaveProperty("password");
    });

    it("should throw if email already exists", async () => {
      (service as any).userRepository.findByEmail.mockResolvedValue({ id: 1 } as any);
      await expect(
        service.register("Dup", "dup@test.com", "pass", UserRole.ADMIN)
      ).rejects.toThrow("Email already registered");
    });

    it("should throw if role is invalid", async () => {
      await expect(
        service.register("Bad", "bad@test.com", "pass", "INVALID" as any)
      ).rejects.toThrow("Invalid role");
    });
  });

  describe("login", () => {
    it("should return a token on valid credentials", async () => {
      process.env.JWT_SECRET = "test-secret";
      process.env.JWT_EXPIRES_IN = "1h";
      const mockUser = {
        id: 1, email: "test@test.com", password: "hashed-pw", role: UserRole.ADMIN,
      };
      (service as any).userRepository.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const token = await service.login("test@test.com", "password123");
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });

    it("should throw on invalid email", async () => {
      (service as any).userRepository.findByEmail.mockResolvedValue(null);
      await expect(service.login("none@test.com", "pass")).rejects.toThrow("Invalid credentials");
    });

    it("should throw on wrong password", async () => {
      const mockUser = {
        id: 1, email: "test@test.com", password: "hashed-pw", role: UserRole.ADMIN,
      };
      (service as any).userRepository.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.login("test@test.com", "wrongpassword")).rejects.toThrow("Invalid credentials");
    });
  });

  describe("getAllUsers", () => {
    it("should return users without passwords", async () => {
      (service as any).userRepository.findAll.mockResolvedValue([
        { id: 1, name: "A", email: "a@test.com", password: "secret", role: UserRole.ADMIN },
        { id: 2, name: "B", email: "b@test.com", password: "secret", role: UserRole.REQUEST_MANAGER },
      ] as any);
      const users = await service.getAllUsers();
      expect(users).toHaveLength(2);
      users.forEach(u => expect(u).not.toHaveProperty("password"));
    });
  });
});

describe("SupplyRequestService", () => {
  let service: SupplyRequestService;

  beforeEach(() => {
    service = new SupplyRequestService();
    (service as any).clinicRepository = new MockClinicRepository();
    (service as any).medicineRepository = new MockMedicineRepository();
    (service as any).warehouseRepository = new MockWarehouseRepository();
    (service as any).requestRepository = new MockSupplyRequestRepository();
  });

  describe("create", () => {
    it("should create a supply request when all validations pass", async () => {
      (service as any).clinicRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).warehouseRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).medicineRepository.findAvailable.mockResolvedValue({ id: 1, stock: 50 } as any);
      (service as any).requestRepository.create.mockResolvedValue({
        id: 1, userId: 1, clinicId: 1, medicineId: 1, warehouseId: 1, quantity: 10, requestStatus: "PENDING",
      } as any);

      const result = await service.create({
        userId: 1,
        clinicId: 1, medicineId: 1, warehouseId: 1, quantity: 10,
      });
      expect(result.requestStatus).toBe(RequestStatus.PENDING);
    });

    it("should throw if quantity <= 0", async () => {
      await expect(
        service.create({ userId: 1, clinicId: 1, medicineId: 1, warehouseId: 1, quantity: 0 })
      ).rejects.toThrow("Quantity must be greater than zero");
    });

    it("should throw if clinic not found", async () => {
      (service as any).clinicRepository.findById.mockResolvedValue(null);
      await expect(
        service.create({ userId: 1, clinicId: 999, medicineId: 1, warehouseId: 1, quantity: 5 })
      ).rejects.toThrow("Clinic not found");
    });

    it("should throw if warehouse not found", async () => {
      (service as any).clinicRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).warehouseRepository.findById.mockResolvedValue(null);
      await expect(
        service.create({ userId: 1, clinicId: 1, medicineId: 1, warehouseId: 999, quantity: 5 })
      ).rejects.toThrow("Warehouse not found");
    });

    it("should throw if medicine not found in warehouse", async () => {
      (service as any).clinicRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).warehouseRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).medicineRepository.findAvailable.mockResolvedValue(null);
      await expect(
        service.create({ userId: 1, clinicId: 1, medicineId: 999, warehouseId: 1, quantity: 5 })
      ).rejects.toThrow("Medicine not found in assigned warehouse");
    });

    it("should throw if insufficient inventory", async () => {
      (service as any).clinicRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).warehouseRepository.findById.mockResolvedValue({ id: 1 } as any);
      (service as any).medicineRepository.findAvailable.mockResolvedValue({ id: 1, stock: 3 } as any);
      await expect(
        service.create({ userId: 1, clinicId: 1, medicineId: 1, warehouseId: 1, quantity: 10 })
      ).rejects.toThrow("Insufficient inventory");
    });
  });

  describe("updateStatus", () => {
    it("should update request status", async () => {
      (service as any).requestRepository.update.mockResolvedValue({
        id: 1, requestStatus: "APPROVED",
      } as any);
      const result = await service.updateStatus(1, RequestStatus.APPROVED);
      expect(result.requestStatus).toBe("APPROVED");
    });

    it("should throw if request not found", async () => {
      (service as any).requestRepository.update.mockResolvedValue(null);
      await expect(
        service.updateStatus(999, RequestStatus.APPROVED)
      ).rejects.toThrow("Request not found");
    });
  });

  describe("getHistoryByClinic", () => {
    it("should throw if clinic not found", async () => {
      (service as any).clinicRepository.findById.mockResolvedValue(null);
      await expect(service.getHistoryByClinic(999)).rejects.toThrow("Clinic not found");
    });
  });

  describe("softDelete", () => {
    it("should soft delete a request", async () => {
      (service as any).requestRepository.update.mockResolvedValue({
        id: 1, status: "DELETED",
      } as any);
      const result = await service.softDelete(1);
      expect(result.status).toBe("DELETED");
    });

    it("should throw if request not found", async () => {
      (service as any).requestRepository.update.mockResolvedValue(null);
      await expect(service.softDelete(999)).rejects.toThrow("Request not found");
    });
  });
});
