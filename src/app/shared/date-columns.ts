import { Column } from './column.model';

export const DATE_COLUMNS: Column[] = [
  {
    field: 'createdAt',
    header: 'Дата создания',
    filterType: 'date',
  },
  {
    field: 'updatedAt',
    header: 'Дата изменения',
    filterType: 'date',
  },
];
