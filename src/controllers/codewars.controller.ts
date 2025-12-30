import type { Request, Response } from 'express';
import * as codewarsService from '../services/codewars.services.js';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const data = await codewarsService.getUserStats(username);
    res.json(data);
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      res.status(404).json({
        error: 'Not Found',
        message: `User '${username}' not found on Codewars`,
      });
      return;
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch data from Codewars',
    });
  }
};
