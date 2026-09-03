import { Request, Response, NextFunction } from "express";
import { AuthController } from "../src/controllers/auth.controller";
import { CrudController } from "../src/controllers/crud.controller";
import { SupplyRequestController } from "../src/controllers/SupplyRequest.controller";

jest.mock("../src/services/auth.service");
jest.mock("../src/services/supplyRequest.service");

import { AuthService } from "../src/services/auth.service";
import { SupplyRequestService } from "../src/services/supplyRequest.service";

const MockAuthService = AuthService as jest.MockedClass<typeof AuthService>;
const MockSupplyRequestService = SupplyRequestService as jest.MockedClass<typeof SupplyRequestService>;

describe("AuthController", () => {
  let controller: AuthController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthController();
    (controller as any).service = new MockAuthService();
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("register - should return 201 with user data", async () => {
    req.body = { name: "Test", email: "test@test.com", password: "pass", role: "ADMIN" };
    (controller as any).service.register.mockResolvedValue({
      id: 1, name: "Test", email: "test@test.com", role: "ADMIN",
    });

    await controller.register(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("register - should call next on error", async () => {
    req.body = { name: "Dup", email: "dup@test.com", password: "pass", role: "ADMIN" };
    (controller as any).service.register.mockRejectedValue(new Error("Email already registered"));

    await controller.register(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("login - should return 200 with token", async () => {
    req.body = { email: "test@test.com", password: "pass" };
    (controller as any).service.login.mockResolvedValue("jwt-token");

    await controller.login(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "jwt-token" });
  });

  it("login - should call next on error", async () => {
    req.body = { email: "bad@test.com", password: "wrong" };
    (controller as any).service.login.mockRejectedValue(new Error("Invalid credentials"));

    await controller.login(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("getAll - should return 200 with users", async () => {
    (controller as any).service.getAllUsers.mockResolvedValue([
      { id: 1, name: "A", email: "a@test.com", role: "ADMIN" },
    ]);

    await controller.getAll(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

describe("CrudController", () => {
  let mockService: any;
  let controller: CrudController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockService = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };
    controller = new CrudController(mockService);
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("create - should return 201", async () => {
    req.body = { name: "Test" };
    mockService.create.mockResolvedValue({ id: 1, name: "Test" });

    await controller.create(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("create - should call next on error", async () => {
    mockService.create.mockRejectedValue(new Error("Validation error"));
    await controller.create(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("getAll - should return list", async () => {
    mockService.getAll.mockResolvedValue([{ id: 1 }]);
    await controller.getAll(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });

  it("getById - should return entity", async () => {
    req.params = { id: "1" };
    mockService.getById.mockResolvedValue({ id: 1 });
    await controller.getById(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });

  it("getById - should call next if not found", async () => {
    req.params = { id: "999" };
    mockService.getById.mockRejectedValue(new Error("Resource not found"));
    await controller.getById(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("update - should return updated entity", async () => {
    req.params = { id: "1" };
    req.body = { name: "Updated" };
    mockService.update.mockResolvedValue({ id: 1, name: "Updated" });
    await controller.update(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });

  it("remove - should soft delete", async () => {
    req.params = { id: "1" };
    mockService.softDelete.mockResolvedValue({ id: 1, status: "DELETED" });
    await controller.remove(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });
});

describe("SupplyRequestController", () => {
  let controller: SupplyRequestController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new SupplyRequestController();
    (controller as any).service = new MockSupplyRequestService();
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("create - should return 201", async () => {
    req.body = { clinicId: 1, medicineId: 1, warehouseId: 1, quantity: 10 };
    (controller as any).service.create.mockResolvedValue({
      id: 1, clinicId: 1, medicineId: 1, warehouseId: 1, quantity: 10, requestStatus: "PENDING",
    });

    await controller.create(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("create - should call next on error", async () => {
    (controller as any).service.create.mockRejectedValue(new Error("Clinic not found"));
    await controller.create(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("active - should return list", async () => {
    (controller as any).service.getActive.mockResolvedValue([{ id: 1 }]);
    await controller.active(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });

  it("history - should return clinic history", async () => {
    req.params = { clinicId: "1" };
    (controller as any).service.getHistoryByClinic.mockResolvedValue([{ id: 1 }]);
    await controller.history(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });

  it("remove - should soft delete", async () => {
    req.params = { id: "1" };
    (controller as any).service.softDelete.mockResolvedValue({ id: 1, status: "DELETED" });
    await controller.remove(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalled();
  });
});
