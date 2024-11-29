import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {authCanActivateRoutePermissions} from '@oauth/globals/auth-helpers';
import {OAuthService} from '@oauth/services';

export const authCanActivateChildGuard: CanActivateChildFn = async (childRoute, state) => {
  const router: Router = inject<Router>(Router);
  const authService: OAuthService = inject<OAuthService>(OAuthService);
  if (!authService.isLoggedIn) {
    // await router.navigate(['oauth'], {queryParams: {retUrl: state.url}});
    await router.navigate(['oauth']);
    return false;
  }
  const requiredOperations = authCanActivateRoutePermissions(childRoute);
  return true;
};
