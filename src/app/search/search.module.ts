import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdIconModule, MdInputModule, MdPaginatorModule, MdButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { searchRoutes } from './search.routing';
import { SearchService } from './shared/search.service';
import { SearchComponent } from './page/search/search.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    HttpClientModule,
    MdPaginatorModule,
    BrowserAnimationsModule,
    RouterModule.forChild(searchRoutes),
  ],
  declarations: [
    SearchComponent,
  ],
  providers: [
    SearchService,
  ],
  exports: [
    SearchComponent
  ],
})
export class SearchModule { }
