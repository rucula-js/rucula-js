import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormDynamicComponent } from './component/form-dynamic/form-dynamic.component';

@NgModule({
 imports:      [ CommonModule],
 declarations: [ FormDynamicComponent],
 exports:      [ FormDynamicComponent],
})
export class CoreModule { }