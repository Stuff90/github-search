import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { SearchService } from '../../shared/search.service';
import { UPDATE_SEARCH_RESULTS, UPDATE_SEARCH_TERM, UPDATE_SEARCH_PAGINATION } from "../../shared/search.actions";
import { SearchResults } from "../../shared/interfaces/search-results.interface";

interface GithubSearchPayload {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

interface MdPaginationEvent {
  pageIndex: 1;
  pageSize: 30;
  length: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  total: Observable<any>;
  results: Observable<any>;
  searchValue = new  Subject<string>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<any>,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService,
  ) {
  }

  ngOnInit() {
    this.results = this.searchService.getSearchData('results');
    this.total = this.searchService.getSearchData('total');
  }

  updatePagination(event: MdPaginationEvent) {
    this.store.dispatch({
      type: UPDATE_SEARCH_PAGINATION,
      payload: event.pageIndex + 1
    })
  }


  onSearchTermUpdate(term: string) {
    this.store.dispatch({
      type: UPDATE_SEARCH_TERM,
      payload: term
    });
  }

  getSanitizeUrl(url: string): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
