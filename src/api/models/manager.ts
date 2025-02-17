/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Name } from '../models/name';
export interface Manager {

  /**
   * Дата создания
   */
  createdAt: string;

  /**
   * Адрес электронной почты
   */
  email?: string;

  /**
   * Идентификатор
   */
  id: number;

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

  /**
   * Дата изменения
   */
  updatedAt: string;
}
