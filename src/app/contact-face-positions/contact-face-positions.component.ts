import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { ContactFacePositionDialogComponent } from '../contact-face-position-dialog/contact-face-position-dialog.component';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CONTACT_FACE_POSITION_COLUMNS } from './contact-face-position-columns';
import { ContactFacePositionsService } from './contact-face-positions.service';

@Component({
  selector: 'app-contact-face-positions',
  imports: [
    DatePipe,
    PrimeTemplate,
    TableActionsComponent,
    TableHeaderComponent,
    TableModule,
  ],
  providers: [ContactFacePositionsService],
  templateUrl: './contact-face-positions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFacePositionsComponent extends TableComponent {
  protected readonly columns = CONTACT_FACE_POSITION_COLUMNS;
  protected readonly dialogComponent = ContactFacePositionDialogComponent;
  protected readonly tableService = inject(ContactFacePositionsService);
}
