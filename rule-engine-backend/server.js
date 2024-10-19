import express from "express";
import { config } from "dotenv";
import DBConnection from "./config/DbConnect.js";
import RuleRoutes from "./routes/rule.routes.js";
config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api", RuleRoutes);
app.listen(PORT, async () => {
  await DBConnection();
  console.log("app is listening on ", +PORT);
});
