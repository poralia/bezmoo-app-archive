import { createReducer, on } from '@ngrx/store';
import { SalesActions } from '../actions/sales.actions';
import { IDLE, LOADING, SUCCESS } from 'src/app/core/constants';

export const salesFeatureKey = 'sales';

export interface SalesState {
  salesOrder: {
    data: any;
    status: string;
    error: unknown;
  };
  retrieveOrder: {
    data: any;
    status: string;
    error: unknown;
  };
  POSProfile: {
    data: any;
    status: string;
    error: unknown;
  };
  Queue: {
    data: any;
    status: string;
    error: unknown;
  };
  company: {
    data: any;
    status: string;
    error: unknown;
  };
}

export const initialState: SalesState = {
  salesOrder: {
    data: null,
    status: IDLE,
    error: null,
  },
  retrieveOrder: {
    data: null,
    status: IDLE,
    error: null,
  },
  POSProfile: {
    data: null,
    status: IDLE,
    error: null,
  },
  Queue: {
    data: null,
    status: IDLE,
    error: null,
  },
  company: {
    data: null,
    status: IDLE,
    error: null,
  },
};

export const SalesReducer = createReducer(
  initialState,

  // ...
  // Get sales order
  // ...
  on(SalesActions.loadSalesOrder, (state, { filters }) => {
    return {
      ...state,
      salesOrder: {
        ...state.salesOrder,
        status: LOADING,
        error: null,
      }
    };
  }),
  on(SalesActions.loadSalesOrderSuccess, (state, { data, filters }) => {
    return {
      ...state,
      salesOrder: {
        data: data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(SalesActions.loadSalesOrderFailure, (state, { error, filters }) => {
    return {
      ...state,
      salesOrder: {
        ...state.salesOrder,
        status: IDLE,
        error: error,
      }
    }
  }),

  // ...
  // Retrieve sales order
  // ...
  on(SalesActions.retrieveSalesOrder, (state) => {
    return {
      ...state,
      retrieveOrder: {
        ...state.retrieveOrder,
        status: LOADING,
        error: null,
      }
    };
  }),
  on(SalesActions.retrieveSalesOrderSuccess, (state, { data }) => {
    return {
      ...state,
      retrieveOrder: {
        data: data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(SalesActions.retrieveSalesOrderFailure, (state, { error }) => {
    return {
      ...state,
      retrieveOrder: {
        ...state.retrieveOrder,
        status: IDLE,
        error: error,
      }
    }
  }),


  // ...
  // Load POS Profile
  // ...
  on(SalesActions.loadPOSProfile, (state) => {
    return {
      ...state,
      POSProfile: {
        ...state.POSProfile,
        status: LOADING,
        error: null,
      }
    };
  }),
  on(SalesActions.loadPOSProfileSuccess, (state, { data }) => {
    return {
      ...state,
      POSProfile: {
        data: data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(SalesActions.loadPOSProfileFailure, (state, { error }) => {
    return {
      ...state,
      POSProfile: {
        ...state.POSProfile,
        status: IDLE,
        error: error,
      }
    }
  }),


  // ...
  // Load Queue
  // ...
  on(SalesActions.loadQueue, (state) => {
    return {
      ...state,
      Queue: {
        ...state.Queue,
        status: LOADING,
        error: null,
      }
    };
  }),
  on(SalesActions.loadQueueSuccess, (state, { data }) => {
    return {
      ...state,
      Queue: {
        data: data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(SalesActions.loadQueueFailure, (state, { error }) => {
    return {
      ...state,
      Queue: {
        ...state.Queue,
        status: IDLE,
        error: error,
      }
    }
  }),

  
  // ...
  // Load Company
  // ...
  on(SalesActions.loadCompany, (state) => {
    return {
      ...state,
      company: {
        ...state.company,
        status: LOADING,
        error: null,
      }
    };
  }),
  on(SalesActions.loadCompanySuccess, (state, { data }) => {
    return {
      ...state,
      company: {
        data: data,
        status: SUCCESS,
        error: null,
      }
    }
  }),
  on(SalesActions.loadCompanyFailure, (state, { error }) => {
    return {
      ...state,
      company: {
        ...state.company,
        status: IDLE,
        error: error,
      }
    }
  }),

);

