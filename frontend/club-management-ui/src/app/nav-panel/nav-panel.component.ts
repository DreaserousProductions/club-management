import { Component, AfterViewInit, Input } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MingleButtonComponent],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})
export class NavPanelComponent implements AfterViewInit {
  @Input() firstButtonLink: string = "register";
  @Input() mainButtonLink: string = "register";
  @Input() mainButtonText: string = "Register";

  initNavPanel() {
    const nav_logo = document.querySelector(".nav-logo-container .logo img");
    const nav_bg = document.querySelector(".nav-logo-container .logo-bg");
    nav_logo?.addEventListener('click', () => {
      nav_logo?.classList.toggle("active");
      nav_bg?.classList.toggle("active");
      nav_bg?.classList.toggle("rotate");
    });

    const isRegistered = localStorage.getItem("mingle-registered");
    const isLoggedIn = localStorage.getItem("mingle-username");

    if (isRegistered === "positive" || isLoggedIn) {
      this.firstButtonLink = "login";
      this.mainButtonLink = "login";
      this.mainButtonText = "Login";
    }
  }

  ngAfterViewInit(): void {
    this.initNavPanel();
  }
}