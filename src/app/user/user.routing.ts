import { Routes } from '@angular/router';
import { UserComponent } from './page/user/user.component';

export const userRoutes: Routes = [
  { path: 'user/:id',  component: UserComponent },
];
