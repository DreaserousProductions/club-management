// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// import { ListClubsComponent } from "../list-clubs/list-clubs.component";
// import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-member-page',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive, ListClubsComponent, MingleButtonComponent, FormsModule, CommonModule],
//   templateUrl: './member-page.component.html',
//   styleUrl: './member-page.component.css'
// })
// export class MemberPageComponent {
//   isEditing = false;
//   userName: string = 'CS22B1037'; // Default value; fetch this from a service
//   avatarUrl: string = 'user.png'; // Default avatar

//   toggleEdit(): void {
//     this.isEditing = !this.isEditing;
//   }

//   onAvatarChange(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.avatarUrl = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   saveChanges(): void {
//     const updatedUser = {
//       name: this.userName,
//       avatar: this.avatarUrl
//     };

//     // Assuming you have a method to save changes
//     console.log('Saving user changes:', updatedUser);
//     this.toggleEdit(); // Exit edit mode
//   }
// }

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ListClubsComponent } from "../list-clubs/list-clubs.component";
import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ListClubsComponent, MingleButtonComponent, FormsModule, CommonModule],
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css'] // Changed to styleUrls
})
export class MemberPageComponent {
  isEditing = false;
  userName: string = 'CS22B1037'; // Default value; fetch this from a service
  avatarUrl: string = 'user.png'; // Default avatar

  toggleEdit(): void {
    if (!this.isEditing) {
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  }

  saveChanges(): void {
    const updatedUser = {
      name: this.userName,
      avatar: this.avatarUrl
    };

    // Assuming you have a method to save changes
    console.log('Saving user changes:', updatedUser);
    this.toggleEdit(); // Exit edit mode
  }
}
