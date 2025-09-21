import { Column } from '../shared/column.model';
import { DATE_COLUMNS } from '../shared/date-columns';

export const CONTACT_COLUMNS: Column[] = [
  {
    field: 'id',
    header: 'Id',
    filterType: 'numeric',
  },
  {
    field: 'contactDate',
    header: 'Дата контакта',
    filterType: 'date',
  },
  {
    field: 'company.name',
    header: 'Компания',
    filterType: 'text',
  },
  {
    field: 'manager.name.last',
    header: 'Менеджер',
    filterType: 'text',
  },
  {
    field: 'description',
    header: 'Описание',
    filterType: 'text',
  },
  {
    field: 'offer.name',
    header: 'Предложение',
    filterType: 'text',
  },
  {
    field: 'contactFace.name.last',
    header: 'Контактное лицо',
    filterType: 'text',
  },
  {
    field: 'contactFace.position.name',
    header: 'Должность контактного лица',
    filterType: 'text',
  },
  {
    field: 'contactFace.phone',
    header: 'Телефон контактного лица',
    filterType: 'text',
  },
  {
    field: 'nextContactDate',
    header: 'Дата следующего контакта',
    filterType: 'date',
  },
  {
    field: 'status',
    header: 'Состояние',
    filterType: 'text',
  },
  ...DATE_COLUMNS,
];
