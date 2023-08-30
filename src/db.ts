import { DataSource } from "typeorm";
import { Fighter } from "./entities/Fighter";
import { Fight } from "./entities/Fight";
import { Ranking } from "./entities/Ranking";
import { Event } from "./entities/Event";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "starfund_api",
  port: 5432,
  username: "postgres",
  password: "password",
  entities: [Fighter, Fight, Event, Ranking],
  logging: true,
  synchronize: true,
});
