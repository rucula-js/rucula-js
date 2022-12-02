import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './docs/page/page.component';
import { RuculaConvertComponent } from './rucula/convert/rucula-convert.component';
import { RuculaSintaxeComponent } from './rucula/language/rucula-language.component';


const routes: Routes = [
  { path: 'rucula',component:RuculaSintaxeComponent},
  { path: 'convert',component:RuculaConvertComponent},
  { path: 'docs/sagex3/:page', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
