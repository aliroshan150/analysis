import {HttpContextToken, HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {environment} from '@environments/environment';
import {OAuthService} from '@oauth/services';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {LanguageService, LocalStorageService} from '@shared/services';
import {StorageKeyEnum} from '@shared-enums/storage-key.enum';


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
  const languageService: LanguageService = inject(LanguageService);
  const storageService: LocalStorageService = inject(LocalStorageService);
  let apiReq = req;

  const requestParams: any = {
    url: apiReq.url,
  };
  let headers: any = {};
  if (!req.headers.get('skip') && apiUrl) {
    requestParams.url = `${apiUrl}${apiReq.url}`;
  }
  if (authService.isLoggedIn) {
    // requestParams.headers = new HttpHeaders({
    //   "Authorization": authService.apiToken()
    // })
  }
  if (apiReq.method === 'POST' && storageService.has(StorageKeyEnum.API_CALL_TOKEN)) {
    headers = {
      "X-Flow-Token": storageService.getItem(StorageKeyEnum.API_CALL_TOKEN)!,
    };
  }
  if (languageService.currentLanguage?.value) {
    headers = {
      ...(headers ?? {}),
      "Accept-Language": languageService.currentLanguage?.value,
    }
  }
  requestParams.headers = new HttpHeaders({
    ...headers
  });
  apiReq = req.clone(requestParams);
  return next(apiReq)
    .pipe(
      catchError(err => handleError(err))
    );
};

const handleError = (error: HttpErrorResponse) => {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
    if (error.error?.message === 'Failed to fetch') {
      console.log('Connection Lost');
    }
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => error);
}
