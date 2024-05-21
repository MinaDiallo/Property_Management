import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tenant } from './tenant';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private apiURL = 'http://localhost:4000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/holders')

      .pipe(catchError(this.errorHandler));
  }

  add(tenant: Tenant): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/holders', JSON.stringify(tenant), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/holders/' + id)

      .pipe(catchError(this.errorHandler));
  }
  findByPropertyId(propertyID: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/holders/propertyId/' + propertyID)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, tenant: Tenant): Observable<any> {
    return this.httpClient
      .put(
        this.apiURL + '/holders/' + id,
        JSON.stringify(tenant),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  remove(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/holders/' + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
