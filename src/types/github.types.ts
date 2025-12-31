export interface GitHubGraphQLResponse {
  data: {
    user: {
      name: string;
      login: string;
      followers: {
        totalCount: number;
      };
      repositories: {
        totalCount: number;
        nodes: Array<{
          stargazerCount: number;
        }>;
      };
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
    } | null;
  };
}

export interface GitHubStats {
  username: string;
  name: string;
  followers: number;
  totalStars: number;
  totalRepos: number;
  totalContributions: number;
}
