import { Component } from '@angular/core';
import { MemberCardComponent } from "./member-card/member-card.component";

@Component({
  selector: 'app-list-members',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './list-members.component.html',
  styleUrl: './list-members.component.css'
})
export class ListMembersComponent {

}
