import { Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginFormComponent },
];
