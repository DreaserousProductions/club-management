import { Component, AfterViewInit } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
declare function initNavPanel(): void;

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})
export class NavPanelComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initNavPanel();
  }
}