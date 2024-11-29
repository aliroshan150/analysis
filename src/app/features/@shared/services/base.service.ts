import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";
import {API_URL, LOGGER_URL, RETRY_COUNT} from '@core/interceptors/core.interceptor';
import {CrudBaseService} from '@core/base-class/crud-base.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService
  extends CrudBaseService {
  override entityName: string = '/';

  constructor() {
    super();
    this.apiContext.set(API_URL, environment.apiUrl);
    this.apiContext.set(LOGGER_URL, '');
    this.apiContext.set(RETRY_COUNT, 0);
  }
}
