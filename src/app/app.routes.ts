import { Routes } from '@angular/router';
import { Monitor } from './pages/monitor/monitor';
import { Settings } from './pages/settings/settings';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: 'monitor', component: Monitor },
    { path: 'settings', component: Settings },
    { path: '', component: Home },
];
