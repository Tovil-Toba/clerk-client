import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { ManagerDialogComponent } from '../manager-dialog/manager-dialog.component';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { ManagersService } from './managers.service';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    FormsModule,
    InputTextModule,
    TableModule,
    TableHeaderComponent,
    TableActionsComponent,
  ],
  providers: [ManagersService],
  templateUrl: './managers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersComponent extends TableComponent {
  protected readonly dialogComponent = ManagerDialogComponent;
  protected readonly tableService = inject(ManagersService);
}
