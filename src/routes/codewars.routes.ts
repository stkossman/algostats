import { Router } from 'express';
import { getStats } from '../controllers/codewars.controller.js';

const router = Router();

router.get('/:username', getStats);

export default router;
