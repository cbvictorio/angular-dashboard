import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getServerHealth() {
    return { status: 'Online', uptime: '99.9%', region: 'US-East' };
  }
}
