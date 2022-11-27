import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RuculaSintax } from './RuculaSintax';

@Injectable({
  providedIn: 'root',
})
export class RuculaService {
    
    constructor(private http: HttpClient) { }
    
    GetAllRuculaSintax(): Observable<RuculaSintax[]>{
        return this.http.get<RuculaSintax[]>("https://localhost:7170/LanguageRucula/GetAll")
    }
}