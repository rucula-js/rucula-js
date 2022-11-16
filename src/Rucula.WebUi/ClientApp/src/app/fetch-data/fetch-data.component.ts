import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Language[] = [];
  public forecast!: Language;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    alert(baseUrl);
    http.get<Language>(baseUrl + 'Languages')
    .subscribe(result => {
      this.forecast = result;
      alert(this.forecast)
    }, error => console.error(error));
  }
}

interface Language {
  Id: number;
  Name: string;
}
