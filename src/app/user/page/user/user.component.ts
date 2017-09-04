import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { SearchService } from '../../../search/shared/search.service';

interface UserRouteParam {
  id: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: Observable<any>;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.user = this.route.params
    .switchMap((userRouteParam: UserRouteParam) =>
      this.searchService.getSearchResultsById(userRouteParam.id)
    );
  }

  getSanitizeUrl(url: string): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

}
