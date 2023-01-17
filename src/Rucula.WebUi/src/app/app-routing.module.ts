import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDynamicComponent } from './core/component/form-dynamic/form-dynamic.component';
import { PageComponent } from './docs/page/page.component';
import { RuculaConvertComponent } from './rucula/convert/rucula-convert.component';
import { RuculaSintaxeComponent } from './rucula/language/rucula-language.component';


const routes: Routes = [
  { path: 'rucula',component:RuculaSintaxeComponent},
  { path: 'convert',component:RuculaConvertComponent},
  { path: 'form',component:FormDynamicComponent},
  { path: 'docs/sagex3/:page', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
