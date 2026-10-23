import { Routes } from '@angular/router';
//import { AuthGuard } from '../../core/auth/auth.guard';
import { Profile } from './profile';

export const  PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: Profile,
    //canActivate: [AuthGuard]
  },
];
