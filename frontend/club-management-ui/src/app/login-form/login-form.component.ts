import { Component, Input } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Input() isButtonDisabled: boolean = false;
}
