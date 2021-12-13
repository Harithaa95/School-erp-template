import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { SettingsComponent } from 'app/pages/settings/settings.component';
import { HomeComponent }          from '../../pages/home/home.component';
import { StudentComponent }          from '../../pages/student/student.component';
import { StaffDetailsComponent }          from '../../pages/staff-details/staff-details.component';
import { AssessmentComponent }          from '../../pages/assessment/assessment.component';
import {HealthComponent} from '../../pages/health/health.component'
import {SettingStepperComponent} from '../../settings/setting-stepper/setting-stepper.component'

export const AdminLayoutRoutes: Routes = [ 
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'settings',       component: SettingsComponent},
    { path: 'home',      component: HomeComponent },
    { path: 'student',       component: StudentComponent},
    { path: 'staffDetails',       component: StaffDetailsComponent},
    { path: 'assessment',       component: AssessmentComponent},
    { path: 'health',       component: HealthComponent},
    { path: 'settingStepper',       component:SettingStepperComponent }
]
