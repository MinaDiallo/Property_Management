import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from './property';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiURL = 'http://localhost:4000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/properties')

      .pipe(catchError(this.errorHandler));
  }

  create(property: Property): Observable<any> {
    console.log('AAA', property);
    return this.httpClient
      .post(
        this.apiURL + '/properties',
        JSON.stringify(property),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/properties/' + id)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, property: Property): Observable<any> {
    return this.httpClient
      .put(
        this.apiURL + '/properties/' + id,
        JSON.stringify(property),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/properties/' + id, this.httpOptions)

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
