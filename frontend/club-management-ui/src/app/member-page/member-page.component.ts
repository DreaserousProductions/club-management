import { Component } from '@angular/core';
import { ListClubsComponent } from "../list-clubs/list-clubs.component";

@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [ListClubsComponent],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.css'
})
export class MemberPageComponent {

}