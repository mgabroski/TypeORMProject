import express from "express";

import { asyncHandler } from "../handler";
import { createBanker } from "../controllers/banker.controller";

const router = express.Router();

router.post("/api/create-banker", asyncHandler(createBanker));

export { router as bankerRouter };
