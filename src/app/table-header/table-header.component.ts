import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelect } from 'primeng/multiselect';

import { Column } from '../shared/column.model';

@Component({
  selector: 'app-table-header',
  imports: [ButtonModule, FormsModule, MultiSelect],
  templateUrl: './table-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent implements OnInit {
  columns = input<Column[]>([]);
  hiddenColumns = input<string[]>([]);
  name = input<string>();

  add = output<void>();
  clearFilters = output<void>();
  hiddenColumnsChange = output<string[]>();

  protected selectedColumns = signal<Column[]>([]);

  protected onAdd(): void {
    this.add.emit();
  }

  protected onClearFilters(): void {
    this.clearFilters.emit();
  }

  protected onSelectedColumnsChange(): void {
    const selectedColumns = this.selectedColumns();

    const hiddenColumns: string[] = this.columns()
      .filter((column) => !selectedColumns.includes(column))
      .map((column) => column.field);

    this.hiddenColumnsChange.emit(hiddenColumns);
  }

  ngOnInit(): void {
    const hiddenColumns = this.hiddenColumns();

    const selectedColumns: Column[] = this.columns().filter(
      (column) => !hiddenColumns.includes(column.field),
    );

    this.selectedColumns.set(selectedColumns);
  }
}
