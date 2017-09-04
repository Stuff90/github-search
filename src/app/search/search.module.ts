import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdIconModule, MdInputModule, MdPaginatorModule, MdButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { searchRoutes } from './search.routing';
import { SearchService } from './shared/search.service';
import { searchReducer } from './shared/search.reducer';
import { SearchEffects } from './shared/search.effects';
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
    EffectsModule.forFeature([SearchEffects]),
    StoreModule.forFeature('search', searchReducer ),
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
