import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GridJsAngularModule } from 'gridjs-angular';
import { GridTableJSComponent } from './component/grid-js/grid-js.component';


@NgModule({
 imports:      [ CommonModule,GridJsAngularModule],
 declarations: [ GridTableJSComponent],
 exports:      [ CommonModule,FormsModule,ReactiveFormsModule,GridTableJSComponent]
})
export class SharedModule { }