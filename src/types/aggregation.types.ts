import type { CodewarsStats } from './codewars.types.js';
import type { GitHubStats } from './github.types.js';
import type { LeetCodeStats } from './leetcode.types.js';

export interface AggregatedStats {
  username: string;
  codewars: CodewarsStats | null;
  leetcode: LeetCodeStats | null;
  github: GitHubStats | null;
}
