import { Injectable, signal } from '@angular/core';

import { companiesControllerCreate } from '../../api/fn/companies/companies-controller-create';
import { companiesControllerFindAll } from '../../api/fn/companies/companies-controller-find-all';
import { companiesControllerRemove } from '../../api/fn/companies/companies-controller-remove';
import { companiesControllerUpdate } from '../../api/fn/companies/companies-controller-update';
import { FindAllCompaniesDto } from '../../api/models/find-all-companies-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class CompaniesService extends TableService {
  readonly createFn = companiesControllerCreate;
  readonly findAllFn = companiesControllerFindAll;
  readonly removeFn = companiesControllerRemove;
  readonly findAllResult = signal<FindAllCompaniesDto | null>(null);
  readonly updateFn = companiesControllerUpdate;
}
