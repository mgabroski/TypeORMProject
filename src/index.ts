import express from "express";

import { connectDB } from "./data-access/connection";
import { bankerRouter } from "./routes/banker.routes";
import { bankerClientConnectionRouter } from "./routes/banker_client_connection";
import { clientRouter } from "./routes/client.routes";
import { transactionRouter } from "./routes/transaction.routes";

const app = express();

const port = process.env.PORT || 8080;

(async () => {
  app.use(express.json());
  app.use(clientRouter);
  app.use(bankerRouter);
  app.use(transactionRouter);
  app.use(bankerClientConnectionRouter);
})();

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });
