import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './table-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent {
  name = input<string>();

  add = output<void>();
  clear = output<void>();

  protected onAdd(): void {
    this.add.emit();
  }

  protected onClear(): void {
    this.clear.emit();
  }
}
