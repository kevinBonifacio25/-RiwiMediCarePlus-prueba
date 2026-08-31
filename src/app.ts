import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes";
import medicamentoRoutes from "./routes/crud.routes";
import solicitudRoutes from "./routes/seed.routes";

import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "API funcionando"
  });
});

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Rutas
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/medicamentos",
  medicamentoRoutes
);

app.use(
  "/api/solicitudes",
  solicitudRoutes
);

export default app;
