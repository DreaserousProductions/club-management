import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { ListClubsComponent } from './list-clubs/list-clubs.component';
import { FooterComponent } from './footer/footer.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavPanelComponent, ListClubsComponent, FooterComponent, LoginFormComponent, AdminPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'club-management-ui';
}
