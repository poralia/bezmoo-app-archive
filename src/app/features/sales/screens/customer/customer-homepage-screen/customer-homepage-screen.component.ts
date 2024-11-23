import { Component, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser } from 'src/app/features/auth/interfaces';
import { AuthActions } from 'src/app/features/auth/states/actions/auth.actions';
import { AuthState } from 'src/app/features/auth/states/reducers/auth.reducer';
import * as AuthSelectors from 'src/app/features/auth/states/selectors/auth.selectors';
import { SUCCESS } from 'src/app/core/constants';
import { SalesActions } from '../../../states/actions/sales.actions';
import * as SalesSelector from '../../../states/selectors/sales.selectors';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController } from '@ionic/angular';
import { CustomerScannerComponent } from '../../../components/customer/customer-scanner/customer-scanner.component';

@Component({
  selector: 'app-customer-homepage-screen',
  templateUrl: './customer-homepage-screen.component.html',
  styleUrls: ['./customer-homepage-screen.component.scss'],
})
export class CustomerHomepageScreenComponent  implements OnInit {

  public user$: Observable<{ data: any, status: string }>;
  public salesOrder$: Observable<{ data: any, status: string }>;
  public queue$: Observable<{ data: any, status: string }>;
  public host: string = environment.host;

  constructor(
    private store: Store<AuthState>,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.user$ = this.store.pipe(select(AuthSelectors.user));
    this.salesOrder$ = this.store.pipe(select(SalesSelector.salesOrder));
    this.queue$ = this.store.pipe(select(SalesSelector.Queue));

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((state: any) => {
      switch (state.type) {
        case '[Auth] Get Current User Success':
          const customer = state.data?.customer;

          if (customer) {
            // Load sales order related to customer
            this.store.dispatch(SalesActions.loadSalesOrder({ filters: {
              query: [["customer", "=", customer.name]],
              fields: ["*"],
              order_by: "creation desc",
              limit_page_length: 1,
            }}));

            // Load queue related to customer
            this.store.dispatch(SalesActions.loadQueue({ 
              payload: {
                filters: [
                  ["customer", "=", customer.name], 
                  ["status", "=", "Waiting"],
                ],
                fields: ["*"],
                order_by: "creation desc",
              }
            }));
          }
          break;
        default:
          // not implemented yet
      }
    });
  }

  /**
   * Open the scanner
   */
  async openScannerHandler() {
    const modal = await this.modalCtrl.create({
      component: CustomerScannerComponent,
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  /**
   * Present delete queue alert
   */
  async presentDeleteQueueAlert(name: string) {
    const alert = await this.alertCtrl.create({
      header: 'Batal Antrian',
      message: 'Anda yakin ingin membatalkan antrian ini?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ya, Batalkan',
          handler: () => {
            this.store.dispatch(SalesActions.deleteQueue({ payload: { name } }));
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.getCurrentUser());
  }

  /**
   * Delete queue
   */
  onCancelQueueHandler(name: string): void {
    this.presentDeleteQueueAlert(name);
  }

  /**
   * Refresh queue
   */
  onQueueRefreshHandler(): void {
    this.store.dispatch(AuthActions.getCurrentUser());
  }

}
