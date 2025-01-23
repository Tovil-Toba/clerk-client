import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  Type,
} from '@angular/core';
import { get } from 'lodash';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table, TableFilterEvent, TablePageEvent } from 'primeng/table';

import { DialogFooterComponent } from '../dialog-footer/dialog-footer.component';
import { Column } from '../shared/column.model';
import { FindAll } from '../shared/find-all.model';
import { getItemName } from '../shared/getItemName';
import { Item } from '../shared/item.model';
import { TableFilters } from '../shared/table-filters.model';
import { TableService } from './table.service';
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from './table-default-values';

@Component({
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class TableComponent implements OnInit {
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _dialogService = inject(DialogService);

  protected abstract readonly columns: Column[];
  protected abstract readonly dialogComponent: Type<unknown>;
  protected abstract readonly tableService: TableService;

  protected addedItemIds: Signal<number[]> = signal([]);
  protected dialogHeader?: string;
  protected findAllResult: Signal<FindAll | null> = signal(null);
  protected hiddenColumns: Signal<string[]> = signal([]);

  protected readonly selectedColumns: Signal<Column[]> = computed(() => {
    const hiddenColumns = this.hiddenColumns();

    return this.columns.filter(
      (column) => !hiddenColumns.includes(column.field),
    );
  });

  protected isLoading: Signal<boolean> = signal(false);
  protected item?: Item;
  protected localStorageKey = '';
  protected rowsPerPage: Signal<number> = signal(0);
  protected readonly rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS;
  protected sortField: string | null = null;
  protected sortOrder = 1;
  protected tableFilters: TableFilters = {};

  ngOnInit(): void {
    this.addedItemIds = this.tableService.addedItemIds;
    this.findAllResult = this.tableService.findAllResult;
    this.hiddenColumns = this.tableService.hiddenColumns;
    this.isLoading = this.tableService.isLoading;
    this.localStorageKey = this.tableService.localStorageKey;
    this.rowsPerPage = this.tableService.rowsPerPage;
    this.sortField = this.tableService.sortField;
    this.sortOrder = this.tableService.sortOrder;

    this.tableService.load();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getFieldValue(row: object, field: string): any {
    return get(row, field);
  }

  protected onAdd(dialogHeader?: string): void {
    this.dialogHeader = dialogHeader ?? 'Добавление';
    this.item = undefined;
    this._openDialog();
  }

  protected onClearFilters(table: Table) {
    table.clearFilterValues();
    table.saveState();

    this.tableService.clearFilters();
  }

  protected onDelete(item: Item, header = 'Удаление'): void {
    let itemName = 'эту запись';

    if (item.name) {
      itemName = getItemName(item.name);
      itemName = `<strong>${itemName}</strong>`;
    }

    const message = `Вы действительно хотите удалить ${itemName}?`;

    this._confirmationService.confirm({
      header,
      message,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary' },
      accept: () => {
        this.tableService.remove(item);
      },
    });
  }

  protected onEdit(item: Item, dialogHeader?: string): void {
    this.dialogHeader = dialogHeader ?? 'Редактирование';
    this.item = item;
    this._openDialog();
  }

  protected onFilter(event: TableFilterEvent): void {
    this.tableService.onFilter(event);
  }

  protected onHiddenColumnsChange(hiddenColumns: string[]): void {
    this.tableService.onHiddenColumnsChange(hiddenColumns);
  }

  protected onPageChange(event: TablePageEvent): void {
    this.tableService.onPageChange(event);
  }

  protected onSort(event: SortEvent): void {
    this.tableService.onSort(event);
  }

  protected setTableFilters(tableFilters: TableFilters): void {
    this.tableFilters = tableFilters;
    this.tableService.setTableFilters(tableFilters);
  }

  private _openDialog(): void {
    this._dialogService.open(this.dialogComponent, {
      closable: true,
      data: {
        item: this.item,
        submit: (item: Item) => this._submit(item),
      },
      draggable: true,
      header: this.dialogHeader,
      maximizable: true,
      modal: true,
      templates: {
        footer: DialogFooterComponent,
      },
      width: '50vw',
    });
  }

  private _submit(item: Item): void {
    if (this.item?.id) {
      this.tableService.update({ id: this.item.id, body: item });
    } else {
      this.tableService.create({ body: item });
    }
  }
}
