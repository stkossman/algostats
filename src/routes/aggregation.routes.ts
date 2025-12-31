import { Router } from 'express';
import { getAllStats } from '../controllers/aggregation.controller.js';

const router = Router();

router.get('/:username', getAllStats);

export default router;
