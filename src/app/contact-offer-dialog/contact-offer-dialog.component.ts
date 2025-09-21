import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ContactOffer } from '../../api/models/contact-offer';
import { DialogComponent } from '../dialog/dialog.component';
import { ManagersService } from '../managers/managers.service';

@Component({
  selector: 'app-contact-offer-dialog',
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule],
  providers: [ManagersService],
  templateUrl: './contact-offer-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactOfferDialogComponent extends DialogComponent {
  private readonly _fb = new FormBuilder();
  private readonly _contactOffer?: ContactOffer = this.dialogConfig.data.item;

  protected readonly form = this._fb.group({
    name: [this._contactOffer?.name ?? '', Validators.required],
  });

  protected readonly name = this.form.controls.name;
}
