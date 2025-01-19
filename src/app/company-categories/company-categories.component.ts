import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { CompanyCategoryDialogComponent } from '../company-category-dialog/company-category-dialog.component';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CompanyCategoriesService } from './company-categories.service';
import { COMPANY_CATEGORY_COLUMNS } from './company-category-columns';

@Component({
  selector: 'app-company-categories',
  imports: [
    TableModule,
    ButtonModule,
    DatePipe,
    InputTextModule,
    FormsModule,
    TableHeaderComponent,
    TableActionsComponent,
  ],
  providers: [CompanyCategoriesService],
  templateUrl: './company-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCategoriesComponent extends TableComponent {
  protected readonly dialogComponent = CompanyCategoryDialogComponent;
  protected readonly tableService = inject(CompanyCategoriesService);

  protected readonly columns = COMPANY_CATEGORY_COLUMNS;
}
