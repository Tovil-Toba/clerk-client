import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { companyCategoriesControllerCreate } from '../../api/fn/company-categories/company-categories-controller-create';
import { companyCategoriesControllerFindAll } from '../../api/fn/company-categories/company-categories-controller-find-all';
import { companyCategoriesControllerFindNames } from '../../api/fn/company-categories/company-categories-controller-find-names';
import { companyCategoriesControllerRemove } from '../../api/fn/company-categories/company-categories-controller-remove';
import { companyCategoriesControllerUpdate } from '../../api/fn/company-categories/company-categories-controller-update';
import { FindAllCompanyCategoriesDto } from '../../api/models/find-all-company-categories-dto';
import { FindNameDto } from '../../api/models/find-name-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class CompanyCategoriesService extends TableService {
  private readonly _isNamesLoading: WritableSignal<boolean> = signal(false);

  readonly createFn = companyCategoriesControllerCreate;
  readonly findAllFn = companyCategoriesControllerFindAll;
  readonly findAllResult = signal<FindAllCompanyCategoriesDto | null>(null);
  readonly removeFn = companyCategoriesControllerRemove;
  readonly updateFn = companyCategoriesControllerUpdate;

  readonly isNamesLoading = computed(() => this._isNamesLoading());

  readonly names$: Observable<FindNameDto[]> = this.apiService
    .invoke(companyCategoriesControllerFindNames)
    .pipe(
      finalize(() => this._isNamesLoading.set(false)),
      tap(() => this._isNamesLoading.set(true)),
      map((result) => result.items),
      takeUntilDestroyed(this.destroyRef),
    );
}
