import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RuculaSintax } from './RuculaSintax';

@Injectable({
  providedIn: 'root',
})
export class RuculaService {
    
    constructor(private http: HttpClient) { }
    
    private Url:string = "https://localhost:7170/LanguageRucula/";
    GetAll(): Observable<RuculaSintax[]>{
        return this.http.get<RuculaSintax[]>(`${this.Url}GetAll`)
    }
    Get(code:string): Observable<any>{
      return this.http.get<any>(`${this.Url}Get/${code}`)
    }
    Save(rucula:RuculaSintax): Observable<any>{
      return this.http.post<any>(this.Url,rucula)
    }
    Update(rucula:RuculaSintax): Observable<any>{
      return this.http.put<any>(this.Url,rucula)
    }
    Delete(rucula:RuculaSintax): Observable<any>{
      let httpheaders=new HttpHeaders()
      .set('Content-type','application/Json');
      let options={
        headers:httpheaders,
        body:rucula
      };
      return this.http.delete<any>(this.Url,options)
    }
}