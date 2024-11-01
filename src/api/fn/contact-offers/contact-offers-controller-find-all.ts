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
import { NumberFilterEnum } from '../../models/number-filter-enum';
import { OrderEnum } from '../../models/order-enum';
import { StringFilterEnum } from '../../models/string-filter-enum';

export interface ContactOffersControllerFindAll$Params {

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
 * **Название предложения**
 */
  name?: string;

/**
 * Фильтр
 */
  'name-filter'?: StringFilterEnum;

/**
 * Порядок сортировки
 */
  'name-order'?: OrderEnum;

/**
 * Приоритет сортировки  
 * *Чем меньше, тем приоритетнее*
 */
  'name-orderPlace'?: number;

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

export function contactOffersControllerFindAll(http: HttpClient, rootUrl: string, params?: ContactOffersControllerFindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<any>>> {
  const rb = new RequestBuilder(rootUrl, contactOffersControllerFindAll.PATH, 'get');
  if (params) {
    rb.query('createdAt', params.createdAt, {"explode":false});
    rb.query('createdAt-filter', params['createdAt-filter'], {"explode":false});
    rb.query('createdAt-order', params['createdAt-order'], {"explode":false});
    rb.query('createdAt-orderPlace', params['createdAt-orderPlace'], {});
    rb.query('id', params.id, {"explode":false});
    rb.query('id-filter', params['id-filter'], {"explode":false});
    rb.query('id-order', params['id-order'], {"explode":false});
    rb.query('id-orderPlace', params['id-orderPlace'], {});
    rb.query('isActive', params.isActive, {"explode":false});
    rb.query('isActive-order', params['isActive-order'], {"explode":false});
    rb.query('isActive-orderPlace', params['isActive-orderPlace'], {});
    rb.query('name', params.name, {"explode":false});
    rb.query('name-filter', params['name-filter'], {"explode":false});
    rb.query('name-order', params['name-order'], {"explode":false});
    rb.query('name-orderPlace', params['name-orderPlace'], {});
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
      return r as StrictHttpResponse<Array<any>>;
    })
  );
}

contactOffersControllerFindAll.PATH = '/contact-offers';