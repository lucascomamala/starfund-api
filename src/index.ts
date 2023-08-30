import express from "express";
import morgan from "morgan";
import "reflect-metadata";

import { AppDataSource } from "./db";
import fighterRoutes from "./routes/fighter.routes";
import eventRoutes from "./routes/event.routes";
import rankingRoutes from "./routes/ranking.routes";

// Create express app and middlewares
const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(fighterRoutes);
app.use(eventRoutes);
app.use(rankingRoutes);

// Start server
async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(3001);
    console.log("Server on port", 3001);
  } catch (error) {
    console.log(error);
  }
}

main();
