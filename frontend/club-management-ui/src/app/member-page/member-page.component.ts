// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// import { ListClubsComponent } from "../list-clubs/list-clubs.component";
// import { MingleButtonComponent } from "../elements/mingle-button/mingle-button.component";
// import { CommonModule } from '@angular/common';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-member-page',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive, ListClubsComponent, MingleButtonComponent, FormsModule, CommonModule],
//   templateUrl: './member-page.component.html',
//   styleUrls: ['./member-page.component.css'] // Changed to styleUrls
// })
// export class MemberPageComponent implements OnInit {
//   isEditing = false;
//   userName: string = ''; // Default value; fetch this from a service
//   avatarUrl: string = ''; // Default avatar
//   selectedAvatar: File | null = null;

//   constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.loadProfile();
//   }

//   loadProfile(): void {
//     this.userService.retrieveProfile().subscribe({
//       next: (response) => {
//         this.userName = response.name;
//         this.avatarUrl = `storage/${response.avatar}`;
//       },
//       error: (error) => {
//         console.error('Error loading profile:', error);
//       },
//       complete: () => {
//         console.log('Profile load complete.');
//       }
//     });
//   }

//   toggleEdit(): void {
//     if (this.isEditing) {
//       this.saveChanges();
//     }
//     this.isEditing = !this.isEditing;
//   }

//   onAvatarChange(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedAvatar = file;
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.avatarUrl = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   triggerFileInput(): void {
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) {
//       (fileInput as HTMLInputElement).click();
//     }
//   }

//   saveChanges(): void {
//     this.userService.updateProfile(this.userName, this.selectedAvatar).subscribe({
//       next: (response) => {
//         console.log('Profile updated:', response);
//       },
//       error: (error) => {
//         console.error('Error updating profile:', error);
//       },
//       complete: () => {
//         console.log('Update request completed.');
//       }
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListClubsComponent } from '../list-clubs/list-clubs.component';
import { MingleButtonComponent } from '../elements/mingle-button/mingle-button.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ListClubsComponent,
    MingleButtonComponent
  ],
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {
  isEditing = false;
  userName: string = '';
  avatarUrl: string = '';
  selectedAvatar: File | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.retrieveProfile().subscribe({
      next: (response) => {
        this.userName = response.name;
        this.avatarUrl = `storage/${response.avatar}`;
        localStorage.setItem('mingle-role', response.role);
        console.log(response);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
      },
      complete: () => {
        console.log('Profile load complete.');
      }
    });
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveChanges();
    }
    this.isEditing = !this.isEditing;
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAvatar = file;
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
    this.userService.updateProfile(this.userName, this.selectedAvatar).subscribe({
      next: (response) => {
        console.log('Profile updated:', response);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      },
      complete: () => {
        console.log('Update request completed.');
      }
    });
  }
}
