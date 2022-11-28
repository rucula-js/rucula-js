import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexibleWidthDirective } from './flexible-width.diretive';

@NgModule({
 imports:      [ CommonModule],
 declarations: [ FlexibleWidthDirective],
 exports:      [ CommonModule,FormsModule,ReactiveFormsModule,FlexibleWidthDirective ]
})
export class SharedModule { }