import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class actionsReciverService {
    
    constructor(private http: HttpClient) {}

    public getAll(url:string,options?:Object):Observable<any>{
        return this.http!.get<any>(url,options).pipe(
            catchError(this.handleError)
        )
    }
    public getById(url:string,options?:Object):Observable<any>{
      return this.http!.get<any>(url,options).pipe(
          catchError(this.handleError)
      )
    }
    public post(url:string,args:any[],options?:Object):Observable<any>{
      return this.http!.post<any>(url,args,options).pipe(
          catchError(this.handleError)
      )
    }   
    public delete(url:string,options?:Object):Observable<any>{
        return this.http!.delete<any>(url,options).pipe(
          catchError(this.handleError)
      )
    }
    public put(url:string,body:any,options?:Object):Observable<any>{
      return this.http!.put<any>(url,body,options).pipe(
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