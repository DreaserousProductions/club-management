import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ClubItemComponent } from './club-item/club-item.component';
import { TitleCardComponent } from "./title-card/title-card.component";
import { ListMembersComponent } from "./list-members/list-members.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-clubs',
  standalone: true,
  imports: [CommonModule, ClubItemComponent, TitleCardComponent, ListMembersComponent],
  templateUrl: './list-clubs.component.html',
  styleUrl: './list-clubs.component.css'
})
export class ListClubsComponent implements OnInit, AfterViewInit {

  private apiUrl = '/get-clubs';

  private listOfClubs: any[] = [];
  public displayData: any[] = [];

  @ViewChildren('clubItem') clubItems!: QueryList<ClubItemComponent>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadClubs();
  }

  ngAfterViewInit(): void {
    this.initClubs();
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
              description: JSON.stringify(club) // Access 'about us' field
            }));
          },
          error: (err) => {
            console.error('Error fetching clubs:', err);
          }
        });
    }
  }

  private initClubs(): void {
    this.clubItems.changes.subscribe(() => {
      this.clubItems.forEach((clubItem, index) => {
        clubItem.elementRef.nativeElement.addEventListener('click', () => {
          // console.log(this.listOfClubs[index]["id"]);
          window.location.href = `/club_page?index=${this.listOfClubs[index]["id"]}`;
        });
      });
    });
  }
}
