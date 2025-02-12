import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

import { Company } from '../../api/models/company';
import { ContactFace } from '../../api/models/contact-face';
import { ContactFacePosition } from '../../api/models/contact-face-position';
import { CompaniesService } from '../companies/companies.service';
import { ContactFacePositionsService } from '../contact-face-positions/contact-face-positions.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-contact-face-dialog',
  imports: [AsyncPipe, InputText, ReactiveFormsModule, Select],
  templateUrl: './contact-face-dialog.component.html',
  providers: [CompaniesService, ContactFacePositionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFaceDialogComponent extends DialogComponent {
  private readonly _fb = new FormBuilder();
  private readonly _companiesService = inject(CompaniesService);
  private readonly _contactFace?: ContactFace = this.dialogConfig.data.item;

  private readonly _contactFacePositionsService = inject(
    ContactFacePositionsService,
  );

  protected readonly companyNames$ = this._companiesService.names$;
  protected readonly positionNames$ = this._contactFacePositionsService.names$;

  protected readonly isCompanyNamesLoading =
    this._companiesService.isNamesLoading;

  protected readonly isPositionNamesLoading =
    this._contactFacePositionsService.isNamesLoading;

  protected readonly selectedCompany = signal<Company | undefined>(
    this._contactFace?.company,
  );

  protected readonly selectedPosition = signal<ContactFacePosition | undefined>(
    this._contactFace?.position,
  );

  protected readonly form = this._fb.group({
    company: [this.selectedCompany(), Validators.required],
    position: [this.selectedPosition()],
    name: this._fb.group({
      last: [this._contactFace?.name.last ?? '', Validators.required],
      first: [this._contactFace?.name.first ?? '', Validators.required],
      middle: [this._contactFace?.name.middle ?? ''],
    }),
    phone: [this._contactFace?.phone ?? ''],
    email: [this._contactFace?.email ?? ''],
    notes: [this._contactFace?.notes ?? ''],
  });

  protected readonly company = this.form.controls.company;
  protected readonly firstName = this.form.controls.name.controls.first;
  protected readonly lastName = this.form.controls.name.controls.last;
}
