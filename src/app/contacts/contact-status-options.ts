import { ContactStatus } from './contact-status.model';

export const CONTACT_STATUS_OPTIONS: {
  id: ContactStatus;
  name: string;
}[] = [
  { id: 'CANCELED', name: 'Отменен' },
  { id: 'COMPLETED', name: 'Состоялся' },
  { id: 'PLANNING', name: 'Планируется' },
];
