import { Component, OnInit, QueryList } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ClubItemComponent } from './club-item/club-item.component';
import { TitleCardComponent } from "./title-card/title-card.component";
import { ListMembersComponent } from "./list-members/list-members.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-clubs',
  standalone: true,
  imports: [CommonModule, ClubItemComponent, TitleCardComponent, ListMembersComponent],
  templateUrl: './list-clubs.component.html',
  styleUrl: './list-clubs.component.css'
})
export class ListClubsComponent implements OnInit {

  private apiUrl = '/get-clubs';

  private listOfClubs: any[] = [];
  public displayData: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadClubs();
  }

  ngAfterViewInit(): void {
    // this.initClubs();
  }

  private loadClubs(): void {
    if (this.listOfClubs.length === 0) {
      const token = localStorage.getItem('mingle-token');

      if (!token) {
        console.error('No JWT token');
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<any[]>(this.apiUrl, { headers })
        .subscribe({
          next: (response: any[]) => {
            this.listOfClubs = response;

            this.displayData = this.listOfClubs.map(club => ({
              name: club.name, // Use alias as name
              description: club.about_us, // Access 'about us' field
              id: club.id,
            }));
          },
          error: (err) => {
            console.error('Error fetching clubs:', err);
          }
        });
    }
  }

  onClubItemClick(clubId: number): void {
    this.router.navigate(['/club_page'], { queryParams: { index: clubId } });
  }
}
