import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/Auth-layout/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
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
      loadChildren: () => import('./layouts/Auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  }]}
]
