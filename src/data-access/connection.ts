import { Banker } from "../entities/Banker";
import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Transaction } from "../entities/Transaction";

const connectDB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "myPostgreDataBase",
  database: "FirstDB",
  entities: [Client, Banker, Transaction],
  synchronize: true,
});

export { connectDB };
