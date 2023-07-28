import { Component, OnInit } from '@angular/core';
import cliente from './cliente.json'

@Component({
  template:`<rucula [window]=(cliente)></rucula>`
})
export class ClienteComponent implements OnInit {
  cliente: any;
  ngOnInit(): void {
    this.cliente = cliente;
  }
}
