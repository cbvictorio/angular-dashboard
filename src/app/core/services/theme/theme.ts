import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.detectTheme();

    effect(() => {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    })

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }
    
  }

  toggleTheme() {
      this.isDarkMode.update(v => !v);
  }

  private detectTheme() {
    // Standard Browser API to check system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial value
    this.isDarkMode.set(darkModeMediaQuery.matches);

    // Listen for system changes in real-time
    darkModeMediaQuery.addEventListener('change', (e) => {
      this.isDarkMode.set(e.matches);
    });
  }
}
