import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FormDynamicComponent } from './shared/component/window/form-dynamic.component';
import { ClienteComponent } from './rucula-crud/cliente/cliente.component';
import { FrameComponent } from './rucula-crud/frame/frame.component';


@NgModule({
  declarations: [
    AppComponent,
    FormDynamicComponent,
    ClienteComponent,
    FrameComponent
    
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
