import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavPanelComponent } from './nav-panel/nav-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'club-management-ui';
}
