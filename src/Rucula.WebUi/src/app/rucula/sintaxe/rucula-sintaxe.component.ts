import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { RuculaService } from './rucula.service';
import { RuculaSintax } from './RuculaSintax';


@Component({
  selector: 'rucula-sintaxe',
  templateUrl: './rucula-sintaxe.component.html',
  styleUrls: ['./rucula-sintaxe.component.css']
})
export class RuculaSintaxeComponent{  

  constructor(private fb: FormBuilder, private rs:RuculaService) { 
  }
  ngOnInit(){
    this.rs.GetAllRuculaSintax()
    .subscribe(resp =>  console.log(resp) )
  }
  Rucula:RuculaSintax[] = [];
  ruculaSintaxe = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      description2: ['', Validators.required],
      atributesDefaut: ['', Validators.required],
      ruculaRepresentation: this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required]
      })
   });
}
