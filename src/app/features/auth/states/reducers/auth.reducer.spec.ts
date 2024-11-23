import { AuthReducer, InitialAuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = AuthReducer(InitialAuthState, action);

      expect(result).toBe(InitialAuthState);
    });
  });
});
