import { Component } from '@angular/core';
import { MingleButtonComponent } from "../../elements/mingle-button/mingle-button.component";
import { NotificationComponent } from "./notification/notification.component";

@Component({
  selector: 'app-announcement-page',
  standalone: true,
  imports: [MingleButtonComponent, NotificationComponent],
  templateUrl: './announcement-page.component.html',
  styleUrl: './announcement-page.component.css'
})
export class AnnouncementPageComponent {

}
