import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { companiesControllerCreate } from '../../api/fn/companies/companies-controller-create';
import { companiesControllerFindAll } from '../../api/fn/companies/companies-controller-find-all';
import { companiesControllerFindNames } from '../../api/fn/companies/companies-controller-find-names';
import { companiesControllerRemove } from '../../api/fn/companies/companies-controller-remove';
import { companiesControllerUpdate } from '../../api/fn/companies/companies-controller-update';
import { FindAllCompaniesDto } from '../../api/models/find-all-companies-dto';
import { FindNameDto } from '../../api/models/find-name-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class CompaniesService extends TableService {
  private readonly _isNamesLoading: WritableSignal<boolean> = signal(false);

  readonly createFn = companiesControllerCreate;
  readonly findAllFn = companiesControllerFindAll;
  readonly findAllResult = signal<FindAllCompaniesDto | null>(null);
  readonly removeFn = companiesControllerRemove;
  readonly updateFn = companiesControllerUpdate;

  readonly isNamesLoading = computed(() => this._isNamesLoading());

  readonly names$: Observable<FindNameDto[]> = this.apiService
    .invoke(companiesControllerFindNames)
    .pipe(
      finalize(() => this._isNamesLoading.set(false)),
      tap(() => this._isNamesLoading.set(true)),
      map((result) => result.items),
      takeUntilDestroyed(this.destroyRef),
    );
}
