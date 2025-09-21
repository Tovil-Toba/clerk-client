import { Pipe, PipeTransform } from '@angular/core';

import { ContactStatus } from './contact-status.model';
import { CONTACT_STATUS_OPTIONS } from './contact-status-options';

@Pipe({
  name: 'contactStatus',
  standalone: true,
})
export class ContactStatusPipe implements PipeTransform {
  transform(status: ContactStatus): string {
    return (
      CONTACT_STATUS_OPTIONS.find((option) => option.id === status)
        ?.name ?? ''
    );
  }
}
