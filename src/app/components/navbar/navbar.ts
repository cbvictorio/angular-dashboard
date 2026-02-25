import { Component, ElementRef, input, Input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '@/app/components/button/button';

export interface NavLink {
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
  profileMenu: `
    p-1
    bg-light-gray dark:bg-dark-gray
    border rounded shadow-xl
    list-none text-center
    absolute
  `,
};

@Component({
  selector: '[app-navbar]',
  imports: [RouterLink, RouterLinkActive, CommonModule, Button],
  host: { class: Styles.wrapper },
  styles: `
    ul {
      position-anchor: --navbar-anchor;
      top: calc(anchor(bottom) + 10px);
      left: anchor(left);
      right: anchor(right);
      width: unset;
    }
  `,
  template: `
    @if (userName()) {
      <div class="flex space-x-6">
        @for (link of links(); track link.path) {
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
        popoverTarget="navbar-menu"
        style="anchor-name: --navbar-anchor;"
        className="ml-auto rounded py-1.5"
      >
        <span class="font-bold px-2"> {{ userName() }} </span>
      </app-button>
      <ul #navbarMenu id="navbar-menu" popover class="${Styles.profileMenu}">
        <li>
          <a routerLink="/settings" class="${Styles.navItem}" (click)="closeMenu()">Settings</a>
        </li>
        <li>
          <button
            size="md"
            (click)="logout()"
            type="button"
            class="cursor-pointer px-3 py-2 w-full"
          >
            Logout
          </button>
        </li>
      </ul>
    }
  `,
})
export class Navbar {
  userName = input<string | null>(null);
  onLogout = input<() => void>(() => {});
  links = input<NavLink[]>([]);

  popoverMenu = viewChild<ElementRef>('navbarMenu');

  closeMenu() {
    const menuElement = this.popoverMenu()?.nativeElement;

    if (menuElement && menuElement.matches(':popover-open')) {
      menuElement.hidePopover();
    }
  }

  logout() {
    const onLogoutCallback = this.onLogout()
    
    if (onLogoutCallback) {
      onLogoutCallback()
    }
  }
}
