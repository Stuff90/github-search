import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';

import { searchRoutes } from './search.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [
    SearchComponent
  ],
  exports: [
    SearchComponent
  ],
})
export class SearchModule { }
