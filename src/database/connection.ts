import { DataSource } from "typeorm";
import { Client } from "../entities/Client";

const connectDB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "myPostgreDataBase",
  database: "FirstDB",
  entities: [Client],
  synchronize: true,
});

export { connectDB };
