import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { SalesState } from '../../../states/reducers/sales.reducer';
import { SalesActions } from '../../../states/actions/sales.actions';
import * as SalesSelector from '../../../states/selectors/sales.selectors';
import { Observable } from 'rxjs';
import { CustomerScannerComponent } from '../../../components/customer/customer-scanner/customer-scanner.component';
import { AlertController, IonHeader, Platform } from '@ionic/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customer-take-order-screen',
  templateUrl: './customer-take-order-screen.component.html',
  styleUrls: ['./customer-take-order-screen.component.scss'],
})
export class CustomerTakeOrderScreenComponent  implements OnInit {

  @ViewChild(CustomerScannerComponent) scanner: CustomerScannerComponent | undefined;
  @ViewChild(IonHeader, { read: ElementRef }) header: IonHeader | undefined;

  public scannerRun: boolean = false;
  public cameraOn: boolean = false;
  public scannerHeight: number = 0;
  public headerHeight: number = 0;
  public company: string | null = null;

  constructor(
    private store: Store<SalesState>,
    private alertCtrl: AlertController,
    private actionsSubject$: ActionsSubject,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.scannerHeight = this.platform.height() / 2;
  }

  ionViewDidEnter() {
    // @ts-ignore
    this.headerHeight = this.header?.nativeElement.offsetHeight || 0;
  }

  /**
   * Start scanner
   */
  scan() {
    console.log('SCAN');
    this.scannerRun = true;
    this.company = null;
    this.scanner?.start();
  }

  /**
   * Scanner started
   */
  onCameraOpened(event: boolean) {
    this.cameraOn = event;
  }

  /**
   * Result from scanner
   */
  onScanResult(event: any) {
    console.log(event);
    this.company = event?.[0]?.rawValue;
  }

}
