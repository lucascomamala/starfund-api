import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "starfund_api",
  port: 5432,
  username: "postgres",
  password: "password",
  entities: [],
  logging: true,
});
