import app from "./app";

import { sequelize } from "./config/database";

import { Usuario } from "./models/Usuario";
import { Medicamento } from "./models/Medicamento";
import { Solicitud } from "./models/Solicitud";
import { SolicitudDetalle } from "./models/SolicitudDetalle";

import dotenv from "dotenv";

dotenv.config();


// Relaciones

Usuario.hasMany(Solicitud, {
  foreignKey: "usuarioId"
});

Solicitud.belongsTo(Usuario, {
  foreignKey: "usuarioId"
});

Solicitud.hasMany(SolicitudDetalle, {
  foreignKey: "solicitudId"
});

SolicitudDetalle.belongsTo(Solicitud, {
  foreignKey: "solicitudId"
});

Medicamento.hasMany(SolicitudDetalle, {
  foreignKey: "medicamentoId"
});

SolicitudDetalle.belongsTo(Medicamento, {
  foreignKey: "medicamentoId"
});


// Iniciar servidor

const PORT =
  process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {

    console.log(
      "Base de datos conectada"
    );

    app.listen(PORT, () => {

      console.log(
        `Servidor ejecutándose en puerto ${PORT}`
      );

    });

  })
  .catch((error) => {

    console.error(
      "Error conectando a la base de datos:",
      error
    );

  });
