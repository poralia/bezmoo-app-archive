import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICredentials, ILogin, IRegister, IUser } from '../../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const USER_KEY = 'bezmoo_user';
export const CREDENTIALS_KEY = 'bezmoo_credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Login
   * 
   * @param payload ILogin
   * @return http Observable
   */
  public login(payload: ILogin): Observable<any> {
    return this.http.post(`${environment.api}/method/bezoto.overrides.auth.login`, payload);
  }

  /**
   * Register
   * 
   * @param payload IRegister
   * @return http Observable
   */
  public register(payload: IRegister): Observable<any> {
    return this.http.post(`${environment.api}/method/frappe.core.doctype.user.user.sign_up`, payload);
  }

  /**
   * Save user to localstorage
   * 
   * @param user IUser
   * @return void
   */
  public setUser(user: IUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Get user from localstorage
   * 
   * @return IUser
   */
  public getUser(): IUser {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  }

  /**
   * Save cred to localstorage
   * 
   * @param cred ICredentials
   * @return void
   */
  public setCredentials(cred: ICredentials): void {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(cred));
  }

  /**
   * Get secret key
   * 
   * @return Object
   */
  public getCredentials(): any {
    const cred = JSON.parse(localStorage.getItem(CREDENTIALS_KEY) || '{}');

    if (!cred.api_key) {
      return null;
    }

    return {
      api_key: cred.api_key,
      api_secret: cred.api_secret
    };
  }

  /**
   * Get current user from database
   * 
   * @return http Observable<any>
   */
  public getCurrentUser(): Observable<any> {
    const cred = this.getCredentials();
    const credCombine = `${cred.api_key}:${cred.api_secret}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', `Basic ${btoa(credCombine)}`);

    return this.http.get(`${environment.api}/method/frappe.auth.get_logged_user`, { headers: httpHeaders })
      .pipe(
        map((response: any) => {
          const data = response.user;
          // by default roles coming as array object
          // convert it to roles name only
          const roles = data.roles.map((role: any) => role.role);
          const queue = response.queue;

          return {
            ...data,
            customer: response.customer,
            roles: roles,
            queue: queue,
          }
        }),
      );
  }

}
