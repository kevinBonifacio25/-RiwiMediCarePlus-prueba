import sequelize from "../src/config/database";
import "../src/models/index.model";
import User from "../src/models/user.model";
import Clinic from "../src/models/clinic.model";
import Warehouse from "../src/models/wareHouse.model";
import Medicine from "../src/models/medicine.model";
import SupplyRequest from "../src/models/supplyRequest.model";
import { UserRole, RecordStatus, RequestStatus } from "../src/types/enums.types";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Model - User", () => {
  it("should create a user with default ACTIVE status", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test@test.com",
      password: "hashed123",
      role: UserRole.ADMIN,
    });
    expect(user.id).toBeDefined();
    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@test.com");
    expect(user.role).toBe(UserRole.ADMIN);
    expect(user.status).toBe(RecordStatus.ACTIVE);
  });

  it("should fail to create a user without required fields", async () => {
    await expect(
      User.create({ name: "No Email" } as any)
    ).rejects.toThrow();
  });

  it("should enforce unique email", async () => {
    await expect(
      User.create({
        name: "Dup",
        email: "test@test.com",
        password: "pass",
        role: UserRole.REQUEST_MANAGER,
      })
    ).rejects.toThrow();
  });
});

describe("Model - Clinic", () => {
  let userId: number;

  beforeAll(async () => {
    const user = await User.create({
      name: "Clinic Owner",
      email: "owner@test.com",
      password: "pass",
      role: UserRole.REQUEST_MANAGER,
    });
    userId = user.id;
  });

  it("should create a clinic linked to a user", async () => {
    const clinic = await Clinic.create({
      userId,
      name: "Clinic Test",
      nit: "900999999-1",
    });
    expect(clinic.id).toBeDefined();
    expect(clinic.userId).toBe(userId);
    expect(clinic.name).toBe("Clinic Test");
    expect(clinic.nit).toBe("900999999-1");
    expect(clinic.status).toBe(RecordStatus.ACTIVE);
  });

  it("should enforce unique NIT", async () => {
    await expect(
      Clinic.create({ userId, name: "Dup", nit: "900999999-1" })
    ).rejects.toThrow();
  });

  it("should belong to a user via userId", async () => {
    const clinic = await Clinic.findOne({ where: { nit: "900999999-1" } });
    expect(clinic).not.toBeNull();
    expect(clinic!.userId).toBe(userId);
  });
});

describe("Model - Warehouse", () => {
  it("should create a warehouse", async () => {
    const user = await User.create({
      name: "WH Owner",
      email: "whowner@test.com",
      password: "pass",
      role: UserRole.ADMIN,
    });
    const wh = await Warehouse.create({
      userId: user.id,
      name: "Warehouse Test",
      location: "Barranquilla",
    });
    expect(wh.id).toBeDefined();
    expect(wh.userId).toBe(user.id);
    expect(wh.name).toBe("Warehouse Test");
    expect(wh.location).toBe("Barranquilla");
    expect(wh.status).toBe(RecordStatus.ACTIVE);
  });
});

describe("Model - Medicine", () => {
  let warehouseId: number;

  beforeAll(async () => {
    const user = await User.create({
      name: "Med Owner",
      email: "medowner@test.com",
      password: "pass",
      role: UserRole.REQUEST_MANAGER,
    });
    const wh = await Warehouse.create({ userId: user.id, name: "Med WH", location: "City" });
    warehouseId = wh.id;
  });

  it("should create a medicine linked to a warehouse", async () => {
    const med = await Medicine.create({
      name: "Ibuprofeno",
      stock: 50,
      warehouseId,
    });
    expect(med.id).toBeDefined();
    expect(med.warehouseId).toBe(warehouseId);
    expect(med.stock).toBe(50);
  });
});

describe("Model - SupplyRequest", () => {
  let clinicId: number;
  let medicineId: number;
  let warehouseId: number;

  beforeAll(async () => {
    const user = await User.create({
      name: "SR Owner",
      email: "sr@test.com",
      password: "pass",
      role: UserRole.REQUEST_MANAGER,
    });
    const clinic = await Clinic.create({
      userId: user.id,
      name: "SR Clinic",
      nit: "900888888-1",
    });
    const wh = await Warehouse.create({ userId: user.id, name: "SR WH", location: "City" });
    const med = await Medicine.create({
      name: "Paracetamol",
      stock: 100,
      warehouseId: wh.id,
    });
    clinicId = clinic.id;
    medicineId = med.id;
    warehouseId = wh.id;
  });

  it("should create a supply request with all relations", async () => {
    let userId: number;
    const user = await User.findOne({ where: { email: "sr@test.com" } });
    userId = (user as any).id;
    const sr = await SupplyRequest.create({
      userId,
      clinicId,
      medicineId,
      warehouseId,
      quantity: 10,
    });
    expect(sr.id).toBeDefined();
    expect(sr.userId).toBe(userId);
    expect(sr.clinicId).toBe(clinicId);
    expect(sr.medicineId).toBe(medicineId);
    expect(sr.warehouseId).toBe(warehouseId);
    expect(sr.quantity).toBe(10);
    expect(sr.requestStatus).toBe(RequestStatus.PENDING);
  });
});

