import type { Request, Response } from 'express';
import * as githubService from '../services/github.service.js';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const data = await githubService.getUserStats(username);
    res.json(data);
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      res
        .status(404)
        .json({ error: 'Not Found', message: 'User not found on GitHub' });
      return;
    }
    if (error.message === 'GITHUB_TOKEN_MISSING') {
      res.status(500).json({
        error: 'Server Configuration Error',
        message: 'GitHub Token is missing',
      });
      return;
    }
    if (error.message === 'GITHUB_UNAUTHORIZED') {
      res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Invalid GitHub Token' });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};
