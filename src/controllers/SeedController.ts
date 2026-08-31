import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Clinic from "../models/Clinic";
import Warehouse from "../models/Warehouse";
import Medicine from "../models/Medicine";

export class SeedController {
  upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) throw new Error("JSON file is required");
      const data = JSON.parse(req.file.buffer.toString());

      if (Array.isArray(data.users)) {
        for (const user of data.users) {
          const password = await bcrypt.hash(user.password, 10);
          await User.findOrCreate({ where: { email: user.email }, defaults: { ...user, password } });
        }
      }
      if (Array.isArray(data.clinics)) {
        for (const clinic of data.clinics) await Clinic.findOrCreate({ where: { nit: clinic.nit }, defaults: clinic });
      }
      if (Array.isArray(data.warehouses)) {
        for (const warehouse of data.warehouses) await Warehouse.findOrCreate({ where: { name: warehouse.name }, defaults: warehouse });
      }
      if (Array.isArray(data.medicines)) {
        for (const medicine of data.medicines) {
          const exists = await Medicine.findOne({ where: { name: medicine.name, warehouseId: medicine.warehouseId } });
          if (!exists) await Medicine.create(medicine);
        }
      }
      res.json({ message: "Seed data loaded successfully" });
    } catch (error) { next(error); }
  };
}
