import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})
export class NavPanelComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.loadExternalScript('assets/js/circularMenu.js').then(() => {
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