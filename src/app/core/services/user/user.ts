import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@/app/app-config.token';
import { Observable } from 'rxjs';

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
  
  login(credentials: CredentialsDTO): Observable<Record<string, string>> {
    const loginURL = `${this.config.apiUrl}/login`;
    return this.http.post<Record<string, string>>(loginURL, credentials)

  }
}
