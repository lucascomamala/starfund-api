import { Router } from "express";

import {
  createFight,
  getFights,
  getFight,
  updateFight,
  deleteFight,
} from "../controllers/fight.controller";

const router = Router();

// Create a fight
router.post("/fights", createFight);
// Read all fights
router.get("/fights", getFights);
// Read a fight by id
router.get("/fights/:id", getFight);
// Update a fight by id
router.put("/fights/:id", updateFight);
// Delete a fight by id
router.delete("/fights/:id", deleteFight);

export default router;
