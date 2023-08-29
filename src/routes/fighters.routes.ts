import { Router } from 'express';

import { createFighter } from '../controllers/fighters.controllers';

const router = Router();

router.post('/fighters', createFighter);

export default router;
