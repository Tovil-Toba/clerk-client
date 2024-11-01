/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Contact } from '../../models/contact';
import { CreateContactDto } from '../../models/create-contact-dto';

export interface ContactsControllerCreate$Params {
      body: CreateContactDto
}

export function contactsControllerCreate(http: HttpClient, rootUrl: string, params: ContactsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Contact>> {
  const rb = new RequestBuilder(rootUrl, contactsControllerCreate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Contact>;
    })
  );
}

contactsControllerCreate.PATH = '/contacts';
