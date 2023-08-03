import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import  {preparaEnviroment}  from './shared/component/rucula/global/GlobalConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  ngOnInit(): void {
      preparaEnviroment(environment.env)
  }
  title = 'Rucula';
}
