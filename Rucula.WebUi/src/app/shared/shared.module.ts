import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
 imports:      [ CommonModule],
 declarations: [ ],
 exports:      [ CommonModule,FormsModule,ReactiveFormsModule]
})
export class SharedModule { }