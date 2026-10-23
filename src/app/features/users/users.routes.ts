import { Routes } from '@angular/router';
//import { AuthGuard } from '../../core/auth/auth.guard';
import { UsersList } from './users-list';

export const  USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersList,
    //canActivate: [AuthGuard]
  },
];
