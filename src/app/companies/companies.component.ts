import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { CompanyCategoriesService } from '../company-categories/company-categories.service';
import { CompanyDialogComponent } from '../company-dialog/company-dialog.component';
import { ManagersService } from '../managers/managers.service';
import { UserNameShortPipe } from '../shared/user-name-short.pipe';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CompaniesService } from './companies.service';
import { COMPANY_COLUMNS } from './company-columns';

@Component({
  selector: 'app-companies',
  imports: [
    AsyncPipe,
    ButtonModule,
    DatePipe,
    FormsModule,
    RouterLink,
    Select,
    TableActionsComponent,
    TableHeaderComponent,
    TableModule,
    UserNameShortPipe,
  ],
  providers: [CompaniesService, CompanyCategoriesService, ManagersService],
  templateUrl: './companies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent extends TableComponent implements OnInit {
  private readonly _companyCategoriesService = inject(CompanyCategoriesService);
  private readonly _managersService = inject(ManagersService);

  protected readonly columns = COMPANY_COLUMNS;
  protected readonly dialogComponent = CompanyDialogComponent;
  protected readonly tableService = inject(CompaniesService);

  protected readonly companyCategoryNames$ =
    this._companyCategoriesService.names$;

  protected readonly isCompanyCategoryNamesLoading =
    this._companyCategoriesService.isNamesLoading;

  protected readonly isManagerNamesLoading =
    this._managersService.isNamesLoading;

  protected readonly managerNames$ = this._managersService.names$;
}
