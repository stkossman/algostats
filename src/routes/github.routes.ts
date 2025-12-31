import { Router } from 'express';
import { getStats } from '../controllers/github.controller.js';

const router = Router();

router.get('/:username', getStats);

export default router;
