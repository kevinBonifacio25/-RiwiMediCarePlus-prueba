import { Router } from "express";

import {
  crearSolicitud
} from "../controllers/SeedController";

import {
  verificarToken
} from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  verificarToken,
  crearSolicitud
);

router.patch(
  "/:id/estado",
  verificarToken,
  
);

export default router;
