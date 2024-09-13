import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.clubService.joinClub(this.club.id, localStorage.getItem("migle-username"));
  }

  ngOnInit(): void {
    this.getClub();
  }
}
