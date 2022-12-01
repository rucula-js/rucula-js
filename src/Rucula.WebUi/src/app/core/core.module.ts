import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudComponent } from '../quadro/crud/crud.component';
import { LeftListComponent } from '../quadro/left-list/left-list.component';

@NgModule({
 imports:      [ CommonModule],
 declarations: [ LeftListComponent,CrudComponent],
 exports:      [ LeftListComponent,CrudComponent],
})
export class CoreModule { }