import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexibleWidthDirective } from './flexible-width.diretive';
import { NavegationVerticalComponent } from './navegation-vertical/navegation-vertical.component';

@NgModule({
 imports:      [ CommonModule],
 declarations: [ FlexibleWidthDirective,NavegationVerticalComponent],
 exports:      [ CommonModule,FormsModule,ReactiveFormsModule,FlexibleWidthDirective,NavegationVerticalComponent ]
})
export class SharedModule { }