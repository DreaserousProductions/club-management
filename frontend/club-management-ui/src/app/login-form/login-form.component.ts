import { Component, Input, AfterViewInit } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Input() isButtonDisabled: boolean = false;

  constructor(private http: HttpClient) { } // Inject HttpClient

  loginUser() {
    const rollnumber_input = document.querySelector('#rollnumber-input') as HTMLInputElement;
    const password_input = document.querySelector('#pass-input') as HTMLInputElement;
    const server_message = document.querySelector('.form-element .message') as HTMLSpanElement;

    const rollnumber = rollnumber_input.value;
    const password = password_input.value;

    // Basic validation
    if (rollnumber && password) {
      this.isButtonDisabled = true; // Disable button during login

      // Send login request to backend
      this.http.post('/user/login', { roll: rollnumber, password: password })
        .subscribe({
          next: (response: any) => { // success handler
            server_message.innerHTML = response.message;
            localStorage.setItem('mingle-username', rollnumber);
            localStorage.setItem('mingle-token', response.token);
            window.location.href = "/home_page";
          },
          error: (error: any) => { // error handler
            server_message.innerHTML = "Invalid rollnumber or password";
            this.isButtonDisabled = false;
          },
          complete: () => { // complete handler
            this.isButtonDisabled = false;
          }
        });
    } else {
      server_message.innerHTML = "Please enter both Roll Number and Password.";
    }
  }

  ngAfterViewInit(): void {
    const login_btn = document.querySelector("#login-btn");

    login_btn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.loginUser(); // Trigger login function when button is clicked
    });
  }
}
