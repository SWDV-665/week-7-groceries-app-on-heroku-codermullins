import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { GroceriesServiceProvider } from 'src/providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from 'src/providers/input-dialog-service/input-dialog-service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GroceriesServiceProvider, InputDialogServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
