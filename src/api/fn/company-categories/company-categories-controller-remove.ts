/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteResultDto } from '../../models/delete-result-dto';

export interface CompanyCategoriesControllerRemove$Params {

/**
 * Идентификатор
 */
  id: number;
}

export function companyCategoriesControllerRemove(http: HttpClient, rootUrl: string, params: CompanyCategoriesControllerRemove$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteResultDto>> {
  const rb = new RequestBuilder(rootUrl, companyCategoriesControllerRemove.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeleteResultDto>;
    })
  );
}

companyCategoriesControllerRemove.PATH = '/company-categories/{id}';
