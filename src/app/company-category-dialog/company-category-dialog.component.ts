import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { CompanyCategory } from '../../api/models/company-category';
import { DialogComponent } from '../dialog/dialog.component';
import { ManagersService } from '../managers/managers.service';

@Component({
  selector: 'app-company-category-dialog',
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule],
  providers: [ManagersService],
  templateUrl: './company-category-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCategoryDialogComponent extends DialogComponent {
  private readonly _fb = new FormBuilder();
  private readonly _companyCategory?: CompanyCategory =
    this.dialogConfig.data.item;

  protected readonly form = this._fb.group({
    name: [this._companyCategory?.name ?? '', Validators.required],
  });

  protected get name() {
    return this.form.get('name');
  }
}
