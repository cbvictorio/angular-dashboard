import { routes } from '@/app/app.routes';
import { provideRouter } from '@angular/router';
import { APP_CONFIG } from '@/app/app-config.token';
import { environment } from '@/environments/environment';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { 
      provide: APP_CONFIG, 
      useValue: environment 
    }
  ]
};
