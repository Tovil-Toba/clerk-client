import { Injectable, signal } from '@angular/core';

import { contactFacesControllerCreate } from '../../api/fn/contact-faces/contact-faces-controller-create';
import { contactFacesControllerFindAll } from '../../api/fn/contact-faces/contact-faces-controller-find-all';
import { contactFacesControllerRemove } from '../../api/fn/contact-faces/contact-faces-controller-remove';
import { contactFacesControllerUpdate } from '../../api/fn/contact-faces/contact-faces-controller-update';
import { FindAllContactFacesDto } from '../../api/models/find-all-contact-faces-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class ContactFacesService extends TableService {
  readonly createFn = contactFacesControllerCreate;
  readonly findAllFn = contactFacesControllerFindAll;
  readonly findAllResult = signal<FindAllContactFacesDto | null>(null);
  readonly removeFn = contactFacesControllerRemove;
  readonly updateFn = contactFacesControllerUpdate;
}
