import { Component, AfterViewInit } from '@angular/core';
declare function initNavPanel(): void;

@Component({
  selector: 'app-nav-panel',
  standalone: true,
  imports: [],
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.css'
})
export class NavPanelComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initNavPanel();
  }
}