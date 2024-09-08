import { Component } from '@angular/core';
import { AdminOperationPanelComponent } from "../admin-operation-panel/admin-operation-panel.component";
import { ClubItemComponent } from "../../list-clubs/club-item/club-item.component";
import { MingleButtonComponent } from "../../elements/mingle-button/mingle-button.component";
import { MemberCardComponent } from "../../list-clubs/list-members/member-card/member-card.component";

@Component({
  selector: 'app-admin-member-operations',
  standalone: true,
  imports: [AdminOperationPanelComponent, ClubItemComponent, MingleButtonComponent, MemberCardComponent],
  templateUrl: './admin-member-operations.component.html',
  styleUrl: './admin-member-operations.component.css'
})
export class AdminMemberOperationsComponent {

}
