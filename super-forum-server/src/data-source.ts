require("dotenv").config();

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_ACCOUNT,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: process.env.PG_SYNCHRONIZE === "true",
    logging: true,
    entities: [process.env.PG_ENTITIES_DIR + "/**/*.{js,ts}"]
})