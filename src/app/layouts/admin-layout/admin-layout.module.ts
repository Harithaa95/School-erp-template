import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardModule }          from '../../pages/dashboard/dashboard.module';
import { SettingsModule }          from '../../pages/settings/settings.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    DashboardModule,
    SettingsModule
  ],
  declarations: [
    

  ]
})

export class AdminLayoutModule {}
