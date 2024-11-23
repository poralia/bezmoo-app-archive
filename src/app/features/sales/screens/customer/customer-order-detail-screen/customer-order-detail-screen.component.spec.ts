import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerOrderDetailScreenComponent } from './customer-order-detail-screen.component';

describe('CustomerOrderDetailScreenComponent', () => {
  let component: CustomerOrderDetailScreenComponent;
  let fixture: ComponentFixture<CustomerOrderDetailScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderDetailScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerOrderDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
