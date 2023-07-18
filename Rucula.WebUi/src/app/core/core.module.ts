import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';


@NgModule({
 imports:      [ CommonModule],
 declarations: [ NavBarComponent,],
 exports:      [ NavBarComponent,],
})
export class CoreModule { } 