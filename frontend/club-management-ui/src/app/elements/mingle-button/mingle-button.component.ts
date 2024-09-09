import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mingle-button',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mingle-button.component.html',
  styleUrl: './mingle-button.component.css'
})
export class MingleButtonComponent {
  @Input() buttonText: string = 'Default Text';
}
