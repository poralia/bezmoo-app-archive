import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SalesActions = createActionGroup({
  source: 'Sales',
  events: {
    'Load Sales Order': props<{ filters: {
      query: any[],
      fields: string[],
      order_by: string,
      limit_page_length: number,
    } }>(),
    'Load Sales Order Success': props<{ data: any, filters: any }>(),
    'Load Sales Order Failure': props<{ error: unknown, filters: any }>(),

    'Retrieve Sales Order': props<{ name: string }>(),
    'Retrieve Sales Order Success': props<{ data: any }>(),
    'Retrieve Sales Order Failure': props<{ error: unknown }>(),

    'Load POS Profile': props<{ payload: {
      filters: any[],
      fields: string[],
    } }>(),
    'Load POS Profile Success': props<{ data: any, filters: any }>(),
    'Load POS Profile Failure': props<{ error: unknown, filters: any }>(),

    'Create Queue': props<{ payload: {
      data: any,
    } }>(),
    'Create Queue Success': props<{ data: any }>(),
    'Create Queue Failure': props<{ error: unknown }>(),

    'Load Queue': props<{ payload: {
      filters: any[],
      fields: string[],
      order_by?: string,
    } }>(),
    'Load Queue Success': props<{ data: any, filters: any }>(),
    'Load Queue Failure': props<{ error: unknown, filters: any }>(),

    'Delete Queue': props<{ payload: {
      name: string,
    } }>(),
    'Delete Queue Success': props<{ data: any }>(),
    'Delete Queue Failure': props<{ error: unknown }>(),

    'Load Company': props<{ payload: {
      filters: any[],
      fields: string[],
    } }>(),
    'Load Company Success': props<{ data: any, filters: any }>(),
    'Load Company Failure': props<{ error: unknown, filters: any }>(),
  }
});
