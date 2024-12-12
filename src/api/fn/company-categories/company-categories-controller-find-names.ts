/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FindNamesResultDto } from '../../models/find-names-result-dto';

export interface CompanyCategoriesControllerFindNames$Params {
}

export function companyCategoriesControllerFindNames(http: HttpClient, rootUrl: string, params?: CompanyCategoriesControllerFindNames$Params, context?: HttpContext): Observable<StrictHttpResponse<FindNamesResultDto>> {
  const rb = new RequestBuilder(rootUrl, companyCategoriesControllerFindNames.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FindNamesResultDto>;
    })
  );
}

companyCategoriesControllerFindNames.PATH = '/company-categories/names';
