import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../reducers/auth.reducer';

export const selectAuthFeatureKey = createFeatureSelector<AuthState>(authFeatureKey);

export const login = createSelector(
	selectAuthFeatureKey,
	(state: AuthState) => {
		return state.login;
	}
);

export const register = createSelector(
	selectAuthFeatureKey,
	(state: AuthState) => {
		return state.register;
	}
);

export const user = createSelector(
	selectAuthFeatureKey,
	(state: AuthState) => {
		return state.user;
	}
);