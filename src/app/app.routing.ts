import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/Auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'login'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/Auth-layout/auth-layout.module#AuthLayoutModule'
  }]}
]
