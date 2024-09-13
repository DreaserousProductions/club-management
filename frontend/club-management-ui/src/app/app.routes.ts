import { Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { ClubPageComponent } from './list-clubs/club-page/club-page.component';
import { ListClubsComponent } from './list-clubs/list-clubs.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'home_page', component: MemberPageComponent },
    { path: 'club_list', component: ListClubsComponent },
    { path: 'club_page', component: ClubPageComponent },
];
