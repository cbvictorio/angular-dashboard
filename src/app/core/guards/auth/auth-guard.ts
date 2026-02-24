import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '@/app/core/stores/user/user.store';

export const authGuard: CanActivateFn = (_, state) => {
  const userStore = inject(UserStore)
  const router = inject(Router)

  if (userStore.isAuthenticated()) {
    return true;
  }

  // TODO: implement this once its appropiate
  // return router.createUrlTree(['/login'], {
  //   queryParams: { returnUrl: state.url }
  // });

  // Clean redirect without parameters (for now)
  return router.createUrlTree(['/login']);
};
