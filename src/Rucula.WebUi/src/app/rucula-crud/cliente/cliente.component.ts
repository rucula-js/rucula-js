import { Component, OnInit } from '@angular/core';
import cliente from '../../shared/component/tamplate-window/cliente.json'
@Component({
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente: any;
  ngOnInit(): void {
    this.cliente = cliente;
  }
}
