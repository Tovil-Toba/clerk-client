import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { CompaniesService } from '../companies/companies.service';
import { ContactFaceDialogComponent } from '../contact-face-dialog/contact-face-dialog.component';
import { ContactFacePositionsService } from '../contact-face-positions/contact-face-positions.service';
import { TableFilters } from '../shared/table-filters.model';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CONTACT_FACE_COLUMNS } from './contact-face-columns';
import { ContactFacesService } from './contact-faces.service';

@Component({
  selector: 'app-contact-faces',
  imports: [
    AsyncPipe,
    DatePipe,
    FormsModule,
    PrimeTemplate,
    Select,
    TableActionsComponent,
    TableHeaderComponent,
    TableModule,
  ],
  providers: [
    CompaniesService,
    ContactFacesService,
    ContactFacePositionsService,
  ],
  templateUrl: './contact-faces.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFacesComponent extends TableComponent {
  private readonly _companiesService = inject(CompaniesService);
  private readonly _route = inject(ActivatedRoute);

  private readonly _contactFacePositionsService = inject(
    ContactFacePositionsService,
  );

  protected readonly columns = CONTACT_FACE_COLUMNS;
  protected readonly dialogComponent = ContactFaceDialogComponent;
  protected readonly tableService = inject(ContactFacesService);

  protected readonly companyNames$ = this._companiesService.names$;

  protected readonly contactFacePositionNames$ =
    this._contactFacePositionsService.names$;

  protected readonly isCompanyNamesLoading =
    this._companiesService.isNamesLoading;

  protected readonly isContactFacePositionNamesLoading =
    this._contactFacePositionsService.isNamesLoading;

  constructor() {
    super();

    this._checkFilters();
  }

  private _checkFilters(): void {
    const companyId = this._route.snapshot.queryParamMap.get('companyId');

    if (!companyId) {
      return;
    }

    const tableFilters: TableFilters = {
      companyId: {
        value: {
          id: +companyId,
        },
        matchMode: 'equals',
      },
    };

    this.setTableFilters(tableFilters);
  }
}
