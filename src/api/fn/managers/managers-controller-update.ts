/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateManagerDto } from '../../models/update-manager-dto';
import { UpdateResultDto } from '../../models/update-result-dto';

export interface ManagersControllerUpdate$Params {

/**
 * Идентификатор
 */
  id: number;
      body: UpdateManagerDto
}

export function managersControllerUpdate(http: HttpClient, rootUrl: string, params: ManagersControllerUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateResultDto>> {
  const rb = new RequestBuilder(rootUrl, managersControllerUpdate.PATH, 'patch');
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

managersControllerUpdate.PATH = '/managers/{id}';
