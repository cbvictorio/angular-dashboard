import { Routes } from '@angular/router';
import { Monitor } from './pages/monitor/monitor';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    { path: 'monitor', component: Monitor },
    { path: 'settings', component: Settings },
    { path: '', redirectTo: '/monitor', pathMatch: 'full' },
];
