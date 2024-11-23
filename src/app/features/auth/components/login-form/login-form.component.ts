import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '../../states/actions/auth.actions';
import { select, Store } from '@ngrx/store';
import { AuthState, InitialAuthState } from '../../states/reducers/auth.reducer';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../states/selectors/auth.selectors';
import { ILogin, IUser } from '../../interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public login$: Observable<{ data: ILogin | IUser | null, status: string, error: any }> | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
  ) { 
    this.login$ = this.store.pipe(select(AuthSelectors.login));
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      usr: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  /**
   * Form submit handler
   */
  onSubmitHandler(): void {
    this.store.dispatch(AuthActions.login({
      data: this.formGroup.value,
    }));
  }

}
