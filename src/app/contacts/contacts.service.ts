import { Injectable, signal } from '@angular/core';

import { contactsControllerCreate } from '../../api/fn/contacts/contacts-controller-create';
import { contactsControllerFindAll } from '../../api/fn/contacts/contacts-controller-find-all';
import { contactsControllerRemove } from '../../api/fn/contacts/contacts-controller-remove';
import { contactsControllerUpdate } from '../../api/fn/contacts/contacts-controller-update';
import { FindAllContactsDto } from '../../api/models/find-all-contacts-dto';
import { TableService } from '../table/table.service';

const DEFAULT_SORT_FIELD = 'status';

@Injectable()
export class ContactsService extends TableService {
  protected override orderField = `${this.tableState?.sortField ?? DEFAULT_SORT_FIELD}-order`;
  override sortField = this.tableState?.sortField ?? DEFAULT_SORT_FIELD;

  readonly createFn = contactsControllerCreate;
  readonly findAllFn = contactsControllerFindAll;
  readonly findAllResult = signal<FindAllContactsDto | null>(null);
  readonly removeFn = contactsControllerRemove;
  readonly updateFn = contactsControllerUpdate;
}
