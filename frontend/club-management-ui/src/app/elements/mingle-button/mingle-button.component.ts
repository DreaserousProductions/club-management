import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mingle-button',
  standalone: true,
  imports: [],
  templateUrl: './mingle-button.component.html',
  styleUrl: './mingle-button.component.css'
})
export class MingleButtonComponent {
  @Input() buttonText: string = 'Default Text';
}
