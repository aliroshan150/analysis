import {HttpContextToken, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {environment} from '@environments/environment';
import {OAuthService} from '@oauth/services';
import {inject} from '@angular/core';


export const API_URL = new HttpContextToken<string>(() => '');
export const LOGGER_URL = new HttpContextToken<string>(() => '');
export const RETRY_COUNT = new HttpContextToken<number>(() => 3);
export const TIMEOUT = new HttpContextToken<number>(() => 10000);

export const coreInterceptor: HttpInterceptorFn = (req, next) => {
  req.context.set(API_URL, environment.apiUrl);
  req.context.set(LOGGER_URL, '');
  req.context.set(RETRY_COUNT, 0);
  req.context.set(TIMEOUT, 10000);
  const loggerUrl = req.context.get(LOGGER_URL);
  const apiUrl = req.context.get(API_URL);
  const retryCount = req.context.get(RETRY_COUNT);
  const _timeout = req.context.get(TIMEOUT);

  const authService: OAuthService = inject(OAuthService);
  let apiReq = req;

  const requestParams: any = {};
  if (!req.headers.get('skip') && apiUrl) {
    requestParams.url = `${apiUrl}${req.url}`;
  }
  if (authService.isLoggedIn) {
    // requestParams.headers = new HttpHeaders({
    //   "Authorization": authService.apiToken()
    // })
  }
  return next(req);
};
