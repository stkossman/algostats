export interface CodewarsApiResponse {
  username: string;
  name: string;
  honor: number;
  clan: string;
  leaderboardPosition: number;
  ranks: {
    overall: {
      rank: number;
      name: string;
      color: string;
      score: number;
    };
    languages: Record<
      string,
      {
        rank: number;
        name: string;
        color: string;
        score: number;
      }
    >;
  };

  codeChallenges: {
    totalAuthored: number;
    totalCompleted: number;
  };
}

export interface CodewarsStats {
  username: string;
  name: string;
  honor: number;
  clan: string;
  leaderboardPosition: number;
  overallRank: {
    name: string;
    score: number;
    color: string;
  };
  languages: Array<{
    language: string;
    rank: string;
    score: number;
    color: string;
  }>;
  totalCompleted: number;
}
