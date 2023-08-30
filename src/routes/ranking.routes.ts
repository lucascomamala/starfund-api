import { Router } from "express";

import {
  createRanking,
  getRankings,
  getRanking,
  updateRanking,
  deleteRanking,
} from "../controllers/ranking.controller";

const router = Router();

// Create an ranking
router.post("/rankings", createRanking);
// Read all rankings
router.get("/rankings", getRankings);
// Read an ranking by id
router.get("/rankings/:id", getRanking);
// Update an ranking by id
router.put("/rankings/:id", updateRanking);
// Delete an ranking by id
router.delete("/rankings/:id", deleteRanking);

export default router;
