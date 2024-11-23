import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Get sales order
   * 
   * @param filters any
   * @return http Observable
   */
  public getSalesOrder(filters: {
    query: any[],
    fields: string[],
    order_by: string,
    limit_page_length: number,
  }): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in filters) {
      if (filters.hasOwnProperty(key)) {
        let value;
        
        if (key == 'query') {
          value = JSON.stringify(filters[key]);
          // replace `query` with `filters`
          key = 'filters';
        }
        else if (key == 'fields') {
          value = JSON.stringify(filters[key]);
        }
        else {
          value = (filters as any)[key];
        }

        httpParams = httpParams.set(key, value);
      }
    }

    return this.httpClient
      .get(`${environment.api}/resource/Sales%20Order`, { params: httpParams })
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  /**
   * Retrieve sales order
   * 
   * @param filters any
   * @return http Observable
   */
  public retrieveSalesOrder(name: string): Observable<any> {
    return this.httpClient
      .get(`${environment.api}/resource/Sales%20Order/${name}`)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

}
