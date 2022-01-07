import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { HomeComponent }      from '../../pages/home/home.component';
import { StudentComponent }   from '../../pages/student/student.component';
import { StaffDetailsComponent } from '../../pages/staff-details/staff-details.component';
import { AssessmentComponent } from '../../pages/assessment/assessment.component';
import { HealthComponent }     from  '../../pages/health/health.component'
import { SettingStepperComponent } from '../../pages/setting-stepper/setting-stepper.component'
import { ConfigurationComponent } from '../../pages/setting-stepper/components/configuration/configuration.component'
import { StorageSetupComponent } from '../../pages/setting-stepper/components/storage-setup/storage-setup.component'
import { UdiseSetupComponent } from '../../pages/setting-stepper/components/udise-setup/udise-setup.component'
import { AuthGuardService } from 'app/authGuard/auth-guard.service';


export const AdminLayoutRoutes: Routes = [ 
    { path: 'dashboard', component: DashboardComponent },
    { path: 'home',      component: HomeComponent },
    { path: 'student',   component: StudentComponent },
    { path: 'staffDetails', component: StaffDetailsComponent },
    { path: 'assessment',   component: AssessmentComponent },
    { path: 'health',       component: HealthComponent },
    { path: 'settingStepper', component:SettingStepperComponent },
    { path: 'configuration', component:ConfigurationComponent },
    { path: 'storageSetup', component:StorageSetupComponent },
    { path: 'udiseSetup', component:UdiseSetupComponent }  
]
