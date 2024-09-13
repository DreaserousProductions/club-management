import { Component, Input } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MingleButtonComponent],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})

export class RegistrationFormComponent {
  @Input() isButtonDisabled: boolean = false;
  @Input() formButtonText: string = "Submit";

  rollnumber: string = "";
  current_phase: number = 1;

  constructor(private http: HttpClient) { }

  userRegistration() {
    const regex = /^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/;

    const rollnumber_input = document.querySelector('#rollnumber-input') as HTMLInputElement;
    const server_message = document.querySelector('.form-element form .message') as HTMLSpanElement;
    const otp_label = document.querySelector('#otp-label');
    const otp_input = document.querySelector('#otp-input') as HTMLInputElement;

    const pass_label = document.querySelector('#pass-label');
    const pass_input = document.querySelector('#pass-input') as HTMLInputElement;
    const cnf_pass_label = document.querySelector('#cnf-pass-label');
    const cnf_pass_input = document.querySelector('#cnf-pass-input') as HTMLInputElement;

    const register_btn = document.querySelector('#register-btn');

    // Handle roll number submission
    const handleRollNumberSubmission = () => {
      this.rollnumber = rollnumber_input.value;
      if (regex.test(this.rollnumber)) {
        this.isButtonDisabled = true;

        this.http.post('/otp/send', { roll: this.rollnumber })
          .subscribe({
            next: (data: any) => {
              if (data.success) {
                server_message.innerHTML = "Please enter the OTP sent to your E-Mail";
                this.current_phase = 2;
                otp_label?.classList.remove("hidden");
                otp_input?.classList.remove("hidden");
                this.isButtonDisabled = false;
                window.location.href = "/";
              } else {
                server_message.innerHTML = data.message;
                this.isButtonDisabled = false;
                window.location.href = "/";
              }
            },
            error: () => {
              server_message.innerHTML = "Error during registration";
              this.isButtonDisabled = false;
            }
          });
      } else {
        server_message.innerHTML = "Invalid Roll Number Format";
      }
    };

    // Handle OTP submission
    const handleOtpSubmission = () => {
      const otp = otp_input.value;
      if (otp) {
        this.isButtonDisabled = true;

        this.http.post('/otp/verify', { roll: this.rollnumber, otp: otp })
          .subscribe({
            next: (data: any) => {
              if (data.success) {
                server_message.innerHTML = "OTP verified successfully. Create your password.";
                this.current_phase = 3;
                otp_label?.classList.add("hidden");
                otp_input?.classList.add("hidden");
                pass_label?.classList.remove("hidden");
                pass_input?.classList.remove("hidden");
                cnf_pass_label?.classList.remove("hidden");
                cnf_pass_input?.classList.remove("hidden");
                this.isButtonDisabled = false;
                this.formButtonText = "Register";
              } else {
                server_message.innerHTML = "Invalid OTP. Please try again.";
                this.isButtonDisabled = false;
              }
            },
            error: () => {
              server_message.innerHTML = "Error during OTP verification";
              this.isButtonDisabled = false;
            }
          });
      } else {
        server_message.innerHTML = "Please enter the OTP";
      }
    };

    // Handle password creation
    const handlePasswordCreation = () => {
      const password = pass_input.value;
      const confirmPassword = cnf_pass_input.value;
      if (password && confirmPassword && password === confirmPassword) {
        this.isButtonDisabled = true;

        this.http.post('/user/create-password', { roll: this.rollnumber, password: password })
          .subscribe({
            next: (data: any) => {
              if (data.success) {
                server_message.innerHTML = "Password created successfully.";
                localStorage.setItem("mingle-registered", "positive");
                this.current_phase = 4;
              } else {
                server_message.innerHTML = data.message;
                this.isButtonDisabled = false;
              }
            },
            error: () => {
              server_message.innerHTML = "Error during password creation";
              this.isButtonDisabled = false;
            }
          });
      } else {
        server_message.innerHTML = "Passwords do not match";
      }
    };

    register_btn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.current_phase === 1) {
        handleRollNumberSubmission();
      } else if (this.current_phase === 2) {
        handleOtpSubmission();
      } else if (this.current_phase === 3) {
        handlePasswordCreation();
      }
    });
  }

  ngAfterViewInit() {
    this.userRegistration();
  }
}