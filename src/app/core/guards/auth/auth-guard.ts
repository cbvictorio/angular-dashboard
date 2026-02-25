import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@/app/core/services/user/auth.service';
import { UserStore } from '@/app/core/stores/user/user.store';

export const authGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService)
  const userStore = inject(UserStore)
  const router = inject(Router)

  const user = authService.isAuthenticated()

  if (user) {
    userStore.setProfile(user)
    return true;
  }

  // TODO: implement this once its appropiate
  // return router.createUrlTree(['/login'], {
  //   queryParams: { returnUrl: state.url }
  // });

  // Clean redirect without parameters (for now)
  return router.createUrlTree(['/login']);
};
