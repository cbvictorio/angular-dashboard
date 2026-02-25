import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStore } from '@/app/core/stores/user/user.store';
import { AuthService } from '@/app/core/services/user/auth.service';

interface NavLink {
  path: string;
  label: string;
}

const Styles = `
    p-4
    navbar h-20
    flex items-center
    shadow-md transition-colors duration-300
    bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-100
  `;

@Component({
  selector: '[app-navbar]',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  host: {
    class: Styles,
  },
  template: `
    @if (authService.isAuthenticated()) {
      <div class="flex space-x-6">
        @for (link of navLinks; track link.path) {
          <a
            [routerLink]="link.path"
            routerLinkActive="border-b-2 border-purple-800 dark:border-purple-300"
            [routerLinkActiveOptions]="{ exact: link.path === '/' }"
            class="font-bold hover:opacity-70 transition-opacity py-2"
          >
            {{ link.label }}
          </a>
        }
      </div>
      <div class="border ml-auto">
        {{userStore.getName()}}
      </div>
    }
  `,
})
export class Navbar {

  userStore = inject(UserStore)
  authService = inject(AuthService)

  readonly navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/monitor', label: 'System Monitor' },
    { path: '/settings', label: 'Settings' },
  ];
}
