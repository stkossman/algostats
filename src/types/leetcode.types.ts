export interface LeetCodeGraphQLResponse {
  data: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: Array<{
          difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
          count: number;
          submissions: number;
        }>;
      };
    } | null;
    allQuestionsCount: Array<{
      difficulty: 'All' | 'Easy' | 'Medium' | 'Hard';
      count: number;
    }>;
  };
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easy: {
    solved: number;
    total: number;
  };
  medium: {
    solved: number;
    total: number;
  };
  hard: {
    solved: number;
    total: number;
  };
}
