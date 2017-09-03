import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UPDATE_SEARCH_TERM } from '../../shared/reducers/search.actions';
import { SearchService } from '../../shared/search.service';
// import { Actions, Effect, toPayload } from '@ngrx/effects';

interface GithubSearchPayload {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: Observable<any>;

  searchTerm = 'an';
  results: Observable<any>;
  pagination: Observable<any>;
  page = new BehaviorSubject<number>(1);
  searchValue = new BehaviorSubject<string>('');

  pouet = this.searchService.getSearchResults();

  // @Effect() navigateToTalks = this.actions.ofType(UPDATE_SEARCH_TERM).

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<any>,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService,
    // private actions: Actions
  ) {
    this.search = store.select('search');

    // this.search
    // .filter(searchResults => searchResults.valid)
    // .do(console.log)
    // .subscribe()
  }

  ngOnInit() {
    this.pagination = this.page.map(currentPage => {
      if (currentPage === 1) {
        return [currentPage, currentPage + 1, currentPage + 2];
      } else {
        return [currentPage - 1, currentPage, currentPage + 1];
      }
    });

    this.results = this.searchValue
      .debounceTime(300)
      .do(term => this.store.dispatch({ type: UPDATE_SEARCH_TERM, payload: term }))
      .mapTo([]);
      // .do(() => this.page.next(1))
      // .map(term => `https://api.github.com/search/users?q=${term}`)
      // .switchMap(searchUrl => this.page.map(pageNumber => `${searchUrl}&page=${pageNumber}`))
      // .switchMap(searchUrl => this.http.get(searchUrl))
      // .do(console.log)
      // .map((result: GithubSearchPayload) => result.items)
      // .do(console.log)
      // .switchMap(term => this.http.get(`https://api.github.com/search/users?q=${term}`))

  }

  getSanitizeUrl(url) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
