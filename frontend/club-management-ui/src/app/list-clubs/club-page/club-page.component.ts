import { Component, Input, OnInit } from '@angular/core';
import { ClubService } from '../club.service';
import { MingleButtonComponent } from "../../elements/mingle-button/mingle-button.component";

@Component({
  selector: 'app-club-page',
  standalone: true,
  imports: [MingleButtonComponent],
  templateUrl: './club-page.component.html',
  styleUrl: './club-page.component.css'
})
export class ClubPageComponent implements OnInit {
  @Input() isButtonDisabled: boolean = false;
  @Input() buttonText: string = "Join";

  constructor(private clubService: ClubService) { }

  club: any; // Adjust the type based on your actual data model
  error: string | null = null;

  private getClub() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("index");

    // Ensure idParam is not null and is a valid number
    if (idParam !== null) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.clubService.getClub(id).subscribe({
          next: (clubData) => {
            this.club = clubData;

            const description = JSON.parse(clubData.description);
            const mainDiv = document.querySelector('.main-div .club-details');
            const joinBtn = document.querySelector("#join-club");

            joinBtn?.addEventListener('click', () => {
              this.joinClub();
            });

            const dataItems = [
              { label: 'Name', value: clubData.name },
              { label: 'Alias', value: description.alias },
              { label: 'About Us', value: description['about us'] },
              { label: 'Number of Members', value: description['number of members'] },
              { label: 'President ID', value: clubData.president_id },
              { label: 'Secretary ID', value: clubData.secretary_id },
              { label: 'Treasurer ID', value: clubData.treasurer_id }
            ];

            // Append each item to the main div
            dataItems.forEach(item => {
              const div = document.createElement('div');
              div.classList.add('data-item');

              const label = document.createElement('span');
              label.classList.add('label');
              label.textContent = `${item.label}: `;

              const value = document.createElement('span');
              value.textContent = item.value === null ? 'N/A' : item.value;

              div.appendChild(label);
              div.appendChild(value);
              mainDiv?.appendChild(div);
            });
          },
          error: (err) => {
            this.error = 'Failed to load club details';
            console.error('Error:', err);
          }
        });
      } else {
        console.error('Invalid id parameter:', idParam);
      }
    } else {
      console.error('id parameter is missing');
    }
  }

  private joinClub(): void {
    this.isButtonDisabled = true;
    this.clubService.joinClub(this.club.id, localStorage.getItem("mingle-username")).subscribe({
      next: (response) => {
        console.log('Successfully joined the club', response);
        this.buttonText = "Requested";
        // Handle success (e.g., show a message to the user)
      },
      error: (error) => {
        if (error.status === 409) {
          // Handle the 409 Conflict error
          console.log('Club membership conflict - already joined or other conflict');
          this.buttonText = "Already Requested";
        } else {
          // Handle other errors
          console.error('Error joining the club', error);
          this.isButtonDisabled = false;
        }
      },
      complete: () => {
        console.log('Request completed');
        // Handle completion (optional, if needed)
      }
    });
  }

  ngOnInit(): void {
    this.getClub();
  }
}
