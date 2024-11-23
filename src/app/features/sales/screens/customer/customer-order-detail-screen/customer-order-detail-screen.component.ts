import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SalesState } from '../../../states/reducers/sales.reducer';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SalesActions } from '../../../states/actions/sales.actions';
import * as SalesSelector from '../../../states/selectors/sales.selectors';

@Component({
  selector: 'app-customer-order-detail-screen',
  templateUrl: './customer-order-detail-screen.component.html',
  styleUrls: ['./customer-order-detail-screen.component.scss'],
})
export class CustomerOrderDetailScreenComponent  implements OnInit {

  public name: string = this.route.snapshot.paramMap.get('id') as string;
  public retrieveOrder$: Observable<{ data: any, status: string }>;

  constructor(
    private store: Store<SalesState>,
    private route: ActivatedRoute,
  ) { 
    this.retrieveOrder$ = this.store.pipe(select(SalesSelector.retrieveOrder));
  }

  ngOnInit() {
    this.store.dispatch(SalesActions.retrieveSalesOrder({ name: this.name }));
  }

}
