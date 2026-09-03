import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticate } from "../src/middlewares/auth.middleware";
import { authorize } from "../src/middlewares/role.middleware";
import { errorHandler } from "../src/middlewares/error.middleware";
import { UserRole } from "../src/types/enums.types";

process.env.JWT_SECRET = "test-secret";

describe("Middleware - authenticate", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return 401 if no Authorization header", () => {
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication required" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if header doesn't start with Bearer", () => {
    req.headers = { authorization: "Basic abc123" };
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 for invalid token", () => {
    req.headers = { authorization: "Bearer invalid-token" };
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired token" });
  });

  it("should call next with user payload for valid token", () => {
    const token = jwt.sign({ id: 1, role: UserRole.ADMIN }, "test-secret", { expiresIn: "1h" });
    req.headers = { authorization: `Bearer ${token}` };
    authenticate(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
    expect((req as any).user).toBeDefined();
    expect((req as any).user.id).toBe(1);
    expect((req as any).user.role).toBe(UserRole.ADMIN);
  });
});

describe("Middleware - authorize", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { user: undefined };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return 403 if user is not set", () => {
    const middleware = authorize(UserRole.ADMIN);
    middleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if user role is not authorized", () => {
    req.user = { role: UserRole.REQUEST_MANAGER } as any;
    const middleware = authorize(UserRole.ADMIN);
    middleware(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if user role is authorized", () => {
    req.user = { role: UserRole.ADMIN } as any;
    const middleware = authorize(UserRole.ADMIN, UserRole.REQUEST_MANAGER);
    middleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it("should allow multiple roles", () => {
    req.user = { role: UserRole.REQUEST_MANAGER } as any;
    const middleware = authorize(UserRole.ADMIN, UserRole.REQUEST_MANAGER);
    middleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});

describe("Middleware - errorHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should return 400 with error message", () => {
    const err = new Error("Something went wrong");
    errorHandler(err, req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong" });
  });
});
