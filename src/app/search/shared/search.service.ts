import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { GithubUser } from "./interfaces/github-user.interface";
import { SearchResults } from "./interfaces/search-results.interface";

@Injectable()
export class SearchService {
  search: Observable<SearchResults>

  constructor(
    private store: Store<any>,
  ) {
    this.search = store.select('search');
  }

  getSearchResults(): Observable<GithubUser[]> {
    return this.search
      .filter(searchResults => searchResults.valid)
      // .map(searchResults => `https://api.github.com/search/users?q=${searchResults.term}`)
      // .switchMap(searchUrl => this.page.map(pageNumber => `${searchUrl}&page=${pageNumber}`))
      .map(searchResults => searchResults.results);

      // .switchMap(searchUrl => this.http.get(searchUrl))

  }
}