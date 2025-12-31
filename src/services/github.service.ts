import axios from 'axios';
import type {
  GitHubGraphQLResponse,
  GitHubStats,
} from '../types/github.types.js';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export const getUserStats = async (username: string): Promise<GitHubStats> => {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GITHUB_TOKEN_MISSING');
  }

  const query = `
    query getUserStats($username: String!) {
      user(login: $username) {
        name
        login
        followers {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const { data } = await axios.post<GitHubGraphQLResponse>(
      GITHUB_GRAPHQL_URL,
      { query, variables: { username } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (data.data.user === null) {
      throw new Error('USER_NOT_FOUND');
    }

    const user = data.data.user;

    const totalStars = user.repositories.nodes.reduce(
      (acc, repo) => acc + repo.stargazerCount,
      0,
    );

    return {
      username: user.login,
      name: user.name,
      followers: user.followers.totalCount,
      totalRepos: user.repositories.totalCount,
      totalStars,
      totalContributions:
        user.contributionsCollection.contributionCalendar.totalContributions,
    };
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error('GitHub Token is invalid or expired');
        throw new Error('GITHUB_UNAUTHORIZED');
      }
    }

    console.error(`GitHub Service Error: ${error.message}`);
    throw new Error('EXTERNAL_API_ERROR');
  }
};
