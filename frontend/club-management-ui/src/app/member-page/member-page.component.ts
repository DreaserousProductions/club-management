import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.css'
})
export class MemberPageComponent implements OnInit {

  private apiUrl = '/get-clubs';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadClubs();
  }

  private loadClubs(): void {
    const token = localStorage.getItem('mingle-token');

    if (!token) {
      console.error('No JWT token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(this.apiUrl, { headers, responseType: 'json' })
      .subscribe({
        next: (response: any) => {
          const pElement = document.querySelector('p');
          if (pElement) {
            pElement.innerHTML = JSON.stringify(response, null, 2);  // Pretty print JSON
          }
        },
        error: (err) => {
          console.error('Error fetching clubs:', err);
        }
      });
  }
}