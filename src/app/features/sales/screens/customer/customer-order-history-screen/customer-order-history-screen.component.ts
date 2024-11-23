import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SalesState } from '../../../states/reducers/sales.reducer';
import * as SalesSelector from '../../../states/selectors/sales.selectors';
import { SalesActions } from '../../../states/actions/sales.actions';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';

@Component({
  selector: 'app-customer-order-history-screen',
  templateUrl: './customer-order-history-screen.component.html',
  styleUrls: ['./customer-order-history-screen.component.scss'],
})
export class CustomerOrderHistoryScreenComponent  implements OnInit {

  public salesOrder$: Observable<{ data: any, status: string }>;
  
  constructor(
    private store: Store<SalesState>,
    private authService: AuthService,
  ) { 
    this.salesOrder$ = this.store.select(SalesSelector.salesOrder);
  }

  ngOnInit() {
    const user: any = this.authService.getUser();
    if (user && user.customer) {
      this.store.dispatch(SalesActions.loadSalesOrder({ filters: {
        query: [["customer", "=", user.customer.name]],
        fields: ["*"],
        order_by: "creation desc",
        limit_page_length: 10,
      } }));
    }
  }

}
