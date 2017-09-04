import { Action } from '@ngrx/store';
import { GithubUser } from "./interfaces/github-user.interface";

export const UPDATE_SEARCH_TERM = '[Search] Update search term';
export const UPDATE_SEARCH_RESULTS = '[Search] Update search results';
export const UPDATE_SEARCH_PAGINATION = '[Search] Update search pagination';

export class UpdateSearchResultsAction implements Action {
  readonly type = UPDATE_SEARCH_RESULTS;
  constructor(public payload: {
    total: number,
    results: GithubUser[]
  }) {}
}

export class UpdateSearchTermAction implements Action {
  readonly type = UPDATE_SEARCH_TERM;
  constructor(public payload: string) {}
}

export class UpdateSearchPaginationAction implements Action {
  readonly type = UPDATE_SEARCH_PAGINATION;
  constructor(public payload: number) {}
}

export type SearchActions =
  UpdateSearchResultsAction
  | UpdateSearchTermAction
  | UpdateSearchPaginationAction;