import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

import { ContactFacePosition } from '../../api/models/contact-face-position';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-contact-face-position-dialog',
  imports: [InputText, ReactiveFormsModule],
  templateUrl: './contact-face-position-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFacePositionDialogComponent extends DialogComponent {
  private readonly _fb = new FormBuilder();

  private readonly _contactFacePosition?: ContactFacePosition =
    this.dialogConfig.data.item;

  protected readonly form = this._fb.group({
    name: [this._contactFacePosition?.name ?? '', Validators.required],
  });

  protected readonly name = this.form.controls.name;
}
