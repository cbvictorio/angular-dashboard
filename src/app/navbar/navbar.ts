import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

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
  navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/monitor', label: 'System Monitor' },
    { path: '/settings', label: 'Settings' }
  ];
}
