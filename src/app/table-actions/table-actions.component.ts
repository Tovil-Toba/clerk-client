import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-table-actions',
  standalone: true,
  imports: [ButtonModule, Ripple],
  templateUrl: './table-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionsComponent {
  delete = output<void>();
  edit = output<void>();

  protected onDelete(): void {
    this.delete.emit();
  }

  protected onEdit(): void {
    this.edit.emit();
  }
}
