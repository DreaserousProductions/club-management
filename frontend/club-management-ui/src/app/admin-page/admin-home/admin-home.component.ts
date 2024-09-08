import { Component } from '@angular/core';
import { AdminOperationPanelComponent } from "../admin-operation-panel/admin-operation-panel.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [AdminOperationPanelComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  name: string = "Dreaserous";
}
