import { Component } from '@angular/core';
import { ListClubsComponent } from "../list-clubs/list-clubs.component";
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ListClubsComponent, MingleButtonComponent],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.css'
})
export class MemberPageComponent {

}