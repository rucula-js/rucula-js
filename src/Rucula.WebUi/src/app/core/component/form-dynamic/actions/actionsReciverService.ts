import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class actionsReciverService {
    
    constructor(private http: HttpClient) {}

    public _url:string = "https://localhost:7170/Language";

    options:Object = {};

    public getAll():Observable<any>{
        return this.http!.get<any>(this._url,this.options).pipe(
            catchError(this.handleError)
        )
    }
    public getById():Observable<any>{
      return this.http!.get<any>(this._url,this.options).pipe(
          catchError(this.handleError)
      )
  }
  public post(args:any[]):Observable<any>{
    return this.http!.post<any>(this._url,args,this.options).pipe(
        catchError(this.handleError)
    )
  }   
  private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}