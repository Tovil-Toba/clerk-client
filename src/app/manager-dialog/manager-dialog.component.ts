import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { Manager } from '../../api/models/manager';
import { DialogComponent } from '../dialog/dialog.component';
import { ManagersService } from '../managers/managers.service';

@Component({
  selector: 'app-manager-dialog',
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule],
  providers: [ManagersService],
  templateUrl: './manager-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerDialogComponent extends DialogComponent {
  private readonly _fb = new FormBuilder();
  private readonly _manager?: Manager = this.dialogConfig.data.item;

  protected form = this._fb.group({
    name: this._fb.group({
      last: [this._manager?.name.last ?? '', Validators.required],
      first: [this._manager?.name.first ?? '', Validators.required],
      middle: [this._manager?.name.middle ?? ''],
    }),
    phone: [this._manager?.phone ?? ''],
    email: [this._manager?.email ?? ''],
  });

  protected get firstName() {
    return this.form.get('name.first');
  }

  protected get lastName() {
    return this.form.get('name.last');
  }
}
