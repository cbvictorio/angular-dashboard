import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar, type NavLink } from '@/app/components/navbar/navbar';
import { UserStore } from './core/stores/user/user.store';

const links: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/monitor', label: 'System Monitor' },
  { path: '/settings', label: 'Settings' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly title = signal('angular-dashboard');
  userStore = inject(UserStore);
  router = inject(Router);
  navigationItems = links;

  handleLogout = () => {
    this.userStore.setProfile(null);
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  };
}
