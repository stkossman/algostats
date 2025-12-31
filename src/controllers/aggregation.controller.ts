import type { Request, Response } from 'express';
import * as aggregationService from '../services/aggregation.service.js';

export const getAllStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username } = req.params;

  try {
    const data = await aggregationService.getAggregatedStats(username);
    res.json(data);
  } catch (error: any) {
    console.error('Aggregation Controller Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
