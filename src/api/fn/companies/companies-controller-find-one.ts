/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Company } from '../../models/company';

export interface CompaniesControllerFindOne$Params {

/**
 * Идентификатор
 */
  id: number;
}

export function companiesControllerFindOne(http: HttpClient, rootUrl: string, params: CompaniesControllerFindOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Company>> {
  const rb = new RequestBuilder(rootUrl, companiesControllerFindOne.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Company>;
    })
  );
}

companiesControllerFindOne.PATH = '/companies/{id}';
