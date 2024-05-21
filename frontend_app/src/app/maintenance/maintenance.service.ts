import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Maintenance } from './maintenance';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private apiURL = 'http://localhost:4000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/tasks')

      .pipe(catchError(this.errorHandler));
  }

  add(task: Maintenance): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/tasks', JSON.stringify(task), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/tasks/' + id)

      .pipe(catchError(this.errorHandler));
  }
  findByPropertyId(propertyID: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/tasks/propertyId/' + propertyID)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, task: Maintenance): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/tasks/' + id, JSON.stringify(task), this.httpOptions)

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
