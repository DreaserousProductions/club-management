import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `/update-profile`;

  constructor(private http: HttpClient) { }

  updateProfile(userName: string, avatar: File | null) {
    const formData = new FormData();
    formData.append('name', userName);

    if (avatar) {
      formData.append('avatar', avatar, avatar.name);
    }

    return this.http.post(this.apiUrl, formData);
  }
}
