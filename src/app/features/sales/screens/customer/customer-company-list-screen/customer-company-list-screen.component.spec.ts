import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerCompanyListScreenComponent } from './customer-company-list-screen.component';

describe('CustomerCompanyListScreenComponent', () => {
  let component: CustomerCompanyListScreenComponent;
  let fixture: ComponentFixture<CustomerCompanyListScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyListScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCompanyListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
