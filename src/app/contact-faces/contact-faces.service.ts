import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  distinct,
  finalize,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { contactFacesControllerCreate } from '../../api/fn/contact-faces/contact-faces-controller-create';
import { contactFacesControllerFindAll } from '../../api/fn/contact-faces/contact-faces-controller-find-all';
import { contactFacesControllerFindNames } from '../../api/fn/contact-faces/contact-faces-controller-find-names';
import { contactFacesControllerRemove } from '../../api/fn/contact-faces/contact-faces-controller-remove';
import { contactFacesControllerUpdate } from '../../api/fn/contact-faces/contact-faces-controller-update';
import { FindAllContactFacesDto } from '../../api/models/find-all-contact-faces-dto';
import { FindUserNameDto } from '../../api/models/find-user-name-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class ContactFacesService extends TableService {
  private readonly _companyId$ = new BehaviorSubject<string | undefined>(
    this.getFilterValue('companyId'),
  );

  private readonly _isNamesLoading: WritableSignal<boolean> = signal(false);

  readonly createFn = contactFacesControllerCreate;
  readonly findAllFn = contactFacesControllerFindAll;
  readonly findAllResult = signal<FindAllContactFacesDto | null>(null);
  readonly removeFn = contactFacesControllerRemove;
  readonly updateFn = contactFacesControllerUpdate;

  readonly companyId$ = this._companyId$.asObservable();
  readonly isNamesLoading = computed(() => this._isNamesLoading());

  readonly names$: Observable<FindUserNameDto[]> = this._companyId$.pipe(
    distinct(),
    switchMap((companyId) =>
      this.apiService
        .invoke(contactFacesControllerFindNames, { companyId })
        .pipe(
          finalize(() => this._isNamesLoading.set(false)),
          tap(() => this._isNamesLoading.set(true)),
        ),
    ),
    map((result) => result.items),
    takeUntilDestroyed(this.destroyRef),
  );

  setCompanyId(companyId: string | undefined): void {
    this._companyId$.next(companyId);
  }
}
