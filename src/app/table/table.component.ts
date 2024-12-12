import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Type,
  WritableSignal,
} from '@angular/core';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TableFilterEvent, TablePageEvent } from 'primeng/table';

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

  protected addedItemIds: WritableSignal<number[]> = signal([]);
  protected dialogHeader?: string;
  protected findAllResult: WritableSignal<FindAll | null> = signal(null);
  protected isLoading: WritableSignal<boolean> = signal(false);
  protected item?: Item;
  protected rowsPerPage: WritableSignal<number> = signal(0);
  protected readonly rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS;

  ngOnInit(): void {
    this.addedItemIds = this.tableService.addedItemIds;
    this.findAllResult = this.tableService.findAllResult;
    this.isLoading = this.tableService.isLoading;
    this.rowsPerPage = this.tableService.rowsPerPage;

    this.tableService.load();
  }

  protected add(dialogHeader?: string): void {
    this.dialogHeader = dialogHeader ?? 'Добавление';
    this.item = undefined;
    this.openDialog();
  }

  protected delete(item: Item, header = 'Удаление'): void {
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

  protected edit(item: Item, dialogHeader?: string): void {
    this.dialogHeader = dialogHeader ?? 'Редактирование';
    this.item = item;
    this.openDialog();
  }

  protected openDialog(): void {
    this._dialogService.open(this.dialogComponent, {
      closable: true,
      data: {
        item: this.item,
        submit: (item: Item) => this.submit(item),
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

  protected load(offset = 0): void {
    this.tableService.load(offset);
  }

  protected onFilter(event: TableFilterEvent): void {
    this.tableService.filter(event);
  }

  protected onPageChange(event: TablePageEvent): void {
    this.tableService.onPageChange(event);
  }

  protected onSort(event: SortEvent): void {
    this.tableService.sort(event);
  }

  private submit(item: Item): void {
    if (this.item?.id) {
      this.tableService.update({ id: this.item.id, body: item });
    } else {
      this.tableService.create({ body: item });
    }
  }
}
