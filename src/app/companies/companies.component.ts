import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../api/api.service';
import { companiesControllerFindAll } from '../../api/fn/companies/companies-controller-find-all';
import { Company } from '../../api/models/company';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './companies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent {
  private readonly _apiService = inject(ApiService);

  readonly companies$: Observable<Company[]> = this._apiService.invoke(
    companiesControllerFindAll,
  );
}
