import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = '/get-club'; // API endpoint

  constructor(private http: HttpClient) { }

  getClub(id: number): void {
    const token = localStorage.getItem('mingle-token');
    if (!token) {
      console.error('No JWT token');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post<any>(`${this.apiUrl}/${id}`, {}, { headers })
      .subscribe({
        next: (club) => {
          console.log('Club details:', club);
          // Handle the response, e.g., update the component's state
        },
        error: (err) => {
          console.error('Error fetching club:', err);
        }
      });
  }
}
