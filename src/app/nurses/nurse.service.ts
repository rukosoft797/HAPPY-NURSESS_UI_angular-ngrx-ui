import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Nurse } from './nurse';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  private nursesUrl = 'http://localhost:8080/api/v1/nurses';

  constructor(private http: HttpClient) { }

  getNurses():Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.nursesUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createNurse(nurse: Nurse): Observable<Nurse>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // Nurse id must be null for the Web API to assign an Id
    const newNurse = {...nurse, id: null };
    return this.http.post<Nurse>(this.nursesUrl, newNurse, {headers})
      .pipe(
        tap(data => console.log('createNurse: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteNurse(id: number): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.nursesUrl}/${id}`;
    return this.http.delete<Nurse>(url, {headers})
      .pipe(
        tap( data => console.log('deleteNurse: ' + id)),
        catchError(this.handleError)
      );
  }

  updateNurse(nurse: Nurse): Observable<Nurse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.nursesUrl}/${nurse.nurseId}`;
    return this.http.put<Nurse>(url, nurse, {headers})
      .pipe(
        tap(() => console.log("updateNurse: " + nurse.nurseId )),
        // Return the nurse on an update
        map(()=> nurse ),
        catchError(this.handleError)
      );
  }


  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
