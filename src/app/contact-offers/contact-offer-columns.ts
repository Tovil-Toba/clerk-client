import { Column } from '../shared/column.model';
import { DATE_COLUMNS } from '../shared/date-columns';

export const CONTACT_OFFER_COLUMNS: Column[] = [
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
  ...DATE_COLUMNS,
];
