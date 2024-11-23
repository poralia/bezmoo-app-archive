import { createFeatureSelector, createSelector } from '@ngrx/store';
import { salesFeatureKey, SalesState } from '../reducers/sales.reducer';

export const selectSalesFeatureKey = createFeatureSelector<SalesState>(salesFeatureKey);

export const salesOrder = createSelector(
	selectSalesFeatureKey,
	(state: SalesState) => {
		return state.salesOrder;
	}
);

export const retrieveOrder = createSelector(
	selectSalesFeatureKey,
	(state: SalesState) => {
		return state.retrieveOrder;
	}
);

export const POSProfile = createSelector(
	selectSalesFeatureKey,
	(state: SalesState) => {
		return state.POSProfile;
	}
);

export const Queue = createSelector(
	selectSalesFeatureKey,
	(state: SalesState) => {
		return state.POSProfile;
	}
);

export const company = createSelector(
	selectSalesFeatureKey,
	(state: SalesState) => {
		return state.company;
	}
);