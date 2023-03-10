import express from "express";

import { asyncHandler } from "../handler";
import { bankerClientConnection } from "../controllers/banker_client_connection.controller";

const router = express.Router();

router.put(
  "/api/banker/:bankerId/client/:clientId",
  asyncHandler(bankerClientConnection)
);

export { router as bankerClientConnectionRouter };
