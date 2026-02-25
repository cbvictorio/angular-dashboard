import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStore } from '@/app/core/stores/user/user.store';
import { Button } from '@/app/components/button/button';
import { AuthService } from '@/app/core/services/user/auth.service';
import { UserProfile } from '@/app/core/models/user.model';

interface NavLink {
  path: string;
  label: string;
}

const Styles = {
  wrapper: `
    navbar h-20 p-4
    flex items-center relative
    shadow-md transition-colors duration-300
    bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-100
  `,
  navItem: 'block px-3 py-2 cursor-pointer text-inherit',
};

@Component({
  selector: '[app-navbar]',
  imports: [RouterLink, RouterLinkActive, CommonModule, Button],
  host: {
    class: Styles.wrapper,
  },
  template: `
    @if (userName) {
      <div class="flex space-x-6">
        @for (link of navLinks; track link.path) {
          <a
            [routerLink]="link.path"
            [routerLinkActiveOptions]="{ exact: link.path === '/' }"
            class="font-bold hover:opacity-70 transition-opacity py-2"
            routerLinkActive="border-b-2 border-purple-800 dark:border-purple-300"
          >
            {{ link.label }}
          </a>
        }
      </div>
      <app-button
        size="sm"
        class="ml-auto"
        popoverTarget="navbar-menu"
        style="anchor-name: --navbar-anchor;"
      >
        Welcome {{ userName }}
      </app-button>
      <ul
        #navbarMenu
        id="navbar-menu"
        popover
        class="bg-light-gray dark:bg-dark-gray border rounded-md p-1 list-none shadow-xl text-center"
        style="
          position-anchor: --navbar-anchor;
          top: calc(anchor(bottom) + 10px);
          left: anchor(left);
          right: anchor(right);
          width: unset;
          position: absolute; 
        "
      >
        <li><a routerLink="/settings" class="${Styles.navItem}" (click)="closeMenu()">Settings</a></li>
        <li>
          <button (click)="logout()" type="button" class="cursor-pointer px-3 py-2 w-full">Logout</button>
        </li>
      </ul>
    }
  `,
})
export class Navbar {
  @Input() userName: string | null = null;
  @Input({ required: true }) onLogout!: () => void;

  popoverMenu = viewChild<ElementRef>('navbarMenu');

  readonly navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/monitor', label: 'System Monitor' },
    { path: '/settings', label: 'Settings' },
  ];

  closeMenu() {
    const menuElement = this.popoverMenu()?.nativeElement;

    if (menuElement && menuElement.matches(':popover-open')) {
      menuElement.hidePopover();
    }
  }

  logout() {
    this.onLogout();
  }
}
