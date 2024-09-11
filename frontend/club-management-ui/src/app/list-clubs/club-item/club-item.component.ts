import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-club-item',
  standalone: true,
  imports: [],
  templateUrl: './club-item.component.html',
  styleUrl: './club-item.component.css'
})
export class ClubItemComponent {
  @Input() clubName: string = "";
  @Input() clubDesc: string = "";

}
