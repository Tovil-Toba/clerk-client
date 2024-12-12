/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BooleanFilterEnum } from '../../models/boolean-filter-enum';
import { DateFilterEnum } from '../../models/date-filter-enum';
import { FindAllManagersDto } from '../../models/find-all-managers-dto';
import { NumberFilterEnum } from '../../models/number-filter-enum';
import { OrderEnum } from '../../models/order-enum';
import { StringFilterEnum } from '../../models/string-filter-enum';

export interface ManagersControllerFindAll$Params {

/**
 * **Дата создания**
 */
  createdAt?: string;

/**
 * Фильтр
 */
  'createdAt-filter'?: DateFilterEnum;

/**
 * Порядок сортировки
 */
  'createdAt-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'createdAt-orderPlace'?: number;

/**
 * **Электронная почта**
 */
  email?: string;

/**
 * Фильтр
 */
  'email-filter'?: StringFilterEnum;

/**
 * Порядок сортировки
 */
  'email-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'email-orderPlace'?: number;

/**
 * **Идентификатор**
 */
  id?: string;

/**
 * Фильтр
 */
  'id-filter'?: NumberFilterEnum;

/**
 * Порядок сортировки
 */
  'id-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'id-orderPlace'?: number;

/**
 * **Активная**
 */
  isActive?: BooleanFilterEnum;

/**
 * Порядок сортировки
 */
  'isActive-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'isActive-orderPlace'?: number;

/**
 * **Имя**
 */
  'name.first'?: string;

/**
 * Фильтр
 */
  'name.first-filter'?: StringFilterEnum;

/**
 * Порядок сортировки
 */
  'name.first-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'name.first-orderPlace'?: number;

/**
 * **Фамилия**
 */
  'name.last'?: string;

/**
 * Фильтр
 */
  'name.last-filter'?: StringFilterEnum;

/**
 * Порядок сортировки
 */
  'name.last-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'name.last-orderPlace'?: number;

/**
 * **Отчество**
 */
  'name.middle'?: string;

/**
 * Фильтр
 */
  'name.middle-filter'?: StringFilterEnum;

/**
 * Порядок сортировки
 */
  'name.middle-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'name.middle-orderPlace'?: number;

/**
 * **Телефон**
 */
  phone?: string;

/**
 * Фильтр
 */
  'phone-filter'?: StringFilterEnum;

/**
 * Порядок сортировки
 */
  'phone-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'phone-orderPlace'?: number;

/**
 * **Дата обновления**
 */
  updatedAt?: string;

/**
 * Фильтр
 */
  'updatedAt-filter'?: DateFilterEnum;

/**
 * Порядок сортировки
 */
  'updatedAt-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'updatedAt-orderPlace'?: number;

/**
 * **Смещение**  
 * *Без заданного ограничения работать не будет*
 */
  offset?: number;

/**
 * **Ограничение**
 */
  limit?: number;
}

export function managersControllerFindAll(http: HttpClient, rootUrl: string, params?: ManagersControllerFindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<FindAllManagersDto>> {
  const rb = new RequestBuilder(rootUrl, managersControllerFindAll.PATH, 'get');
  if (params) {
    rb.query('createdAt', params.createdAt, {"explode":false});
    rb.query('createdAt-filter', params['createdAt-filter'], {"explode":false});
    rb.query('createdAt-order', params['createdAt-order'], {"explode":false});
    rb.query('createdAt-orderPlace', params['createdAt-orderPlace'], {});
    rb.query('email', params.email, {"explode":false});
    rb.query('email-filter', params['email-filter'], {"explode":false});
    rb.query('email-order', params['email-order'], {"explode":false});
    rb.query('email-orderPlace', params['email-orderPlace'], {});
    rb.query('id', params.id, {"explode":false});
    rb.query('id-filter', params['id-filter'], {"explode":false});
    rb.query('id-order', params['id-order'], {"explode":false});
    rb.query('id-orderPlace', params['id-orderPlace'], {});
    rb.query('isActive', params.isActive, {"explode":false});
    rb.query('isActive-order', params['isActive-order'], {"explode":false});
    rb.query('isActive-orderPlace', params['isActive-orderPlace'], {});
    rb.query('name.first', params['name.first'], {"explode":false});
    rb.query('name.first-filter', params['name.first-filter'], {"explode":false});
    rb.query('name.first-order', params['name.first-order'], {"explode":false});
    rb.query('name.first-orderPlace', params['name.first-orderPlace'], {});
    rb.query('name.last', params['name.last'], {"explode":false});
    rb.query('name.last-filter', params['name.last-filter'], {"explode":false});
    rb.query('name.last-order', params['name.last-order'], {"explode":false});
    rb.query('name.last-orderPlace', params['name.last-orderPlace'], {});
    rb.query('name.middle', params['name.middle'], {"explode":false});
    rb.query('name.middle-filter', params['name.middle-filter'], {"explode":false});
    rb.query('name.middle-order', params['name.middle-order'], {"explode":false});
    rb.query('name.middle-orderPlace', params['name.middle-orderPlace'], {});
    rb.query('phone', params.phone, {"explode":false});
    rb.query('phone-filter', params['phone-filter'], {"explode":false});
    rb.query('phone-order', params['phone-order'], {"explode":false});
    rb.query('phone-orderPlace', params['phone-orderPlace'], {});
    rb.query('updatedAt', params.updatedAt, {"explode":false});
    rb.query('updatedAt-filter', params['updatedAt-filter'], {"explode":false});
    rb.query('updatedAt-order', params['updatedAt-order'], {"explode":false});
    rb.query('updatedAt-orderPlace', params['updatedAt-orderPlace'], {});
    rb.query('offset', params.offset, {});
    rb.query('limit', params.limit, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FindAllManagersDto>;
    })
  );
}

managersControllerFindAll.PATH = '/managers';
