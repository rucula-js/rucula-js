import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormDynamicComponent } from './component/form-dynamic/form-dynamic.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';


@NgModule({
 imports:      [ CommonModule],
 declarations: [ FormDynamicComponent,NavBarComponent,],
 exports:      [ FormDynamicComponent,NavBarComponent,],
})
export class CoreModule { } 