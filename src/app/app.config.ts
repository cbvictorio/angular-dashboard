import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { routes } from '@/app/app.routes';
import { environment } from '@/environments/environment';
import { APP_CONFIG } from '@/app/app-config.token';


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
