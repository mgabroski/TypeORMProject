import express from "express";

import { asyncHandler } from "../handler";
import { createClient, deleteClient, getClients } from "../controllers/client.controller";

const router = express.Router();

router.post("/api/create-client", asyncHandler(createClient));
router.delete("/api/client/:clientId", asyncHandler(deleteClient));
router.get('/api/clients', asyncHandler(getClients))

export { router as clientRouter };
