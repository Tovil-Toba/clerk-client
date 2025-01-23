import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';

import { Company } from '../../api/models/company';
import { CompanyCategory } from '../../api/models/company-category';
import { Manager } from '../../api/models/manager';
import { CompanyCategoriesService } from '../company-categories/company-categories.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ManagersService } from '../managers/managers.service';
import { UserNameLongPipe } from '../shared/user-name-long.pipe';

@Component({
  selector: 'app-company-dialog',
  imports: [
    AsyncPipe,
    InputTextModule,
    ReactiveFormsModule,
    Select,
    SharedModule,
    UserNameLongPipe,
  ],
  providers: [CompanyCategoriesService, ManagersService],
  templateUrl: './company-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDialogComponent extends DialogComponent {
  private readonly _fb = new FormBuilder();
  private readonly _company?: Company = this.dialogConfig.data.item;
  private readonly _companyCategoriesService = inject(CompanyCategoriesService);
  private readonly _managersService = inject(ManagersService);

  protected readonly isCompanyCategoryNamesLoading =
    this._companyCategoriesService.isNamesLoading;

  protected readonly isManagerNamesLoading =
    this._managersService.isNamesLoading;

  protected readonly companyCategoryNames$ =
    this._companyCategoriesService.names$;

  protected readonly managerNames$ = this._managersService.names$;

  protected readonly selectedCompanyCategory = signal<
    CompanyCategory | undefined
  >(this._company?.category);

  protected readonly selectedManager = signal<Manager | undefined>(
    this._company?.manager,
  );

  protected readonly form = this._fb.group({
    category: [this.selectedCompanyCategory()],
    emails: [this._company?.emails ?? ''],
    fieldOfActivity: [this._company?.fieldOfActivity ?? ''],
    manager: [this.selectedManager()],
    name: [this._company?.name ?? '', Validators.required],
    notes: [this._company?.notes ?? ''],
    officeAddress: [this._company?.officeAddress ?? ''],
    phones: [this._company?.phones ?? ''],
    postalAddress: [this._company?.postalAddress ?? ''],
    publications: [this._company?.publications ?? ''],
    urls: [this._company?.urls ?? ''],
    workTime: [this._company?.workTime ?? ''],
  });

  protected readonly name = this.form.controls.name;
}
