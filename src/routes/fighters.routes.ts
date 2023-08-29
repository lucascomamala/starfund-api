import { Router } from "express";

import {
  createFighter,
  getFighters,
  getFighter,
  updateFighter,
} from "../controllers/fighter.controller";

const router = Router();

// Create a fighter
router.post("/fighters", createFighter);
// Read all fighters
router.get("/fighters", getFighters);
// Read a fighter by id
router.get("/fighters/:id", getFighter);
// Update a fighter by id
router.put("/fighters/:id", updateFighter);

export default router;
