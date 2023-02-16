import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';





export class actionsReciverService {
    
    constructor(private http?: HttpClient) {}

    public _url:string = "";

    options:Object = {};

    public get():Observable<any>{
        return this.http!.get<any>(this._url,this.options).pipe(
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