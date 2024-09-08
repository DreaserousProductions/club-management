import { Component } from '@angular/core';
import { ClubItemComponent } from "../../list-clubs/club-item/club-item.component";
import { MingleButtonComponent } from "../../elements/mingle-button/mingle-button.component";
import { AdminOperationPanelComponent } from "../admin-operation-panel/admin-operation-panel.component";

@Component({
  selector: 'app-admin-club-operations',
  standalone: true,
  imports: [ClubItemComponent, MingleButtonComponent, AdminOperationPanelComponent],
  templateUrl: './admin-club-operations.component.html',
  styleUrl: './admin-club-operations.component.css'
})
export class AdminClubOperationsComponent {

}
