import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILogin, IRegister, IUser } from '../../interfaces';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ data: ILogin }>(),
    'Login Success': props<{ data: IUser }>(),
    'Login Failure': props<{ error: any }>(),

    'Logout': emptyProps,
    'Logout Success': emptyProps,

    'Register': props<{ data: IRegister }>(),
    'Register Success': props<{ data: any, login?: ILogin }>(),
    'Register Failure': props<{ error: any }>(),

    'Get Current User': emptyProps,
    'Get Current User Success': props<{ data: any }>(),
    'Get Current User Failure': props<{ error: any }>(),
  }
});
