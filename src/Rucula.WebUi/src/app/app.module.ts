import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DocsComponent } from './docs/docs.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { RuculaSintaxeComponent } from './rucula/sintaxe/rucula-sintaxe.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    DocsComponent,
    RuculaSintaxeComponent
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
