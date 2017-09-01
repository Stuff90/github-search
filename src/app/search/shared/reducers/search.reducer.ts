import { Action } from '@ngrx/store';
import { SearchActions, UPDATE_SEARCH_TERM, VALIDATE_SEARCH_TERM } from "./search.actions";
import { SearchResults } from "../interfaces/search-results.interface";

// export const CHANGE_PAGE = 'CHANGE_PAGE';
// export const UPDATE_RESULTS = 'UPDATE_RESULTS';
// export const RESET_SEARCH_TERM = 'RESET_SEARCH_TERM';
// export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';


export function searchReducer(state: SearchResults = {
  page: 1,
  term: '',
  results: [],
  valid: false,
  loading: false,
}, action: SearchActions) {
	switch (action.type) {
		case UPDATE_SEARCH_TERM:
      return Object.assign({}, state, { term: action.payload });

      case VALIDATE_SEARCH_TERM:
        return Object.assign({}, state, { valid: state.term.length > 2 });

		// case DECREMENT:
		// 	return state - 1;

		// case RESET:
		// 	return 0;

		default:
			return state;
	}
}