import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Get company list
   */
  public getCompany(payload: {
    fields: string[],
    filters: any[],
  }): Observable<any> {
    let httpParams = new HttpParams();

    for (let key in payload) {
      if (payload.hasOwnProperty(key)) {
        let value;
        
        if (key == 'filters') {
          value = JSON.stringify(payload[key]);
        }
        else if (key == 'fields') {
          value = JSON.stringify(payload[key]);
        }
        else {
          value = (payload as any)[key];
        }

        httpParams = httpParams.set(key, value);
      }
    }

    return this.httpClient
      .get(`${environment.api}/resource/Company`, { params: httpParams })
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
  
}
