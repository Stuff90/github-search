import { GithubUser } from './github-user.interface';

export interface SearchResults {
  term: string;
  page: number;
  valid: boolean;
  loading: boolean;
  results: GithubUser[];
}
