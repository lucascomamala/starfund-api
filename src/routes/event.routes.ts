import { Router } from "express";

import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
} from "../controllers/event.controller";

const router = Router();

// Create an event
router.post("/events", createEvent);
// Read all events
router.get("/events", getEvents);
// Get upcoming events
router.get("/events/upcoming", getUpcomingEvents);
// Read an event by id
router.get("/events/:id", getEvent);
// Update an event by id
router.put("/events/:id", updateEvent);
// Delete an event by id
router.delete("/events/:id", deleteEvent);

export default router;
