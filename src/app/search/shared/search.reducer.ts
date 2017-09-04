import { Action } from '@ngrx/store';
import { SearchActions, UPDATE_SEARCH_RESULTS, UPDATE_SEARCH_TERM, UPDATE_SEARCH_PAGINATION } from './search.actions';
import { SearchResults } from './interfaces/search-results.interface';

export function searchReducer(state: SearchResults = {
  page: 1,
  term: '',
	total: 0,
	results: [],
}, action: SearchActions) {
	switch (action.type) {
		case UPDATE_SEARCH_RESULTS:
      return Object.assign({}, state, action.payload);

		case UPDATE_SEARCH_TERM:
      return Object.assign({}, state, { term: action.payload });

		case UPDATE_SEARCH_PAGINATION:
      return Object.assign({}, state, { page: action.payload });

		default:
			return state;
	}
}
