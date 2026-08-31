import { Router } from "express";
import { CrudController } from "../controllers/crud.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { UserRole } from "../types/enums.types";

export const createCrudRouter = (controller: CrudController): Router => {
  const router = Router();

  router.use(authenticate, authorize(UserRole.ADMIN));

  router.post("/", controller.create);
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
};
