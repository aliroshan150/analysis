import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {CoreHttpInterceptorInitialConfigType} from '@core/types';
import {API_URL, LOGGER_URL} from '@core/interceptors/core.interceptor';

@Injectable({
  providedIn: 'any'
})
export abstract class CoreBaseService {

  protected http: HttpClient = inject<HttpClient>(HttpClient);
  protected apiContext: HttpContext = new HttpContext();

  protected setting(config: CoreHttpInterceptorInitialConfigType): void {
    this.apiContext.set(API_URL, config.apiUrl ?? '');
    this.apiContext.set(LOGGER_URL, config.loggerUrl ?? '');
  }

  getByResponse = <ResponseType>(url: string, options?: any): Observable<HttpResponse<ResponseType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.get<ResponseType>(url, options)
      .pipe(
        map(response => response as HttpResponse<ResponseType>)
      );

  };

  get = <ResponseType>(url: string, options?: any): Observable<ResponseType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.get<ResponseType>(url, options).pipe(
      map(response => (response as HttpResponse<ResponseType>).body!)
    );

  };

  putByResponse = <ResponseType, RequestType>(url: string, dto: RequestType, options?: any): Observable<HttpResponse<ResponseType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.put<ResponseType>(url, dto, options)
      .pipe(
        map(response => response as HttpResponse<ResponseType>)
      );

  };

  put = <ResponseType, RequestType>(url: string, dto: RequestType, options?: any): Observable<any> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.put<ResponseType>(url, dto, options).pipe(
      map(response => (response as HttpResponse<ResponseType>).body!)
    );

  };

  postByResponse = <ResponseType, RequestType>(url: string, dto: RequestType, options?: any): Observable<HttpResponse<ResponseType>> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.post<ResponseType>(url, dto, options)
      .pipe(
        map(response => response as HttpResponse<ResponseType>)
      );

  };

  post = <ResponseType, RequestType>(url: string, dto: RequestType, options?: any): Observable<ResponseType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.post<ResponseType>(url, dto, options).pipe(
      map(response => (response as HttpResponse<ResponseType>).body!)
    );

  };

  delete = <ResponseType>(url: string, options?: any): Observable<ResponseType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.context = this.apiContext;

    return this.http.delete<ResponseType>(url, options).pipe(
      map(response => (response as HttpResponse<ResponseType>).body!)
    );

  };

  deleteByData = <ResponseType, RequestType>(url: string, dto: RequestType, options?: any): Observable<ResponseType> => {

    options = options || {};
    options.observe = options.observe || 'response';
    options.responseType = options.responseType || 'json';
    options.body = dto;
    options.context = this.apiContext;

    return this.http.delete<ResponseType>(url, options).pipe(
      map(response => (response as HttpResponse<ResponseType>).body!)
    );

  };

}
