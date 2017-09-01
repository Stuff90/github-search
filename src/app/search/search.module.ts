import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { FormsModule } from '@angular/forms';
import { EffectsModule } from "@ngrx/effects";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MdCardModule, MdButtonModule, MdIconModule } from '@angular/material';

import { searchRoutes } from './search.routing';
import { SearchService } from "./shared/search.service";
import { SearchEffects } from "./shared/search.effects";
import { SearchComponent } from './page/search/search.component';
import { searchReducer } from "./shared/reducers/search.reducer";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    HttpClientModule,
    RouterModule.forChild(searchRoutes),
    StoreModule.forFeature('search', searchReducer ),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
    SearchService,
  ],
  exports: [
    SearchComponent
  ],
})
export class SearchModule { }
