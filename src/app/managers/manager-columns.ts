import { Column } from '../shared/column.model';
import { DATE_COLUMNS } from '../shared/date-columns';

export const MANAGER_COLUMNS: Column[] = [
  {
    field: 'id',
    header: 'Id',
    filterType: 'numeric',
  },
  {
    field: 'name.last',
    header: 'Фамилия',
    filterType: 'text',
  },
  {
    field: 'name.first',
    header: 'Имя',
    filterType: 'text',
  },
  {
    field: 'name.middle',
    header: 'Отчество',
    filterType: 'text',
  },
  {
    field: 'phone',
    header: 'Телефон',
    filterType: 'text',
  },
  {
    field: 'email',
    header: 'Адрес электронной почты',
    filterType: 'text',
  },
  ...DATE_COLUMNS,
];
