import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
  Type,
} from '@angular/core';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table, TableFilterEvent, TablePageEvent } from 'primeng/table';

import { DialogFooterComponent } from '../dialog-footer/dialog-footer.component';
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from '../shared/default-rows-per-page-options';
import { FindAll } from '../shared/find-all.model';
import { getItemName } from '../shared/getItemName';
import { Item } from '../shared/item.model';
import { TableService } from './table.service';

@Component({
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class TableComponent implements OnInit {
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _dialogService = inject(DialogService);

  protected abstract readonly dialogComponent: Type<unknown>;
  protected abstract readonly tableService: TableService;

  protected addedItemIds: Signal<number[]> = signal([]);
  protected dialogHeader?: string;
  protected findAllResult: Signal<FindAll | null> = signal(null);
  protected isLoading: Signal<boolean> = signal(false);
  protected item?: Item;
  protected localStorageKey = '';
  protected rowsPerPage: Signal<number> = signal(0);
  protected readonly rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS;

  ngOnInit(): void {
    this.addedItemIds = this.tableService.addedItemIds;
    this.findAllResult = this.tableService.findAllResult;
    this.isLoading = this.tableService.isLoading;
    this.localStorageKey = this.tableService.localStorageKey;
    this.rowsPerPage = this.tableService.rowsPerPage;

    this.tableService.load();
  }

  protected onAdd(dialogHeader?: string): void {
    this.dialogHeader = dialogHeader ?? 'Добавление';
    this.item = undefined;
    this._openDialog();
  }

  protected onClear(table: Table) {
    table.clear();
    table.clearState();
    table.reset();

    this.tableService.clear();
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

  protected onPageChange(event: TablePageEvent): void {
    this.tableService.onPageChange(event);
  }

  protected onSort(event: SortEvent): void {
    this.tableService.onSort(event);
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
