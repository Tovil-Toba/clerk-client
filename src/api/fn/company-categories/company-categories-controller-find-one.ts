/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CompanyCategory } from '../../models/company-category';

export interface CompanyCategoriesControllerFindOne$Params {

/**
 * Идентификатор
 */
  id: number;
}

export function companyCategoriesControllerFindOne(http: HttpClient, rootUrl: string, params: CompanyCategoriesControllerFindOne$Params, context?: HttpContext): Observable<StrictHttpResponse<CompanyCategory>> {
  const rb = new RequestBuilder(rootUrl, companyCategoriesControllerFindOne.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CompanyCategory>;
    })
  );
}

companyCategoriesControllerFindOne.PATH = '/company-categories/{id}';
