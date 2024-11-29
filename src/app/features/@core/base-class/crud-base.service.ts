import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {CoreBaseService} from '@core/base-class/core-base.service';
import {PageResponseInterface, PaginationInterface} from '@core/types';

const serialize = (obj: any) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + obj[p]);
    }
  }
  return str.join('&');
};

@Injectable({
  providedIn: 'any'
})
export abstract class CrudBaseService
  extends CoreBaseService {

  entityName: string = '';

  getAll = <ResponseType>(): Observable<ResponseType> => this.get<ResponseType>(this.entityName);

  customGetAll = <ResponseType>(entityName: string): Observable<ResponseType> => this.get<ResponseType>(entityName);

  getAllByPage = <ResponseType>(paginationDTO: PaginationInterface | any, options?: any): Observable<HttpResponse<PageResponseInterface<ResponseType>>> => {
    let url = this.entityName + '/page';
    if (paginationDTO) {
      url += '?' + serialize(paginationDTO);
    }
    return this.getByResponse<PageResponseInterface<ResponseType>>(url, options);
  };

  customGetAllByPage = <RequestType>(entityName: string, paginationDTO: PaginationInterface | any, options?: any): Observable<HttpResponse<PageResponseInterface<RequestType>>> => {
    let url = entityName;
    if (paginationDTO) {
      url += '?' + serialize(paginationDTO);
    }
    return this.getByResponse<PageResponseInterface<RequestType>>(url, options);
  };

  getById = <RequestType>(id: number | string): Observable<RequestType> => this.get<RequestType>(this.entityName + '/' + id);

  postSearchByPage = <ResponseType, RequestType>(searchDTO: RequestType, paginationDTO: PaginationInterface | any, options?: any): Observable<HttpResponse<PageResponseInterface<ResponseType>>> => {
    let url = this.entityName + '/advance-search';
    if (paginationDTO) {
      url += '?' + serialize(paginationDTO);
    }
    return this.postByResponse<PageResponseInterface<ResponseType>, RequestType>(url, searchDTO, options);
    // Result.totalItems = response.headers('X-Total-Count');
  };

  customPostSearchByPage = <ResponseType, RequestType>(entityName: string, searchDTO: RequestType, paginationDTO: PaginationInterface | any, options?: any): Observable<HttpResponse<PageResponseInterface<ResponseType>>> => {
    let url = entityName;
    if (paginationDTO) {
      url += '?' + serialize(paginationDTO);
    }
    return this.postByResponse<PageResponseInterface<ResponseType>, RequestType>(url, searchDTO, options);
    // Result.totalItems = response.headers('X-Total-Count');
  };

  save = <ResponseType, RequestType>(dto: RequestType): Observable<ResponseType> => this.post<ResponseType, RequestType>(this.entityName, dto);

  update = <ResponseType, RequestType>(dto: RequestType): Observable<ResponseType> => this.put(this.entityName, dto);

  deleteByIdPath = <ResponseType>(id: number | string): Observable<ResponseType> => this.delete(this.entityName + '/' + id);

  deleteByIdQueryParam = <ResponseType>(id: number | string): Observable<ResponseType> => this.delete(`${this.entityName}?id=${id}`);

  customDelete = <ResponseType, RequestType>(dto: RequestType): Observable<ResponseType> => this.deleteByData(this.entityName, dto);

}
