import { ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { SalesActions } from 'src/app/features/sales/states/actions/sales.actions';
import { ILogin, IRegister, IUser } from '../../interfaces';
import { IDLE, LOADING, SUCCESS } from 'src/app/core/constants';
import { act } from '@ngrx/effects';

export const authFeatureKey = 'auth';

export interface AuthState {
  register: {
    data: IRegister | null,
    status: string,
    error: unknown,
  },
  login: {
    data: ILogin | IUser | null,
    status: string,
    error: unknown,
  },
  user: {
    data: IUser | null,
    status: string,
    error: unknown,
  }
}

export const InitialAuthState: AuthState = {
  register: {
    data: null,
    status: IDLE,
    error: null,
  },
  login: {
    data: null,
    status: IDLE,
    error: null,
  },
  user: {
    data: null,
    status: IDLE,
    error: null,
  }
};

export const AuthReducer = createReducer(
  InitialAuthState,

  // ...
  // Register
  // ...
  on(AuthActions.register, (state, action) => {
    return {
      ...state,
      register: {
        ...state.register,
        data: action.data,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.registerSuccess, (state, action) => {
    return {
      ...state,
      register: {
        ...state.register,
        data: action.data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.registerFailure, (state, action) => {
    return {
      ...state,
      register: {
        ...state.register,
        status: IDLE,
        error: action.error,
      }
    }
  }),

  // ...
  // Login
  // ...
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      login: {
        ...state.login,
        data: action.data,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      login: {
        ...state.login,
        data: action.data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      login: {
        ...state.login,
        status: IDLE,
        error: action.error,
      }
    }
  }),

  // ...
  // Get current user
  // ...
  on(AuthActions.getCurrentUser, (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        status: LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.getCurrentUserSuccess, (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        data: action.data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.getCurrentUserFailure, (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        status: IDLE,
        error: action.error,
      }
    }
  }),

  // ...
  // Update queue for this user
  // ...
  on(SalesActions.createQueueSuccess, (state: any, action) => {
    const { data } = action.data;

    return {
      ...state,
      user: {
        ...state.user,
        data: {
          ...state.user.data,
          queue: data,
        },
      }
    }
  }),

  // ...
  // Delete queue for this user
  // ...
  on(SalesActions.deleteQueueSuccess, (state: any, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        data: {
          ...state.user.data,
          queue: null,
        },
      }
    }
  }),

);

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.logout.type) {
      state = {} as any;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug, logout];