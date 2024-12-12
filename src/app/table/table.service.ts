import { DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService, SortEvent } from 'primeng/api';
import { TableFilterEvent, TablePageEvent } from 'primeng/table';
import { catchError, finalize, of } from 'rxjs';

import { ApiFnRequired, ApiService } from '../../api/api.service';
import { DeleteResultDto } from '../../api/models/delete-result-dto';
import { OrderEnum } from '../../api/models/order-enum';
import { DEFAULT_ROWS_PER_PAGE } from '../shared/default-rows-per-page';
import { FILTERS } from '../shared/filters';
import { FindAll } from '../shared/find-all.model';
import { getItemName } from '../shared/getItemName';
import { Item } from '../shared/item.model';

export abstract class TableService {
  protected readonly apiService = inject(ApiService);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly messageService = inject(MessageService);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  abstract readonly createFn: ApiFnRequired<any, any>;
  abstract readonly findAllFn: ApiFnRequired<any, any>;
  abstract readonly removeFn: ApiFnRequired<any, any>;
  abstract readonly updateFn: ApiFnRequired<any, any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  abstract readonly findAllResult: WritableSignal<FindAll | null>;

  readonly addedItemIds = signal<number[]>([]);
  readonly filters = signal<Record<string, string>>({});
  readonly filterValues = signal<Record<string, string>>({});
  readonly isLoading = signal<boolean>(false);
  readonly order = signal<OrderEnum>(OrderEnum.Asc);
  readonly orderField = signal<string>('');
  readonly rowsPerPage = signal<number>(DEFAULT_ROWS_PER_PAGE);

  create<T extends Item>(params: { body: T }): void {
    this.isLoading.set(true);

    this.apiService
      .invoke(this.createFn, params)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          const item = { name: params.body.name } as Item;

          return of(item);
        }),
      )
      .subscribe((item: T) => {
        const isError = !item.id;

        this._showCreateResultToast(item, isError);

        if (isError) {
          return;
        }

        let findAllResult = this.findAllResult();

        if (!findAllResult) {
          return;
        }

        findAllResult.items.unshift(item);

        findAllResult = {
          items: findAllResult.items,
          count: findAllResult.count + 1,
        };

        this.findAllResult.set(findAllResult);

        const addedItemIds = this.addedItemIds();
        addedItemIds.push(item.id);

        this.addedItemIds.set(addedItemIds);
      });
  }

  filter(event: TableFilterEvent): void {
    const filters: Record<string, string> = {};
    const filterValues: Record<string, string> = {};

    if (!event.filters) {
      this.filterValues.set(filterValues);
      this.filters.set(filters);

      return;
    }

    Object.keys(event.filters).forEach((field) => {
      const filterField = `${field}-filter`;
      const filter = event.filters?.[field]?.matchMode;
      let filterValue = event.filters?.[field]?.value;

      if (!filter || !filterValue || filterValue === '') {
        return;
      }

      if (filterValue instanceof Date) {
        filterValue = new Date(
          filterValue.getTime() - filterValue.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .split('T')[0];
      } else if (filterValue?.id) {
        filterValue = filterValue.id;
      }

      filters[filterField] = FILTERS[filter];
      filterValues[field] = filterValue;
    });

    this.filters.set(filters);
    this.filterValues.set(filterValues);

    this.load();
  }

  load(offset = 0, limit = this.rowsPerPage()): void {
    this.addedItemIds.set([]);
    this.isLoading.set(true);

    const params = {
      offset,
      limit,
      [this.orderField()]: this.order(),
      ...this.filters(),
      ...this.filterValues(),
    };

    this.apiService
      .invoke(this.findAllFn, params)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result: FindAll) => this.findAllResult.set(result));
  }

  loadAll(): void {
    this.load(0, 0);
  }

  onPageChange(event: TablePageEvent): void {
    this.rowsPerPage.set(event.rows);
    this.load(event.first);
  }

  remove<T extends Item>(item: T): void {
    this.isLoading.set(true);

    this.apiService
      .invoke(this.removeFn, item)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          const result: DeleteResultDto = { affected: null, raw: {} };

          return of(result);
        }),
      )
      .subscribe((result: DeleteResultDto) => {
        const isError = !result.affected;

        this._showDeleteResultToast(item, isError);

        if (isError) {
          return;
        }

        let findAllResult = this.findAllResult();

        if (!findAllResult?.items) {
          return;
        }

        findAllResult = {
          count: findAllResult.count - 1,
          items: findAllResult.items.filter((_item) => _item.id !== item.id),
        };

        this.findAllResult.set(findAllResult);
      });
  }

  sort(event: SortEvent): void {
    const orderField = `${event.field}-order`;
    const order =
      event?.order && event.order < 0 ? OrderEnum.Desc : OrderEnum.Asc;

    this.orderField.set(orderField);
    this.order.set(order);

    this.load();
  }

  update<T extends Item>(params: { id: number; body: T }): void {
    this.isLoading.set(true);

    this.apiService
      .invoke(this.updateFn, params)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          const item = { name: params.body.name } as Item;

          return of(item);
        }),
      )
      .subscribe((item: T) => {
        const isError = !item.id;

        this._showUpdateResultToast(item, isError);

        if (isError) {
          return;
        }

        const findAllResult = this.findAllResult();

        if (!findAllResult?.items) {
          return;
        }

        const items = [...findAllResult.items];
        const itemIndex = items.findIndex((_item) => _item.id === params.id);

        items[itemIndex] = item;

        this.findAllResult.set({
          ...findAllResult,
          items,
        });
      });
  }

  private _showCreateResultToast(item: Item, isError?: boolean): void {
    let itemName: string | undefined;

    if (item.name) {
      itemName = getItemName(item.name);
    }

    let severity = 'success';
    let summary = 'Добавление завершено';
    let detail = 'Запись добавлена';

    if (itemName) {
      detail = `Запись "${itemName}" добавлена`;
    }

    if (isError) {
      severity = 'error';
      summary = 'Не удалось завершить добавление';
      detail = 'Не удалось добавить запись';

      if (itemName) {
        detail = `Не удалось добавить запись "${itemName}"`;
      }
    }

    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  private _showDeleteResultToast(item: Item, isError?: boolean): void {
    let itemName: string | undefined;

    if (item.name) {
      itemName = getItemName(item.name);
    }

    let severity = 'warn';
    let summary = 'Удаление завершено';
    let detail = 'Запись удалена';

    if (itemName) {
      detail = `Запись "${itemName}" удалена`;
    }

    if (isError) {
      severity = 'error';
      summary = 'Не удалось завершить удаление';
      detail = 'Не удалось удалить запись';

      if (itemName) {
        detail = `Не удалось удалить запись "${itemName}"`;
      }
    }

    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  private _showUpdateResultToast(item: Item, isError?: boolean): void {
    let itemName: string | undefined;

    if (item.name) {
      itemName = getItemName(item.name);
    }

    let severity = 'info';
    let summary = 'Обновление завершено';
    let detail = 'Запись обновлена';

    if (itemName) {
      detail = `Запись "${itemName}" обновлена`;
    }

    if (isError) {
      severity = 'error';
      summary = 'Не удалось завершить обновление';
      detail = 'Не удалось обновить запись';

      if (itemName) {
        detail = `Не удалось обновить запись "${itemName}"`;
      }
    }

    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
