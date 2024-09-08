import { Component } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

}
