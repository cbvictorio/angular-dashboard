import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@/app/app-config.token';
import { Observable } from 'rxjs';
import { UserProfile } from '@/app/core/models/user.model';


export interface CredentialsDTO {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  
  login(credentials: CredentialsDTO): Observable<UserProfile> {
    const loginURL = `${this.config.apiUrl}/login`;
    return this.http.post<UserProfile>(loginURL, credentials)
  }
}
