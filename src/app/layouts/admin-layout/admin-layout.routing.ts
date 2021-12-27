import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { HomeComponent }      from '../../pages/home/home.component';
import { StudentComponent }   from '../../pages/student/student.component';
import { StaffDetailsComponent } from '../../pages/staff-details/staff-details.component';
import { AssessmentComponent } from '../../pages/assessment/assessment.component';
import { HealthComponent }     from  '../../pages/health/health.component'
import { SettingStepperComponent } from '../../pages/setting-stepper/setting-stepper.component'
import { AuthGuardService } from 'app/authGuard/auth-guard.service';

export const AdminLayoutRoutes: Routes = [ 
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'home',      component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'student',   component: StudentComponent, canActivate: [AuthGuardService] },
    { path: 'staffDetails', component: StaffDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'assessment',   component: AssessmentComponent, canActivate: [AuthGuardService] },
    { path: 'health',       component: HealthComponent, canActivate: [AuthGuardService] },
    { path: 'settingStepper', component:SettingStepperComponent, canActivate: [AuthGuardService] }
]
