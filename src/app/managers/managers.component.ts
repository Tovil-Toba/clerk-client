import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';

import { getHeaderMenuItem } from '../header/header-menu-items';
import { ManagerDialogComponent } from '../manager-dialog/manager-dialog.component';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { MANAGER_COLUMNS } from './manager-columns';
import { ManagersService } from './managers.service';

@Component({
  selector: 'app-managers',
  imports: [
    ButtonModule,
    DatePipe,
    FormsModule,
    Ripple,
    RouterLink,
    InputTextModule,
    TableModule,
    TableHeaderComponent,
    TableActionsComponent,
    Tooltip,
  ],
  providers: [ManagersService],
  templateUrl: './managers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersComponent extends TableComponent {
  protected readonly dialogComponent = ManagerDialogComponent;
  protected readonly tableService = inject(ManagersService);

  protected readonly columns = MANAGER_COLUMNS;
  protected readonly contactsMenuItem = getHeaderMenuItem('contacts');
  protected readonly managersMenuItem = getHeaderMenuItem('managers');
}
