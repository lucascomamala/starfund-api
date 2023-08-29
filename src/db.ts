import { DataSource } from "typeorm";
import { Fighter } from "./entities/Fighter";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "starfund_api",
  port: 5432,
  username: "postgres",
  password: "password",
  entities: [Fighter],
  logging: true,
  synchronize: true,
});
