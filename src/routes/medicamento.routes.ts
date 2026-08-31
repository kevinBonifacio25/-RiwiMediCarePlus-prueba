import { Router } from "express";

import {
  listarMedicamentos
} from "../controllers/CrudController";

import {
  verificarToken
} from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/",
  verificarToken,
  listarMedicamentos
);

router.post(
  "/",
  verificarToken
);

export default router;
