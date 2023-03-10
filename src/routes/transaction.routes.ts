import express from "express";

import { asyncHandler } from "../handler";
import { createTransaction } from "../controllers/transaction.controller";

const router = express.Router();

router.post(
  "/api/client/:clientId/transaction",
  asyncHandler(createTransaction)
);

export { router as transactionRouter };
