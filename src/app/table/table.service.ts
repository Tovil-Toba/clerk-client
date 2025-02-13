import {
  computed,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from 'ngx-webstorage';
import { MessageService, SortEvent, TableState } from 'primeng/api';
import { TableFilterEvent, TablePageEvent } from 'primeng/table';
import { catchError, finalize, of } from 'rxjs';

import { ApiFnRequired, ApiService } from '../../api/api.service';
import { DeleteResultDto } from '../../api/models/delete-result-dto';
import { OrderEnum } from '../../api/models/order-enum';
import { FILTERS } from '../shared/filters';
import { FindAll } from '../shared/find-all.model';
import { getItemName } from '../shared/getItemName';
import { Item } from '../shared/item.model';
import { TableFilters } from '../shared/table-filters.model';
import {
  DEFAULT_ROWS_PER_PAGE,
  DEFAULT_SORT_FIELD,
  DEFAULT_SORT_ORDER,
} from './table-default-values';

export abstract class TableService {
  private readonly _localStorageService = inject(LocalStorageService);

  private readonly _addedItemIds = signal<number[]>([]);

  private readonly _localStorageKey = this.constructor.name
    .replace('_', '')
    .replace('Service', '')
    .toLowerCase();

  private readonly _hiddenColumnsKey = `${this._localStorageKey}-hidden-columns`;

  private readonly _hiddenColumns = signal<string[]>(
    this._localStorageService.retrieve(this._hiddenColumnsKey) ?? ['id'],
  );

  // У ngx-webstorage срабатывает какое-то кэширование при изменении состояния таблицы,
  // поэтому тут переделано на обычный localStorage.
  // private readonly _tableState?: TableState =
  //   this._localStorageService.retrieve(this._localStorageKey);

  private readonly _tableStateItem = localStorage.getItem(
    this._localStorageKey,
  );

  private readonly _isLoading = signal<boolean>(false);

  private readonly _tableState?: TableState = this._tableStateItem
    ? JSON.parse(this._tableStateItem)
    : undefined;

  private _filters: Record<string, string> = {};
  private _filterValues: Record<string, string> = {};

  private _order =
    (this._tableState?.sortOrder && this._tableState.sortOrder < 0) ||
    DEFAULT_SORT_ORDER < 0
      ? OrderEnum.Desc
      : OrderEnum.Asc;

  private _orderField = `${this._tableState?.sortField ?? DEFAULT_SORT_FIELD}-order`;
  private _tableFilters: TableFilters = this._tableState?.filters ?? {};

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

  readonly addedItemIds = computed(() => this._addedItemIds());
  readonly hiddenColumns = computed(() => this._hiddenColumns());
  readonly isLoading = computed(() => this._isLoading());

  readonly rowsPerPage = signal<number>(
    this._tableState?.rows ?? DEFAULT_ROWS_PER_PAGE,
  );

  readonly sortField = this._tableState?.sortField ?? DEFAULT_SORT_FIELD;
  readonly sortOrder = this._tableState?.sortOrder ?? DEFAULT_SORT_ORDER;

  get localStorageKey(): string {
    return this._localStorageKey;
  }

  clearFilters(): void {
    this._tableFilters = {};

    this.load();
  }

  create<T extends Item>(params: { body: T }): void {
    this._isLoading.set(true);

    this.apiService
      .invoke(this.createFn, params)
      .pipe(
        finalize(() => this._isLoading.set(false)),
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

        const addedItemIds = this._addedItemIds();
        addedItemIds.push(item.id);

        this._addedItemIds.set(addedItemIds);
      });
  }

  load(offset = 0, limit = this.rowsPerPage()): void {
    this._isLoading.set(true);
    this._initFilters();
    this._addedItemIds.set([]);

    const params = {
      offset,
      limit,
      [this._orderField]: this._order,
      ...this._filters,
      ...this._filterValues,
    };

    this.apiService
      .invoke(this.findAllFn, params)
      .pipe(
        finalize(() => this._isLoading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result: FindAll) => this.findAllResult.set(result));
  }

  loadAll(): void {
    this.load(0, 0);
  }

  onFilter(event: TableFilterEvent): void {
    if (!event.filters) {
      this._tableFilters = {};

      return;
    }

    this._tableFilters = event.filters as TableFilters;

    this.load();
  }

  onHiddenColumnsChange(hiddenColumns: string[]): void {
    this._hiddenColumns.set(hiddenColumns);
    this._localStorageService.store(this._hiddenColumnsKey, hiddenColumns);
  }

  onPageChange(event: TablePageEvent): void {
    this.rowsPerPage.set(event.rows);

    this.load(event.first);
  }

  onSort(event: SortEvent): void {
    this._order =
      event?.order && event.order < 0 ? OrderEnum.Desc : OrderEnum.Asc;

    this._orderField = `${event.field}-order`;

    this.load();
  }

  remove<T extends Item>(item: T): void {
    this._isLoading.set(true);

    this.apiService
      .invoke(this.removeFn, item)
      .pipe(
        finalize(() => this._isLoading.set(false)),
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

  setTableFilters(filters: TableFilters): void {
    this._tableFilters = filters;

    const tableState: TableState = this._tableState ?? {};

    tableState.filters = filters;
    tableState.first = 0;
    tableState.rows = this.rowsPerPage();

    this._localStorageService.store(this._localStorageKey, tableState);
  }

  private _initFilters(): void {
    const filters: Record<string, string> = {};
    const filterValues: Record<string, string> = {};

    if (!Object.keys(this._tableFilters).length) {
      this._filters = filters;
      this._filterValues = filterValues;

      return;
    }
    Object.entries(this._tableFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        return;
      }

      const filterField = `${key}-filter`;
      const filter = value.matchMode;
      let filterValue = value.value;

      if (!filter || !filterValue || filterValue === '') {
        return;
      }

      if (filter.startsWith('date')) {
        const time =
          filterValue instanceof Date
            ? filterValue.getTime()
            : Date.parse(filterValue);

        const timeOffset =
          (filterValue instanceof Date
            ? filterValue.getTimezoneOffset()
            : new Date().getTimezoneOffset()) * 60000;

        filterValue = new Date(time - timeOffset).toISOString().split('T')[0];
      } else if (filterValue?.id) {
        filterValue = filterValue.id;
      }

      filters[filterField] = FILTERS[filter];
      filterValues[key] = filterValue;
    });

    this._filters = filters;
    this._filterValues = filterValues;
  }

  update<T extends Item>(params: { id: number; body: T }): void {
    this._isLoading.set(true);

    this.apiService
      .invoke(this.updateFn, params)
      .pipe(
        finalize(() => this._isLoading.set(false)),
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
