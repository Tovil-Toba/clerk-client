import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-dialog-footer',
  standalone: true,
  imports: [ButtonModule, Ripple],
  templateUrl: './dialog-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooterComponent {
  private readonly _dialogRef = inject(DynamicDialogRef);

  protected close(): void {
    this._dialogRef.close();
  }
}
