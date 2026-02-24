import { Routes } from '@angular/router';
import { Monitor } from '@/app/pages/monitor/monitor';
import { Settings } from '@/app/pages/settings/settings';
import { Home } from '@/app/pages/home/home';
import { Login } from '@/app/pages/login/login';
import { authGuard } from '@/app/core/guards/auth/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: 'monitor', component: Monitor },
            { path: 'settings', component: Settings },
            { path: '', component: Home },
        ]
    },
    { path: '**', redirectTo: 'login' }
];
