import { inject, Injectable, signal } from '@angular/core';
import type { UserProfile } from '@/app/core/models/user.model';
import { AuthService } from '../../services/user/auth.service';

@Injectable({ providedIn: 'root' })
export class UserStore {

  authService = inject(AuthService)
  profile = signal<UserProfile | null>(null);

  setProfile(profile: UserProfile | null) {
    this.profile.set(profile);
  }

  getName(): string {
    const profile = this.profile()
    
    if (profile) {
      return profile.name
    }

    return ''
  }
}
