import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilterMetadata, PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { Table, TableFilterEvent, TableModule } from 'primeng/table';

import { FindNameDto } from '../../api/models/find-name-dto';
import { CompaniesService } from '../companies/companies.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { ContactFacePositionsService } from '../contact-face-positions/contact-face-positions.service';
import { ContactFacesService } from '../contact-faces/contact-faces.service';
import { ContactOffersService } from '../contact-offers/contact-offers.service';
import { getHeaderMenuItem } from '../header/header-menu-items';
import { ManagersService } from '../managers/managers.service';
import { TableFilters } from '../shared/table-filters.model';
import { UserNameShortPipe } from '../shared/user-name-short.pipe';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CONTACT_COLUMNS } from './contact-columns';
import { ContactStatusPipe } from './contact-status.pipe';
import { CONTACT_STATUS_OPTIONS } from './contact-status-options';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  imports: [
    AsyncPipe,
    ContactStatusPipe,
    DatePipe,
    FormsModule,
    PrimeTemplate,
    Select,
    TableActionsComponent,
    TableHeaderComponent,
    TableModule,
    UserNameShortPipe,
    Button,
    RouterLink,
  ],
  providers: [
    CompaniesService,
    ContactsService,
    ContactFacesService,
    ContactFacePositionsService,
    ContactOffersService,
    ManagersService,
  ],
  templateUrl: './contacts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent extends TableComponent implements OnInit {
  private readonly _companiesService = inject(CompaniesService);
  private readonly _contactFacesService = inject(ContactFacesService);
  private readonly _contactOffersService = inject(ContactOffersService);
  private readonly _managersService = inject(ManagersService);
  private readonly _route = inject(ActivatedRoute);

  private readonly _contactFacePositionsService = inject(
    ContactFacePositionsService,
  );

  protected readonly columns = CONTACT_COLUMNS;
  protected readonly dialogComponent = ContactDialogComponent;
  protected readonly tableService = inject(ContactsService);

  protected readonly companyNames$ = this._companiesService.names$;
  protected readonly contactFaceNames$ = this._contactFacesService.names$;
  protected readonly contactOfferNames$ = this._contactOffersService.names$;
  protected readonly contactsMenuItem = getHeaderMenuItem('contacts');

  protected readonly contactOffersMenuItem =
    getHeaderMenuItem('contact-offers');

  protected readonly contactFacePositionNames$ =
    this._contactFacePositionsService.names$;

  protected readonly contactStatusOptions = CONTACT_STATUS_OPTIONS;

  protected readonly isCompanyNamesLoading =
    this._companiesService.isNamesLoading;

  protected readonly isContactFaceNamesLoading =
    this._contactFacesService.isNamesLoading;

  protected readonly isContactFacePositionNamesLoading =
    this._contactFacePositionsService.isNamesLoading;

  protected readonly isContactOfferNamesLoading =
    this._contactOffersService.isNamesLoading;

  protected readonly isManagerNamesLoading =
    this._managersService.isNamesLoading;

  protected readonly managerNames$ = this._managersService.names$;

  constructor() {
    super();

    this._checkFilters();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const companyId = this.tableService.getFilterValue('companyId');

    this._loadContactFaceNames(companyId);
  }

  protected getSelectedCompany(): FindNameDto | undefined {
    const tableFilters = this.tableService.tableFilters;

    return (tableFilters['companyId'] as FilterMetadata)?.value;
  }

  protected override onClearFilters(table: Table): void {
    super.onClearFilters(table);

    this._loadContactFaceNames(undefined);
  }

  protected override onFilter(event: TableFilterEvent): void {
    super.onFilter(event);

    const companyId = event.filters?.['companyId']?.value?.id;

    this._loadContactFaceNames(companyId);
  }

  private _checkFilters(): void {
    const companyId = this._route.snapshot.queryParamMap.get('companyId');
    const managerId = this._route.snapshot.queryParamMap.get('managerId');

    if (!companyId && !managerId) {
      return;
    }

    let tableFilters: TableFilters = {};

    if (companyId) {
      this._loadContactFaceNames(companyId);

      tableFilters = {
        companyId: {
          value: {
            id: +companyId,
          },
          matchMode: 'equals',
        },
      };
    } else if (managerId) {
      tableFilters = {
        managerId: {
          value: {
            id: +managerId,
          },
          matchMode: 'equals',
        },
      };
    }

    this.setTableFilters(tableFilters);
  }

  private _loadContactFaceNames(companyId?: string): void {
    this._contactFacesService.setCompanyId(companyId);
  }
}
