import { Router } from 'express';

import { createFighter } from '../controllers/fighters.controller';

const router = Router();

router.post('/fighters', createFighter);

export default router;
