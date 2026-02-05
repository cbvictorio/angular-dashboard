// app-config.token.ts
import { InjectionToken } from '@angular/core';
import type { AppConfig } from '@/environments/environment';

// We give it a string description 'app.config' for debugging purposes
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');