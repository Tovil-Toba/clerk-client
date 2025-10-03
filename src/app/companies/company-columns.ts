import { Column } from '../shared/column.model';
import { DATE_COLUMNS } from '../shared/date-columns';

export const COMPANY_COLUMNS: Column[] = [
  {
    field: 'id',
    header: 'Id',
    filterType: 'numeric',
  },
  {
    field: 'name',
    header: 'Название',
    filterType: 'text',
  },
  {
    field: 'manager.name.last',
    header: 'Менеджер',
    filterType: 'text',
  },
  {
    field: 'fieldOfActivity',
    header: 'Сфера деятельности',
    filterType: 'text',
  },
  {
    field: 'urls',
    header: 'Сайты',
    filterType: 'text',
  },
  {
    field: 'category.name',
    header: 'Категория',
    filterType: 'text',
  },
  {
    field: 'phones',
    header: 'Телефоны',
    filterType: 'text',
  },
  {
    field: 'emails',
    header: 'Корпоративные e-mail',
    filterType: 'text',
  },
  {
    field: 'notes',
    header: 'Примечания',
    filterType: 'text',
  },
  ...DATE_COLUMNS,
];
