import { Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MemberPageComponent } from './member-page/member-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'home_page', component: MemberPageComponent },
];
