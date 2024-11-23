import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SalesEffects } from './sales.effects';

describe('SalesEffects', () => {
  let actions$: Observable<any>;
  let effects: SalesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SalesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SalesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
