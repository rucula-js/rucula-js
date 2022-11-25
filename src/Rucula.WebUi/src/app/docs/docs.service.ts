import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class DocsService {  
  constructor(private http: HttpClient) { }
  
  Url:string = 'https://localhost:7242/Docs';

  GetDocumento(param:string){
    const options = {
      params: new HttpParams().set('pagina', param)
    };
    return this.http.get<string>(this.Url,options);
  }
}
