/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Company } from '../models/company';
import { ContactFacePosition } from '../models/contact-face-position';
import { Name } from '../models/name';
export interface ContactFace {

  /**
   * Компания
   */
  company: Company;

  /**
   * Идентификатор компании
   */
  companyId: number;

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
   * Заметки
   */
  notes?: string;

  /**
   * Телефон
   */
  phone?: string;

  /**
   * Должность
   */
  position?: ContactFacePosition;

  /**
   * Идентификатор должности
   */
  positionId?: number | null;

  /**
   * Дата изменения
   */
  updatedAt: string;
}
