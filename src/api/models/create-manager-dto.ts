/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Name } from '../models/name';
export interface CreateManagerDto {

  /**
   * Адрес электронной почты
   */
  email?: string;

  /**
   * Активная
   */
  isActive?: boolean;

  /**
   * ФИО
   */
  name: Name;

  /**
   * Телефон
   */
  phone?: string;
}
