import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload, EffectsModule } from '@ngrx/effects';

import { searchReducer } from './reducers/search.reducer';
import { UPDATE_SEARCH_TERM, VALIDATE_SEARCH_TERM } from './reducers/search.actions';
import { SearchResults } from './interfaces/search-results.interface';

@Injectable()
export class SearchEffects {
  searchStore: Observable<SearchResults>;

  constructor(
    private actions: Actions,
    private store: Store<any>,
  ) {
    this.searchStore = store.select('search');
  }

  @Effect({dispatch: false}) searchTerm: Observable<any> = this.actions
    .ofType(UPDATE_SEARCH_TERM)
    .do(() => this.store.dispatch({ type: VALIDATE_SEARCH_TERM }));

  // @Effect({dispatch: false}) searchTermValidated: Observable<any> = this.actions
  //   .ofType(VALIDATE_SEARCH_TERM)
  //   .do(console.log)
    // .do(() => this.store.dispatch({ type: VALIDATE_SEARCH_TERM }))
}
