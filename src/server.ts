import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/database";

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

sequelize.sync()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error: Error) => console.error("Database connection error:", error));