describe("Associations", () => {
  it("User hasMany Clinic - should load clinics via user", async () => {
    const user = await User.create({
      name: "Assoc User",
      email: "assoc@test.com",
      password: "pass",
      role: UserRole.ADMIN,
    });
    await Clinic.create({
      userId: user.id,
      name: "Assoc Clinic 1",
      nit: "900777777-1",
    });
    await Clinic.create({
      userId: user.id,
      name: "Assoc Clinic 2",
      nit: "900777777-2",
    });

    const userWithClinics = await User.findByPk(user.id, {
      include: [{ model: Clinic }],
    });
    expect(userWithClinics).not.toBeNull();
    expect((userWithClinics as any).Clinics).toHaveLength(2);
  });

  it("Clinic hasMany SupplyRequest", async () => {
    const user = await User.create({
      name: "Clinic SR User",
      email: "csr@test.com",
      password: "pass",
      role: UserRole.REQUEST_MANAGER,
    });
    const clinic = await Clinic.create({
      userId: user.id,
      name: "SR Test Clinic",
      nit: "900666666-1",
    });
    const wh = await Warehouse.create({ userId: user.id, name: "SR WH 2", location: "City" });
    const med = await Medicine.create({
      name: "Test Med",
      stock: 200,
      warehouseId: wh.id,
    });
    await SupplyRequest.create({
      userId: user.id,
      clinicId: clinic.id,
      medicineId: med.id,
      warehouseId: wh.id,
      quantity: 5,
    });

    const clinicWithSR = await Clinic.findByPk(clinic.id, {
      include: [{ model: SupplyRequest }],
    });
    expect(clinicWithSR).not.toBeNull();
    expect((clinicWithSR as any).SupplyRequests).toHaveLength(1);
  });

  it("Warehouse hasMany Medicine", async () => {
    const user = await User.create({
      name: "WHM Owner",
      email: "whm@test.com",
      password: "pass",
      role: UserRole.ADMIN,
    });
    const wh = await Warehouse.create({ userId: user.id, name: "WH Meds", location: "City" });
    await Medicine.create({ name: "Med A", stock: 10, warehouseId: wh.id });
    await Medicine.create({ name: "Med B", stock: 20, warehouseId: wh.id });

    const whWithMeds = await Warehouse.findByPk(wh.id, {
      include: [{ model: Medicine }],
    });
    expect(whWithMeds).not.toBeNull();
    expect((whWithMeds as any).Medicines).toHaveLength(2);
  });

  it("User hasMany Warehouse - should load warehouses via user", async () => {
    const user = await User.create({
      name: "UW Owner",
      email: "uw@test.com",
      password: "pass",
      role: UserRole.ADMIN,
    });
    await Warehouse.create({ userId: user.id, name: "UW WH 1", location: "A" });
    await Warehouse.create({ userId: user.id, name: "UW WH 2", location: "B" });

    const userWithWH = await User.findByPk(user.id, {
      include: [{ model: Warehouse }],
    });
    expect(userWithWH).not.toBeNull();
    expect((userWithWH as any).Warehouses).toHaveLength(2);
  });

  it("User hasMany SupplyRequest - should load requests via user", async () => {
    const user = await User.create({
      name: "USR Owner",
      email: "usr@test.com",
      password: "pass",
      role: UserRole.REQUEST_MANAGER,
    });
    const clinic = await Clinic.create({
      userId: user.id,
      name: "USR Clinic",
      nit: "900555555-1",
    });
    const wh = await Warehouse.create({ userId: user.id, name: "USR WH", location: "C" });
    const med = await Medicine.create({ name: "USR Med", stock: 300, warehouseId: wh.id });
    await SupplyRequest.create({
      userId: user.id,
      clinicId: clinic.id,
      medicineId: med.id,
      warehouseId: wh.id,
      quantity: 3,
    });

    const userWithSR = await User.findByPk(user.id, {
      include: [{ model: SupplyRequest }],
    });
    expect(userWithSR).not.toBeNull();
    expect((userWithSR as any).SupplyRequests).toHaveLength(1);
  });
});
