import { Component, AfterViewInit } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})
export class NavPanelComponent implements AfterViewInit {
  initNavPanel() {
    const nav_logo = document.querySelector(".nav-logo-container .logo img");
    const nav_bg = document.querySelector(".nav-logo-container .logo-bg");
    nav_logo?.addEventListener('click', () => {
      nav_logo?.classList.toggle("active");
      nav_bg?.classList.toggle("active");
      nav_bg?.classList.toggle("rotate");
    });
  }

  ngAfterViewInit(): void {
    this.initNavPanel();
  }
}