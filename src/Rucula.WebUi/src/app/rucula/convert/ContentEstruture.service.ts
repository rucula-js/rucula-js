import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentEstruture } from './ContentEstruture';

@Injectable({
  providedIn: 'root',
})
export class ContentEstrutureService {
    
    constructor(private http: HttpClient) { }
    
    private Url:string = "https://localhost:7170";
    
    Save(contentEstruture:ContentEstruture):Observable<ContentEstruture>
    {
        return this.http.post<ContentEstruture>(`${this.Url}/ContentEstrutureHTML`, contentEstruture);
    }
}