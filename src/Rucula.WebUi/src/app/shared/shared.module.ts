import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexibleWidthDirective } from './flexible-width.diretive';
import { GridJsAngularModule } from 'gridjs-angular';
import { GridTableJSComponent } from './component/grid-js/grid-js.component';


@NgModule({
 imports:      [ CommonModule,GridJsAngularModule],
 declarations: [ FlexibleWidthDirective,GridTableJSComponent],
 exports:      [ CommonModule,FormsModule,ReactiveFormsModule,FlexibleWidthDirective,GridTableJSComponent]
})
export class SharedModule { }