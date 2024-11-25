import {ActivatedRouteSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {OAuthService} from '@oauth/services';

export function authCanActivateRoutePermissions(route: ActivatedRouteSnapshot): string[] | null {
  if (route.data && route.data['requiredUserOperations']) {
    return route.data['requiredUserOperations'];
  }
  return null;
}

export function checkPermission(requiredUserOperations: string[] | null): boolean {
  const authService: OAuthService = inject<OAuthService>(OAuthService);
  if (!requiredUserOperations || (!!requiredUserOperations && !requiredUserOperations.length )) {
    return true;
  } else {
    return authService.canDoByOperations(requiredUserOperations);
  }
}
