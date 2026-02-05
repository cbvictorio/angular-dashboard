import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '@/app/core/services/theme/theme';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  
  themeService = inject(ThemeService);
  isDark = this.themeService.isDarkMode;

  navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/monitor', label: 'System Monitor' },
    { path: '/settings', label: 'Settings' }
  ];

  onToggleClick() {
    this.themeService.toggleTheme();
  }
}
