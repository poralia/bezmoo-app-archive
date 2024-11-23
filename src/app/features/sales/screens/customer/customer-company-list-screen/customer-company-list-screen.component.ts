import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SalesState } from '../../../states/reducers/sales.reducer';
import { SalesActions } from '../../../states/actions/sales.actions';
import * as SalesSelectors from '../../../states/selectors/sales.selectors';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customer-company-list-screen',
  templateUrl: './customer-company-list-screen.component.html',
  styleUrls: ['./customer-company-list-screen.component.scss'],
})
export class CustomerCompanyListScreenComponent  implements OnInit {

  public company$: Observable<{ data: any, status: string }>;

  constructor(
    private store: Store<SalesState>,
  ) { 
    this.company$ = this.store.pipe(select(SalesSelectors.company));
  }

  ngOnInit() {
    this.store.dispatch(SalesActions.loadCompany({ payload: {
      filters: [],
      fields: ["company_name", "company_description"],
    }}));
  }

}
