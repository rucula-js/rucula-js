import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class CrudReciverService {
    constructor(private http?: HttpClient) { }

    private Url:string = "http://localhost:8080";
    

    Save(){
        alert("Save")
    }
    Alter(){
        alert("Alter")
    }
}