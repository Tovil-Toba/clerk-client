import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Item } from '../shared/item.model';

@Component({
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class DialogComponent {
  protected abstract readonly form: FormGroup;

  private readonly _dialogRef = inject(DynamicDialogRef);

  protected readonly dialogConfig = inject(DynamicDialogConfig);

  protected onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const item = this.form.value as Item;

    this.dialogConfig.data.submit(item);
    this._dialogRef.close();
  }
}
