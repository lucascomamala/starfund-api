import { Router } from 'express';

import { createFighter, getFighters, getFighter } from '../controllers/fighter.controller';

const router = Router();

router.get("/fighters", getFighters);
router.get("/fighters/:id", getFighter);
router.post('/fighters', createFighter);

export default router;
