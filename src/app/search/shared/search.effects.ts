import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { UPDATE_SEARCH_TERM, UpdateSearchTermAction, UPDATE_SEARCH_PAGINATION, UPDATE_SEARCH_RESULTS } from './search.actions';
import { SearchService } from "./search.service";


interface GithubPayload {
  items: any[];
  total_count: number;
  incomplete_results: boolean;
}

@Injectable()
export class SearchEffects {

  @Effect({ dispatch: false }) onSearchPaginationUpdate: Observable<Action> = this.actions.ofType(UPDATE_SEARCH_PAGINATION);

  @Effect({ dispatch: false }) onSearchTermUpdate: Observable<any> = this.actions.ofType(UPDATE_SEARCH_TERM)
    .debounceTime(300)
    .filter((action: UpdateSearchTermAction) => action.payload.length > 2)
    .map((action: UpdateSearchTermAction) => `https://api.github.com/search/users?q=${action.payload}`)
    .do(() => this.store.dispatch({
      type: UPDATE_SEARCH_PAGINATION,
      payload: 1
    }));

    constructor(
      private http: HttpClient,
      private actions: Actions,
      private store: Store<any>,
      private searchService: SearchService
    ) {
      this.onSearchTermUpdate
        .switchMap((searchUrl: string) => {
          return this.onSearchPaginationUpdate
          .map(pageNumber => `${searchUrl}&page=${pageNumber['payload']}`)
        })
        .switchMap(searchUrl => this.http.get(searchUrl))
        .do((res: GithubPayload) => {
          this.store.dispatch({
            type: UPDATE_SEARCH_RESULTS,
            payload: {
              results: res.items,
              total: res.total_count
            }
          });
        })
        .subscribe();
  }
}