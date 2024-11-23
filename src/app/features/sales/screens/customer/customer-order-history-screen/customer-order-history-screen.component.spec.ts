import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerOrderHistoryScreenComponent } from './customer-order-history-screen.component';

describe('CustomerOrderHistoryScreenComponent', () => {
  let component: CustomerOrderHistoryScreenComponent;
  let fixture: ComponentFixture<CustomerOrderHistoryScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderHistoryScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerOrderHistoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
