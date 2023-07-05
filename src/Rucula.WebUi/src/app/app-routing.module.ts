import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDynamicComponent } from './core/component/form-dynamic/form-dynamic.component';

const routes: Routes = [
  { path: 'form',component:FormDynamicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
