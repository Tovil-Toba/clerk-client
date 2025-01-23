import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { contactFacePositionsControllerCreate } from '../../api/fn/contact-face-positions/contact-face-positions-controller-create';
import { contactFacePositionsControllerFindAll } from '../../api/fn/contact-face-positions/contact-face-positions-controller-find-all';
import { contactFacePositionsControllerFindNames } from '../../api/fn/contact-face-positions/contact-face-positions-controller-find-names';
import { contactFacePositionsControllerRemove } from '../../api/fn/contact-face-positions/contact-face-positions-controller-remove';
import { contactFacePositionsControllerUpdate } from '../../api/fn/contact-face-positions/contact-face-positions-controller-update';
import { FindAllContactFacePositionsDto } from '../../api/models/find-all-contact-face-positions-dto';
import { FindNameDto } from '../../api/models/find-name-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class ContactFacePositionsService extends TableService {
  private readonly _isNamesLoading: WritableSignal<boolean> = signal(false);

  readonly createFn = contactFacePositionsControllerCreate;
  readonly findAllFn = contactFacePositionsControllerFindAll;
  readonly findAllResult = signal<FindAllContactFacePositionsDto | null>(null);
  readonly removeFn = contactFacePositionsControllerRemove;
  readonly updateFn = contactFacePositionsControllerUpdate;

  readonly isNamesLoading = computed(() => this._isNamesLoading());

  readonly names$: Observable<FindNameDto[]> = this.apiService
    .invoke(contactFacePositionsControllerFindNames)
    .pipe(
      finalize(() => this._isNamesLoading.set(false)),
      tap(() => this._isNamesLoading.set(true)),
      map((result) => result.items),
      takeUntilDestroyed(this.destroyRef),
    );
}
