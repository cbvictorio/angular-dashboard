import { Injectable, signal, computed } from '@angular/core';
import type { UserProfile } from '@/app/core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  profile = signal<UserProfile | null>(null);

  private requireProfile(): UserProfile {
    const profile = this.profile();

    if (!profile) {
      throw new Error('Access Denied');
    }

    return profile;
  }

  setProfile(profile: UserProfile) {
    this.profile.set(profile);
  }

  getName() {
    const profile = this.requireProfile()
    return profile.name
  }
}
