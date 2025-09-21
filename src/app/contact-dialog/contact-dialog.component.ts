import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

import { Company } from '../../api/models/company';
import { Contact } from '../../api/models/contact';
import { CompaniesService } from '../companies/companies.service';
import { ContactFacesService } from '../contact-faces/contact-faces.service';
import { ContactOffersService } from '../contact-offers/contact-offers.service';
import { CONTACT_STATUS_OPTIONS } from '../contacts/contact-status-options';
import { DialogComponent } from '../dialog/dialog.component';
import { ManagersService } from '../managers/managers.service';
import { UserNameShortPipe } from '../shared/user-name-short.pipe';

@Component({
  selector: 'app-contact-dialog',
  imports: [
    AsyncPipe,
    DatePicker,
    DatePickerModule,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea,
    UserNameShortPipe,
  ],
  templateUrl: './contact-dialog.component.html',
  providers: [
    CompaniesService,
    ContactFacesService,
    ContactOffersService,
    ManagersService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent extends DialogComponent {
  private readonly _companiesService = inject(CompaniesService);
  private readonly _contactFacesService = inject(ContactFacesService);
  private readonly _contactOffersService = inject(ContactOffersService);
  private readonly _managersService = inject(ManagersService);

  private readonly _fb = new FormBuilder();
  private readonly _contact: Contact = this.dialogConfig.data.item;

  protected readonly companyNames$ = this._companiesService.names$;
  protected readonly contactFaceNames$ = this._contactFacesService.names$;
  protected readonly contactOfferNames$ = this._contactOffersService.names$;
  protected readonly managerNames$ = this._managersService.names$;

  protected readonly isCompanyNamesLoading =
    this._companiesService.isNamesLoading;

  protected readonly isContactFaceNamesLoading =
    this._contactFacesService.isNamesLoading;

  protected readonly isContactOfferNamesLoading =
    this._contactOffersService.isNamesLoading;

  protected readonly isManagerNamesLoading =
    this._managersService.isNamesLoading;

  protected readonly form = this._fb.group({
    company: [this._contact?.company, Validators.required],
    manager: [null],
    contactDate: [''],
    status: ['PLANNING'],
    nextContactDate: [''],
    contactFace: [null],
    phones: [''],
    emails: [''],
    notesOnContactFace: [''],
    description: [''],
    offer: [null],
  });

  protected readonly company = this.form.controls.company;
  protected readonly contactStatusOptions = CONTACT_STATUS_OPTIONS;

  constructor() {
    super();

    this.loadContactFaceNames(this._contact?.company);
  }

  protected loadContactFaceNames(company?: Company): void {
    this._contactFacesService.setCompanyId(company?.id.toString());
  }
}
