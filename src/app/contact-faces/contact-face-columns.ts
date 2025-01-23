import { Column } from '../shared/column.model';
import { DATE_COLUMNS } from '../shared/date-columns';

export const CONTACT_FACE_COLUMNS: Column[] = [
  {
    field: 'id',
    header: 'Id',
    filterType: 'numeric',
  },
  {
    field: 'company.name',
    header: 'Компания',
    filterType: 'text',
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
    field: 'position.name',
    header: 'Должность',
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
  {
    field: 'notes',
    header: 'Примечания',
    filterType: 'text',
  },
  ...DATE_COLUMNS,
];
