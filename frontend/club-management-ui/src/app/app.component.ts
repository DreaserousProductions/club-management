import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { ListClubsComponent } from './list-clubs/list-clubs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavPanelComponent, ListClubsComponent, FooterComponent, LoginFormComponent, AdminPageComponent, RegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'club-management-ui';
}