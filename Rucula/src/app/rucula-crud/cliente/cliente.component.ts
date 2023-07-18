import { Component, OnInit } from '@angular/core';
import cliente from './cliente.json'

@Component({
  templateUrl: './cliente.component.html',
})
export class ClienteComponent implements OnInit {
  cliente: any;
  ngOnInit(): void {
    this.cliente = cliente;
  }
}
