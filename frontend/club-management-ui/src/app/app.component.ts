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
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.loadExternalScript('assets/js/CircularMenu.js').then(() => {
      console.log('Script loaded successfully.');
    }).catch(() => {
      console.log('Script loading failed.');
    });
  }

  loadExternalScript(scriptUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  }
}