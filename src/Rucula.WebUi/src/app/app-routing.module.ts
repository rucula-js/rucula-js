import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './rucula-crud/cliente/cliente.component';
import { FrameComponent } from './rucula-crud/frame/frame.component';

const routes: Routes = [
  { path: 'cliente',component:ClienteComponent},
  { path: 'frame',component:FrameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
