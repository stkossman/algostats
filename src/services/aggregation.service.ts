import type { AggregatedStats } from '../types/aggregation.types.js';
import * as codewarsService from './codewars.service.js';
import * as gitHubService from './github.service.js';
import * as leetCodeService from './leetcode.service.js';

export const getAggregatedStats = async (
  username: string,
): Promise<AggregatedStats> => {
  const results = await Promise.allSettled([
    codewarsService.getUserStats(username),
    leetCodeService.getUserStats(username),
    gitHubService.getUserStats(username),
  ]);

  const codewarsData =
    results[0].status === 'fulfilled' ? results[0].value : null;
  const leetcodeData =
    results[1].status === 'fulfilled' ? results[1].value : null;
  const githubData =
    results[2].status === 'fulfilled' ? results[2].value : null;

  if (results[0].status === 'rejected') {
    console.warn(
      `Aggregation: Codewars failed for ${username}: ${results[0].reason.message}`,
    );
  }
  if (results[1].status === 'rejected') {
    console.warn(
      `Aggregation: LeetCode failed for ${username}: ${results[1].reason.message}`,
    );
  }
  if (results[2].status === 'rejected') {
    console.warn(
      `Aggregation: GitHub failed for ${username}: ${results[2].reason.message}`,
    );
  }

  return {
    username,
    codewars: codewarsData,
    leetcode: leetcodeData,
    github: githubData,
  };
};
