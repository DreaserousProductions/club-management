import { Component } from '@angular/core';
import { ClubItemComponent } from './club-item/club-item.component';
import { TitleCardComponent } from "./title-card/title-card.component";
import { ListMembersComponent } from "./list-members/list-members.component";

@Component({
  selector: 'app-list-clubs',
  standalone: true,
  imports: [ClubItemComponent, TitleCardComponent, ListMembersComponent],
  templateUrl: './list-clubs.component.html',
  styleUrl: './list-clubs.component.css'
})
export class ListClubsComponent {

}
