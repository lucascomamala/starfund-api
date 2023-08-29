import { Router } from 'express';

import { createFighter, getFighters } from '../controllers/fighter.controller';

const router = Router();

router.get("/fighters", getFighters);
router.post('/fighters', createFighter);

export default router;
