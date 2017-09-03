import { Action } from '@ngrx/store';

export const UPDATE_SEARCH_TERM = '[Search] Update search term value';
export const VALIDATE_SEARCH_TERM = '[Search] Validate search term value';

export class UpdateSearchTermAction implements Action {
  readonly type = UPDATE_SEARCH_TERM;
  constructor(public payload: string) {}
}

export class ValidateSearchTermAction implements Action {
  readonly type = VALIDATE_SEARCH_TERM;
  constructor(public payload: string) {}
}

export type SearchActions
  = UpdateSearchTermAction
  | ValidateSearchTermAction;
