import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../states/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { ILogin, IRegister, IUser } from '../../interfaces';
import * as AuthSelectors from '../../states/selectors/auth.selectors';
import { AuthActions } from '../../states/actions/auth.actions';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public register$: Observable<{ data: IRegister | null, status: string, error: any }> | undefined;
  public login$: Observable<{ data: ILogin | IUser | null, status: string, error: any }> | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
  ) { 
    this.register$ = this.store.pipe(select(AuthSelectors.register));
    this.login$ = this.store.pipe(select(AuthSelectors.login));
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  /**
   * Form submit handler
   */
  onSubmitHandler(): void {
    this.store.dispatch(AuthActions.register({
      data: this.formGroup.value,
    }));
  }

}
