import {
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';
// import {FindManagerNamesDto} from '../../api/models/find-manager-names-dto';
import { map } from 'rxjs/operators';

import { managersControllerCreate } from '../../api/fn/managers/managers-controller-create';
import { managersControllerFindAll } from '../../api/fn/managers/managers-controller-find-all';
import { managersControllerFindNames } from '../../api/fn/managers/managers-controller-find-names';
import { managersControllerRemove } from '../../api/fn/managers/managers-controller-remove';
import { managersControllerUpdate } from '../../api/fn/managers/managers-controller-update';
import { FindAllManagersDto } from '../../api/models/find-all-managers-dto';
import { FindUserNameDto } from '../../api/models/find-user-name-dto';
import { TableService } from '../table/table.service';

@Injectable()
export class ManagersService extends TableService {
  readonly createFn = managersControllerCreate;
  readonly findAllFn = managersControllerFindAll;
  readonly findAllResult = signal<FindAllManagersDto | null>(null);
  readonly removeFn = managersControllerRemove;
  readonly updateFn = managersControllerUpdate;

  readonly isNamesLoading: WritableSignal<boolean> = signal(false);

  readonly names$: Observable<FindUserNameDto[]> = this.apiService
    .invoke(managersControllerFindNames)
    .pipe(
      finalize(() => this.isNamesLoading.set(false)),
      tap(() => this.isNamesLoading.set(true)),
      map((result) => result.items),
      takeUntilDestroyed(this.destroyRef),
    );
}
