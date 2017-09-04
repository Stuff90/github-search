import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './page/user/user.component';
import { MdIconModule, MdInputModule, MdButtonModule, MdCardModule } from "@angular/material";

import { userRoutes } from "./user.routing";

@NgModule({
  imports: [
    MdCardModule,
    CommonModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    RouterModule.forChild(userRoutes),
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
