import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { SearchService } from '../../shared/search.service';

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
  search: Observable<any>;

  results: Observable<any>;
  searchValue = new  Subject<string>();
  page = new BehaviorSubject<number>(1);
  total = new BehaviorSubject<number>(0);

  pageEvent: EventEmitter<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService,
  ) {
  }

  uu(e: MdPaginationEvent) {
    this.page.next(e.pageIndex + 1);
  }

  ngOnInit() {

    this.results = this.searchValue
      .debounceTime(300)
      .do(() => this.page.next(1))
      .map(term => `https://api.github.com/search/users?q=${term}`)
      .switchMap(searchUrl => this.page.map(pageNumber => `${searchUrl}&page=${pageNumber}`))
      .switchMap(searchUrl => this.http.get(searchUrl))
      .do((result: GithubSearchPayload) => this.total.next(result.total_count))
      .map((result: GithubSearchPayload) => result.items);
  }


  getSanitizeUrl(url: string): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
