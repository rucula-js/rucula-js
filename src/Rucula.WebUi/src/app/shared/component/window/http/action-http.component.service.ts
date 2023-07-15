import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActionsHTTPService {
    
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
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}