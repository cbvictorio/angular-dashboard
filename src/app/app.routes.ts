import { Routes } from '@angular/router';
import { Monitor } from '@/app/pages/monitor/monitor';
import { Settings } from '@/app/pages/settings/settings';
import { Home } from '@/app/pages/home/home';

export const routes: Routes = [
    { path: 'monitor', component: Monitor },
    { path: 'settings', component: Settings },
    { path: '', component: Home },
];
