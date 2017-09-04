import { GithubUser } from './github-user.interface';

export interface SearchResults {
  term: string;
  page: number;
  total: number;
  results: GithubUser[];
}
