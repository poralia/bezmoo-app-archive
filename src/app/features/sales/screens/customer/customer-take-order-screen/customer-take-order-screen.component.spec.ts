import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerTakeOrderScreenComponent } from './customer-take-order-screen.component';

describe('CustomerTakeOrderScreenComponent', () => {
  let component: CustomerTakeOrderScreenComponent;
  let fixture: ComponentFixture<CustomerTakeOrderScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTakeOrderScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerTakeOrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
