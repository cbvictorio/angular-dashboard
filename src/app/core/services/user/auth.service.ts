import { Injectable } from '@angular/core';
import { UserProfile } from '@/app/core/models/user.model'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
    isAuthenticated(): UserProfile | undefined {
    const session = localStorage.getItem('userProfile');
    if (!session) return;
    const user: UserProfile = JSON.parse(session)
    return user;
  }
}
