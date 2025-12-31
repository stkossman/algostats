import axios from 'axios';
import type {
  CodewarsApiResponse,
  CodewarsStats,
} from '../types/codewars.types.js';

const BASE_URL = 'https://www.codewars.com/api/v1/users';

export const getUserStats = async (
  username: string,
): Promise<CodewarsStats> => {
  try {
    const { data } = await axios.get<CodewarsApiResponse>(
      `${BASE_URL}/${username}`,
    );

    const languagesMapped = Object.entries(data.ranks.languages).map(
      ([langName, langData]) => ({
        language: langName,
        rank: langData.name,
        score: langData.score,
        color: langData.color,
      }),
    );

    return {
      username: data.username,
      name: data.name,
      honor: data.honor,
      clan: data.clan,
      leaderboardPosition: data.leaderboardPosition,
      overallRank: {
        name: data.ranks.overall.name,
        score: data.ranks.overall.score,
        color: data.ranks.overall.color,
      },
      languages: languagesMapped,
      totalCompleted: data.codeChallenges.totalCompleted,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('USER_NOT_FOUND');
    }
    console.error(`Codewars Service Error: ${error.message}`);
    throw new Error('EXTERNAL_API_ERROR');
  }
};
