import { Component, OnInit } from '@angular/core';
import { MingleButtonComponent } from "../../elements/mingle-button/mingle-button.component";
import { NotificationComponent } from "./notification/notification.component";

@Component({
  selector: 'app-announcement-page',
  standalone: true,
  imports: [MingleButtonComponent, NotificationComponent],
  templateUrl: './announcement-page.component.html',
  styleUrl: './announcement-page.component.css'
})
export class AnnouncementPageComponent implements OnInit {

  ngOnInit(): void {
    const role = localStorage.getItem('mingle-role');
    if (role === '2') {

    }
  }
}
