import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { GlobalWindowService } from './shared/component/window/global/global.service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  constructor(private global:GlobalWindowService) {}
  ngOnInit(): void {
      this.global.preparaEnviroment(environment.env)
  }

  title = 'Rucula';
}
