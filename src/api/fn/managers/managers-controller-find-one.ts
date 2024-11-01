/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Manager } from '../../models/manager';

export interface ManagersControllerFindOne$Params {

/**
 * Идентификатор
 */
  id: number;
}

export function managersControllerFindOne(http: HttpClient, rootUrl: string, params: ManagersControllerFindOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Manager>> {
  const rb = new RequestBuilder(rootUrl, managersControllerFindOne.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Manager>;
    })
  );
}

managersControllerFindOne.PATH = '/managers/{id}';
