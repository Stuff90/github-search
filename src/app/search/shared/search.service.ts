import { Store } from "@ngrx/store";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { GithubUser } from './interfaces/github-user.interface';
import { SearchResults } from './interfaces/search-results.interface';
import { UPDATE_SEARCH_RESULTS } from "./search.actions";

@Injectable()
export class SearchService {
  private searchResults: Observable<SearchResults>;

  constructor(
    private http: HttpClient,
    private store: Store<any>
  ) {
    this.searchResults = store.select('search');
  }

  getSearchResultsById(userId: number): Observable<GithubUser[]> {
    const userFromStore = this.getSearchResults()
      .map((users: GithubUser[]) =>
        users.filter((user : GithubUser) => user.id == userId)
      );

    const userFromApi = this.http.get(`https://api.github.com/user/${userId}`)
      .map((user: GithubUser) => [user]);

    return Observable.merge(userFromStore, userFromApi);
  }

  getSearchData(key: string): Observable<any> {
    return this.searchResults
      .map((searchData: SearchResults) => searchData[key])
  }

  getTotalSearchResults(): Observable<number> {
    return this.searchResults
      .map((searchData: SearchResults) => searchData.total)
  }

  getSearchResults(): Observable<GithubUser[]> {
    return this.searchResults
      .map((searchData: SearchResults) => searchData.results)
  }
}
