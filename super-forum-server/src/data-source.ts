require("dotenv").config();
import { DataSource } from "typeorm";

const getEnv = (key: string, fallback: string) =>
  process.env[key] && process.env[key].trim() !== "" ? process.env[key] : fallback;

export const AppDataSource = new DataSource({
  type: "postgres",
  replication: {
    master: {
      host: getEnv("PG_HOST_MASTER", "postgres-primary"),
      port: Number(process.env.PG_PORT) || 5432,
      username: process.env.PG_ACCOUNT,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
    slaves: [
      {
        host: getEnv("PG_HOST_REPLICA", "postgres-replica"),
        port: Number(process.env.PG_PORT) || 5432,
        username: process.env.PG_ACCOUNT,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
      }
    ]
  },
  synchronize: process.env.PG_SYNCHRONIZE  ===  "true", // usually false in replication
  logging: true,
  entities: [
  "dist/repo/**/*.{js,ts}",   // compiled code inside Docker
  "src/repo/**/*.{ts}"        // for local dev with ts-node
],

});
