import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

import { ContactOfferDialogComponent } from '../contact-offer-dialog/contact-offer-dialog.component';
import { getHeaderMenuItem } from '../header/header-menu-items';
import { TableComponent } from '../table/table.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CONTACT_OFFER_COLUMNS } from './contact-offer-columns';
import { ContactOffersService } from './contact-offers.service';

@Component({
  selector: 'app-contact-offers',
  imports: [
    DatePipe,
    PrimeTemplate,
    TableActionsComponent,
    TableHeaderComponent,
    TableModule,
  ],
  providers: [ContactOffersService],
  templateUrl: './contact-offers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactOffersComponent extends TableComponent {
  protected readonly columns = CONTACT_OFFER_COLUMNS;
  protected readonly dialogComponent = ContactOfferDialogComponent;
  protected readonly tableService = inject(ContactOffersService);

  protected readonly contactOffersMenuItem =
    getHeaderMenuItem('contact-offers');
}
