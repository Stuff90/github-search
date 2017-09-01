import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';

import { appRoutes } from "./app.routing";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    ),

    HomeModule,
    SearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
