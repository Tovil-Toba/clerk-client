import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { contactOffersControllerCreate } from '../../api/fn/contact-offers/contact-offers-controller-create';
import { contactOffersControllerFindAll } from '../../api/fn/contact-offers/contact-offers-controller-find-all';
import { contactOffersControllerFindNames } from '../../api/fn/contact-offers/contact-offers-controller-find-names';
import { contactOffersControllerRemove } from '../../api/fn/contact-offers/contact-offers-controller-remove';
import { contactOffersControllerUpdate } from '../../api/fn/contact-offers/contact-offers-controller-update';
import { FindAllContactOffersDto } from '../../api/models/find-all-contact-offers-dto';
import { FindNameDto } from '../../api/models/find-name-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class ContactOffersService extends TableService {
  private readonly _isNamesLoading: WritableSignal<boolean> = signal(false);

  readonly createFn = contactOffersControllerCreate;
  readonly findAllFn = contactOffersControllerFindAll;
  readonly findAllResult = signal<FindAllContactOffersDto | null>(null);
  readonly removeFn = contactOffersControllerRemove;
  readonly updateFn = contactOffersControllerUpdate;

  readonly isNamesLoading = computed(() => this._isNamesLoading());

  readonly names$: Observable<FindNameDto[]> = this.apiService
    .invoke(contactOffersControllerFindNames)
    .pipe(
      finalize(() => this._isNamesLoading.set(false)),
      tap(() => this._isNamesLoading.set(true)),
      map((result) => result.items),
      takeUntilDestroyed(this.destroyRef),
    );
}
