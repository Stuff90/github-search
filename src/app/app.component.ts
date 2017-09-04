import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SearchService } from "./search/shared/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.user = this.route.queryParams
    .filter(e => e.userId)
    .switchMap(e => this.searchService.getSearchResultsById(e.userId))
    .distinctUntilChanged((a, b) => a.length >= b.length)
  }
}
