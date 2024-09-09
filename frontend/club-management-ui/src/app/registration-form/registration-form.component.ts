import { Component } from '@angular/core';
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
  sendRollNumber() {
    let rollnumber = "";
    const regex = /^[A-Za-z]{2}\d{2}[BDMbdm]\d{4}$/;

    const register_btn = document.querySelector('.form-element form app-mingle-button');
    const rollnumber_input = document.querySelector('.form-element form #rollnumber-input') as HTMLInputElement;

    register_btn?.addEventListener('click', (e) => {
      e.preventDefault();

      rollnumber = rollnumber_input.value;

      if (regex.test(rollnumber)) {
        console.log("Ok");

        fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ roll: rollnumber })
        })
          .then(response => response.json())
          .then(data => {
            console.log("Registration successful:", data);
            alert('OTP has been sent to your email.');
          })
          .catch(error => {
            console.error("Error during registration:", error);
            alert('An error occurred while sending the OTP.');
          });
      } else {
        alert('Invalid roll number format.');
      }
    });

    // let registration_object = {
    //   name: "",
    //   email: "",
    //   username: "",
    //   password: "",
    //   role: 0
    // }

    // const submit_btn = document.querySelector('.form-element form app-mingle-button');

    // submit_btn?.addEventListener('click', (e) => {
    //   e.preventDefault();

    //   const input_elements = document.querySelectorAll('.form-element form input');

    //   input_elements.forEach(input => {
    //     const inputElement = input as HTMLInputElement;  // Cast input to HTMLInputElement
    //     const inputValue = inputElement.value;

    //     if (input.getAttribute("name") === "name" && inputValue !== null) {
    //       registration_object["name"] = inputValue;
    //     } else if (input.getAttribute("name") === "username" && inputValue !== null) {
    //       registration_object["username"] = inputValue;
    //     } else if (input.getAttribute("name") === "email" && inputValue !== null) {
    //       registration_object["email"] = inputValue;
    //     } else if (input.getAttribute("name") === "password" && inputValue !== null) {
    //       registration_object["password"] = inputValue;
    //     } else if (input.getAttribute("name") === "role" && inputValue !== null) {
    //       const roleAsNumber = Number(inputValue); // You could also use Number(value) if needed.
    //       if (!isNaN(roleAsNumber)) {
    //         registration_object["role"] = roleAsNumber;
    //       } else {
    //         console.error("Invalid role value, not a number:", inputValue);
    //       }
    //     }
    //   });

    //   console.log(registration_object);

    //   // this.http.post('/users', registration_object, {
    //   //   headers: {
    //   //     'Content-Type': 'application/json'
    //   //   }
    //   // }).subscribe({
    //   //   next: (response) => {
    //   //     console.log("Registration successful:", response);
    //   //   },
    //   //   error: (err) => {
    //   //     console.error("Error during registration:", err);
    //   //   },
    //   //   complete: () => {
    //   //     console.log("Request complete");
    //   //   }
    //   // });
    // });
  }

  constructor(private http: HttpClient) {

  }

  ngAfterViewInit() {
    this.sendRollNumber();
  }
}
