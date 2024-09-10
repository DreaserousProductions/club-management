import { Component, Input } from '@angular/core';
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})

export class RegistrationFormComponent {
  @Input() isButtonDisabled: boolean = false;


  sendRollNumber() {
    let rollnumber = "";
    const regex = /^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/;

    const register_btn = document.querySelector('.form-element form app-mingle-button');
    const server_message = document.querySelector('.form-element form .message') as HTMLSpanElement;
    const rollnumber_input = document.querySelector('.form-element form #rollnumber-input') as HTMLInputElement;

    let first_phase_complete = false;
    const otp_label = document.querySelector('#otp-label');
    const otp_input = document.querySelector('#otp-input') as HTMLInputElement;

    this.isButtonDisabled = false;  // Initial state: button enabled

    const handleRollNumberSubmission = () => {
      rollnumber = rollnumber_input.value;
      if (regex.test(rollnumber)) {
        this.isButtonDisabled = true;  // Disable the button

        fetch('/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ roll: rollnumber })
        })
          .then(response => response.json())
          .then(data => {
            server_message.innerHTML = "Please enter the OTP sent to your E-Mail";
            first_phase_complete = true;
            otp_label?.classList.remove("hidden");
            otp_input?.classList.remove("hidden");
            this.isButtonDisabled = false;  // Re-enable the button
          })
          .catch(error => {
            server_message.innerHTML = "Error during registration";
            this.isButtonDisabled = false;  // Re-enable the button in case of error
          });
      } else {
        server_message.innerHTML = "Invalid Roll Number Format";
      }
    };

    const handleOtpSubmission = () => {
      if (first_phase_complete) {
        const otp = otp_input.value;

        if (otp) {
          this.isButtonDisabled = true;  // Disable the button during OTP submission

          fetch('/verifyingRegistration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ roll: rollnumber, otp: otp })
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                server_message.innerHTML = "OTP verified successfully. Registration complete.";
              } else {
                server_message.innerHTML = "Invalid OTP. Please try again.";
              }
              this.isButtonDisabled = false;  // Re-enable the button
            })
            .catch(error => {
              server_message.innerHTML = "Error during OTP verification";
              this.isButtonDisabled = false;  // Re-enable the button in case of error
            });
        } else {
          server_message.innerHTML = "Please enter the OTP";
        }
      }
    };

    register_btn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!first_phase_complete) {
        handleRollNumberSubmission();
      } else {
        handleOtpSubmission();
      }
    });
  }



  // sendRollNumber() {
  //   let rollnumber = "";
  //   const regex = /^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/;

  //   const register_btn = document.querySelector('.form-element form app-mingle-button');
  //   const server_message = document.querySelector('.form-element form .message') as HTMLSpanElement;
  //   const rollnumber_input = document.querySelector('.form-element form #rollnumber-input') as HTMLInputElement;

  //   let first_phase_complete = false;
  //   const otp_label = document.querySelector('#otp-label');
  //   const otp_input = document.querySelector('#otp-input') as HTMLInputElement;

  //   register_btn?.addEventListener('click', (e) => {
  //     e.preventDefault();

  //     if (!first_phase_complete) {
  //       rollnumber = rollnumber_input.value;
  //       if (regex.test(rollnumber)) {
  //         fetch('/users', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({ roll: rollnumber })
  //         })
  //           .then(response => response.json())
  //           .then(data => {
  //             server_message.innerHTML = "Please enter the OTP sent to your E-Mail";
  //             first_phase_complete = true;
  //             otp_label?.classList.remove("hidden");
  //             otp_input?.classList.remove("hidden");

  //           })
  //           .catch(error => {
  //             server_message.innerHTML = "Error during registration";
  //           });
  //       } else {
  //         server_message.innerHTML = "Invalid Roll Number Format";
  //       }
  //     } else {
  //       console.log(
  //         otp_input.value
  //       );
  //     }
  //   });

  //   // let registration_object = {
  //   //   name: "",
  //   //   email: "",
  //   //   username: "",
  //   //   password: "",
  //   //   role: 0
  //   // }

  //   // const submit_btn = document.querySelector('.form-element form app-mingle-button');

  //   // submit_btn?.addEventListener('click', (e) => {
  //   //   e.preventDefault();

  //   //   const input_elements = document.querySelectorAll('.form-element form input');

  //   //   input_elements.forEach(input => {
  //   //     const inputElement = input as HTMLInputElement;  // Cast input to HTMLInputElement
  //   //     const inputValue = inputElement.value;

  //   //     if (input.getAttribute("name") === "name" && inputValue !== null) {
  //   //       registration_object["name"] = inputValue;
  //   //     } else if (input.getAttribute("name") === "username" && inputValue !== null) {
  //   //       registration_object["username"] = inputValue;
  //   //     } else if (input.getAttribute("name") === "email" && inputValue !== null) {
  //   //       registration_object["email"] = inputValue;
  //   //     } else if (input.getAttribute("name") === "password" && inputValue !== null) {
  //   //       registration_object["password"] = inputValue;
  //   //     } else if (input.getAttribute("name") === "role" && inputValue !== null) {
  //   //       const roleAsNumber = Number(inputValue); // You could also use Number(value) if needed.
  //   //       if (!isNaN(roleAsNumber)) {
  //   //         registration_object["role"] = roleAsNumber;
  //   //       } else {
  //   //         console.error("Invalid role value, not a number:", inputValue);
  //   //       }
  //   //     }
  //   //   });

  //   //   console.log(registration_object);

  //   //   // this.http.post('/users', registration_object, {
  //   //   //   headers: {
  //   //   //     'Content-Type': 'application/json'
  //   //   //   }
  //   //   // }).subscribe({
  //   //   //   next: (response) => {
  //   //   //     console.log("Registration successful:", response);
  //   //   //   },
  //   //   //   error: (err) => {
  //   //   //     console.error("Error during registration:", err);
  //   //   //   },
  //   //   //   complete: () => {
  //   //   //     console.log("Request complete");
  //   //   //   }
  //   //   // });
  //   // });
  // }

  constructor(private http: HttpClient) {

  }

  ngAfterViewInit() {
    this.sendRollNumber();
  }
}
