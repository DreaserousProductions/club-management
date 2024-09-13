import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = '/get-club'; // API endpoint

  constructor(private http: HttpClient) { }

  getClub(id: number): Observable<any> {
    const token = localStorage.getItem('mingle-token');
    if (!token) {
      console.error('No JWT token');
      return throwError(() => new Error('No JWT token'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(err => {
          console.error('Error fetching club:', err);
          return throwError(() => new Error('Error fetching club'));
        })
      );
  }

  joinClub(club_id: number, user_id: any) {
    if (!user_id) {
      return throwError(() => new Error('No username provided'));
    }

    const token = localStorage.getItem('mingle-token');
    if (!token) {
      console.error('No JWT token');
      return throwError(() => new Error('No JWT token'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`/join-club/${user_id}/${club_id}`, { headers })
      .pipe(
        catchError(err => {
          console.error('Error fetching club:', err);
          return throwError(() => new Error('Error fetching club'));
        })
      );
  }
}
