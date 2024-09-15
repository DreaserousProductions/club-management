import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() ann_title: string = "";
  @Input() ann_auth: string = "";
  @Input() ann_content: string = "";
}
