import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { MdButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/race';
import 'rxjs/add/operator/filter';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';

import { appRoutes } from './app.routing';
import { appReducer } from './shared/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UserModule,
    MdButtonModule,
    StoreModule.forRoot({app: appReducer}),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }
    ),
    BrowserModule,

    HomeModule,
    SearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
