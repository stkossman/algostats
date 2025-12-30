import axios from 'axios';
import type {
  LeetCodeGraphQLResponse,
  LeetCodeStats,
} from '../types/leetcode.types.js';

const GRAPHQL_URL = 'https://leetcode.com/graphql';

export const getUserStats = async (
  username: string,
): Promise<LeetCodeStats> => {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  try {
    const { data } = await axios.post<LeetCodeGraphQLResponse>(
      GRAPHQL_URL,
      {
        query,
        variables: { username },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Node.js backend)',
          Referer: 'https://leetcode.com/',
        },
      },
    );

    if (!data.data.matchedUser) {
      throw new Error('USER_NOT_FOUND');
    }

    const userData = data.data.matchedUser;
    const allQuestions = data.data.allQuestionsCount;
    const solvedStats = userData.submitStats.acSubmissionNum;

    const getSolved = (diff: string) =>
      solvedStats.find((s) => s.difficulty === diff)?.count || 0;
    const getTotal = (diff: string) =>
      allQuestions.find((q) => q.difficulty === diff)?.count || 0;

    return {
      username: userData.username,
      totalSolved: getSolved('All'),
      totalQuestions: getTotal('All'),
      easy: {
        solved: getSolved('Easy'),
        total: getTotal('Easy'),
      },
      medium: {
        solved: getSolved('Medium'),
        total: getTotal('Medium'),
      },
      hard: {
        solved: getSolved('Hard'),
        total: getTotal('Hard'),
      },
    };
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      throw error;
    }
    console.error(`LeetCode Service Error: ${error.message}`);
    throw new Error('EXTERNAL_API_ERROR');
  }
};
