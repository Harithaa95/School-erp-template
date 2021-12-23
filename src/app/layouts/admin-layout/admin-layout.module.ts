import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardModule }          from '../../pages/dashboard/dashboard.module';
 import { HomeModule }          from '../../pages/home/home.module';
import { StudentModule }          from '../../pages/student/student.module';
import { StaffDetailsModule}          from '../../pages/staff-details/staff-details.module';
import { HealthModule }          from '../../pages/health/health.module';
import { AssessmentModule }          from '../../pages/assessment/assessment.module';
import { SettingStepperModule }          from '../../pages/setting-stepper/setting-stepper.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DashboardModule,
    HomeModule,
    StudentModule,
    StaffDetailsModule,
    HealthModule,
    AssessmentModule,
    SettingStepperModule,
    ColorPickerModule
  ],
  declarations: []
})

export class AdminLayoutModule {}
