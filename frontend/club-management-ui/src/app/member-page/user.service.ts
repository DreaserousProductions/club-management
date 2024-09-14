import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `/update-profile`;

  constructor(private http: HttpClient) { }

  retrieveProfile(): Observable<any> {
    return this.http.get<any>(`/retrieve-profile`);
  }

  updateProfile(userName: string, avatar: File | null) {
    const token = localStorage.getItem('mingle-token');
    if (!token) {
      return throwError(() => new Error('No JWT token'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('name', userName);

    if (avatar) {
      formData.append('avatar', avatar, avatar.name);
    }

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
