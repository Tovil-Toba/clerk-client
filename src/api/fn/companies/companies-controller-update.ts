/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateCompanyDto } from '../../models/update-company-dto';
import { UpdateResultDto } from '../../models/update-result-dto';

export interface CompaniesControllerUpdate$Params {

/**
 * Идентификатор
 */
  id: number;
      body: UpdateCompanyDto
}

export function companiesControllerUpdate(http: HttpClient, rootUrl: string, params: CompaniesControllerUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateResultDto>> {
  const rb = new RequestBuilder(rootUrl, companiesControllerUpdate.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdateResultDto>;
    })
  );
}

companiesControllerUpdate.PATH = '/companies/{id}';