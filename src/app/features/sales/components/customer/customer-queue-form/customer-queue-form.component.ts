import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { AuthService } from 'src/app/features/auth/services/auth/auth.service';
import { SalesState } from '../../../states/reducers/sales.reducer';
import { SalesActions } from '../../../states/actions/sales.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customer-queue-form',
  templateUrl: './customer-queue-form.component.html',
  styleUrls: ['./customer-queue-form.component.scss'],
})
export class CustomerQueueFormComponent  implements OnInit {

  @Input('company') company: string = '';

  public formGroup: FormGroup = new FormGroup({});
  public creating: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<SalesState>,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((state: any) => {
      switch (state.type) {
        case '[Sales] Create Queue':
          this.creating = true;
          break;
        case '[Sales] Create Queue Success':
        case '[Sales] Create Queue Fail':
          this.creating = false;
          break;
        default:
          // not implemented yet
      }
    });
  }

  ngOnInit() {
    const user = this.authService.getUser() as any;

    this.formGroup = this.fb.group({
      license_plate: ['', [Validators.required]],
      company: [this.company, [Validators.required]],
      customer: [user?.customer?.name, [Validators.required]],
    });
  }

  onSubmitHandler(): void {
    this.store.dispatch(SalesActions.createQueue({
      payload: {
        data: {
          ...this.formGroup.value,
          license_plate: this.formGroup.value.license_plate.toUpperCase(),
        },
      }
    }));
  }

}
