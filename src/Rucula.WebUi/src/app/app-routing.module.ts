import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './docs/page/page.component';
import { RuculaSintaxeComponent } from './rucula/sintaxe/rucula-sintaxe.component';


const routes: Routes = [
  { path: 'bloco',component:RuculaSintaxeComponent,
    children:[
      { path: 'rucula',component:RuculaSintaxeComponent}
    ]},
  { path: 'docs/sagex3/:page', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
