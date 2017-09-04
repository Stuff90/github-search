import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { GithubUser } from './interfaces/github-user.interface';
import { SearchResults } from './interfaces/search-results.interface';

interface GithubPayload {
  items: any[];
  total_count: number;
  incomplete_results: boolean;
}

@Injectable()
export class SearchService {
  search: Observable<SearchResults>;

  constructor(
    private http: HttpClient,
  ) {
  }

  getSearchResults(): Observable<GithubUser[]> {
    return this.search
      .filter(searchResults => searchResults.valid)
      .map(searchResults => `https://api.github.com/search/users?q=${searchResults.term}`)
      // .switchMap(searchUrl => this.page.map(pageNumber => `${searchUrl}&page=${pageNumber}`))
      .switchMap(searchUrl => this.http.get(searchUrl))
      .map((searchResults: GithubPayload) => searchResults.items);
  }
}
