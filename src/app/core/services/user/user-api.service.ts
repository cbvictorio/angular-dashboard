import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '@/app/app-config.token';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '@/app/core/models/user.model';
import { isApiError, type ApiResponse } from '@/app/core/models/api-response.model';

export interface CredentialsDTO {
  email: string;
  password: string;
}

namespace UserServiceResponse {
  export type Login = Promise<UserProfile | string>;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  async login(credentials: CredentialsDTO): UserServiceResponse.Login {
    const loginURL = `${this.config.apiUrl}/login`;
    let data: ApiResponse<UserProfile> | string = ""

    try {
      data = await firstValueFrom(this.http.post<UserProfile>(loginURL, credentials))
    } catch (e) {
      console.error(`Something went wrong: `,  e)
      data = "Unable to process login"
    }

    if (isApiError(data)) {
      return data.message
    }

    return data
  }
}
