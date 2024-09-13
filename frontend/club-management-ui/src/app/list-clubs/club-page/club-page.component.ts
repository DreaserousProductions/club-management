import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClubService } from '../club.service';

@Component({
  selector: 'app-club-page',
  standalone: true,
  imports: [],
  templateUrl: './club-page.component.html',
  styleUrl: './club-page.component.css'
})
export class ClubPageComponent implements OnInit {
  constructor(private http: HttpClient, private clubService: ClubService) { }

  club: any; // Adjust the type based on your actual data model
  error: string | null = null;

  getClub() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("index");

    console.log(idParam);

    // Ensure idParam is not null and is a valid number
    if (idParam !== null) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.clubService.getClub(id).subscribe({
          next: (clubData) => {
            this.club = clubData;
            console.log(this.club);
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

  ngOnInit() {
    this.getClub();
  }
}
