import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DocsComponent } from './docs/docs.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { RuculaSintaxeComponent } from './rucula/language/rucula-language.component';
import { RuculaConvertComponent } from './rucula/convert/rucula-convert.component';
import { NavegationVerticalComponent } from './shared/navegation-vertical/navegation-vertical.component';
import { ButtonsCrudComponent } from './core/component/btn-crud/btn-crud.component';
import { FormDynamicComponent } from './core/component/form-dynamic/form-dynamic.component';


@NgModule({
  declarations: [
    AppComponent,
    DocsComponent,
    RuculaSintaxeComponent,
    RuculaConvertComponent,
    NavegationVerticalComponent,
    ButtonsCrudComponent,
    FormDynamicComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
